import { number, object, string } from 'yup';

import { Inputs } from './inputs.type';
import { ContactServices } from '@/lib/constants';

export const ContactSchema = object<Inputs>({
  firstName: string().trim().min(4).max(20).required(),
  lastName: string().trim().min(4).max(20).required(),
  email: string().email().required(),
  phone: string().min(10).max(15).required(),
  service: string()
    .oneOf([
      ContactServices.CustomDevelopment,
      ContactServices.LandingPage,
      ContactServices.Maintenance,
      ContactServices.JobOpportunity
    ])
    .required(),
  budget: number().when('service', {
    is: (value: string) => value !== ContactServices.JobOpportunity,
    then: (schema) => schema.min(1000).max(30000)
  }),
  message: string().trim().required()
});
