import React, { useEffect, useRef, useState } from "react";
import { Check, Send, X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const services = ["AI/ML Solutions", "Full-Stack Web & Mobile Development", "Blockchain & Smart Contracts", "Autonomous Systems & IoT", "Community & Technical Leadership"];
const budgets = ["Under $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000+"];

type FormData = { name: string; email: string; service: string; budget: string; message: string };
const initialForm: FormData = { name: "", email: "", service: "AI/ML Solutions", budget: "$5,000 - $10,000", message: "" };

export default function ContactModal({ isOpen, onClose, preselectedService = "" }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({ ...initialForm, service: preselectedService || initialForm.service });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const resetAndClose = () => {
    setIsSubmitted(false);
    setError("");
    setIsSubmitting(false);
    setFormData({ ...initialForm, service: preselectedService || initialForm.service });
    onClose();
    openerRef.current?.focus();
    openerRef.current = null;
  };

  useEffect(() => {
    if (preselectedService) setFormData((previous) => ({ ...previous, service: preselectedService }));
  }, [preselectedService]);

  useEffect(() => {
    if (!isOpen) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetAndClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [isOpen, preselectedService]);

  if (!isOpen) return null;

  const update = (field: keyof FormData, value: string) => {
    setError("");
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Name, email, and project description are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    timerRef.current = window.setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); timerRef.current = null; }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e0f0e]/85 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) resetAndClose(); }}>
      <div ref={dialogRef} tabIndex={-1} className="flex max-h-[90vh] w-full max-w-xl flex-col border border-[#2b302b] bg-[#151715]" role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title">
        <div className="flex items-start justify-between gap-6 border-b border-[#2b302b] p-5 sm:p-7"><div><h2 id="contact-dialog-title" className="font-display text-2xl font-medium text-[#ededed]">Start a technical conversation.</h2><p className="mt-2 text-sm text-[#9ca39b]">Share the constraint. The first reply will be practical.</p></div><button type="button" onClick={resetAndClose} className="border border-[#2b302b] p-2 text-[#9ca39b] hover:border-[#d96a46] hover:text-[#d96a46]" aria-label="Close contact form"><X size={17} /></button></div>
        <div className="overflow-y-auto p-5 sm:p-7">
          {isSubmitted ? <div className="py-12 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#d96a46] text-[#d96a46]"><Check size={22} /></div><h3 className="mt-6 font-display text-2xl text-[#ededed]">Message received.</h3><p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#9ca39b]">Thanks, {formData.name}. Your project details are ready for review.</p><button type="button" onClick={resetAndClose} className="mt-7 border-b border-[#d96a46] pb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#d96a46]">Return to portfolio</button></div> : <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div><label htmlFor="contact-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca39b]">Name <span className="text-[#d96a46]">*</span></label><input id="contact-name" type="text" value={formData.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(error && !formData.name.trim())} className="w-full border border-[#2b302b] bg-[#1b1e1b] px-4 py-3 text-sm text-[#ededed] placeholder:text-[#687068]" placeholder="Your name" /></div>
            <div><label htmlFor="contact-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca39b]">Email <span className="text-[#d96a46]">*</span></label><input id="contact-email" type="email" value={formData.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(error && !formData.email.trim())} className="w-full border border-[#2b302b] bg-[#1b1e1b] px-4 py-3 text-sm text-[#ededed] placeholder:text-[#687068]" placeholder="you@company.com" /></div>
            <div><label htmlFor="contact-service" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca39b]">Service</label><select id="contact-service" value={formData.service} onChange={(event) => update("service", event.target.value)} className="w-full border border-[#2b302b] bg-[#1b1e1b] px-4 py-3 text-sm text-[#ededed]">{services.map((service) => <option key={service}>{service}</option>)}</select></div>
            <fieldset><legend className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca39b]">Approximate budget</legend><div className="grid grid-cols-2 gap-2">{budgets.map((budget) => <button type="button" key={budget} onClick={() => update("budget", budget)} className={`border px-3 py-2.5 text-left text-xs ${formData.budget === budget ? "border-[#d96a46] text-[#d96a46]" : "border-[#2b302b] text-[#9ca39b] hover:border-[#ededed]"}`} aria-pressed={formData.budget === budget}>{budget}</button>)}</div></fieldset>
            <div><label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-[#9ca39b]">Project description <span className="text-[#d96a46]">*</span></label><textarea id="contact-message" rows={5} value={formData.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(error && !formData.message.trim())} className="w-full resize-none border border-[#2b302b] bg-[#1b1e1b] px-4 py-3 text-sm text-[#ededed] placeholder:text-[#687068]" placeholder="What are you trying to build?" /></div>
            <p aria-live="polite" className="min-h-5 text-sm text-[#d96a46]">{error}</p>
            <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 bg-[#d96a46] px-4 py-3 font-mono text-xs uppercase tracking-[0.13em] text-[#0e0f0e] disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Sending..." : "Send inquiry"}<Send size={14} /></button>
          </form>}
        </div>
      </div>
    </div>
  );
}
