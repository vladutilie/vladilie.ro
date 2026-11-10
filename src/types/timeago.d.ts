// timeago.js 4.3 ships types, but its package.json "exports" doesn't point to them,
// so TypeScript can't find them with `moduleResolution: bundler`. Declare what we use.
declare module 'timeago.js' {
  type LocaleFunc = (diff: number, idx: number, totalSec?: number) => [string, string];

  export function format(
    date: Date | string | number,
    locale?: string,
    opts?: { relativeDate?: Date | string | number }
  ): string;
  export function register(locale: string, func: LocaleFunc): void;
}

declare module 'timeago.js/lib/lang/*' {
  const locale: (diff: number, idx: number, totalSec?: number) => [string, string];
  export default locale;
}
