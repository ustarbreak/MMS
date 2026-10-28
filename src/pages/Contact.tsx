import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { contactContent, brand } from "../config/site";
import PageHero from "../components/PageHero";

export default function Contact() {
  const content = contactContent;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend or service like Formspree
    // For now, we simulate submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <PageHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        badge="Contact"
      />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Get in Touch</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Have a question about our services? Want to discuss a custom project?
                    We'd love to hear from you.
                  </p>
                </div>

                <div className="space-y-4">
                  {content.info.map((item, i) => {
                    const icons = [Mail, MapPin, Clock];
                    const Icon = icons[i];
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-brand-600/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-brand-400" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                          <p className="text-sm text-slate-300">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-white/5">
                  <p className="text-xs text-slate-500">
                    For urgent matters, email us directly at{" "}
                    <a href={`mailto:${brand.email}`} className="text-brand-400 hover:text-brand-300">
                      {brand.email}
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {submitted ? (
                  <div className="bg-surface-800/50 border border-brand-500/20 rounded-xl p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-brand-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-2">Message Sent!</h3>
                    <p className="text-slate-400 text-sm">
                      Thank you for reaching out. We'll get back to you within 24–48 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-4 text-sm text-brand-400 hover:text-brand-300"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-surface-800/50 border border-white/5 rounded-xl p-7">
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm text-slate-300 mb-1.5">
                          {content.form.name}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm text-slate-300 mb-1.5">
                          {content.form.email}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm text-slate-300 mb-1.5">
                          {content.form.subject}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                        >
                          <option value="">Select a subject</option>
                          {content.form.subjects.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm text-slate-300 mb-1.5">
                          {content.form.message}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-surface-700/50 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                          placeholder="Tell us about your project or question..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-600/20"
                      >
                        <Send className="w-4 h-4" />
                        {content.form.submit}
                      </button>

                      <p className="text-xs text-slate-500 text-center">
                        By submitting this form, you agree to our Privacy Policy.
                      </p>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
