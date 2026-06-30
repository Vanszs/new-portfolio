import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-brand-bg relative z-10 border-t border-[#e5e2da]/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 text-brand-orange font-display font-medium text-sm uppercase tracking-wider">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            <span>Partner Reviews</span>
            <span className="w-5 h-[2px] bg-brand-orange"></span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-tighter leading-none mb-4">
            Trusted by Partners
          </h2>
          <p className="text-[#5e5e5e] text-sm sm:text-base leading-relaxed">
            I strive to build partnerships, not just codebases. Here is what product leads and engineering partners say about our collaborations.
          </p>
        </div>

        {/* Testimonials Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white border border-[#e5e2da] rounded-3xl p-8 sm:p-10 relative shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-8 text-[#f3f2ee]/80 text-7xl font-serif select-none pointer-events-none">
                ”
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-brand-orange">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="stroke-0" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-brand-dark font-display font-medium text-base sm:text-lg leading-relaxed mb-8 relative z-10">
                  “ {testimonial.text} ”
                </p>
              </div>

              {/* Client Info Row */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#e5e2da]/60">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-[#e5e2da]"
                />
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-brand-dark leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8c8c8c] font-medium leading-none mt-1">
                    {testimonial.role} at <span className="text-brand-orange font-bold">{testimonial.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
