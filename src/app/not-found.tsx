import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="container mx-auto">
      <div className="p-5">
        <h1 className="mb-2 pb-1 font-bold text-3xl border-b">
          Not Found
        </h1>
        <p>
          The page you were looking for cannot be found. Please, return to the
          {' '}
          <Link href="/" className="text-red-600 underline hover:text-red-800">
            home page
          </Link>.
        </p>
      </div>
    </div>
  );
}
