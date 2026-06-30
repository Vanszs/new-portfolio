import React from "react";

export default function TickerBar() {
  const categories = [
    { name: "AI / ML", icon: "✦" },
    { name: "Full-Stack Development", icon: "✦" },
    { name: "Blockchain", icon: "✦" },
    { name: "Autonomous Systems", icon: "✦" },
    { name: "IoT & Computer Vision", icon: "✦" },
    { name: "Mobile Apps", icon: "✦" }
  ];

  // Repeat items to ensure smooth infinite wrap-around
  const repeatedItems = [...categories, ...categories, ...categories, ...categories];

  return (
    <div className="w-full bg-brand-dark py-5 overflow-hidden border-y border-brand-dark relative z-10 select-none">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex gap-12 items-center text-white font-display text-lg md:text-2xl font-bold tracking-tight uppercase">
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-12">
              <span>{item.name}</span>
              <span className="text-brand-orange text-xl md:text-2xl">{item.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
