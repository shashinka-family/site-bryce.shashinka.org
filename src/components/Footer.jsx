export default function Footer() {
  return (
    <footer className="py-8 bg-slate-900 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Bryce P. Shashinka. All rights reserved.
          </p>
          <a
            href="https://github.com/bryce-shashinka"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-800/60 hover:text-slate-600 transition-colors text-lg"
            aria-label="GitHub"
          >
            &pi;
          </a>
        </div>
      </div>
    </footer>
  );
}
