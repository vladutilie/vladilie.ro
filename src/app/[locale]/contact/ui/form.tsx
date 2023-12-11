'use client';

import { ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Services } from './services.enum';
import { sendMail } from './action';
import { Inputs } from './inputs.type';

export const Form: React.FC = () => {
  const [state, setState] = useState<{ isLoading: boolean; response: string; success: boolean }>({
    isLoading: false,
    response: '',
    success: false
  });
  const t = useTranslations('contact.form');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    values: { firstName: '', lastName: '', email: '', phone: '', budget: 1, message: '' }
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setState((state) => ({ ...state, isLoading: true }));

    try {
      await sendMail(data);
      setState({ isLoading: false, success: true, response: t('message-sent') });
      reset();
    } catch (error: any) {
      console.error(error.message);

      setState({ isLoading: false, success: false, response: t('send-failed') });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid max-w-md grid-cols-2 gap-4'>
      <div className='col-span-2 flex flex-col sm:col-span-1'>
        <label htmlFor='firstName' className={`text-sm ${errors.firstName ? 'text-red-400' : 'text-gray-400'}`}>
          {t('first-name')}
        </label>
        <input
          {...register('firstName', { required: true })}
          className='rounded-md border border-gray-400 px-2 py-1 dark:outline-slate-800 focus:dark:outline-blue-500'
          id='firstName'
          maxLength={20}
          minLength={4}
        />
        {errors.firstName && <span className='text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <div className='col-span-2 flex flex-col sm:col-span-1'>
        <label htmlFor='lastName' className={`text-sm ${errors.lastName ? 'text-red-400' : 'text-gray-400'}`}>
          {t('last-name')}
        </label>
        <input
          {...register('lastName', { required: true })}
          id='lastName'
          className='rounded-md border border-gray-400 px-2 py-1 dark:outline-slate-800 focus:dark:outline-blue-500'
          maxLength={20}
          minLength={4}
        />
        {errors.lastName && <span className='text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <div className='col-span-2 flex flex-col sm:col-span-1'>
        <label htmlFor='email' className={`text-sm ${errors.email ? 'text-red-400' : 'text-gray-400'}`}>
          {t('email')}
        </label>
        <input
          {...register('email', { required: true })}
          className='rounded-md border border-gray-400 px-2 py-1 dark:outline-slate-800 focus:dark:outline-blue-500'
          id='email'
          maxLength={20}
          minLength={4}
          type='email'
        />
        {errors.email && <span className='text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <div className='col-span-2 flex flex-col sm:col-span-1'>
        <label htmlFor='phone' className={`text-sm ${errors.phone ? 'text-red-400' : 'text-gray-400'}`}>
          {t('phone')}
        </label>
        <input
          {...register('phone', { required: true })}
          className='rounded-md border border-gray-400 px-2 py-1 dark:outline-slate-800 focus:dark:outline-blue-500'
          id='phone'
          maxLength={15}
          minLength={10}
        />
        {errors.phone && <span className='text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <div className='col-span-2 flex flex-col'>
        <label htmlFor='service' className={`text-sm ${errors.service ? 'text-red-400' : 'text-gray-400'}`}>
          {t('service')}
        </label>
        <select
          {...register('service', { required: true })}
          className={`rounded-md border border-gray-500 px-2 py-1 dark:outline-slate-800 focus:dark:outline-blue-500 ${
            !watch('service') ? 'text-gray-500' : ''
          }`}
          id='service'
          defaultValue=''
        >
          <option value='' hidden disabled>
            {t('choose-service')}
          </option>
          <option value={Services.CustomDevelopment}>{t('service-custom-developmemt')}</option>
          <option value={Services.LandingPage}>{t('service-landing-page')}</option>
          <option value={Services.SwI18nL10n}>{t('sw-i18n-l10n')}</option>
          <option value={Services.Maintenance}>{t('service-maintenance')}</option>
          <option value={Services.JobOpportunity}>{t('service-job-opportunity')}</option>
          <option value={Services.JustSayHi}>{t('just-say-hi')}</option>
        </select>
        {errors.service && <span className='text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      {watch('service') && ![Services.JobOpportunity, Services.JustSayHi].includes(watch('service') as Services) ? (
        <div className='col-span-2 flex flex-col'>
          <label htmlFor='budget' className='text-sm text-gray-400'>
            {t.rich('budget', {
              amount: watch('budget'),
              strong: (chunk: ReactNode): JSX.Element => <span className='font-semibold'>{chunk}</span>
            })}
          </label>
          <input
            {...register('budget', { required: true })}
            defaultValue={1}
            max={30}
            min={1}
            step={1}
            type='range'
            id='budget'
          />
        </div>
      ) : null}

      <div className='col-span-2 flex flex-col'>
        <label htmlFor='message' className={`text-sm ${errors.message ? 'text-red-400' : 'text-gray-400'}`}>
          {t('message')}
        </label>
        <textarea
          {...register('message', { required: true })}
          className='rounded-md border border-gray-400 px-2 py-1 dark:outline-slate-800 focus:dark:outline-blue-500'
          id='message'
          minLength={50}
        />
        {errors.message && <span className='text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <input
        disabled={state.isLoading}
        type='submit'
        value={state.isLoading ? t('please-wait') : t('submit')}
        className='justify-self-start rounded-xl bg-blue-450 px-4 py-2 font-semibold text-white disabled:bg-blue-450/50'
      />

      {state.success ? (
        <p className='col-span-2 border border-green-400 px-4 py-2'>{state.response}</p>
      ) : !state.success && state.response ? (
        <p className='col-span-2 border border-red-400 px-4 py-2'>{state.response}</p>
      ) : null}
    </form>
  );
};
