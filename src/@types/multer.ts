export interface MyMulterFile extends Express.Multer.File {
  location?: string;
}
