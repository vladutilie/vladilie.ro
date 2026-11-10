import { z } from 'zod';

import { Services } from './services.enum';

// These services are discussed before a budget makes sense.
const budgetlessServices: Services[] = [Services.JobOpportunity, Services.JustSayHi];

export const ContactSchema = z
  .object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.email(),
    phone: z.string().trim().min(10).max(15),
    service: z.enum(Services),
    budget: z.number().optional(),
    message: z.string().trim().min(1)
  })
  .refine(({ service, budget }) => budgetlessServices.includes(service) || (500 <= (budget ?? 0) && 15000 >= budget!), {
    path: ['budget'],
    message: 'The budget must be between 500 and 15000.'
  });

export type ContactInput = z.infer<typeof ContactSchema>;

// The short form on the homepage: what the visitor needs help with, and two lines about it.
export const QuickServices = ['build', 'rescue', 'care', 'l10n', 'other'] as const;

export const QuickContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email(),
  service: z.enum(QuickServices),
  message: z.string().trim().min(10).max(5000)
});

export type QuickContactInput = z.infer<typeof QuickContactSchema>;
