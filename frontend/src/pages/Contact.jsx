import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('Inquiry dispatched. Our desk will reply within 2 hours.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Direct Phone Lines",
      details: [
        "+91 82475 93561 (Hotline)",
        "+91 98765 43210 (Support Desk)"
      ]
    },
    {
      icon: Mail,
      title: "Official Email Desks",
      details: [
        "support@pgmadeeazy.com",
        "compliance@pgmadeeazy.com"
      ]
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: [
        "Silicon Towers, HITEC City",
        "Hyderabad, Telangana 500081"
      ]
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen py-16 lg:py-24 relative overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/5 left-1/4 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/6 w-[450px] h-[450px] bg-red-950/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-red-600/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(229,9,20,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
            <span className="text-[#E50914] font-bold">DIRECT SUPPORT DESK</span>
            <span className="text-white/30">|</span>
            <span>24/7 ASSISTANCE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Get in touch with our team.
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Have questions regarding booking verification, host compliance audit, or digital transaction records? Our team responds within 30 minutes during active desk hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-2xl space-y-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />
            
            <div className="space-y-1 pb-6 border-b border-white/10">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Send a Direct Inquiry</h2>
              <p className="text-xs text-neutral-400">Fill out the parameters below and our desk will coordinate with you directly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                    placeholder="e.g. Rahul Verma"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all"
                  placeholder="Booking query, host verification compliance, or payment check"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-lg text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914]/50 transition-all resize-none"
                  placeholder="Please describe how we can assist you with your booking or host listing..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Desks (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Desks */}
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#141414]/90 border border-white/10 hover:border-red-600/40 backdrop-blur-xl space-y-2 transition-all shadow-md"
              >
                <div className="flex items-center gap-2.5 text-[#E50914]">
                  <div className="p-2 rounded-lg bg-red-600/15 border border-red-600/30">
                    <info.icon className="w-4 h-4 text-[#E50914]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">{info.title}</span>
                </div>
                <div className="space-y-1 text-xs text-neutral-400 pt-2">
                  {info.details.map((detail, dIdx) => (
                    <p key={dIdx} className="font-medium text-white">{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-[#141414]/90 border border-white/10 backdrop-blur-xl space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#E50914]">
                <Clock className="w-4 h-4" />
                <span>Operating Window (IST)</span>
              </div>
              <div className="space-y-2 text-xs divide-y divide-white/10">
                <div className="flex justify-between pb-2">
                  <span className="text-neutral-400">Monday - Friday:</span>
                  <span className="text-white font-semibold">8:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between pt-2 pb-2">
                  <span className="text-neutral-400">Saturday - Sunday:</span>
                  <span className="text-white font-semibold">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2 pt-3 text-emerald-400 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span>Emergency Hotline: 24/7 Monitored</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

 