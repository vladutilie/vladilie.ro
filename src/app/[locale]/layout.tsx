import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import './globals.css';
import { ThemeProvider } from './ui/theme-provider';
import { Navbar } from './ui/navbar';
import { Footer } from './ui/footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ro' }> }): Promise<Metadata> {
  const { locale } = await params;
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

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  if (!routing.locales.includes(locale as any)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
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
