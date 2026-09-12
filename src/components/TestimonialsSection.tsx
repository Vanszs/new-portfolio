import React from "react";
import { TESTIMONIALS } from "../data";
import ImageWithFallback from "./ImageWithFallback";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
}

interface TestimonialsSectionProps {
  data?: TestimonialItem[];
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const testimonials = data && data.length > 0 ? data : TESTIMONIALS;
  return (
    <section id="testimonials" className="border-b border-[#2b302b] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl"><div className="mb-10 max-w-2xl"><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d96a46]">Testimonials</p><h2 className="font-display text-4xl font-semibold tracking-[-0.05em] text-[#ededed] sm:text-5xl">Good work travels through people.</h2></div><div className="border-t border-[#2b302b]">{testimonials.map((testimonial, index) => <figure key={testimonial.id} className="grid grid-cols-[36px_1fr] gap-5 border-b border-[#2b302b] py-7 sm:grid-cols-[48px_1fr_200px] sm:gap-8"><span className="font-mono text-xs text-[#d96a46]">{String(index + 1).padStart(2, "0")}</span><div><blockquote className="max-w-2xl font-display text-xl leading-8 text-[#ededed] sm:text-2xl">“{testimonial.text}”</blockquote><figcaption className="mt-5 flex items-center gap-3"><ImageWithFallback src={testimonial.avatar} alt={testimonial.name} width={36} height={36} className="h-9 w-9 border border-[#2b302b] object-cover grayscale" /><span className="text-sm text-[#9ca39b]"><strong className="font-medium text-[#ededed]">{testimonial.name}</strong><br />{testimonial.role} / {testimonial.company}</span></figcaption></div><span className="hidden self-start font-mono text-[10px] uppercase tracking-[0.1em] text-[#9ca39b] sm:block">{testimonial.rating}/5 rating</span></figure>)}</div></div>
    </section>
  );
}
