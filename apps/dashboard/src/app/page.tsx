export default function DashboardHomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl space-y-4">
        <div className="inline-block px-3 py-1 text-xs font-mono tracking-widest text-sky-400 bg-sky-950/40 border border-sky-800/60 rounded-full">
          XR LAB // PRIVATE WORKSPACE
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Spatial Learning Operating System
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Foundation initialized. This private dashboard will manage roadmap milestones, skill evaluations, experiment logs, and publication staging.
        </p>
      </div>
    </main>
  );
}
