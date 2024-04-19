export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
}
export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}