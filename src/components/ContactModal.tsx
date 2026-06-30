import React, { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function ContactModal({ isOpen, onClose, preselectedService = "" }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: preselectedService || "AI/ML Solutions",
    budget: "$5,000 - $10,000",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const services = ["AI/ML Solutions", "Full-Stack Web & Mobile Development", "Blockchain & Smart Contracts", "Autonomous Systems & IoT", "Community & Technical Leadership"];
  const budgets = ["Under $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000+"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-brand-bg border border-[#e5e2da] rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#e5e2da]/60 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-dark tracking-tight">
              Start Your Tech Sprint
            </h3>
            <p className="text-xs text-[#8c8c8c] mt-1 font-medium">Partner with Bevan to ship intelligent systems</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#e5e2da] hover:bg-brand-dark hover:text-white flex items-center justify-center transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body / Success State */}
        <div className="p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center animate-bounce mb-2">
                <CheckCircle size={36} className="stroke-[2.5]" />
              </div>
              <h4 className="font-display font-bold text-2xl text-brand-dark tracking-tight">
                Message Received!
              </h4>
              <p className="text-sm text-[#5e5e5e] max-w-sm leading-relaxed mx-auto">
                Thank you for reaching out, <span className="font-bold text-brand-dark">{formData.name}</span>. Bevan will review your project goals and respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", service: "AI/ML Solutions", budget: "$5,000 - $10,000", message: "" });
                  onClose();
                }}
                className="mt-6 bg-brand-dark hover:bg-brand-orange text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
              >
                Return to Portfolio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c8c8c] mb-2">
                  What's your name? *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g., Jane Doe"
                  className="w-full bg-[#f3f2ee] border border-transparent focus:border-brand-orange rounded-xl px-4 py-3 text-sm text-brand-dark outline-none transition-all placeholder:text-brand-dark/35"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c8c8c] mb-2">
                  Your email address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  placeholder="e.g., jane@company.com"
                  className="w-full bg-[#f3f2ee] border border-transparent focus:border-brand-orange rounded-xl px-4 py-3 text-sm text-brand-dark outline-none transition-all placeholder:text-brand-dark/35"
                />
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c8c8c] mb-2">
                  Which service are you interested in?
                </label>
                <select
                  value={formData.service}
                  onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                  className="w-full bg-[#f3f2ee] border border-transparent focus:border-brand-orange rounded-xl px-4 py-3 text-sm text-brand-dark outline-none transition-all"
                >
                  {services.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Budget Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c8c8c] mb-2">
                  Approximate Project Budget
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {budgets.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, budget: b }))}
                      className={`text-xs font-semibold py-2.5 rounded-xl border transition-all ${
                        formData.budget === b
                          ? "bg-brand-dark text-white border-brand-dark shadow-sm"
                          : "bg-white border-[#e5e2da] hover:border-brand-dark text-[#5e5e5e]"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c8c8c] mb-2">
                  Briefly describe your project *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell Bevan about your project goals, tech stack, timelines, or scaling plans..."
                  className="w-full bg-[#f3f2ee] border border-transparent focus:border-brand-orange rounded-xl px-4 py-3 text-sm text-brand-dark outline-none transition-all resize-none placeholder:text-brand-dark/35"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-dark hover:bg-brand-orange disabled:bg-brand-dark/55 text-white font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send size={14} />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
