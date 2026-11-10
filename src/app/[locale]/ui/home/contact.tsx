'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

import { NavLinks } from '@/lib/constants';
import { sendQuickMessage } from '../../contact/ui/action';
import { QuickServices } from '../../contact/ui/contact.schema';

type Service = (typeof QuickServices)[number];
type Inputs = { name: string; email: string; message: string };

const fieldClasses =
  'rounded-lg border border-[#b9b6ae] bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink';

export const Contact: React.FC = () => {
  const t = useTranslations('homepage.contact');
  const [service, setService] = useState<Service>('build');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>({ defaultValues: { name: '', email: '', message: '' } });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setStatus('sending');

    try {
      await sendQuickMessage({ ...data, service });
      setStatus('sent');
      reset();
    } catch {
      setStatus('failed');
    }
  };

  return (
    <section id={NavLinks.Contact} className='mx-auto max-w-[1200px] px-6 py-20 md:py-[104px]'>
      <div className='bg-signal text-ink flex flex-wrap gap-12 rounded-[18px] p-[clamp(28px,5vw,56px)]'>
        <div className='min-w-0 flex-[1_1_380px]'>
          <h2 className='text-ink my-0 mb-[18px] text-[clamp(34px,4.6vw,52px)] leading-[1.02] tracking-[-0.04em]'>
            {t('title')}
          </h2>
          <p className='text-ink my-0 mb-[26px] max-w-[42ch] text-[17.5px] leading-[1.6]'>{t('body')}</p>

          <div id='service-label' className='mb-2.5 text-sm font-bold'>
            {t('need-help-with')}
          </div>
          <div role='group' aria-labelledby='service-label' className='mb-[18px] flex flex-wrap gap-2'>
            {QuickServices.map((id) => (
              <button
                key={id}
                type='button'
                aria-pressed={id === service}
                onClick={() => setService(id)}
                className={`border-ink cursor-pointer rounded-full border-[1.5px] px-[15px] py-[9px] text-[14.5px] font-semibold transition-colors ${
                  id === service ? 'bg-ink text-white' : 'text-ink hover:bg-ink/10 bg-transparent'
                }`}
              >
                {t(`services.${id}.label`)}
              </button>
            ))}
          </div>

          <p
            aria-live='polite'
            className='text-ink my-0 rounded-[10px] bg-white/40 px-4 py-3.5 text-[15px] leading-[1.55]'
          >
            {t(`services.${service}.hint`)}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='text-ink grid min-w-0 flex-[1_1_360px] gap-3.5 rounded-[14px] bg-white p-7'
        >
          <div className='grid gap-1.5'>
            <label htmlFor='c-name' className='text-[13.5px] font-bold'>
              {t('form.name')}
            </label>
            <input
              id='c-name'
              type='text'
              autoComplete='name'
              aria-invalid={!!errors.name}
              className={fieldClasses}
              {...register('name', { required: true })}
            />
            {errors.name && <span className='text-xs text-red-700'>{t('form.required')}</span>}
          </div>

          <div className='grid gap-1.5'>
            <label htmlFor='c-email' className='text-[13.5px] font-bold'>
              {t('form.email')}
            </label>
            <input
              id='c-email'
              type='email'
              autoComplete='email'
              aria-invalid={!!errors.email}
              className={fieldClasses}
              {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            />
            {errors.email && <span className='text-xs text-red-700'>{t('form.invalid-email')}</span>}
          </div>

          <div className='grid gap-1.5'>
            <label htmlFor='c-msg' className='text-[13.5px] font-bold'>
              {t('form.message')}
            </label>
            <textarea
              id='c-msg'
              rows={4}
              aria-invalid={!!errors.message}
              className={`${fieldClasses} resize-y`}
              {...register('message', { required: true, minLength: 10 })}
            />
            {errors.message && <span className='text-xs text-red-700'>{t('form.too-short')}</span>}
          </div>

          <button
            type='submit'
            disabled={'sending' === status}
            className='bg-ink hover:bg-ink/85 cursor-pointer rounded-full border-0 px-[22px] py-[15px] text-base font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60'
          >
            {'sending' === status ? t('form.sending') : t('form.submit')}
          </button>

          {'sent' === status || 'failed' === status ? (
            <p
              role='status'
              className={`my-0 rounded-lg px-3.5 py-2.5 text-sm ${'sent' === status ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}
            >
              {t(`form.${status}`)}
            </p>
          ) : null}

          <p className='my-0 text-[13px] text-[#55524b]'>
            {t.rich('form.or-write', {
              email: (chunk) => (
                <a href={`mailto:${chunk}`} className='text-ink hover:text-ink underline'>
                  {chunk}
                </a>
              )
            })}
          </p>
        </form>
      </div>
    </section>
  );
};
