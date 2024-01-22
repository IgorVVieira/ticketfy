import { Response } from 'express';
import { BaseHttpController, controller, httpGet, httpPost, interfaces, queryParam, requestBody, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';

import { EventService } from '../services/event.service';
import { TYPES } from '../shared/types';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkUserIdMatch } from '../middlewares/check-user-id-match.middleware';
import { can } from '../middlewares/permissions.middleware';
import { CreateEventDto } from '../dto/create-event-dto';

@controller('/events')
export class EventController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject(TYPES.EventService) private readonly eventService: EventService) {
    super();
  }

  @httpPost('/', authMiddleware, checkUserIdMatch, can('admin'))
  async create(@requestBody() createEventDTO: CreateEventDto, @response() res: Response): Promise<Response> {
    try {
      const event = await this.eventService.create(createEventDTO);
      return res.status(201).json(event);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  @httpGet('/:id', authMiddleware)
  async findById(@requestParam('id') id: string, @response() res: Response): Promise<Response> {
    try {
      const event = await this.eventService.findById(id);
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @httpGet('/')
  async findAll(@queryParam('name') name: string,
    @queryParam('type') type: string,
    @queryParam('datetime') datetime: string,
    @queryParam('status') status: string,
    @response() res: Response): Promise<Response> {
    const events = await this.eventService.findAll({
      name,
      type,
      datetime,
      status
    });
    return res.status(200).json(events);
  }
}
