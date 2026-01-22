export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 grid-bg"></div>
      {/* Vertical Container Lines */}
      <div className="container mx-auto h-full relative border-x border-white/[0.03]">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/[0.03]"></div>
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-white/[0.03]"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/[0.03]"></div>
      </div>
    </div>
  );
}
