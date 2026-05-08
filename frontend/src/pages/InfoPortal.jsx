import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, FileText, Award, BookOpen, Rocket, Users, Globe, UserCheck, Download, Mail, Phone, MapPin 
} from 'lucide-react';
import { portalsData } from '../data/portals';
import Navbar from '../components/Navbar';
import './InfoPortal.css';

const iconMap = {
  FileText, Award, BookOpen, Rocket, Users, Globe, UserCheck, Download
};

const InfoPortal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = portalsData[id];

  if (!data) {
    return (
      <div className="not-found-container">
        <h2>Portal Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const Icon = iconMap[data.icon] || Globe;

  return (
    <div className="portal-root">
      <Navbar />
      
      <div className="portal-header" style={{ background: `linear-gradient(135deg, ${data.color}22 0%, ${data.color}11 100%)` }}>
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
              style={{ backgroundColor: data.color }}
            >
              <Icon size={32} color="white" />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h1>{data.title}</h1>
              <p className="portal-subtitle">{data.description}</p>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="portal-container">
        <div className="portal-grid">
          <div className="portal-main-content">
            {data.sections.map((section, idx) => (
              <motion.section 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="portal-section-card"
              >
                <h3>{section.title}</h3>
                <p>{section.content}</p>
              </motion.section>
            ))}
          </div>

          <aside className="portal-sidebar">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="contact-card"
            >
              <h4>Contact Information</h4>
              <div className="contact-details">
                <p>{data.contact}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="quick-actions-card"
            >
              <h4>Quick Actions</h4>
              <button 
                className="action-btn-primary" 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/university_prospectus.pdf';
                  link.download = `${data.title.replace(/\s+/g, '_')}_Details.pdf`;
                  link.click();
                }}
              >
                Download PDF
              </button>
              <button 
                className="action-btn-outline"
                onClick={() => window.location.href = `mailto:info@zenith.edu?subject=Inquiry about ${data.title}`}
              >
                Request Info
              </button>
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

export default InfoPortal;
