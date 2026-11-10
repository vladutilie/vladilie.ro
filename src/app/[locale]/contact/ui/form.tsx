'use client';

import React, { ReactNode, useState, JSX } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { Services } from './services.enum';
import { sendMail } from './action';
import { Inputs } from './inputs.type';

const fieldClasses =
  'rounded-lg border border-hairline-strong bg-surface-raised px-3.5 py-3 text-content transition-colors outline-none focus:border-signal';

const labelClasses = 'mb-1.5 text-[13.5px] font-bold';

export const Form: React.FC = () => {
  const [state, setState] = useState<{ isLoading: boolean; response: string; success: boolean }>({
    isLoading: false,
    response: '',
    success: false
  });
  const t = useTranslations('contact.form');
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    values: { firstName: '', lastName: '', email: '', phone: '', budget: 500, message: '' }
  });
  const [service, budget] = useWatch({ control, name: ['service', 'budget'] });

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
    <form onSubmit={handleSubmit(onSubmit)} className='grid max-w-xl grid-cols-2 gap-5'>
      <div className='col-span-2 flex flex-col sm:col-span-1'>
        <label
          htmlFor='firstName'
          className={`${labelClasses} ${errors.firstName ? 'text-red-400' : 'text-content/60'}`}
        >
          {t('first-name')}
        </label>
        <input {...register('firstName', { required: true })} className={fieldClasses} id='firstName' />
        {errors.firstName && <span className='mt-1 text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <div className='col-span-2 flex flex-col sm:col-span-1'>
        <label htmlFor='lastName' className={`${labelClasses} ${errors.lastName ? 'text-red-400' : 'text-content/60'}`}>
          {t('last-name')}
        </label>
        <input {...register('lastName', { required: true })} id='lastName' className={fieldClasses} />
        {errors.lastName && <span className='mt-1 text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <div className='col-span-2 flex flex-col sm:col-span-1'>
        <label htmlFor='email' className={`${labelClasses} ${errors.email ? 'text-red-400' : 'text-content/60'}`}>
          {t('email')}
        </label>
        <input
          {...register('email', { required: true })}
          className={fieldClasses}
          id='email'
          maxLength={20}
          minLength={4}
          type='email'
        />
        {errors.email && <span className='mt-1 text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <div className='col-span-2 flex flex-col sm:col-span-1'>
        <label htmlFor='phone' className={`${labelClasses} ${errors.phone ? 'text-red-400' : 'text-content/60'}`}>
          {t('phone')}
        </label>
        <input
          {...register('phone', { required: true })}
          className={fieldClasses}
          id='phone'
          maxLength={15}
          minLength={10}
        />
        {errors.phone && <span className='mt-1 text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <div className='col-span-2 flex flex-col'>
        <label htmlFor='service' className={`${labelClasses} ${errors.service ? 'text-red-400' : 'text-content/60'}`}>
          {t('service')}
        </label>
        <select
          {...register('service', { required: true })}
          className={`${fieldClasses} min-h-[42px] ${!service ? 'text-content/50' : ''}`}
          id='service'
          defaultValue=''
        >
          <option value='' hidden disabled>
            {t('choose-service')}
          </option>
          <option defaultChecked={false} value={Services.CustomDevelopment}>
            {t('service-custom-development')}
          </option>
          <option value={Services.LandingPage}>{t('service-landing-page')}</option>
          <option value={Services.SwI18nL10n}>{t('sw-i18n-l10n')}</option>
          <option value={Services.Maintenance}>{t('service-maintenance')}</option>
          <option value={Services.JobOpportunity}>{t('service-job-opportunity')}</option>
          <option value={Services.JustSayHi}>{t('just-say-hi')}</option>
        </select>
        {errors.service && <span className='mt-1 text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      {service && ![Services.JobOpportunity, Services.JustSayHi].includes(service as Services) ? (
        <div className='col-span-2 flex flex-col'>
          <label htmlFor='budget' className={`${labelClasses} text-content/60`}>
            {t.rich('budget', {
              amount: Number(budget),
              strong: (chunk: ReactNode): JSX.Element => (
                <span className='font-semibold'>
                  {new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(Number(chunk?.toString()))}
                </span>
              )
            })}
          </label>
          <input
            {...register('budget', { required: true })}
            defaultValue={1}
            max={15000}
            min={500}
            step={500}
            type='range'
            id='budget'
            className='accent-accent'
          />
        </div>
      ) : null}

      <div className='col-span-2 flex flex-col'>
        <label htmlFor='message' className={`${labelClasses} ${errors.message ? 'text-red-400' : 'text-content/60'}`}>
          {t('message')}
        </label>
        <textarea
          {...register('message', { required: true })}
          className={fieldClasses}
          rows={8}
          id='message'
          minLength={50}
        />
        {errors.message && <span className='mt-1 text-xs text-red-400'>{t('required-field')}</span>}
      </div>

      <input
        disabled={state.isLoading}
        type='submit'
        value={state.isLoading ? t('please-wait') : t('submit')}
        className='bg-signal text-ink hover:bg-ink hover:text-paper disabled:bg-signal/50 dark:hover:bg-paper dark:hover:text-ink cursor-pointer justify-self-start rounded-full px-6 py-3.5 text-[15px] font-bold transition-colors disabled:cursor-not-allowed'
      />

      {state.success ? (
        <p className='col-span-2 my-0 rounded-lg border border-green-500/60 px-4 py-3 text-sm'>{state.response}</p>
      ) : !state.success && state.response ? (
        <p className='col-span-2 my-0 rounded-lg border border-red-400/60 px-4 py-3 text-sm'>{state.response}</p>
      ) : null}
    </form>
  );
};
