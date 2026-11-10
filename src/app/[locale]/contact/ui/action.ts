'use server';

import { getTranslations } from 'next-intl/server';
import { SubmitHandler } from 'react-hook-form';

import { Inputs } from './inputs.type';
import { ContactSchema, QuickContactSchema, type QuickContactInput } from './contact.schema';

export const sendMail: SubmitHandler<Inputs> = async (data) => {
  const t = await getTranslations('contact.form');

  try {
    const name = [data.firstName, data.lastName].join(' ');
    const budget = Number.isFinite(Number(data.budget)) ? Number(data.budget) : undefined;

    ContactSchema.parse({ ...data, budget });

    await deliver({
      name,
      email: data.email,
      params: {
        service: t(data.service as string),
        budget: new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'EUR' }).format(budget ?? 0),
        content: data.message,
        phone: data.phone
      }
    });
  } catch (error: any) {
    console.error('Sending contact email with the following data has failed', data, error);

    throw error.message;
  }
};

/** The homepage form: name, email, the kind of help needed and a short message. */
export const sendQuickMessage = async (data: QuickContactInput): Promise<void> => {
  const t = await getTranslations('homepage.contact.services');
  const { name, email, service, message } = QuickContactSchema.parse(data);

  await deliver({ name, email, params: { service: t(`${service}.label`), budget: '—', content: message, phone: '—' } });
};

/** Sends the message to the site owner through the Brevo transactional template. */
const deliver = async ({
  name,
  email,
  params
}: {
  name: string;
  email: string;
  params: Record<string, string>;
}): Promise<void> => {
  const request = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!
    },
    body: JSON.stringify({
      sender: { email, name },
      to: [{ email: process.env.EMAIL, name: process.env.NEXT_PUBLIC_SITE_NAME }],
      templateId: Number(process.env.BREVO_TEMPLATE_ID),
      params: { name, email, ...params }
    })
  });

  if (![201, 202].includes(request.status)) {
    const response = await request.json();
    console.error(`❌ Error sending mail:`, response);

    throw new Error(response.message);
  }
};
