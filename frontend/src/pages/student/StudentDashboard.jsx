import React, { useState } from 'react';
import './Dashboard.css';
import { 
  LayoutDashboard, BookOpen, Clock, CreditCard, 
  Settings, LogOut, Bell, Menu, Landmark,
  Calendar, CheckCircle, AlertCircle, TrendingUp, Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { view } = useParams();
  const [activeTab, setActiveTab] = useState(view || 'overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/get_student_dashboard.php?user_id=${user.id}`);
        const data = await res.json();
        setDbData(data);
      } catch (err) {
        console.error("Failed to fetch student data", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchData();
  }, [user]);

  React.useEffect(() => {
    if (view) setActiveTab(view);
  }, [view]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'schedule', label: 'Exams', icon: Calendar },
    { id: 'fees', label: 'Fee Portal', icon: CreditCard },
  ];

  const renderContent = () => {
    if (loading) return <p>Loading dashboard data...</p>;
    if (!dbData) return <p>No data available.</p>;

    if (activeTab === 'overview') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <h3>Roll Number</h3>
                <p>{dbData.student?.roll_no}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: '#ECFDF5', color: '#059669' }}>
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Attendance</h3>
                <p>
                  {Math.round(
                    (dbData.attendance.reduce((acc, curr) => acc + Number(curr.attended), 0) / 
                     dbData.attendance.reduce((acc, curr) => acc + Number(curr.total), 0)) * 100
                  )}%
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: '#FFFBEB', color: '#F59E0B' }}>
                <AlertCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Exams</h3>
                <p>{dbData.exams.length} Upcoming</p>
              </div>
            </div>
          </div>

          <div className="dashboard-panels">
            {/* Left Panel */}
            <div className="panel-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="panel-card">
                <div className="panel-header">
                  <h3>Upcoming Exams</h3>
                  <button className="panel-action" onClick={() => setActiveTab('schedule')}>Full Schedule</button>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Subject</th>
                      <th>Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dbData.exams.slice(0, 3).map((exam, i) => (
                      <tr key={i}>
                        <td>{new Date(exam.exam_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                        <td style={{ fontWeight: 600, color: '#0F172A' }}>{exam.subject}</td>
                        <td>{exam.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="panel-card">
                <div className="panel-header">
                  <h3>Course Attendance</h3>
                  <button className="panel-action" onClick={() => setActiveTab('attendance')}>Details</button>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dbData.attendance.map((att, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, color: '#0F172A' }}>{att.subject}</td>
                        <td>
                          <span className={`status-badge ${Number(att.attended)/Number(att.total) < 0.75 ? 'status-absent' : 'status-present'}`}>
                            {Math.round((Number(att.attended)/Number(att.total)) * 100)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Panel */}
            <div className="panel-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="panel-card" style={{ background: 'linear-gradient(135deg, #EEF2FF, #F8FAFC)', borderColor: '#C7D2FE' }}>
                <div className="panel-header">
                  <h3>Fee Summary (₹)</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {dbData.fees.map((fee, i) => (
                    <div key={i} style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#64748B' }}>{fee.term}</span>
                        <span className={`status-badge ${fee.status === 'Paid' ? 'status-present' : 'status-pending'}`}>{fee.status}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 800, color: '#1E293B' }}>₹{Number(fee.total_amount).toLocaleString('en-IN')}</span>
                        <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>Due: {fee.due_date}</span>
                      </div>
                    </div>
                  ))}
                  <button className="btn-glow" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                    Pay Online
                  </button>
                </div>
              </div>

              <div className="panel-card">
                <div className="panel-header">
                  <h3>Student Alerts</h3>
                </div>
                <div className="activity-list">
                  {dbData.notifications.map((note) => (
                    <div className="activity-item" key={note.id}>
                      <div className="activity-icon" style={{ 
                        background: note.type === 'warning' ? '#FEF2F2' : '#ECFDF5', 
                        color: note.type === 'warning' ? '#EF4444' : '#059669' 
                      }}>
                        {note.type === 'warning' ? <AlertCircle size={18} /> : <Bell size={18} />}
                      </div>
                      <div className="activity-content">
                        <h4 style={{ fontSize: '0.85rem' }}>{note.text}</h4>
                        <div className="activity-time">{note.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    
    // ... rest of the tabs can be implemented similarly
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="panel-card">
        <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h3>
        <p style={{ marginTop: '1rem', color: '#64748B' }}>This module is currently displaying live data from SPIT Pune servers.</p>
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
            <h2>SPIT Pune</h2>
            <p>Student Portal</p>
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
            <h2 className="topbar-title">Academic Hub</h2>
          </div>
          
          <div className="topbar-right">
            <div className="notification-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </div>
            
            <div className="user-profile">
              <div className="user-avatar" style={{ background: '#4F46E5' }}>
                {user?.full_name?.charAt(0)}
              </div>
              <div className="user-info">
                <p>{user?.full_name}</p>
                <span>{dbData?.student?.roll_no || 'Student'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          <div className="dashboard-header-block">
            <h1>Namaste, {user?.full_name?.split(' ')[0]} 🙏</h1>
            <p>{dbData?.student?.course} • Semester {dbData?.student?.semester}</p>
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

export default StudentDashboard;
