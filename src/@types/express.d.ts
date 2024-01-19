declare namespace Express {
  export interface File {
    location?: string;
  }

  export interface Multer {
    file?: File;
  }

  export interface Request {
    userId: string;

    file?: File;
    multer?: Multer;
  }
}
