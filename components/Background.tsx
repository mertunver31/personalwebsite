// Sayfanın arkasında yüzen gradyan küreler — dekoratif
export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-blobs absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
        <div className="animate-float-slow absolute -left-32 top-0 h-[40rem] w-[40rem] rounded-full bg-accent-1/20 blur-[120px]" />
        <div className="animate-float-slow absolute right-0 top-1/3 h-[35rem] w-[35rem] rounded-full bg-accent-2/15 blur-[120px] [animation-delay:-6s]" />
        <div className="animate-float-slow absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-accent-3/15 blur-[120px] [animation-delay:-12s]" />
      </div>
      {/* Üstte ince ızgara deseni */}
      <div
        className="bg-grid absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
