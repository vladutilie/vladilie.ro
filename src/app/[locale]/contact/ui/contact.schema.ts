import { number, object, string } from 'yup';

import { Inputs } from './inputs.type';
import { Services } from './services.enum';

export const ContactSchema = object<Inputs>({
  firstName: string().trim().min(4).max(20).required(),
  lastName: string().trim().min(4).max(20).required(),
  email: string().email().required(),
  phone: string().min(10).max(15).required(),
  service: string()
    .oneOf([
      Services.CustomDevelopment,
      Services.LandingPage,
      Services.SwI18nL10n,
      Services.Maintenance,
      Services.JobOpportunity,
      Services.JustSayHi
    ])
    .required(),
  budget: number().when('service', {
    is: (value: string) => ![Services.JobOpportunity, Services.JustSayHi].includes(value as Services),
    then: (schema) => schema.min(1000).max(30000)
  }),
  message: string().trim().required()
});
