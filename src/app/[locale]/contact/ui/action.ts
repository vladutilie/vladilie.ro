'use server';

import { SubmitHandler } from 'react-hook-form';

import { Inputs } from './inputs.type';
import { ContactSchema } from '@/app/[locale]/contact/ui/contact.schema';

export const sendMail: SubmitHandler<Inputs> = async (data) => {
  try {
    const name = [data.firstName, data.lastName].join(' ');

    ContactSchema.validateSync({ ...data, budget: Number(data.budget) * 1000 });

    const request = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!
      },
      body: JSON.stringify({
        sender: { email: data.email, name },
        to: [{ email: process.env.EMAIL, name: process.env.NEXT_PUBLIC_SITE_NAME }],
        templateId: Number(process.env.BREVO_TEMPLATE_ID),
        params: { name, service: data.service, budget: data.budget, content: data.message, phone: data.phone }
      })
    });

    if (![201, 202].includes(request.status)) {
      const response = await request.json();
      console.error(`❌ Error sending mail:`, response);

      throw new Error(response.message);
    }
  } catch (error: any) {
    console.error('Sending contact email with the following data has failed', data, error);

    throw error.message;
  }
};
