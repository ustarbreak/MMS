/**
 * SectionHeading — consistent kicker / title / subtitle block used across the site.
 */
import Reveal from "./Reveal";

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  /** Optional word rendered with the cyan gradient treatment. */
  accent?: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  kicker,
  title,
  accent,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl";
  return (
    <Reveal className={`${alignment} mb-12`}>
      {kicker && (
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-3">
          {kicker}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
        {title}
        {accent && (
          <>
            {" "}
            <span className="bg-gradient-to-r from-brand-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="text-slate-400 mt-4 leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  );
}
