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

const serviceCards = [
  Services.CustomDevelopment,
  Services.LandingPage,
  Services.Maintenance,
  Services.SwI18nL10n,
  Services.JobOpportunity,
  Services.JustSayHi
] as const;

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
    <form onSubmit={handleSubmit(onSubmit)} className='grid max-w-4xl grid-cols-2 gap-5'>
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

      <fieldset className='col-span-2 m-0 border-0 p-0'>
        <legend className={`${labelClasses} ${errors.service ? 'text-red-400' : 'text-content'}`}>
          {t('service')}
        </legend>

        <div className='mt-1 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {serviceCards.map((value) => (
            <label
              key={value}
              className='group relative flex cursor-pointer flex-col gap-1.5 rounded-[14px] border border-hairline bg-surface-raised p-5 transition-colors hover:border-content has-checked:border-signal has-checked:bg-hover-tint has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-signal'
            >
              <input {...register('service', { required: true })} type='radio' value={value} className='peer sr-only' />
              <span
                aria-hidden
                className='absolute top-5 right-5 grid h-5 w-5 place-items-center rounded-full border border-hairline-strong text-[11px] text-transparent transition-colors peer-checked:border-signal peer-checked:bg-signal peer-checked:text-ink'
              >
                ✓
              </span>
              <span className='pr-8 text-base font-bold tracking-[-0.01em] text-content'>
                {t(`cards.${value}.title`)}
              </span>
              <span className='text-sm leading-normal text-content/70'>{t(`cards.${value}.description`)}</span>
            </label>
          ))}
        </div>

        {errors.service && <span className='mt-2 block text-xs text-red-400'>{t('required-field')}</span>}
      </fieldset>

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
        className='cursor-pointer justify-self-start rounded-full bg-signal px-6 py-3.5 text-[15px] font-bold text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:bg-signal/50 dark:hover:bg-paper dark:hover:text-ink'
      />

      {state.success ? (
        <p className='col-span-2 my-0 rounded-lg border border-green-500/60 px-4 py-3 text-sm'>{state.response}</p>
      ) : !state.success && state.response ? (
        <p className='col-span-2 my-0 rounded-lg border border-red-400/60 px-4 py-3 text-sm'>{state.response}</p>
      ) : null}
    </form>
  );
};
