import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, Mail, Globe, Users, BookOpen, Calendar, 
  ChevronRight, Award, GraduationCap, Building, 
  MapPin, Clock, Search, ExternalLink, Menu, X,
  FileText, Landmark, UserCheck
} from 'lucide-react';
import './LandingPage.css';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [data, setData] = useState({
    ticker: [
      "Admissions 2026-27: UG/PG Applications now live!",
      "Heritage State University ranked #1 in Innovation by State Rankings.",
      "Notification: Mid-Term Examination schedules published."
    ],
    notices: [
      { title: "Circular regarding PhD Entrance Exam", notice_date: "2026-04-18", is_new: 1 },
      { title: "Hostel Admission List - Semester I", notice_date: "2026-04-15", is_new: 0 },
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

  const updates = data.ticker;

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % updates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [updates]);

  const quickLinks = [
    { id: 'examination', label: 'Examination', icon: FileText, color: '#3B82F6' },
    { id: 'results', label: 'Results', icon: Award, color: '#10B981' },
    { id: 'fee-payment', label: 'Fee Payment', icon: Landmark, color: '#F59E0B' },
    { id: 'research', label: 'Research', icon: Globe, color: '#6366F1' },
    { id: 'admission', label: 'Admission', icon: UserCheck, color: '#EF4444' },
    { id: 'library', label: 'Library', icon: BookOpen, color: '#8B5CF6' }
  ];

  return (
    <div className="hsu-root">
      <Navbar />

      {/* News Ticker */}
      <div className="hsu-ticker">
        <div className="hsu-container">
          <div className="hsu-ticker-label">LATEST UPDATES</div>
          <div className="hsu-ticker-content">
            <motion.p 
              key={tickerIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {updates[tickerIndex]}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Hero Slider */}
      <section className="hsu-hero">
        <img src="/avalon_university_hero.png" alt="Campus" className="hsu-hero-img" />
        <div className="hsu-hero-overlay">
          <div className="hsu-container">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="hsu-hero-box"
            >
              <h2>Empowering India's Future</h2>
              <p>Join the 100,000+ students pursuing excellence at Heritage State University.</p>
              <button className="hsu-btn-primary" onClick={() => navigate('/signup')}>Apply Now 2026-27</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <main className="hsu-main hsu-container">
        <div className="hsu-row">
          {/* Vice Chancellor's Message */}
          <div className="hsu-col-left" id="university">
            <section className="hsu-vc-card">
              <div className="hsu-vc-header">
                <img src="/vice_chancellor.png" alt="Vice Chancellor" />
                <div className="hsu-vc-info">
                  <h3>Dr. Rajeshwar Sharma</h3>
                  <p>Vice Chancellor</p>
                </div>
              </div>
              <div className="hsu-vc-msg">
                <p>"Heritage State University is committed to providing a transformative education that balances tradition with modern innovation. Our mission is to foster a globally competitive research environment."</p>
                <a href="/portal/admission">Read More</a>
              </div>
            </section>
            
            <section className="hsu-quick-grid" id="exams">
              {quickLinks.map((link, i) => (
                <div key={i} className="hsu-quick-item" onClick={() => navigate(`/portal/${link.id}`)}>
                  <div className="hsu-quick-icon" style={{ color: link.color }}>
                    <link.icon size={32} />
                  </div>
                  <span>{link.label}</span>
                </div>
              ))}
            </section>
          </div>

          {/* News & Notices */}
          <div className="hsu-col-right" id="studentCorner">
            <section className="hsu-notice-board">
              <div className="hsu-section-title">
                <h2>Notices & Announcements</h2>
                <a href="/portal/examination">View All</a>
              </div>
              <div className="hsu-notice-list">
                {data.notices.map((n, i) => (
                  <div key={i} className="hsu-notice-item" onClick={() => navigate(`/detail/notice/${i + 1}`)}>
                    <div className="hsu-notice-date">{new Date(n.notice_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <p>{n.title} {n.is_new == 1 && <span className="hsu-new-tag">NEW</span>}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="hsu-upcoming" id="academics">
              <div className="hsu-section-title">
                <h2>Academic Calendar & Events</h2>
              </div>
              <div className="hsu-event-mini">
                <div className="hsu-ev-date">22<br/><span>MAY</span></div>
                <div className="hsu-ev-info">
                  <h4>Annual Convocation 2026</h4>
                  <p>Chief Guest: Hon'ble Education Minister</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="hsu-footer">
        <div className="hsu-container">
          <div className="hsu-footer-grid">
            <div className="hsu-footer-col">
              <h3>Heritage State University</h3>
              <p>A leading public state university dedicated to excellence in higher education and research.</p>
              <div className="hsu-footer-contact">
                <p><MapPin size={16} /> University Road, Sector 9, Ahmedabad, Gujarat</p>
                <p><Phone size={16} /> +91 79 2630 1341</p>
              </div>
            </div>
            <div className="hsu-footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">About US</a></li>
                <li><a href="#">Governance</a></li>
                <li><a href="#">Mission & Vision</a></li>
                <li><a href="#">University Map</a></li>
              </ul>
            </div>
            <div className="hsu-footer-col">
              <h3>Student Corner</h3>
              <ul>
                <li><a href="#">Examination Schedule</a></li>
                <li><a href="#">Results Portal</a></li>
                <li><a href="#">Scholarships</a></li>
                <li><a href="#">Placement Cell</a></li>
              </ul>
            </div>
            <div className="hsu-footer-col">
              <h3>Useful Portals</h3>
              <div className="hsu-portal-links">
                <a href="#">Digital Gujarat</a>
                <a href="#">GU Library</a>
                <a href="#">Alumni Portal</a>
              </div>
            </div>
          </div>
          <div className="hsu-footer-bottom">
            <p>&copy; 2026 Heritage State University. All Rights Reserved. Designed for Educational Purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
