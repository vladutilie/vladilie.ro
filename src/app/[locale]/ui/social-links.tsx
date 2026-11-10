import { useTranslations } from 'next-intl';

type Profile = { name: string; url?: string; icon: React.ReactNode };

const iconProps = { width: 18, height: 18, 'aria-hidden': true } as const;

const profiles: Profile[] = [
  {
    name: 'GitHub',
    url: process.env.NEXT_PUBLIC_GITHUB,
    icon: (
      <svg
        {...iconProps}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M9.292 21v-2.56l.034-1.818a2.57 2.57 0 0 1 .64-1.53C7.526 14.745 5 13.723 5 9.267a4.718 4.718 0 0 1 1.075-3.082 4.531 4.531 0 0 1 .138-3.106c.215-.038 1.083-.09 2.746 1.058l.158.111a9.747 9.747 0 0 1 5.335-.004l.147-.104c1.659-1.145 2.522-1.097 2.738-1.058a4.507 4.507 0 0 1 .118 2.968l.065.08A4.718 4.718 0 0 1 19 9.267c0 4.48-2.544 5.476-4.979 5.748.256.286.447.61.57.966.13.372.182.77.154 1.165V21' />
        <path d='M4 17a2.452 2.452 0 0 1 1.784 1.208 2.5 2.5 0 0 0 1.495 1.196 2.483 2.483 0 0 0 1.9-.218' />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: process.env.NEXT_PUBLIC_LINKEDIN,
    icon: (
      <svg
        {...iconProps}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z' />
        <circle cx={4} cy={4} r={2} />
      </svg>
    )
  },
  {
    name: 'X',
    url: process.env.NEXT_PUBLIC_X,
    icon: (
      <svg {...iconProps} width={16} height={16} viewBox='0 0 1200 1227' fill='currentColor'>
        <path d='M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z' />
      </svg>
    )
  },
  {
    name: 'Bluesky',
    url: process.env.NEXT_PUBLIC_BLUESKY,
    icon: (
      <svg {...iconProps} viewBox='0 0 24 24' fill='currentColor'>
        <path d='M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z' />
      </svg>
    )
  },
  {
    name: 'WordPress.org',
    url: process.env.NEXT_PUBLIC_WORDPRESS,
    icon: (
      <svg {...iconProps} viewBox='0 0 26 26' fill='currentColor'>
        <path d='M13.031 0C5.883 0 .062 5.82.062 12.969c0 7.148 5.82 12.969 12.97 12.969 7.148 0 12.968-5.82 12.968-12.97C26 5.82 20.18 0 13.031 0Zm0 .594c6.82 0 12.375 5.554 12.375 12.375 0 6.82-5.554 12.375-12.375 12.375-6.82 0-12.375-5.555-12.375-12.375S6.211.594 13.031.594Zm0 1.25c-3.886 0-7.293 1.98-9.281 5 .262.008.508.031.719.031 1.164 0 2.968-.156 2.968-.156.598-.035.66.867.063.937 0 0-.613.059-1.281.094l4.062 12.031L12.72 12.5l-1.75-4.75c-.598-.035-1.156-.094-1.156-.094-.602-.035-.536-.972.062-.937 0 0 1.844.156 2.938.156 1.164 0 2.968-.156 2.968-.156.602-.035.66.867.063.937 0 0-.614.059-1.281.094l4.03 11.938L19.689 16c.562-1.445.843-2.64.843-3.594 0-1.375-.48-2.324-.906-3.062-.563-.918-1.094-1.707-1.094-2.625 0-1.02.782-1.969 1.875-1.969.051 0 .106-.004.157 0a11.129 11.129 0 0 0-7.532-2.906Zm9.75 5.781c.051.355.094.746.094 1.156 0 1.13-.21 2.383-.844 3.969l-3.406 9.813c3.305-1.93 5.531-5.493 5.531-9.594 0-1.934-.508-3.762-1.375-5.344Zm-19.906.813a11.101 11.101 0 0 0-.969 4.53c0 4.403 2.57 8.196 6.282 10Zm10.344 5.5-3.313 9.687c.996.293 2.031.469 3.125.469 1.293 0 2.531-.25 3.688-.657a.932.932 0 0 1-.063-.125Z' />
      </svg>
    )
  }
];

/** Icon links to the social profiles; a profile without a URL in the environment is skipped. */
export const SocialLinks: React.FC = () => {
  const t = useTranslations('footer');

  return (
    <ul className='m-0 flex list-none items-center gap-1 p-0'>
      {profiles
        .filter(({ url }) => url)
        .map(({ name, url, icon }) => (
          <li key={name}>
            <a
              href={url}
              target='_blank'
              rel='me noopener'
              aria-label={t('profile-al', { network: name })}
              title={t('profile-al', { network: name })}
              className='text-content/70 hover:bg-hover-tint hover:text-content grid h-9 w-9 place-items-center rounded-full transition-colors'
            >
              {icon}
            </a>
          </li>
        ))}
    </ul>
  );
};
