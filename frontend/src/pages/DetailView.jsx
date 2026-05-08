import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Calendar, ClipboardList, Info } from 'lucide-react';
import { detailData } from '../data/portals';
import Navbar from '../components/Navbar';
import './InfoPortal.css'; // Reusing portal styles for consistency

const DetailView = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  
  const category = detailData[type];
  const item = category ? category[id] : null;

  if (!item) {
    return (
      <div className="not-found-container">
        <h2>Content Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const iconMap = {
    notice: Bell,
    exam: ClipboardList,
    roadmap: Calendar
  };

  const Icon = iconMap[type] || Info;

  return (
    <div className="portal-root">
      <Navbar />
      
      <div className="portal-header detail-header">
        <div className="portal-container">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)} 
            className="back-btn"
          >
            <ArrowLeft size={18} /> Back
          </motion.button>
          
          <div className="portal-title-section">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="portal-icon-wrapper" 
              style={{ backgroundColor: '#1e293b' }}
            >
              <Icon size={32} color="white" />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <span className="type-badge">{type.toUpperCase()}</span>
              <h1>{item.title}</h1>
              <p className="portal-subtitle">{item.date || item.year}</p>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="portal-container">
        <div className="portal-grid">
          <div className="portal-main-content">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="portal-section-card detail-body"
            >
              <div className="detail-content">
                {item.content.split('\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: '1.5rem' }}>{para}</p>
                ))}
              </div>
              
              {item.author && (
                <div className="detail-footer-info">
                  <p><strong>Published By:</strong> {item.author}</p>
                </div>
              )}
            </motion.section>
          </div>

          <aside className="portal-sidebar">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="contact-card"
            >
              <h4>Important Note</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                This is an official communication from Zenith Global University. Please follow the instructions provided above.
              </p>
            </motion.div>
          </aside>
        </div>
      </main>

      <footer className="portal-footer">
        <p>&copy; 2026 Zenith Global University. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default DetailView;
