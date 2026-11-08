import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-3 text-5xl md:text-7xl">Page not found.</h1>
      <p className="mt-4 max-w-md text-text-secondary">
        The page you&apos;re looking for has moved or never existed. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">Home</Link>
        <Link href="/work" className="btn btn-secondary">Work</Link>
        <Link href="/blog" className="btn btn-secondary">Blog</Link>
        <Link href="/contact" className="btn btn-secondary">Contact</Link>
      </div>
    </div>
  );
}
