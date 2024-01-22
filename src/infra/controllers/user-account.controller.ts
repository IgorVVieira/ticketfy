import { Request, Response } from 'express';
import { BaseHttpController, controller, httpGet, httpPost, interfaces, queryParam, request, requestBody, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserAccountService } from '../services/user-account.service';
import { TYPES } from '../shared/types';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkUserIdMatch } from '../middlewares/check-user-id-match.middleware';
import { CreateUserAccountDto } from '../dto/create-user-account.dto';

@controller('/user-accounts', authMiddleware)
export class UserAccountController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject(TYPES.UserAccountService) private readonly userAccountService: UserAccountService) {
    super();
  }

  @httpGet('/:userId', checkUserIdMatch)
  async find(@queryParam('userId') userId: string, @response() res: Response): Promise<Response> {
    try {
      const userAccount = await this.userAccountService.find(userId);
      return res.status(200).json(userAccount);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @httpGet('/')
  async findAll(@request() req: Request, @response() res: Response): Promise<Response> {
    try {
      const userAccounts = await this.userAccountService.findAll(req.userId);
      return res.status(200).json(userAccounts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @httpPost('/')
  async create(@requestBody() createUserAccountDTO: CreateUserAccountDto, @response() res: Response): Promise<Response> {
    try {
      const userAccount = await this.userAccountService.create(createUserAccountDTO);
      return res.status(201).json(userAccount);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}
