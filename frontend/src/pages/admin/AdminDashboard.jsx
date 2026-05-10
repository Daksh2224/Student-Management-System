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
    { id: 'students', label: 'Student Directory', icon: Users },
    { id: 'teachers', label: 'Faculty List', icon: BookOpen },
    { id: 'fees', label: 'Fee Records', icon: CreditCard },
    { id: 'notices', label: 'Notice Board', icon: ClipboardCheck },
    { id: 'settings', label: 'System Config', icon: Settings },
  ];

  const adminStats = [
    { label: 'Total Students', value: '1,540', icon: Users, color: '#4F46E5', bg: '#EEF2FF', trend: '+12% this year' },
    { label: 'Total Faculty', value: '142', icon: BookOpen, color: '#059669', bg: '#ECFDF5', trend: '8 New' },
    { label: 'Annual Revenue', value: '₹4.2 Cr', icon: CreditCard, color: '#F59E0B', bg: '#FFFBEB', trend: '92% Collected' },
    { label: 'System Status', value: 'Online', icon: TrendingUp, color: '#EF4444', bg: '#FEF2F2', trend: 'Optimal' },
  ];

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  React.useEffect(() => {
    if (activeTab === 'students') {
      setDataLoading(true);
      fetch('http://localhost:8000/get_all_students.php')
        .then(res => res.json())
        .then(data => { setStudents(data); setDataLoading(false); });
    } else if (activeTab === 'teachers') {
      setDataLoading(true);
      fetch('http://localhost:8000/get_all_teachers.php')
        .then(res => res.json())
        .then(data => { setTeachers(data); setDataLoading(false); });
    }
  }, [activeTab]);

  const recentRegistrations = [
    { id: 'CE2023001', name: 'Aryan Sharma', course: 'B.E. Comp', date: 'Today' },
    { id: 'IT2024045', name: 'Ananya Iyer', course: 'B.E. IT', date: 'Today' },
    { id: 'ME2023112', name: 'Vikram Malhotra', course: 'M.E. DS', date: 'Yesterday' },
  ];

  const systemAlerts = [
    { text: 'Admission portal for 2026-27 is live', type: 'success', time: '2h ago' },
    { text: 'Monthly salary disbursement completed', type: 'success', time: '5h ago' },
    { text: 'Pending fee reminders sent to 45 parents', type: 'info', time: '1d ago' },
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
                  <h3>Recent Student Enrolments</h3>
                  <button className="panel-action" onClick={() => setActiveTab('students')}>View All</button>
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
                  <h3>System Status & Alerts</h3>
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

              <div className="panel-card indian-action-card">
                <div className="panel-header">
                  <h3>Quick Management</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button className="btn-glow action-btn">
                    Update Academic Calendar
                  </button>
                  <button className="btn-glow action-btn">
                    Publish Exam Results
                  </button>
                  <button className="btn-glow action-btn secondary">
                    Manage Fees Structure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'students') {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="panel-card">
          <div className="panel-header">
            <h3>Student Directory</h3>
            <div className="header-actions">
              <button className="panel-action secondary"><Filter size={14} /> Filter</button>
              <button className="panel-action primary">+ Add Student</button>
            </div>
          </div>
          {dataLoading ? <p>Loading directory...</p> : (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Semester</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id}>
                      <td><code className="roll-code">{s.roll_no}</code></td>
                      <td><strong>{s.full_name}</strong><br/><small>{s.email}</small></td>
                      <td>{s.course}</td>
                      <td>Sem {s.semester}</td>
                      <td>{s.phone}</td>
                      <td><button className="text-btn">View Report</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      );
    }

    if (activeTab === 'teachers') {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="panel-card">
          <div className="panel-header">
            <h3>Faculty Management</h3>
            <button className="panel-action primary">+ New Faculty</button>
          </div>
          {dataLoading ? <p>Loading faculty list...</p> : (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Emp ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(t => (
                    <tr key={t.id}>
                      <td><code className="roll-code">{t.employee_id}</code></td>
                      <td><strong>{t.full_name}</strong><br/><small>{t.email}</small></td>
                      <td>{t.department}</td>
                      <td>{t.designation}</td>
                      <td><button className="text-btn">Manage</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="panel-card">
        <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h3>
        <p style={{ marginTop: '1rem', color: '#64748B' }}>This module is currently being configured for the 2026 academic session.</p>
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
            <h2>SPIT Admin</h2>
            <p>Control Hub</p>
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
            <h2 className="topbar-title">Institutional Overview</h2>
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
                <p>{user?.full_name || 'Administrator'}</p>
                <span>Principal / Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          <div className="dashboard-header-block">
            <h1>{activeTab === 'overview' ? 'Administration Dashboard' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p>Savitribai Phule Institute of Technology • Integrated Management System</p>
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
