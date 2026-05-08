import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import CollegeHome from '../CollegeHome';
import Navbar from '../../components/Navbar';
import {
  LayoutDashboard, Users, BookOpen, CreditCard,
  ClipboardCheck, Bell, LogOut, ChevronRight, User,
  TrendingUp, Settings, Plus, Search, Filter, Mail, Phone, MapPin, Landmark, Menu, X, Loader2
} from 'lucide-react';

// ─── Sub-Components ───────────────────────────────────────────────────────────
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`ad-nav-item ${active ? 'active' : ''}`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

const StatCard = ({ label, value, icon: Icon, color, bg, trend }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.1)' }}
    className="ad-stat-card"
  >
    <div className="ad-stat-icon" style={{ background: bg, color }}>
      <Icon size={22} />
    </div>
    <div>
      <p className="ad-stat-value" style={{ color }}>{value}</p>
      <p className="ad-stat-label">{label}</p>
      <p className="ad-stat-trend">{trend}</p>
    </div>
  </motion.div>
);

// ─── Views ────────────────────────────────────────────────────────────────────
const AdminPortalView = ({ stats }) => (
  <div className="ad-view">
    <div className="ad-stats-grid">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <StatCard {...s} />
        </motion.div>
      ))}
    </div>

    <div className="ad-two-col">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="ad-card">
        <div className="ad-card-header">
          <Users size={18} />
          <h3>Recent Registrations</h3>
        </div>
        <div className="ad-list">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="ad-list-item">
              <div className="ad-item-avatar">{String.fromCharCode(64 + i)}</div>
              <div className="ad-item-info">
                <p className="ad-item-title">Student Name {i}</p>
                <p className="ad-item-sub">CS-2023-00{i} · B.Tech CSE</p>
              </div>
              <ChevronRight size={14} color="#CBD5E1" />
            </div>
          ))}
        </div>
        <button className="ad-btn-outline" style={{ width: '100%', marginTop: '1rem' }}>View All Students</button>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="ad-card">
        <div className="ad-card-header">
          <Bell size={18} />
          <h3>System Alerts</h3>
        </div>
        <div className="ad-notif-list">
          {[
            { t: 'Fee collection report generated', ty: 'success', time: '2h ago' },
            { t: '5 students attendance below 75%', ty: 'warning', time: '4h ago' },
            { t: 'Mid-term results pending approval', ty: 'info', time: '1d ago' },
          ].map((n, i) => (
            <div key={i} className={`ad-notif-item ad-notif-${n.ty}`}>
              <div className="ad-notif-dot" />
              <div>
                <p>{n.t}</p>
                <span>{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const navItems = [
  { key: 'overview', label: 'College Home', icon: LayoutDashboard },
  { key: 'admin-portal', label: 'Admin Portal', icon: Settings },
  { key: 'students', label: 'Students', icon: Users },
  { key: 'courses', label: 'Courses', icon: BookOpen },
  { key: 'fees', label: 'Fees Control', icon: CreditCard },
  { key: 'attendance', label: 'Attendance', icon: ClipboardCheck },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const adminStats = [
    { label: 'Total Students', value: '1,540', icon: Users, color: '#4F46E5', bg: '#EEF2FF', trend: '+12% this year' },
    { label: 'Faculty', value: '142', icon: BookOpen, color: '#10B981', bg: '#ECFDF5', trend: '8 New' },
    { label: 'Revenue', value: '₹4.2 Cr', icon: CreditCard, color: '#F59E0B', bg: '#FFFBEB', trend: '92% Collected' },
    { label: 'System Health', value: '98.5%', icon: TrendingUp, color: '#EF4444', bg: '#FEF2F2', trend: 'Optimal' },
  ];

  const currentViewMap = {
    overview: <CollegeHome role="admin" />,
    'admin-portal': <AdminPortalView stats={adminStats} />,
    students: <div className="ad-view"><div className="ad-card"><h3>Student Management</h3><p>Detailed student records and controls.</p></div></div>,
    courses: <div className="ad-view"><div className="ad-card"><h3>Course Catalog</h3><p>Manage curriculum and academic programs.</p></div></div>,
    fees: <div className="ad-view"><div className="ad-card"><h3>Fee Management</h3><p>Track payments and generate reports.</p></div></div>,
    attendance: <div className="ad-view"><div className="ad-card"><h3>Attendance System</h3><p>Monitor campus attendance and alerts.</p></div></div>,
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <Loader2 className="animate-spin" size={48} color="#003366" />
    </div>
  );

  return (
    <div className="ad-root">
      <Navbar />
      <div className="ad-dashboard-container">
        <aside className={`ad-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="ad-sidebar-brand" style={{ background: '#003366' }}>
            <div className="ad-brand-icon" style={{ background: '#F59E0B' }}>
              <Landmark size={22} />
            </div>
            <div>
              <p className="ad-brand-title">Control</p>
              <p className="hsu-brand-sub" style={{ fontSize: '0.65rem', opacity: 0.8, color: 'white' }}>Admin Portal</p>
            </div>
          </div>

          <nav className="ad-nav">
            {navItems.map((item) => (
              <NavItem
                key={item.key}
                {...item}
                active={activeView === item.key}
                onClick={() => { setActiveView(item.key); setSidebarOpen(false); }}
              />
            ))}
          </nav>

          <div style={{ padding: '0 1rem', marginTop: 'auto' }}>
             <button 
                className="ad-btn-outline" 
                style={{ width: '100%', marginBottom: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                onClick={() => navigate('/')}
              >
                Back to Main Site
              </button>
          </div>

          <div className="ad-sidebar-profile">
            <div className="ad-avatar">AD</div>
            <div className="ad-profile-info">
              <p className="ad-profile-name">{user?.name || 'Administrator'}</p>
              <p className="ad-profile-role">System Admin</p>
            </div>
          </div>
        </aside>

        {sidebarOpen && <div className="ad-overlay" onClick={() => setSidebarOpen(false)} />}

        <div className="ad-main">
          <main className="ad-content" style={{ paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
               <button className="ad-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: 'block', color: '#003366', background: 'none', border: 'none' }}>
                <Menu size={24} />
              </button>
              <h2 className="ad-page-title" style={{ margin: 0 }}>
                {navItems.find(n => n.key === activeView)?.label}
              </h2>
            </div>

            {activeView === 'overview' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="ad-welcome-banner">
                <div>
                  <h2>Admin Control Center</h2>
                  <p>Welcome, {user?.name || 'Administrator'}. You have full access to campus records.</p>
                </div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div key={activeView} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                {currentViewMap[activeView]}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
