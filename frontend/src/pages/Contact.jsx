import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, Building2, Clock, Check } from 'lucide-react';
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
    <div className="bg-[#0B0B0E] text-[#FAFAFA] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5A36]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
            <span>Direct Support Desk</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Get in touch with our team.
          </h1>
          <p className="text-base sm:text-lg text-[#9E9EA7] leading-relaxed">
            Have questions regarding booking verification, host compliance audit, or digital transaction records? Our team responds within 30 minutes during active desk hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-8">
            <div className="space-y-1 pb-6 border-b border-[#1E1E26]">
              <h2 className="text-xl font-bold text-white tracking-tight">Send a Direct Inquiry</h2>
              <p className="text-xs text-[#7A7A85]">Fill out the parameters below and our desk will coordinate with you directly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                    placeholder="e.g. Rahul Verma"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors"
                  placeholder="Booking query, host verification compliance, or payment check"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-[#9E9EA7]">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-[#22222A] rounded-sm text-xs sm:text-sm text-white placeholder-[#555560] focus:outline-none focus:border-[#FF5A36] transition-colors resize-none"
                  placeholder="Please describe how we can assist you with your booking or host listing..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-sm bg-[#FF5A36] hover:bg-[#E54B28] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-2"
              >
                <div className="flex items-center gap-2 text-[#FF5A36]">
                  <info.icon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">{info.title}</span>
                </div>
                <div className="space-y-1 text-xs text-[#9E9EA7] pt-1">
                  {info.details.map((detail, dIdx) => (
                    <p key={dIdx} className="font-medium text-[#FAFAFA]">{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Operating Hours */}
            <div className="p-6 rounded-sm bg-[#121217] border border-[#1E1E26] space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5A36]">
                <Clock className="w-4 h-4" />
                <span>Operating Window (IST)</span>
              </div>
              <div className="space-y-2 text-xs divide-y divide-[#1E1E26]">
                <div className="flex justify-between pb-2">
                  <span className="text-[#7A7A85]">Monday - Friday:</span>
                  <span className="text-white font-semibold">8:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between pt-2 pb-2">
                  <span className="text-[#7A7A85]">Saturday - Sunday:</span>
                  <span className="text-white font-semibold">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2 pt-3 text-emerald-400 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
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
 