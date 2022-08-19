import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <div className='sticky top-0 z-10 mb-8 bg-zinc-100'>
      <nav className='container mx-auto flex max-w-3xl items-center justify-between px-4 py-2'>
        <Link href=''>
          <a className='inline'>
            <h3>{process.env.NEXT_PUBLIC_SITE_NAME?.split(' ')[0]}</h3>
          </a>
        </Link>

        <p>💻</p>
      </nav>
    </div>
  );
};
