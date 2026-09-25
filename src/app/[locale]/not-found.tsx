import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="max-w-[46ch] text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display mt-4 text-[2rem] leading-tight text-ink sm:text-[2.6rem]">
          الصفحة غير موجودة
          <span className="mt-2 block text-ink-mute">Page not found</span>
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/ar"
            className="rounded-sm bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-sage-deep"
          >
            الصفحة الرئيسية
          </Link>
          <Link
            href="/en"
            className="rounded-sm border border-ink/25 px-5 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
