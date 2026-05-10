import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, BookOpen, TrendingUp,
  Bell, User,
  Search, Phone, Globe, Building, Rocket, Heart, Trophy, ArrowRight, ArrowLeft, X, Landmark, Download
} from 'lucide-react';
import './CollegeHome.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { departmentsData } from '../data/departments';

const HomeStatCard = ({ label, value, icon: Icon, color, bg, trend }) => (
  <div className="sd-stat-card">
    <div className="sd-stat-icon" style={{ background: bg, color }}>
      {Icon && <Icon size={20} />}
    </div>
    <div className="sd-stat-info">
      <p className="sd-stat-label">{label}</p>
      <h3 className="sd-stat-value" style={{ color }}>{value}</h3>
      {trend && <p className="sd-stat-trend">{trend}</p>}
    </div>
  </div>
);

const CollegeHome = ({ role }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const sections = {
    university: useRef(null),
    academics: useRef(null),
    exams: useRef(null),
    studentCorner: useRef(null),
  };

  const carouselSlides = [
    {
      title: "Savitribai Phule Institute",
      subtitle: "Empowering India's Future through Technical Excellence. Accredited A++ by NAAC.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop",
      cta: "Explore Our Heritage",
      link: "#university"
    },
    {
      title: "Admissions Open 2026–27",
      subtitle: "Applications for B.E. and M.E. programs are now live at SPIT Pune. Register today.",
      image: "https://images.unsplash.com/photo-1523050335102-c32509145861?q=80&w=2070&auto=format&fit=crop",
      cta: "Apply Online",
      link: "/signup"
    },
    {
      title: "Top Tier Placements",
      subtitle: "Over 95% placement rate with top recruiters like TCS, Infosys, and Google.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop",
      cta: "Placement Record",
      link: "#university"
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const scrollToSection = (id) => {
    sections[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAction = (title, message) => setModalContent({ title, message });

  const data = {
    info: {
      history: "Established in 1985 in the heart of Pune, SPIT has consistently ranked among the top technical institutes in Maharashtra, fostering innovation and engineering excellence."
    },
    futurePlans: [
      { year: '2026', title: 'Smart Campus Expansion', desc: 'Integration of IoT for real-time facility management across the Pune campus.' },
      { year: '2027', title: 'Advanced Robotics Wing', desc: 'Establishing a state-of-the-art center for AI and Human-Robot Interaction.' },
      { year: '2028', title: 'Green Campus Initiative', desc: 'Transitioning to 100% solar power and zero-waste policy.' }
    ],
    exams: [
      { title: 'Semester End Exams', date: 'May 15, 2026', status: 'Upcoming' },
      { title: 'GATE 2027 Preparation', date: 'June 02, 2026', status: 'Ongoing' },
      { title: 'Entrance 2026 Phase II', date: 'July 10, 2026', status: 'Scheduled' }
    ]
  };

  const statsList = [
    { label: 'Students Enrolled', value: '15,000+', icon: Users, color: '#8B5CF6', bg: 'rgba(124,58,237,0.15)', trend: 'Pan-India Reach' },
    { label: 'Ranking (NIRF)', value: '#12', icon: TrendingUp, color: '#06D6A0', bg: 'rgba(6,214,160,0.12)', trend: 'Top 15 India' },
    { label: 'Research Papers', value: '2,500+', icon: BookOpen, color: '#FBBF24', bg: 'rgba(251,191,36,0.12)', trend: 'Annual Output' },
    { label: 'Campus Placement', value: '98%', icon: Rocket, color: '#F43F5E', bg: 'rgba(244,63,94,0.12)', trend: 'Avg. 12 LPA' },
  ];

  return (
    <div className="college-home-root">
      {!role && <Navbar />}

      <AnimatePresence>
        {modalContent && (
          <div className="ch-modal-overlay" onClick={() => setModalContent(null)}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 8 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="ch-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="ch-modal-header">
                <h3>{modalContent.title}</h3>
                <button onClick={() => setModalContent(null)}><X size={18} /></button>
              </div>
              <div className="ch-modal-body">
                <p>{modalContent.message}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="ad-btn-primary" onClick={() => setModalContent(null)}>Got it</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Hero Carousel ──────────────────────────────────── */}
      <section className="hero-carousel">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="carousel-slide"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(6,6,26,0.92) 30%, rgba(6,6,26,0.5) 70%, rgba(6,6,26,0.2) 100%), url(${carouselSlides[currentSlide].image})`
            }}
          >
            <div className="carousel-content">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="slide-label"
              >
                SPIT PUNE • ACADEMIC SESSION 2026-27
              </motion.div>
              <motion.h1 initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
                {carouselSlides[currentSlide].title}
              </motion.h1>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                {carouselSlides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="carousel-actions"
              >
                <button className="carousel-cta" onClick={() => {
                  const link = carouselSlides[currentSlide].link;
                  if (link.startsWith('#')) scrollToSection(link.substring(1));
                  else window.location.href = link;
                }}>
                  {carouselSlides[currentSlide].cta} <ArrowRight size={18} />
                </button>
                <button className="carousel-cta-outline" onClick={() => navigate('/portal/prospectus')}>
                  View Prospectus
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="carousel-nav-controls">
          <button className="nav-arrow" onClick={() => setCurrentSlide(p => (p - 1 + carouselSlides.length) % carouselSlides.length)}><ArrowLeft size={16} /></button>
          <div className="carousel-indicators">
            {carouselSlides.map((_, i) => (
              <div key={i} className={`indicator-bar ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}>
                <div className="indicator-progress" />
              </div>
            ))}
          </div>
          <button className="nav-arrow" onClick={() => setCurrentSlide(p => (p + 1) % carouselSlides.length)}><ArrowRight size={16} /></button>
        </div>
      </section>

      {/* ─── Main Content ────────────────────────────────────── */}
      <div className="home-content-container">
        {/* Quick Access */}
        <motion.div
          className="quick-access-bar"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="access-item" onClick={() => navigate('/portal/prospectus')}><Download size={16} /> Prospectus</div>
          <div className="access-item" onClick={() => navigate('/portal/virtual-tour')}><Globe size={16} /> Virtual Tour</div>
          <div className="access-item" onClick={() => navigate('/portal/alumni')}><Users size={16} /> Alumni</div>
          <div className="access-item highlight" onClick={() => navigate('/signup')}><Rocket size={16} /> Apply Online</div>
        </motion.div>

        {/* University & Stats */}
        <div className="ad-two-col">
          <motion.div
            ref={sections.university}
            className="ad-card content-card"
            id="university"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="ch-section-header">
              <h3>Institutional Legacy</h3>
              <span className="ad-badge-success">A++ Grade (NAAC)</span>
            </div>
            <p className="description-text">{data.info.history} We are dedicated to providing world-class technical education that is rooted in Indian values and global standards.</p>
            <div className="vision-timeline">
              <h4>Strategy 2026-2028</h4>
              <div className="ch-timeline">
                {data.futurePlans.map((plan, i) => (
                  <motion.div
                    key={i}
                    className="ch-timeline-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/detail/roadmap/${i + 1}`)}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="ch-timeline-year">{plan.year}</div>
                    <div className="ch-timeline-content">
                      <h4>{plan.title}</h4>
                      <p>{plan.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="sidebar-column">
            <div className="ad-stats-grid-mini">
              {statsList.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <HomeStatCard {...s} />
                </motion.div>
              ))}
            </div>
            <motion.div
              className="ad-card accent-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="ad-card-header">
                <Trophy size={18} color="#FBBF24" />
                <h3>Pune Ranking</h3>
              </div>
              <ul className="feat-list">
                <li>Ranked #1 Engineering College in Pune</li>
                <li>Innovation Leadership Award 2025</li>
                <li>Top Placement Records in Maharashtra</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Academics */}
        <motion.div
          ref={sections.academics}
          className="academic-section"
          id="academics"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="ch-section-header">
            <h3>Specialized Departments</h3>
          </div>
          <div className="course-explorer-grid">
            {Object.values(departmentsData).map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="program-card-detailed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="program-card-image" style={{ backgroundImage: `url(${c.coverImage})` }}>
                  <div className="program-icon-badge">{c.icon}</div>
                </div>
                <div className="program-card-content">
                  <h4>{c.name}</h4>
                  <div className="program-meta">
                    <span>{c.duration}</span> • <span>{c.intake} Students/Yr</span>
                  </div>
                  <p className="program-details">{c.overview}</p>
                  <div className="program-footer">
                    <span className="learn-more" onClick={() => navigate(`/department/${c.id}`)} style={{ cursor: 'pointer' }}>Portal <ArrowRight size={13} /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Exams & Support */}
        <div className="ad-two-col">
          <motion.div
            ref={sections.exams}
            className="ad-card portal-card"
            id="exams"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="ch-section-header">
              <h3>Examination Cell</h3>
              <span className="live-tag">LIVE PORTAL</span>
            </div>
            <div className="ad-list">
              {data.exams.map((ex, i) => (
                <div key={i} className="ad-list-item-hover" onClick={() => navigate(`/detail/exam/${i + 1}`)}>
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
              <button className="primary-portal-btn" onClick={() => window.location.href = '/login'}>Student/Parent Login</button>
            </div>
          </motion.div>

          <motion.div
            ref={sections.studentCorner}
            className="ad-card support-card"
            id="studentCorner"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="ch-section-header"><h3>Institutional Support</h3></div>
            <div className="support-grid">
              {[
                { id: 'library', label: 'E-Resources', icon: BookOpen, color: '#8B5CF6' },
                { id: 'counseling', label: 'Counseling', icon: Heart, color: '#F43F5E' },
                { id: 'tpo', label: 'Placement Cell', icon: Rocket, color: '#FBBF24' },
                { id: 'alumni', label: 'Alumni Network', icon: Users, color: '#06D6A0' }
              ].map((item, i) => (
                <div key={i} className="support-box" onClick={() => navigate(`/portal/${item.id}`)}>
                  <item.icon size={22} color={item.color} />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <div className="helpdesk-strip">
              <Phone size={13} /> Admission Help: 1800-SPIT-PUNE
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Footer ──────────────────────────────────────────── */}
      <footer className="institutional-footer">
        <div className="footer-main">
          <div className="footer-brand-section">
            <div className="f-logo"><Landmark size={24} /></div>
            <h3>Savitribai Phule Institute</h3>
            <p>Knowledge • Excellence • Service</p>
          </div>
          <div className="footer-links-grid">
            <div className="f-col">
              <h4>Quick Links</h4>
              <a href="#">NAAC Disclosures</a>
              <a href="#">Mandatory Reports</a>
              <a href="#">Internal Complaint Cell</a>
            </div>
            <div className="f-col">
              <h4>Academics</h4>
              <a href="#">Research Ethics</a>
              <a href="#">Placement Stats</a>
              <a href="#">International Ties</a>
            </div>
            <div className="f-col">
              <h4>Contact Us</h4>
              <p>Ganeshkhind Road, Pune 411007</p>
              <p>Email: contact@spit.edu</p>
              <p>Tel: +91 20 2560 1101</p>
            </div>
          </div>
        </div>
        <div className="footer-legal">
          <p>© 2026 Savitribai Phule Institute of Technology (SPIT Pune). All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CollegeHome;
