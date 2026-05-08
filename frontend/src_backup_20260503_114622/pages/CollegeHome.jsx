import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, BookOpen, Wallet, CalendarDays, TrendingUp, 
  Bell, ChevronRight, LayoutDashboard, User, 
  ClipboardCheck, Calendar, Star, GraduationCap, MapPin, Clock,
  Search, Phone, Mail, Globe, ExternalLink, Building, Rocket, Heart, Trophy, ArrowRight, ArrowLeft, X, Landmark
} from 'lucide-react';
import './CollegeHome.css';
import Navbar from '../components/Navbar';

// Renamed to HomeStatCard to avoid conflicts
const HomeStatCard = ({ label, value, icon: Icon, color, bg, trend }) => (
  <div className="sd-stat-card" style={{ background: 'white' }}>
    <div className="sd-stat-icon" style={{ background: bg, color: color }}>
      {Icon && <Icon size={24} />}
    </div>
    <div className="sd-stat-info">
      <p className="sd-stat-label">{label}</p>
      <h3 className="sd-stat-value">{value}</h3>
      {trend && <p className="sd-stat-trend">{trend}</p>}
    </div>
  </div>
);

const CollegeHome = ({ role }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalContent, setModalContent] = useState(null);
  
  const sections = {
    university: useRef(null),
    academics: useRef(null),
    exams: useRef(null),
    studentCorner: useRef(null),
  };

  const carouselSlides = [
    {
      title: "Zenith Global University",
      subtitle: "Nurturing Leaders for a Better Tomorrow. Accredited A++ by NAAC.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",
      cta: "Explore Our Heritage",
      link: "#university"
    },
    {
      title: "Admissions Open 2026-27",
      subtitle: "Applications for UG and PG programs are now live. Embark on your journey of excellence.",
      image: "https://images.unsplash.com/photo-1523050335102-c32509145861?q=80&w=2070&auto=format&fit=crop",
      cta: "Apply Now",
      link: "/signup"
    },
    {
      title: "Innovation Hub & Research",
      subtitle: "State-of-the-art labs focused on AI, Sustainable Energy, and Life Sciences.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
      cta: "View Research Projects",
      link: "#academics"
    },
    {
      title: "Global Placement Record",
      subtitle: "Over 95% placement rate with top recruiters like Google, Microsoft, and TATA.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop",
      cta: "Placement Report",
      link: "#university"
    },
    {
      title: "Holistic Campus Life",
      subtitle: "A perfect blend of culture, sports, and academia. Discover our 100+ student clubs.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
      cta: "Student Experience",
      link: "#studentCorner"
    },
    {
      title: "Financial Aid Programs",
      subtitle: "We believe in merit. Offering scholarships worth ₹50 Crores annually.",
      image: "https://images.unsplash.com/photo-1523240715639-963a7108169e?q=80&w=2070&auto=format&fit=crop",
      cta: "Scholarship Details",
      link: "#studentCorner"
    },
    {
      title: "International Partnerships",
      subtitle: "Student exchange programs with 60+ partner universities across 20 countries.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756defe99?q=80&w=2070&auto=format&fit=crop",
      cta: "Global Programs",
      link: "#academics"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const scrollToSection = (id) => {
    sections[id].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAction = (title, message) => {
    setModalContent({ title, message });
  };

  const [data, setData] = useState({
    info: { 
      name: "Zenith Global University", 
      tagline: "Empowering Minds, Shaping Futures",
      location: "Knowledge City, University Road",
      phone: "+91 79 2630 1341",
      email: "admissions@zenith.edu",
      hours: "09:00 AM - 05:00 PM",
      history: "Established in 1982, Zenith Global University has consistently ranked among the top 1% of higher education institutions globally."
    },
    futurePlans: [
      { year: '2026', title: 'Smart Campus Expansion', desc: 'Integration of IoT for real-time facility management and automated campus security.' },
      { year: '2027', title: 'Advanced Robotics Wing', desc: 'Establishing a state-funded center for Industrial Automation and Human-Robot Interaction.' },
      { year: '2028', title: 'Carbon-Neutral Certification', desc: 'Implementation of solar-microgrids and a zero-waste policy to become an eco-leader.' }
    ],
    studentClubs: [
      { name: 'Tech Wizards', icon: '🤖', members: '120+' },
      { name: 'Cultural Beats', icon: '🎭', members: '85+' },
      { name: 'Sports Titan', icon: '🏆', members: '200+' },
      { name: 'Social Impact', icon: '🌱', members: '50+' }
    ],
    courses: [
      { name: 'Computer Science & Engineering', icon: '💻', highlights: 'AI, Data Science, Cyber Security' },
      { name: 'Business Administration', icon: '📊', highlights: 'Finance, Marketing, Analytics' },
      { name: 'Health Sciences', icon: '🏥', highlights: 'Public Health, Nursing, Biotech' },
      { name: 'Law & Governance', icon: '⚖️', highlights: 'Corporate Law, Public Policy' }
    ],
    exams: [
      { title: 'Semester End Exams', date: 'May 15, 2026', status: 'Upcoming' },
      { title: 'PhD Entrance Test', date: 'June 02, 2026', status: 'Open' },
      { title: 'Entrance 2026 Phase II', date: 'July 10, 2026', status: 'Scheduled' }
    ]
  });

  const statsList = [
    { label: 'Students Enrolled', value: '15,000+', icon: Users, color: '#4F46E5', bg: '#EEF2FF', trend: 'Global Diversity' },
    { label: 'Ranking (NIRF)', value: '#12', icon: TrendingUp, color: '#10B981', bg: '#ECFDF5', trend: 'Top 15 India' },
    { label: 'Research Papers', value: '2,500+', icon: BookOpen, color: '#F59E0B', bg: '#FFFBEB', trend: 'Annual Output' },
    { label: 'Campus Size', value: '150 Acres', icon: Building, color: '#EF4444', bg: '#FEF2F2', trend: 'Modern Facilities' },
  ];

  return (
    <div className="college-home-root">
      {/* Explicitly include Navbar here if it's the root page */}
      {window.location.pathname === '/' && <Navbar />}
      
      <AnimatePresence>
        {modalContent && (
          <div className="ch-modal-overlay" onClick={() => setModalContent(null)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="ch-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="ch-modal-header">
                <h3>{modalContent.title}</h3>
                <button onClick={() => setModalContent(null)}><X size={20} /></button>
              </div>
              <div className="ch-modal-body">
                <p>{modalContent.message}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="ad-btn-primary" onClick={() => setModalContent(null)}>Understood</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Carousel */}
      <section className="hero-carousel">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="carousel-slide"
            style={{ backgroundImage: `linear-gradient(to right, rgba(0,17,34,0.9), rgba(0,17,34,0.4)), url(${carouselSlides[currentSlide].image})` }}
          >
            <div className="carousel-content">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="slide-label"
              >
                LEADING EDUCATION 2026
              </motion.div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {carouselSlides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {carouselSlides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="carousel-actions"
              >
                <button
                  className="carousel-cta"
                  onClick={() => {
                    if (carouselSlides[currentSlide].link.startsWith('#')) {
                      scrollToSection(carouselSlides[currentSlide].link.substring(1));
                    } else {
                      window.location.href = carouselSlides[currentSlide].link;
                    }
                  }}
                >
                  {carouselSlides[currentSlide].cta} <ArrowRight size={20} />
                </button>
                <button className="carousel-cta-outline" onClick={() => handleAction("Request Info", "Please fill out the contact form below or call our admissions desk at +91 79 2630 1341 for immediate assistance.")}>
                  Watch Video
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="carousel-nav-controls">
          <button className="nav-arrow" onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)}><ArrowLeft /></button>
          <div className="carousel-indicators">
            {carouselSlides.map((_, i) => (
              <div key={i} className={`indicator-bar ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}>
                <div className="indicator-progress" />
              </div>
            ))}
          </div>
          <button className="nav-arrow" onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)}><ArrowRight /></button>
        </div>
      </section>

      <div className="home-content-container">
        {/* Quick Access Grid */}
        <div className="quick-access-bar">
          <div className="access-item" onClick={() => handleAction("E-Prospectus", "Downloading the 2026 Zenith Global University prospectus. Please wait...")}><Download size={18} /> Prospectus</div>
          <div className="access-item" onClick={() => handleAction("Virtual Tour", "Launching the 360-degree VR campus tour. Best viewed on Chrome/Safari.")}><Globe size={18} /> Virtual Tour</div>
          <div className="access-item" onClick={() => handleAction("Alumni Login", "Redirecting to the Zenith Alumni Association portal.")}><Users size={18} /> Alumni</div>
          <div className="access-item highlight" onClick={() => handleAction("Apply Online", "Admissions for Fall 2026 are open. Redirecting to application portal...")}><Rocket size={18} /> Apply 2026</div>
        </div>

        <div className="ad-two-col">
          <div ref={sections.university} className="ad-card content-card" id="university">
            <div className="ch-section-header">
              <h3>University Heritage</h3>
              <span className="ad-badge-success">ISO 9001:2015 Certified</span>
            </div>
            <p className="description-text">{data.info.history} Our institution stands as a lighthouse of knowledge, integrating ancient wisdom with modern technology.</p>
            
            <div className="vision-timeline">
              <h4>Future Roadmap</h4>
              <div className="ch-timeline">
                {data.futurePlans.map((plan, i) => (
                  <div key={i} className="ch-timeline-item">
                    <div className="ch-timeline-year">{plan.year}</div>
                    <div className="ch-timeline-content">
                      <h4>{plan.title}</h4>
                      <p>{plan.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar-column">
             <div className="ad-stats-grid-mini">
              {statsList.map((s, i) => (
                <HomeStatCard 
                  key={s.label} 
                  label={s.label}
                  value={s.value}
                  icon={s.icon}
                  color={s.color}
                  bg={s.bg}
                  trend={s.trend}
                />
              ))}
            </div>
            
            <div className="ad-card accent-card">
              <div className="ad-card-header">
                <Trophy size={18} color="#F59E0B" />
                <h3>Recent Honors</h3>
              </div>
              <ul className="feat-list">
                <li>Best Private University - Education World</li>
                <li>Innovation Leadership Award 2025</li>
                <li>Top 5% Research Citations Globally</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Academics Section */}
        <div ref={sections.academics} className="academic-section" id="academics">
          <div className="ch-section-header">
            <h3>Academic Departments</h3>
            <div className="search-pill">
              <Search size={16} />
              <input type="text" placeholder="Find your program..." onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="course-explorer-grid">
            {data.courses.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((c, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8 }}
                className="program-card"
                onClick={() => handleAction(c.name, `Our ${c.name} program offers specializations in ${c.highlights}. Faculty includes international professors and industry experts.`)}
              >
                <div className="program-icon">{c.icon}</div>
                <h4>{c.name}</h4>
                <p>{c.highlights}</p>
                <span className="learn-more">Details <ArrowRight size={14} /></span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Integrated Dashboard Links Row */}
        <div className="ad-two-col" style={{ marginTop: '2rem' }}>
           <div ref={sections.exams} className="ad-card portal-card" id="exams">
            <div className="ch-section-header">
              <h3>Examination & Results</h3>
              <span className="live-tag">LIVE</span>
            </div>
            <div className="ad-list">
              {data.exams.map((ex, i) => (
                <div key={i} className="ad-list-item-hover" onClick={() => handleAction("Exam Details", `Date: ${ex.date} | Status: ${ex.status}. Please download your hall ticket 1 week prior.`)}>
                  <div className="date-badge">
                    <span className="d-val">{ex.date.split(' ')[1].replace(',', '')}</span>
                    <span className="d-mon">{ex.date.split(' ')[0].toUpperCase()}</span>
                  </div>
                  <div className="item-text">
                    <p className="it-title">{ex.title}</p>
                    <p className="it-sub">{ex.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="portal-actions">
              <button className="primary-portal-btn" onClick={() => window.location.href='/login'}>Access Student Portal</button>
            </div>
          </div>

          <div ref={sections.studentCorner} className="ad-card support-card" id="studentCorner">
            <div className="ch-section-header">
              <h3>Student Support</h3>
            </div>
            <div className="support-grid">
              {[
                { label: 'E-Library', icon: BookOpen, color: '#4F46E5' },
                { label: 'Psychology', icon: Heart, color: '#EF4444' },
                { label: 'Placements', icon: Rocket, color: '#F59E0B' },
                { label: 'Alumni', icon: Users, color: '#10B981' }
              ].map((item, i) => (
                <div key={i} className="support-box" onClick={() => handleAction(item.label, `Redirecting to ${item.label} services. Support is available 24/7 for registered students.`)}>
                  <item.icon size={24} color={item.color} />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <div className="helpdesk-strip">
              <Phone size={14} /> 24x7 Helpdesk: 1800-ZENITH-EDU
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="institutional-footer">
        <div className="footer-main">
          <div className="footer-brand-section">
            <div className="f-logo"><Landmark size={32} /></div>
            <h3>Zenith Global University</h3>
            <p>Knowledge • Excellence • Leadership</p>
          </div>
          <div className="footer-links-grid">
            <div className="f-col">
              <h4>Quick Links</h4>
              <a href="#">Governing Body</a>
              <a href="#">Mandatory Disclosures</a>
              <a href="#">Annual Report</a>
            </div>
            <div className="f-col">
              <h4>Academics</h4>
              <a href="#">Research Ethics</a>
              <a href="#">Course Catalog</a>
              <a href="#">International Cell</a>
            </div>
            <div className="f-col">
              <h4>Contact Us</h4>
              <p>Knowledge City, University Road</p>
              <p>Email: info@zenith.edu</p>
              <p>Tel: +91 79 2630 1341</p>
            </div>
          </div>
        </div>
        <div className="footer-legal">
          <p>© 2026 Zenith Global University. ISO 9001:2015. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const Download = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default CollegeHome;
