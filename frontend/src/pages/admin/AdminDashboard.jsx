import React, { useState } from 'react';
import '../student/Dashboard.css';
import { 
  LayoutDashboard, Users, BookOpen, CreditCard, 
  Settings, LogOut, Bell, Menu, Landmark,
  ClipboardCheck, ChevronRight, TrendingUp, Filter, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { view } = useParams();
  const [activeTab, setActiveTab] = useState(view || 'overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    if (view) setActiveTab(view);
  }, [view]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 'overview', label: 'Admin Portal', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'fees', label: 'Fees Control', icon: CreditCard },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminStats = [
    { label: 'Total Students', value: '1,540', icon: Users, color: '#4F46E5', bg: '#EEF2FF', trend: '+12% this year' },
    { label: 'Faculty', value: '142', icon: BookOpen, color: '#059669', bg: '#ECFDF5', trend: '8 New' },
    { label: 'Revenue', value: '₹4.2 Cr', icon: CreditCard, color: '#F59E0B', bg: '#FFFBEB', trend: '92% Collected' },
    { label: 'System Health', value: '98.5%', icon: TrendingUp, color: '#EF4444', bg: '#FEF2F2', trend: 'Optimal' },
  ];

  const recentRegistrations = [
    { id: 'CS-2023-001', name: 'Emily Chen', course: 'B.Tech CSE', date: 'Today' },
    { id: 'BA-2023-045', name: 'Marcus Johnson', course: 'MBA', date: 'Today' },
    { id: 'HS-2023-112', name: 'Sarah Williams', course: 'Health Sciences', date: 'Yesterday' },
    { id: 'LW-2023-089', name: 'David Lee', course: 'Law', date: 'Yesterday' },
  ];

  const systemAlerts = [
    { text: 'Fee collection report generated', type: 'success', time: '2h ago' },
    { text: '5 students attendance below 75%', type: 'warning', time: '4h ago' },
    { text: 'Mid-term results pending approval', type: 'info', time: '1d ago' },
  ];

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="stats-grid">
            {adminStats.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon-wrapper" style={{ background: s.bg, color: s.color }}>
                  <s.icon size={24} />
                </div>
                <div className="stat-content">
                  <h3>{s.label}</h3>
                  <p>{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-panels">
            {/* Left Panel */}
            <div className="panel-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="panel-card">
                <div className="panel-header">
                  <h3>Recent Registrations</h3>
                  <button className="panel-action">View All</button>
                </div>
                <div className="activity-list">
                  {recentRegistrations.map((reg, i) => (
                    <div className="activity-item" key={i} style={{ alignItems: 'center' }}>
                      <div className="activity-icon" style={{ background: '#F1F5F9', color: '#64748B' }}>
                        {reg.name.charAt(0)}
                      </div>
                      <div className="activity-content" style={{ flex: 1 }}>
                        <h4>{reg.name}</h4>
                        <p>{reg.id} • {reg.course}</p>
                      </div>
                      <div className="activity-time">{reg.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="panel-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="panel-card">
                <div className="panel-header">
                  <h3>System Alerts</h3>
                </div>
                <div className="activity-list">
                  {systemAlerts.map((alert, i) => {
                    const colorMap = {
                      success: { bg: '#ECFDF5', text: '#059669' },
                      warning: { bg: '#FFFBEB', text: '#F59E0B' },
                      info: { bg: '#EEF2FF', text: '#4F46E5' },
                    };
                    return (
                      <div className="activity-item" key={i}>
                        <div className="activity-icon" style={{ background: colorMap[alert.type].bg, color: colorMap[alert.type].text }}>
                          <Bell size={18} />
                        </div>
                        <div className="activity-content">
                          <h4 style={{ fontWeight: 500, fontSize: '0.85rem' }}>{alert.text}</h4>
                          <div className="activity-time">{alert.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="panel-card" style={{ background: 'linear-gradient(135deg, #EEF2FF, #F8FAFC)', borderColor: '#C7D2FE' }}>
                <div className="panel-header">
                  <h3>Quick Actions</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button className="btn-glow" style={{ width: '100%', justifyContent: 'center', background: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    Generate Reports
                  </button>
                  <button className="btn-glow" style={{ width: '100%', justifyContent: 'center', background: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    System Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="panel-card">
        <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h3>
        <p style={{ marginTop: '1rem', color: '#64748B' }}>This module is currently being built for the new light theme redesign.</p>
      </motion.div>
    );
  };

  return (
    <div className="dashboard-root">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo-box"><Landmark size={22} /></div>
          <div>
            <h2>ZGU Admin</h2>
            <p>Control Center</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div 
              key={item.id} 
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu size={24} />
            </button>
            <h2 className="topbar-title">Admin Dashboard</h2>
          </div>
          
          <div className="topbar-right">
            <div className="notification-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </div>
            
            <div className="user-profile">
              <div className="user-avatar" style={{ background: '#0F172A' }}>
                <User size={16} />
              </div>
              <div className="user-info">
                <p>{user?.name || 'Administrator'}</p>
                <span>System Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          <div className="dashboard-header-block">
            <h1>Overview</h1>
            <p>Welcome back! Here's what's happening at Zenith Global today.</p>
          </div>
          
          {renderContent()}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 40 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
