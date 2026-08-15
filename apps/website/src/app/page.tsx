export default function WebsiteHomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl space-y-5">
        <div className="inline-block px-3 py-1 text-xs font-mono tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-full">
          XR LAB // PUBLIC RESEARCH ARCHIVE
        </div>
        <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl">
          Exploring what happens when product design leaves the screen.
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
          A living record of learning, spatial UX experiments, research, and principles as a Product Designer transitions into Spatial Computing.
        </p>
      </div>
    </main>
  );
}
