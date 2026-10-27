import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Reusable Split-Flap Character Component
function FlapChar({ char, size = "16px" }) {
  const displayChar = char === " " ? "\u00A0" : char.toUpperCase();
  const isSpecial = char === "+" || char === "-" || char === "/" || char === ":" || char === ".";

  return (
    <span 
      className={`c ${isSpecial ? "op" : ""}`}
      style={{ "--cw": size }}
      aria-hidden="true"
    >
      <i className="u">{displayChar}</i>
      <i className="l">{displayChar}</i>
    </span>
  );
}

// Reusable Split-Flap Word/String Component
function FlapWord({ text, size = "16px", colorClass = "text-[#f2f2f2]" }) {
  const chars = String(text).toUpperCase().split("");
  return (
    <span className={`fl ${colorClass}`}>
      {chars.map((ch, idx) => (
        <FlapChar key={idx} char={ch} size={size} />
      ))}
    </span>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'STUDENT_PG_QUERY',
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
      toast.success('Inquiry dispatched to student support desk.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'STUDENT_PG_QUERY',
        subject: '',
        message: ''
      });
    } catch {
      toast.error('Failed to dispatch inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Student Admissions Helpline",
      code: "LINE // DIRECT",
      details: [
        "+91 82475 93561 (Student Desk)",
        "+91 98765 43210 (Warden Line)"
      ]
    },
    {
      icon: Mail,
      title: "Official Dispatch Desks",
      code: "MAIL // RESPONSE <30M",
      details: [
        "support@pgmadeeazy.com",
        "admissions@pgmadeeazy.com"
      ]
    },
    {
      icon: MapPin,
      title: "Campus Verification Centers",
      code: "REGIONAL // HUBS",
      details: [
        "HITEC City / Gachibowli, Hyderabad",
        "Koramangala 5th Block, Bangalore",
        "Viman Nagar / Symbiosis Corridor, Pune"
      ]
    }
  ];

  return (
    <div className="bg-[#1f2226] text-[#f2f2f2] min-h-screen py-10 sm:py-14 relative font-['Barlow_Semi_Condensed']">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* 01. HEADER SOLARI CASING */}
        <div className="board">
          <div className="board-head">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-none bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                DIRECT DESK // STUDENT SUPPORT
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>DESK STATUS: <b className="text-emerald-400">ONLINE</b></span>
              <span>EST. RESPONSE: <b className="text-[#ffb000]">&lt; 30 MINS</b></span>
            </div>
          </div>

          {/* Split-Flap Title */}
          <div className="py-6 sm:py-8 space-y-3">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="DISPATCH" size="clamp(24px, 4vw, 50px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="SUPPORT." size="clamp(24px, 4vw, 50px)" colorClass="text-[#ffb000]" />
            </div>
            <p className="text-base sm:text-lg text-[#a7aaaf] max-w-3xl leading-relaxed pt-2">
              Have questions regarding student bed reservations, mess food verification, 1-month deposit protection, or listing your PG hostel? Our team responds within 30 minutes during active desk windows.
            </p>
          </div>
        </div>

        {/* 02. MAIN TWO-COLUMN DISPATCH TERMINAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Console (7 cols) */}
          <div className="lg:col-span-7 board">
            <div className="board-head">
              <h3 className="text-xl font-bold tracking-[0.14em] uppercase text-white font-['Big_Shoulders_Display']">
                TRANSMIT INQUIRY
              </h3>
              <span className="text-xs uppercase tracking-[0.16em] text-[#ffb000]">
                ENCRYPTED DISPATCH
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                    Student / Host Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs text-white placeholder-[#5b5e63] focus:outline-none focus:border-[#ffb000] font-mono uppercase"
                    placeholder="E.G. RAHUL VERMA"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs text-white placeholder-[#5b5e63] focus:outline-none focus:border-[#ffb000] font-mono uppercase"
                    placeholder="STUDENT@COLLEGE.EDU"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs text-white placeholder-[#5b5e63] focus:outline-none focus:border-[#ffb000] font-mono uppercase"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="category" className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                    Inquiry Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs text-white focus:outline-none focus:border-[#ffb000] font-mono uppercase cursor-pointer"
                  >
                    <option value="STUDENT_PG_QUERY">STUDENT PG BED AVAILABILITY</option>
                    <option value="MESS_AMENITIES">MESS FOOD & WIFI VERIFICATION</option>
                    <option value="DEPOSIT_CHECKOUT">DEPOSIT REFUND / CHECKOUT</option>
                    <option value="HOST_ONBOARDING">LIST A STUDENT PG HOSTEL</option>
                    <option value="GENERAL_SUPPORT">GENERAL TECHNICAL SUPPORT</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                  Subject Line
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs text-white placeholder-[#5b5e63] focus:outline-none focus:border-[#ffb000] font-mono uppercase"
                  placeholder="E.G. GACHIBOWLI 2-SHARING AC ROOM INQUIRY"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                  Inquiry Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3.5 py-2.5 bg-[#0e0f11] border border-[#34373c] rounded-[2px] text-xs text-white placeholder-[#5b5e63] focus:outline-none focus:border-[#ffb000] font-mono uppercase resize-none"
                  placeholder="PLEASE SPECIFY YOUR COLLEGE, PREFERRED SHARING TYPE, AND MOVE-IN DATE..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-solari btn-solari-amber justify-center text-center py-3 text-xs"
              >
                {loading ? (
                  <span>TRANSMITTING INQUIRY...</span>
                ) : (
                  <>
                    <span>DISPATCH INQUIRY TO SUPPORT DESK</span>
                    <span className="chev">
                      <Send className="h-3.5 w-3.5" />
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Desks & Operating Schedule (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Information Desks */}
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="board space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#202226]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[2px] bg-[#0b0b0d] border border-[#34373c] flex items-center justify-center text-[#ffb000]">
                      <info.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-[0.1em] text-white font-['Big_Shoulders_Display']">
                      {info.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#a7aaaf]">
                    {info.code}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-[#a7aaaf] pt-1 font-mono">
                  {info.details.map((detail, dIdx) => (
                    <p key={dIdx} className="text-neutral-200">{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Operating Windows Board */}
            <div className="board space-y-4">
              <div className="board-head">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#ffb000]">
                  <Clock className="w-4 h-4" />
                  <span>DESK TIMINGS (IST)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">ACTIVE NOW</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#202226]">
                  <span className="text-[#a7aaaf] uppercase tracking-wider">Monday – Saturday</span>
                  <span className="text-white font-mono font-bold">08:00 – 22:00 IST</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#202226]">
                  <span className="text-[#a7aaaf] uppercase tracking-wider">Sunday Admissions</span>
                  <span className="text-white font-mono font-bold">09:00 – 20:00 IST</span>
                </div>
                <div className="pt-2 flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Student Emergency Line: 24/7 Monitored</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}