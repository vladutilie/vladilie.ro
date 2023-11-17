import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import './globals.css';
import { locales } from '@/navigation';
import { Navbar } from './ui/navbar';
import { ThemeProvider } from './ui/theme-provider';

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  }
};

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body className='transition-colors dark:bg-gray-950'>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone='Europe/Bucharest'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
