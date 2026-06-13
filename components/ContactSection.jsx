"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, MessageCircle, MapPin, ArrowRight, Bot } from "lucide-react";
import BorderGlow from "./BorderGlow";

const CONTACT = {
  email: "theelitetraderx@gmail.com",
  telegram: "https://t.me/Elitefuture",
  telegramLabel: "@Elitefuture",
};

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Elite Trader inquiry from ${name || "Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat"));
  };

  return (
    <section id="contact" className="bg-black py-24 md:py-32 relative border-t border-white/5 scroll-mt-28">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="text-gold-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter font-outfit">
            Contact <span className="text-gold-500">Us</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Questions about plans, enrolment, or support — we&apos;re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: Send,
                title: "Telegram",
                desc: "Fastest way to reach our team.",
                href: CONTACT.telegram,
                label: CONTACT.telegramLabel,
                external: true,
              },
              {
                icon: Mail,
                title: "Email",
                desc: "For enrolment and account help.",
                href: `mailto:${CONTACT.email}`,
                label: CONTACT.email,
                external: false,
              },
              {
                icon: Bot,
                title: "Live Chat",
                desc: "Instant answers about plans & pricing.",
                action: openChat,
                label: "Open assistant",
              },
            ].map((item) => {
              const Icon = item.icon;
              const inner = (
                <div className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-gold-500/25 hover:bg-gold-500/5 transition-all group h-full">
                  <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-xs mb-2">{item.desc}</p>
                    <span className="text-gold-400 text-xs font-semibold group-hover:text-gold-300">
                      {item.label} →
                    </span>
                  </div>
                </div>
              );

              if (item.action) {
                return (
                  <button key={item.title} type="button" onClick={item.action} className="w-full text-left">
                    {inner}
                  </button>
                );
              }

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {inner}
                </a>
              );
            })}

            <div className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1">Online First</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Global trading education — support via Telegram & email, 7 days a week.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <BorderGlow
              borderRadius={28}
              backgroundColor="#0a0a0a"
              glowColor="43 74 49"
              colors={["#d4af37", "#ffd700", "#b8860b"]}
              glowIntensity={0.6}
              className="border border-white/5 h-full"
            >
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-gold-500" />
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest">
                    Send a message
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/40"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/40"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/40 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl bg-gold-500 text-black font-black uppercase tracking-widest text-[10px] hover:bg-gold-400 transition-colors"
                >
                  {sent ? "Opening email..." : "Send Message"}
                  <ArrowRight size={14} />
                </button>

                <p className="text-[10px] text-slate-600">
                  Prefer chat?{" "}
                  <button
                    type="button"
                    onClick={openChat}
                    className="text-gold-500 hover:text-gold-400 font-semibold"
                  >
                    Talk to our assistant
                  </button>{" "}
                  or{" "}
                  <Link href="/#pricing" className="text-gold-500 hover:text-gold-400 font-semibold">
                    view pricing
                  </Link>
                  .
                </p>
              </form>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
}
