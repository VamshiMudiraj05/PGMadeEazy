import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, Building2, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
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
      toast.success('Message dispatched! Our support team will reply within 2 hours.');
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
        "+91 98765 43210 (Support)"
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
    <div className="min-h-screen bg-black text-white py-16 lg:py-24 selection:bg-[#FF6100] selection:text-black relative overflow-hidden bg-dot-pattern">
      {/* Ambient background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF6100]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121216] border border-[#FF6100]/40 text-[#FF6100] text-xs font-black uppercase tracking-[0.18em] mb-6 shadow-lg shadow-[#FF6100]/10">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6100] animate-pulse" />
            <span>24/7 DEDICATED SUPPORT DESK</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
            GET IN TOUCH WITH <span className="text-[#FF6100] block mt-1">OUR TEAM</span>
          </h1>
          <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed max-w-lg mx-auto font-medium">
            Have questions about a PG booking, owner verification, compliance audit, or payment status? We are always ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-2xl border border-[#222227] shadow-2xl glow-orange-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-lg bg-[#FF6100]/20 border border-[#FF6100]/30 flex items-center justify-center text-[#FF6100]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight text-white">SEND A DIRECT MESSAGE</h2>
                <p className="text-xs text-[#71717a] font-medium">Typical response window: under 30 minutes</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-widest text-[#a1a1aa] mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0d0d10] border border-[#1e1e26] rounded-lg text-xs sm:text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#FF6100] transition-colors"
                    placeholder="e.g. RAHUL VERMA"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-[#a1a1aa] mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0d0d10] border border-[#1e1e26] rounded-lg text-xs sm:text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#FF6100] transition-colors"
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] font-black uppercase tracking-widest text-[#a1a1aa] mb-2">
                  SUBJECT / TOPIC
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0d0d10] border border-[#1e1e26] rounded-lg text-xs sm:text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#FF6100] transition-colors"
                  placeholder="Booking query, host verification compliance, or payment check"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-widest text-[#a1a1aa] mb-2">
                  YOUR MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-[#0d0d10] border border-[#1e1e26] rounded-lg text-xs sm:text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#FF6100] transition-colors resize-none"
                  placeholder="Please describe how we can assist you with your booking or host listing..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider text-black bg-[#FF6100] hover:bg-[#ff751a] shadow-xl shadow-[#FF6100]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>DISPATCHING MESSAGE...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>SUBMIT INQUIRY</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details & Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Cards */}
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl glass-panel border border-[#1c1c24] hover:border-[#FF6100] transition-all duration-300 flex items-start gap-4 hover:-translate-y-0.5"
              >
                <div className="h-12 w-12 rounded-lg bg-[#FF6100]/15 border border-[#FF6100]/25 flex items-center justify-center text-[#FF6100] shrink-0 mt-0.5">
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-white mb-2">{info.title}</h3>
                  <div className="space-y-1 text-xs sm:text-sm text-[#a1a1aa]">
                    {info.details.map((detail, dIdx) => (
                      <p key={dIdx} className="font-semibold text-white/90">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-[#09090c] border border-[#1c1c24]">
              <div className="flex items-center gap-2.5 mb-4 text-[#FF6100] font-black text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>SUPPORT OPERATING WINDOW (IST)</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-[#16161c]">
                  <span className="text-[#a1a1aa] font-medium">Monday - Friday:</span>
                  <span className="text-white font-bold">8:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#16161c]">
                  <span className="text-[#a1a1aa] font-medium">Saturday - Sunday:</span>
                  <span className="text-white font-bold">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2 pt-2 text-[#00E676] text-xs font-black uppercase tracking-wider">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#00E676] animate-pulse" />
                  <span>Emergency On-Call Desk: 24/7 Active</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
 