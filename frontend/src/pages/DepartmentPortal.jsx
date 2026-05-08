import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Users, Target, CheckCircle } from 'lucide-react';
import { departmentsData } from '../data/departments';
import Navbar from '../components/Navbar';
import './DepartmentPortal.css';

const DepartmentPortal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dept = departmentsData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!dept) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Department Not Found</h2>
        <button onClick={() => navigate('/')} className="btn-glow" style={{ marginTop: '1rem' }}>Return Home</button>
      </div>
    );
  }

  return (
    <div className="dp-root">
      <Navbar />
      
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="dp-hero" style={{ backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 100%), url(${dept.coverImage})` }}>
        <div className="dp-hero-content">
          <button className="dp-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to University
          </button>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="dp-icon-badge">{dept.icon}</div>
            <h1>{dept.name}</h1>
            <p className="dp-mission">{dept.mission}</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="dp-hero-stats">
            <div className="dp-stat">
              <Clock size={18} />
              <div>
                <span>Duration</span>
                <strong>{dept.duration}</strong>
              </div>
            </div>
            <div className="dp-stat">
              <Users size={18} />
              <div>
                <span>Intake</span>
                <strong>{dept.intake}</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Main Content ──────────────────────────────────────── */}
      <div className="dp-container">
        <div className="dp-layout">
          
          {/* Left Column */}
          <div className="dp-main-col">
            <section className="dp-section">
              <div className="dp-section-header">
                <Target size={24} color="#4F46E5" />
                <h2>Overview & Vision</h2>
              </div>
              <p className="dp-overview-text">{dept.overview}</p>
            </section>

            <section className="dp-section">
              <div className="dp-section-header">
                <BookOpen size={24} color="#4F46E5" />
                <h2>Curriculum Structure</h2>
              </div>
              <div className="dp-curriculum">
                {dept.curriculum.map((curr, idx) => (
                  <div key={idx} className="dp-curr-card">
                    <div className="dp-curr-year">{curr.year}</div>
                    <ul className="dp-curr-subjects">
                      {curr.subjects.map((sub, i) => (
                        <li key={i}><CheckCircle size={14} color="#059669" /> {sub}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="dp-section">
              <div className="dp-section-header">
                <Users size={24} color="#4F46E5" />
                <h2>Distinguished Faculty</h2>
              </div>
              <div className="dp-faculty-grid">
                {dept.faculty.map((fac, idx) => (
                  <div key={idx} className="dp-faculty-card">
                    <div className="dp-faculty-img" style={{ backgroundImage: `url(${fac.image})` }} />
                    <div className="dp-faculty-info">
                      <h4>{fac.name}</h4>
                      <span className="dp-role">{fac.role}</span>
                      <p className="dp-expertise">{fac.expertise}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column / Sidebar */}
          <div className="dp-side-col">
            <div className="dp-apply-card">
              <h3>Join {dept.name}</h3>
              <p>Admissions for Fall 2026 are currently open. Begin your journey of excellence today.</p>
              <button className="dp-btn-primary" onClick={() => navigate('/signup')}>Apply Now</button>
              <button className="dp-btn-outline" onClick={() => window.open('/brochure.pdf', '_blank')}>Download Brochure</button>
            </div>

            <div className="dp-gallery-card">
              <h3>Campus Life & Facilities</h3>
              <div className="dp-gallery-grid">
                {dept.gallery.map((img, idx) => (
                  <div key={idx} className="dp-gallery-img" style={{ backgroundImage: `url(${img})` }} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DepartmentPortal;
