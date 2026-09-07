import { Analytics } from '@vercel/analytics/next';
import { Metadata } from 'next';
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import './globals.css';
import { Footer } from './ui/footer';
import { Navbar } from './ui/navbar';
import { ThemeProvider } from './ui/theme-provider';

const instrumentSans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-instrument-sans'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono'
});

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <body className='bg-surface text-content font-sans transition-colors duration-300'>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone='Europe/Bucharest'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <Navbar />
            {children}
            <Footer />
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
