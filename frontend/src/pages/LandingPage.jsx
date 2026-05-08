import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, Mail, Globe, Users, BookOpen, Calendar, 
  ChevronRight, Award, GraduationCap, Building, 
  MapPin, Clock, Search, ExternalLink, Menu, X,
  FileText, Landmark, UserCheck, TrendingUp, Bell
} from 'lucide-react';
import './LandingPage.css';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    ticker: [
      "Admissions 2026: Applications for International Students now live!",
      "Zenith Global ranked #1 in Academic Excellence by Global Education Forum.",
      "Notification: Research Grant applications deadline extended to May 30."
    ],
    notices: [
      { title: "Circular regarding PhD Entrance Exam 2026", notice_date: "2026-04-18", is_new: 1 },
      { title: "Global Innovation Summit - Registration Open", notice_date: "2026-04-15", is_new: 1 },
      { title: "Hostel Admission List - Semester IV", notice_date: "2026-04-12", is_new: 0 },
    ],
    events: []
  });

  useEffect(() => {
    fetch('http://localhost/student_management_system/backend/get_college_details.php')
      .then(res => res.json())
      .then(json => {
        if (json && (json.ticker || json.notices)) {
          setData({
            ticker: json.ticker.length > 0 ? json.ticker.map(t => t.content) : data.ticker,
            notices: json.notices.length > 0 ? json.notices : data.notices,
            events: json.events || []
          });
        }
      })
      .catch(err => console.warn("Backend not reached, using mock data"));
  }, []);

  const quickLinks = [
    { id: 'examination', label: 'Exams', icon: FileText, color: '#4F46E5' },
    { id: 'results', label: 'Results', icon: Award, color: '#059669' },
    { id: 'fee-payment', label: 'Fees', icon: Landmark, color: '#F59E0B' },
    { id: 'research', label: 'Research', icon: Globe, color: '#6366F1' },
    { id: 'admission', label: 'Admission', icon: UserCheck, color: '#EF4444' },
    { id: 'library', label: 'Digital Library', icon: BookOpen, color: '#8B5CF6' }
  ];

  return (
    <div className="hsu-root">
      <Navbar />

      {/* Hero Section */}
      <section className="hsu-hero">
        <img src="/avalon_university_hero.png" alt="Campus" className="hsu-hero-img" />
        <div className="hsu-hero-overlay">
          <div className="hsu-container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hsu-hero-box"
            >
              <div className="badge-glow primary" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
                <TrendingUp size={14} /> Admissions Open 2026
              </div>
              <h2>Excellence in Every Dimension</h2>
              <p>Experience world-class education with Zenith Global University's advanced curriculum and industry-leading research initiatives.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-glow" onClick={() => navigate('/signup')}>Start Application <ChevronRight size={18} /></button>
                <button className="btn-glow" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => navigate('/college-home')}>Explore Campus</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="hsu-main hsu-container">
        <div className="hsu-row">
          {/* Left Column */}
          <div className="hsu-col-left">
            <section className="hsu-vc-card">
              <div className="hsu-vc-header">
                <img src="/vice_chancellor.png" alt="Vice Chancellor" />
                <div className="hsu-vc-info">
                  <h3>Dr. Sarah Jenkins</h3>
                  <p>President & Vice Chancellor</p>
                </div>
              </div>
              <div className="hsu-vc-msg">
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.8 }}>"At Zenith Global, we don't just teach; we inspire. Our mission is to bridge the gap between academic theory and real-world impact, ensuring our graduates are prepared to lead in a globalized economy."</p>
              </div>
            </section>
            
            <section className="hsu-quick-grid">
              {quickLinks.map((link, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hsu-quick-item" 
                  onClick={() => navigate(`/portal/${link.id}`)}
                >
                  <div style={{ color: link.color, background: `${link.color}15`, padding: '1rem', borderRadius: '14px' }}>
                    <link.icon size={28} />
                  </div>
                  <span>{link.label}</span>
                </motion.div>
              ))}
            </section>
          </div>

          {/* Right Column */}
          <div className="hsu-col-right">
            <section className="hsu-notice-board">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}><Bell size={20} style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--primary)' }} /> Notice Board</h3>
                <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/portal/examination')}>View All</button>
              </div>
              <div className="hsu-notice-list">
                {data.notices.map((n, i) => (
                  <div key={i} className="hsu-notice-item" onClick={() => navigate(`/detail/notice/${i + 1}`)}>
                    <div className="hsu-notice-date">{new Date(n.notice_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{n.title} {n.is_new == 1 && <span className="badge-glow accent" style={{ padding: '2px 6px', fontSize: '0.6rem', marginLeft: '8px' }}>NEW</span>}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="hsu-upcoming" style={{ marginTop: '2rem' }}>
              <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #0F172A, #1E293B)', color: 'white', border: 'none' }}>
                <h4 style={{ color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> Academic Event</h4>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ background: 'white', color: '#0F172A', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', minWidth: '50px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>24</div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 700 }}>MAY</div>
                  </div>
                  <div>
                    <h5 style={{ color: 'white', fontSize: '0.95rem' }}>Global Tech Expo 2026</h5>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Main Auditorium • 10:00 AM</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="hsu-footer" style={{ background: '#0F172A', color: 'white', padding: '5rem 0 2rem', borderTop: '1px solid #1E293B' }}>
        <div className="hsu-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Zenith Global University</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.7 }}>Empowering the next generation of global leaders through innovation, research, and academic excellence.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.25rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['About Us', 'Admissions', 'Research', 'Campus Life'].map(item => (
                  <li key={item} style={{ marginBottom: '0.75rem' }}><a href="#" style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.25rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Student Support</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Student Portal', 'Digital Library', 'Help Desk', 'Alumni Network'].map(item => (
                  <li key={item} style={{ marginBottom: '0.75rem' }}><a href="#" style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1E293B', paddingTop: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.8rem' }}>
            <p>&copy; 2026 Zenith Global University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
