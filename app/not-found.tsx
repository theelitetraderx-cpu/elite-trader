import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-gold-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
        404
      </p>
      <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-outfit mb-4">
        Page not found
      </h1>
      <p className="text-slate-400 text-sm max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center py-3 px-8 rounded-full bg-gold-500 text-black font-black uppercase tracking-widest text-[10px] hover:bg-gold-400 transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
