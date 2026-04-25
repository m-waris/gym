const MARQUEE_TEXT_PARTS = [
  "STRENGTH ",
  "·",
  " ENDURANCE ",
  "·",
  " DISCIPLINE ",
  "·",
  "CONSISTANCY",
  "·",
  " POWER ",
  "·",
  " RESULTS ",
  "·",
  " La Forza ",
  "·",

];

function MarqueeLine() {
  return (
    <span className="flex shrink-0 items-center whitespace-nowrap pr-8 font-display text-[20px] tracking-[0.05em] text-[#F5F5F5]">
      {MARQUEE_TEXT_PARTS.map((part, index) =>
        part === "·" ? (
          <span key={`dot-${index}`} className="text-accent">
            {part}
          </span>
        ) : (
          <span className="px-10" key={`text-${index}`}>{part}</span>
        ),
      )}
    </span>
  );
}

export default function Marquee() {
  return (
    <section className="group w-full overflow-hidden border-y border-accent bg-black">
      <div className="flex h-[56px] w-fit items-center animate-[marquee_22s_linear_infinite] group-hover:[animation-play-state:paused]">
        <MarqueeLine />
        <MarqueeLine />
      </div>
    </section>
  );
}
