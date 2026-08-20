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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 lg:py-24 selection:bg-orange-500 selection:text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            24/7 Dedicated Support
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Get In Touch With <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Our Team</span>
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Have questions about a PG booking, owner verification, or payment status? We are always here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-zinc-800/80 glow-orange-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2>
                <p className="text-xs text-zinc-400">Typical response time: under 30 minutes</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    placeholder="e.g. Rahul Verma"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="Booking query, host verification, or partnership"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                  placeholder="Please describe how we can assist you with your booking or listing..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Dispatching Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
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
                className="p-6 rounded-2xl glass-panel border border-zinc-800/80 hover:border-orange-500/40 transition-all duration-300 flex items-start gap-4"
              >
                <div className="h-12 w-12 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{info.title}</h3>
                  <div className="space-y-0.5 text-sm text-zinc-400">
                    {info.details.map((detail, dIdx) => (
                      <p key={dIdx} className="text-zinc-300 font-medium">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex items-center gap-2.5 mb-4 text-orange-400 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>Support Hours (IST)</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Monday - Friday:</span>
                  <span className="text-white font-medium">8:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Saturday - Sunday:</span>
                  <span className="text-white font-medium">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2 pt-2 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Emergency On-Call Support: Active 24/7</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
 