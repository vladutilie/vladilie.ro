import { Services } from './services.enum';

export type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service?: Services;
  budget?: number;
  message: string;
};
