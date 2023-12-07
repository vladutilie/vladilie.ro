import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import './globals.css';
import { locales } from '@/navigation';
import { ThemeProvider } from './ui/theme-provider';
import { Navbar } from './ui/navbar';
import { Footer } from './ui/footer';

export function generateMetadata({ params: { locale } }: { params: { locale: 'en' | 'ro' } }): Metadata {
  const title = { template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`, default: process.env.NEXT_PUBLIC_SITE_NAME! };

  return {
    title,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    alternates: { canonical: 'ro' === locale ? '/ro' : '/', languages: { 'en-US': '/', 'ro-RO': '/ro' } },
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID },

    // Keep the title template for child pages format.
    openGraph: { title },
    twitter: { title }
  };
}

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
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
