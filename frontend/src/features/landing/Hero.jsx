import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowUpRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

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

// Live Departure Student PG Vacancies Roster
const departures = [
  { code: "HYD-01", corridor: "GACHIBOWLI", zone: "HYDERABAD", room: "2-SHARING AC", rent: "₹7,500", audit: "3 MEALS • 200 MBPS • LAUNDRY", status: "AVAILABLE", isAmber: true },
  { code: "HYD-02", corridor: "MADHAPUR / CYBER", zone: "HYDERABAD", room: "SINGLE PRIVATE", rent: "₹10,500", audit: "FOOD INCLUDED • AC • STUDY DESK", status: "1 BED LEFT", isAmber: true },
  { code: "BLR-03", corridor: "KORAMANGALA", zone: "BANGALORE", room: "2-SHARING ATTACHED", rent: "₹8,500", audit: "3 MEALS • POWER BACKUP • WIFI", status: "BOARDING", isAmber: true },
  { code: "BLR-04", corridor: "HSR SECTOR 1", zone: "BANGALORE", room: "3-SHARING STUDENT", rent: "₹6,200", audit: "MESS FOOD • RO WATER • DAILY CLEAN", status: "AVAILABLE", isAmber: false },
  { code: "BLR-05", corridor: "ELECTRONIC CITY", zone: "BANGALORE", room: "2-SHARING AC", rent: "₹6,800", audit: "CHEF MEALS • GYM • BIOMETRIC", status: "AVAILABLE", isAmber: false },
  { code: "PUN-06", corridor: "VIMAN NAGAR", zone: "PUNE", room: "2-SHARING STUDENT", rent: "₹7,200", audit: "CAMPUS WALK • 3 MEALS • WIFI", status: "BOARDING", isAmber: true },
  { code: "PUN-07", corridor: "HINJAWADI PH-1", zone: "PUNE", room: "3-SHARING BUDGET", rent: "₹5,500", audit: "FOOD INCLUDED • LAUNDRY • POWER", status: "AVAILABLE", isAmber: false },
  { code: "DEL-08", corridor: "NORTH CAMPUS", zone: "DELHI", room: "2-SHARING ATTACHED", rent: "₹8,900", audit: "DU METRO WALK • AC • 3 MEALS", status: "1 ROOM LEFT", isAmber: true }
];

// Student Campus Clusters Roster
const hubs = [
  { hub: "GACHIBOWLI & IIIT", city: "HYD", units: "280+ BEDS", maxRent: "₹12,000", status: "ACTIVE" },
  { hub: "KORAMANGALA HUBS", city: "BLR", units: "420+ BEDS", maxRent: "₹14,500", status: "ACTIVE" },
  { hub: "HSR & CHRIST UNIV", city: "BLR", units: "310+ BEDS", maxRent: "₹11,000", status: "ACTIVE" },
  { hub: "MADHAPUR TECH", city: "HYD", units: "190+ BEDS", maxRent: "₹13,500", status: "ACTIVE" },
  { hub: "VIMAN NAGAR / SYMBIOSIS", city: "PUN", units: "240+ BEDS", maxRent: "₹12,500", status: "ACTIVE" },
  { hub: "HINJAWADI CLUSTER", city: "PUN", units: "180+ BEDS", maxRent: "₹8,500", status: "ACTIVE" },
  { hub: "NORTH CAMPUS (DU)", city: "DEL", units: "350+ BEDS", maxRent: "₹15,000", status: "ACTIVE" },
  { hub: "ELECTRONIC CITY", city: "BLR", units: "210+ BEDS", maxRent: "₹9,500", status: "ACTIVE" }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Search & Calculator state
  const [selectedCity, setSelectedCity] = useState("ALL");
  const [selectedClass, setSelectedClass] = useState("2-SHARING");
  const [duration, setDuration] = useState("6");
  const [budgetBase, setBudgetBase] = useState(7500);
  const [clockTime, setClockTime] = useState("20:30:00");

  // Live ticking clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getUTCHours()).padStart(2, "0");
      const mins = String(now.getUTCMinutes()).padStart(2, "0");
      const secs = String(now.getUTCSeconds()).padStart(2, "0");
      setClockTime(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculator computations for Student PGs
  const rentMultiplier = 
    selectedClass === "SINGLE" ? 1.45 : 
    selectedClass === "2-SHARING" ? 1.0 : 
    selectedClass === "3-SHARING" ? 0.78 : 0.65;
  const computedMonthly = Math.round(budgetBase * rentMultiplier);
  const totalDeposit = computedMonthly; // standard 1 month PG deposit
  const brokerageFee = 0; // ZERO BROKERAGE
  const totalMoveIn = computedMonthly + totalDeposit;

  return (
    <div className="bg-[#1f2226] text-[#f2f2f2] min-h-screen relative font-['Barlow_Semi_Condensed']">
      
      {/* 01. MAIN HERO SOLARI BOARD */}
      <section className="pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="board">
          
          {/* Board Head Status */}
          <div className="board-head">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-none bg-[#ffb000] shadow-[0_0_8px_#ffb000]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                STUDENT PG TERMINAL // LIVE DEPARTURES
              </h2>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#a7aaaf]">
              <span>SYSTEM: <b className="text-white">ONLINE</b></span>
              <span>NETWORK: <b className="text-[#ffb000]">0% BROKERAGE</b></span>
              <span className="hidden sm:inline">UTC TIME: <b className="text-white font-mono">{clockTime}</b></span>
            </div>
          </div>

          {/* Giant Split-Flap Main Headline */}
          <div className="py-6 sm:py-10 space-y-3 sm:space-y-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="VERIFIED" size="clamp(26px, 4.4vw, 56px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="STUDENT PGS." size="clamp(26px, 4.4vw, 56px)" colorClass="text-[#f2f2f2]" />
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="ZERO" size="clamp(26px, 4.4vw, 56px)" colorClass="text-[#f2f2f2]" />
              <FlapWord text="BROKERAGE." size="clamp(26px, 4.4vw, 56px)" colorClass="text-[#f2f2f2]" />
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <FlapWord text="IMMEDIATE" size="clamp(26px, 4.4vw, 56px)" colorClass="text-[#ffb000]" />
              <FlapWord text="CHECK-IN." size="clamp(26px, 4.4vw, 56px)" colorClass="text-[#ffb000]" />
            </div>
          </div>

          {/* Hero Foot & Live Telemetry Readouts */}
          <div className="pt-6 border-t border-[#202226] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left Context & CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg text-[#a7aaaf] max-w-2xl leading-relaxed">
                Direct paying guest accommodations (PGs) and student hostels near top colleges and tech parks. <strong className="text-white font-semibold">Every PG verified on-site for food hygiene, WiFi speed & safety.</strong> Direct owner rates, transparent 1-month deposits, and zero student broker fees.
              </p>

              <div className="flex flex-wrap gap-4 pt-1">
                <button
                  onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                  className="btn-solari btn-solari-amber"
                >
                  <span>Find Your Student PG</span>
                  <span className="chev">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>

                <a
                  href="#calculator"
                  className="btn-solari btn-solari-steel"
                >
                  <span>Estimate Monthly Budget</span>
                  <span className="chev">
                    <ArrowDown className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </div>

            {/* Right Mechanical Readouts (5 cols) */}
            <div className="lg:col-span-5 bg-[#0e0f11] p-5 rounded-[3px] border border-[#2a2d31]">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#a7aaaf] font-semibold mb-3 pb-2 border-b border-[#202226]">
                CAMPUS TELEMETRY
              </div>
              <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs uppercase tracking-[0.16em]">
                <dt className="text-[#a7aaaf]">College Corridors</dt>
                <dd className="text-right font-bold text-white font-['Big_Shoulders_Display'] text-base">8 OF 8 OPEN</dd>

                <dt className="text-[#a7aaaf]">Student Broker Fee</dt>
                <dd className="text-right font-bold text-[#ffb000] font-['Big_Shoulders_Display'] text-base">₹0 (ZERO)</dd>

                <dt className="text-[#a7aaaf]">Audited PG Beds</dt>
                <dd className="text-right font-bold text-white font-['Big_Shoulders_Display'] text-base">1,850+ BEDS</dd>

                <dt className="text-[#a7aaaf]">Mess & WiFi Audit</dt>
                <dd className="text-right font-bold text-emerald-400 font-['Big_Shoulders_Display'] text-base">100% VERIFIED</dd>
              </dl>
            </div>

          </div>

        </div>
      </section>

      {/* 02. LIVE DEPARTURES TIMETABLE BOARD (THE SOLARI TIMETABLE) */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="board">
          
          <div className="board-head">
            <div>
              <h2 className="text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                STUDENT PG VACANCIES // LIVE DEPARTURES
              </h2>
              <div className="text-xs uppercase tracking-[0.16em] text-[#a7aaaf] mt-1">
                AUDITED MESS FOOD • SHARING BEDS & PRIVATE ROOMS • ZERO BROKER FEES
              </div>
            </div>

            {/* Live Filter Selectors */}
            <div className="flex items-center gap-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-[#0b0b0d] border border-[#34373c] text-xs font-bold uppercase tracking-[0.14em] text-white px-3 py-1.5 rounded-[2px] focus:outline-none focus:border-[#ffb000] cursor-pointer"
              >
                <option value="ALL">ALL CITIES</option>
                <option value="HYDERABAD">HYDERABAD</option>
                <option value="BANGALORE">BANGALORE</option>
                <option value="PUNE">PUNE</option>
                <option value="DELHI">DELHI</option>
              </select>

              <button
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="px-3 py-1.5 bg-[#ffb000] text-[#111] font-bold text-xs uppercase tracking-[0.14em] rounded-[2px] hover:bg-[#ffc233] cursor-pointer"
              >
                Filter Feed
              </button>
            </div>
          </div>

          {/* Solari Timetable */}
          <div className="overflow-x-auto">
            <table className="tbl-solari">
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>CAMPUS CORRIDOR</th>
                  <th>ZONE</th>
                  <th>SHARING TYPE</th>
                  <th className="text-right">RENT / MO</th>
                  <th>VERIFIED ON-SITE AMENITIES</th>
                  <th className="text-right">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {departures
                  .filter(d => selectedCity === "ALL" || d.zone === selectedCity)
                  .map((item, idx) => (
                    <tr 
                      key={idx}
                      onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                      className={`hover:bg-[#131416] cursor-pointer transition-colors ${item.isAmber ? "text-[#ffb000]" : "text-[#f2f2f2]"}`}
                    >
                      <td className="font-mono font-bold text-xs text-[#a7aaaf]">
                        {item.code}
                      </td>
                      <td className="font-bold text-sm tracking-[0.12em] uppercase font-['Big_Shoulders_Display'] text-white">
                        {item.corridor}
                      </td>
                      <td className="text-xs uppercase tracking-[0.12em] text-[#a7aaaf]">
                        {item.zone}
                      </td>
                      <td className="text-xs uppercase tracking-[0.12em] text-neutral-300">
                        {item.room}
                      </td>
                      <td className="text-right font-bold text-base font-['Big_Shoulders_Display'] text-white">
                        {item.rent}
                      </td>
                      <td className="text-xs tracking-[0.08em] text-[#a7aaaf]">
                        {item.audit}
                      </td>
                      <td className="text-right">
                        <span className={`inline-block px-2.5 py-0.5 rounded-[2px] text-xs font-bold font-['Big_Shoulders_Display'] tracking-[0.12em] uppercase ${
                          item.status === "BOARDING" || item.status === "AVAILABLE"
                            ? "bg-[#ffb000]/15 text-[#ffb000] border border-[#ffb000]/30"
                            : "bg-[#2a2d31] text-white"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Foot Note */}
          <div className="mt-4 pt-3 border-t border-[#202226] flex flex-wrap justify-between items-center text-xs uppercase tracking-[0.14em] text-[#a7aaaf]">
            <span>100% on-site verified PGs · Click any row to check food menu & bed availability</span>
            <span className="text-[#ffb000]">Zero broker commission for all students</span>
          </div>

        </div>
      </section>

      {/* 03. INTERACTIVE TERMINAL CALCULATOR (STUDENT PG BUDGET) */}
      <section id="calculator" className="py-8 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Board: Physical Audit Rules for Student PGs */}
          <div className="board flex flex-col justify-between">
            <div>
              <div className="board-head">
                <h2 className="text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                  STUDENT SAFETY MATRIX
                </h2>
                <div className="text-xs uppercase tracking-[0.14em] text-[#a7aaaf]">PHYSICALLY AUDITED</div>
              </div>

              <div className="space-y-4 pt-2 text-sm text-[#a7aaaf] leading-relaxed">
                <div className="p-3 bg-[#0b0b0d] border border-[#202226] rounded-[2px]">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffb000] mb-1">RULE 01 // 100% ZERO BROKER CHARGES</div>
                  <p className="text-xs text-[#a7aaaf]">Direct bookings between students and verified PG owners. No middleman broker deductions, commission demands, or bogus visit charges.</p>
                </div>

                <div className="p-3 bg-[#0b0b0d] border border-[#202226] rounded-[2px]">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-white mb-1">RULE 02 // MESS FOOD & WIFI VERIFICATION</div>
                  <p className="text-xs text-[#a7aaaf]">Daily meal hygiene, drinking water RO systems, high-speed study WiFi, and backup generator power verified before PG is approved.</p>
                </div>

                <div className="p-3 bg-[#0b0b0d] border border-[#202226] rounded-[2px]">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffb000] mb-1">RULE 03 // 1-MONTH DEPOSIT PROTECTION</div>
                  <p className="text-xs text-[#a7aaaf]">Standardized security deposit receipts with clear, student-friendly refund terms when completing your college semester or internship.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#202226] flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#a7aaaf]">
              <span>VERIFICATION STATUS: <b className="text-emerald-400">100% AUDITED</b></span>
              <span className="text-white">STUDENT SUPPORT: 24/7</span>
            </div>
          </div>

          {/* Right Board: Interactive Move-In Cost Calculator */}
          <div className="board">
            <div className="board-head">
              <h2 className="text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
                ESTIMATE STUDENT PG BUDGET
              </h2>
              <div className="text-xs uppercase tracking-[0.14em] text-[#ffb000]">REAL-TIME RENT ESTIMATOR</div>
            </div>

            <div className="space-y-5 pt-3">
              {/* Base Rent Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs uppercase tracking-[0.14em] text-[#a7aaaf]">
                  <span>Target Monthly Budget</span>
                  <span className="font-bold text-white font-mono">₹{budgetBase.toLocaleString()} / MO</span>
                </div>
                <input
                  type="range"
                  min="4000"
                  max="18000"
                  step="500"
                  value={budgetBase}
                  onChange={(e) => setBudgetBase(Number(e.target.value))}
                  className="w-full accent-[#ffb000] cursor-pointer"
                />
              </div>

              {/* Room Sharing Class Buttons */}
              <div className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                  ROOM SHARING TYPE
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {["SINGLE", "2-SHARING", "3-SHARING", "4-SHARING"].map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setSelectedClass(cls)}
                      className={`py-2 px-1 text-[11px] font-bold uppercase tracking-[0.1em] rounded-[2px] border transition-colors cursor-pointer ${
                        selectedClass === cls
                          ? "bg-[#ffb000] text-[#111] border-[#ffb000]"
                          : "bg-[#0b0b0d] text-[#a7aaaf] border-[#34373c] hover:text-white"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stay Duration Buttons */}
              <div className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#a7aaaf]">
                  SEMESTER / STAY DURATION
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {["1", "3", "6", "12"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDuration(m)}
                      className={`py-2 px-2 text-xs font-bold uppercase tracking-[0.14em] rounded-[2px] border transition-colors cursor-pointer ${
                        duration === m
                          ? "bg-[#f2f2f2] text-[#111] border-[#f2f2f2]"
                          : "bg-[#0b0b0d] text-[#a7aaaf] border-[#34373c] hover:text-white"
                      }`}
                    >
                      {m} MO
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Telemetry */}
              <div className="pt-4 border-t border-[#202226] space-y-2.5">
                <div className="flex justify-between items-center text-xs uppercase tracking-[0.16em]">
                  <span className="text-[#a7aaaf]">Estimated Monthly PG Rent</span>
                  <span className="font-bold text-white font-['Big_Shoulders_Display'] text-lg">₹{computedMonthly.toLocaleString()} (with Meals)</span>
                </div>
                <div className="flex justify-between items-center text-xs uppercase tracking-[0.16em]">
                  <span className="text-[#a7aaaf]">Refundable PG Security Deposit</span>
                  <span className="font-bold text-white font-['Big_Shoulders_Display'] text-lg">₹{totalDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs uppercase tracking-[0.16em]">
                  <span className="text-[#a7aaaf]">Student Brokerage Fee</span>
                  <span className="font-bold text-[#ffb000] font-['Big_Shoulders_Display'] text-lg">₹0.00 (ZERO)</span>
                </div>
                <div className="pt-3 border-t border-[#202226] flex justify-between items-center text-sm uppercase tracking-[0.18em]">
                  <span className="text-white font-bold">Total Initial Move-In</span>
                  <span className="font-extrabold text-[#ffb000] font-['Big_Shoulders_Display'] text-2xl">₹{totalMoveIn.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="w-full btn-solari btn-solari-amber justify-center text-center mt-2"
              >
                <span>Reserve A Verified Student Bed</span>
                <span className="chev">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 04. CORRIDORS (MARKETS TIMETABLE) */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="board">
          <div className="board-head">
            <h2 className="text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
              STUDENT CORRIDORS // CAMPUS CLUSTERS
            </h2>
            <div className="text-xs uppercase tracking-[0.16em] text-[#a7aaaf]">8 TOP COLLEGE ZONES</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            {hubs.map((h, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="p-4 bg-[#0e0f11] border border-[#2a2d31] hover:border-[#ffb000]/60 rounded-[3px] cursor-pointer transition-colors space-y-2 group"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-[#a7aaaf]">
                  <span>{h.city}</span>
                  <span className="text-[#ffb000]">{h.status}</span>
                </div>
                <div className="text-base font-bold text-white group-hover:text-[#ffb000] font-['Big_Shoulders_Display'] uppercase tracking-[0.1em] transition-colors">
                  {h.hub}
                </div>
                <div className="flex justify-between items-center text-xs text-[#a7aaaf] pt-2 border-t border-[#202226]">
                  <span>{h.units}</span>
                  <span className="text-white font-mono">{h.maxRent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. RESIDENT LOGBOOK / STUDENT EXPERIENCES */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="board">
          <div className="board-head">
            <h2 className="text-2xl font-bold tracking-[0.16em] uppercase text-[#f2f2f2] font-['Big_Shoulders_Display']">
              STUDENT TELEMETRY // REAL EXPERIENCES
            </h2>
            <div className="text-xs uppercase tracking-[0.16em] text-[#a7aaaf]">AUDITED REVIEWS</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
            <div className="p-5 bg-[#0e0f11] border border-[#2a2d31] rounded-[3px] space-y-4 flex flex-col justify-between">
              <p className="text-sm text-[#f2f2f2] leading-relaxed">
                "Found a 2-sharing PG near Gachibowli in 15 minutes. 3 meals included and the WiFi speed was tested before I checked in. Zero broker fees saved me ₹7,000."
              </p>
              <div className="pt-3 border-t border-[#202226] flex justify-between items-center text-xs text-[#a7aaaf]">
                <div>
                  <div className="font-bold text-white uppercase">Aryan Sharma</div>
                  <div className="text-[11px]">B.Tech CSE Student, IIIT-H</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#202226] text-[#ffb000]">HYD</span>
              </div>
            </div>

            <div className="p-5 bg-[#0e0f11] border border-[#2a2d31] rounded-[3px] space-y-4 flex flex-col justify-between">
              <p className="text-sm text-[#f2f2f2] leading-relaxed">
                "We host 160 student beds in Koramangala. Having verified listings with clear amenities brought genuine students directly without chaotic broker calls."
              </p>
              <div className="pt-3 border-t border-[#202226] flex justify-between items-center text-xs text-[#a7aaaf]">
                <div>
                  <div className="font-bold text-white uppercase">Narayana Rao</div>
                  <div className="text-[11px]">Hostel Warden & PG Owner</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#202226] text-[#ffb000]">BLR</span>
              </div>
            </div>

            <div className="p-5 bg-[#0e0f11] border border-[#2a2d31] rounded-[3px] space-y-4 flex flex-col justify-between">
              <p className="text-sm text-[#f2f2f2] leading-relaxed">
                "Relocating from Kolkata for my master's degree, this was the only platform where food menu, study desk, and hot water details were 100% verified."
              </p>
              <div className="pt-3 border-t border-[#202226] flex justify-between items-center text-xs text-[#a7aaaf]">
                <div>
                  <div className="font-bold text-white uppercase">Ananya Roy</div>
                  <div className="text-[11px]">Postgraduate Student</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#202226] text-[#ffb000]">PUN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. FINAL CLOSE: BOARDING CALL */}
      <section className="py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="board">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <FlapWord text="STUDENT BEDS" size="clamp(24px, 3.8vw, 44px)" colorClass="text-[#ffb000]" />
                <FlapWord text="BOARDING NOW." size="clamp(24px, 3.8vw, 44px)" colorClass="text-[#ffb000]" />
              </div>
              <p className="text-sm text-[#a7aaaf] max-w-md">
                Connect directly with verified student PG hosts across 8 top college clusters. Zero brokerage, transparent deposits, and guaranteed move-in.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate(user ? "/seeker-dashboard/find-pg" : "/register")}
                className="btn-solari btn-solari-amber"
              >
                <span>Find Student PGs</span>
                <span className="chev">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              <button
                onClick={() => navigate(user ? "/provider-dashboard" : "/register")}
                className="btn-solari btn-solari-steel"
              >
                <span>List Your PG Hostel</span>
                <span className="chev">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ArrowDown(props) {
  return (
    <svg 
      viewBox="0 0 16 16" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      {...props}
    >
      <path d="M8 2v10m-4-4l4 4 4-4" />
    </svg>
  );
}
