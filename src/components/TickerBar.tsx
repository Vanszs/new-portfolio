import React from "react";

const capabilities = ["AI / ML", "Full-stack development", "Blockchain", "Autonomous systems", "IoT / computer vision", "Mobile apps"];

export default function TickerBar() {
  return (
    <section aria-label="Capabilities" className="border-b border-[#2b302b] bg-[#151715] px-5 py-5 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9ca39b]">
        <span className="mr-2 text-[#d96a46]">Capability index</span>
        {capabilities.map((capability, index) => (
          <React.Fragment key={capability}>
            <span className="text-[#ededed]">{capability}</span>
            {index < capabilities.length - 1 && <span className="text-[#d96a46]" aria-hidden="true">/</span>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
