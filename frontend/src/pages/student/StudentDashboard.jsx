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
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'fees', label: 'Fee Portal', icon: CreditCard },
  ];

  const studentData = {
    name: "Alex Johnson",
    id: "STU-2024-089",
    course: "B.Tech Computer Science",
    semester: "Semester 4",
    attendance: "85%",
    cgpa: "3.8/4.0",
    upcomingClasses: [
      { id: 1, subject: "Data Structures", time: "10:00 AM", room: "Lab 3" },
      { id: 2, subject: "Database Systems", time: "11:30 AM", room: "Room 402" },
      { id: 3, subject: "Web Engineering", time: "02:00 PM", room: "Lab 1" }
    ],
    recentGrades: [
      { id: 1, subject: "Operating Systems", grade: "A", date: "May 01, 2026" },
      { id: 2, subject: "Computer Networks", grade: "A-", date: "Apr 28, 2026" },
      { id: 3, subject: "Software Engineering", grade: "B+", date: "Apr 25, 2026" }
    ],
    feeStatus: {
      total: "$4,500",
      paid: "$2,250",
      due: "$2,250",
      dueDate: "June 15, 2026"
    }
  };

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <h3>Current CGPA</h3>
                <p>{studentData.cgpa}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: '#ECFDF5', color: '#059669' }}>
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Attendance</h3>
                <p>{studentData.attendance}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: '#FFFBEB', color: '#F59E0B' }}>
                <AlertCircle size={24} />
              </div>
              <div className="stat-content">
                <h3>Upcoming Tasks</h3>
                <p>4 Due Soon</p>
              </div>
            </div>
          </div>

          <div className="dashboard-panels">
            {/* Left Panel */}
            <div className="panel-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="panel-card">
                <div className="panel-header">
                  <h3>Today's Schedule</h3>
                  <button className="panel-action">Full Timetable</button>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Subject</th>
                      <th>Room</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.upcomingClasses.map((cls) => (
                      <tr key={cls.id}>
                        <td>{cls.time}</td>
                        <td style={{ fontWeight: 600, color: '#0F172A' }}>{cls.subject}</td>
                        <td>{cls.room}</td>
                        <td><span className="status-badge status-pending">Upcoming</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="panel-card">
                <div className="panel-header">
                  <h3>Recent Grades</h3>
                  <button className="panel-action">Transcript</button>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                      <th>Posted Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.recentGrades.map((grade) => (
                      <tr key={grade.id}>
                        <td style={{ fontWeight: 600, color: '#0F172A' }}>{grade.subject}</td>
                        <td><span className="status-badge status-present">{grade.grade}</span></td>
                        <td>{grade.date}</td>
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
                  <h3>Fee Summary</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                    <span style={{ color: '#64748B' }}>Total Fees</span>
                    <span style={{ fontWeight: 600 }}>{studentData.feeStatus.total}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                    <span style={{ color: '#64748B' }}>Paid Amount</span>
                    <span style={{ fontWeight: 600, color: '#059669' }}>{studentData.feeStatus.paid}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Amount Due</span>
                    <span style={{ fontWeight: 800, color: '#EF4444' }}>{studentData.feeStatus.due}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#EF4444', marginTop: '0.5rem' }}>Due by {studentData.feeStatus.dueDate}</p>
                  <button className="btn-glow" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                    Pay Now
                  </button>
                </div>
              </div>

              <div className="panel-card">
                <div className="panel-header">
                  <h3>Announcements</h3>
                </div>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon" style={{ background: '#FEF2F2', color: '#EF4444' }}><AlertCircle size={18} /></div>
                    <div className="activity-content">
                      <h4>Library Book Due</h4>
                      <p>Advanced React Patterns is due tomorrow.</p>
                      <div className="activity-time">2 hours ago</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon" style={{ background: '#ECFDF5', color: '#059669' }}><CheckCircle size={18} /></div>
                    <div className="activity-content">
                      <h4>Assignment Graded</h4>
                      <p>Prof. Smith posted grades for Assignment 3.</p>
                      <div className="activity-time">Yesterday</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    if (activeTab === 'courses') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="dashboard-panels" style={{ gridTemplateColumns: '1fr' }}>
          <div className="panel-card">
            <div className="panel-header">
              <h3>Enrolled Courses</h3>
              <button className="btn-glow" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Course Registration</button>
            </div>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '1rem' }}>
              {[
                { name: 'Data Structures', code: 'CS201', prof: 'Dr. Alan Turing', credits: 4, progress: 65, color: '#4F46E5' },
                { name: 'Database Systems', code: 'CS205', prof: 'Dr. E. Codd', credits: 4, progress: 40, color: '#059669' },
                { name: 'Web Engineering', code: 'CS210', prof: 'Tim Berners-Lee', credits: 3, progress: 85, color: '#F59E0B' },
                { name: 'Discrete Math', code: 'MA105', prof: 'Dr. John Nash', credits: 3, progress: 55, color: '#EF4444' }
              ].map((c, i) => (
                <div key={i} className="panel-card" style={{ boxShadow: 'none', border: '1px solid #E2E8F0', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ background: `${c.color}15`, color: c.color, padding: '0.4rem', borderRadius: '8px' }}><BookOpen size={20} /></div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', background: '#F1F5F9', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{c.credits} Credits</span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>{c.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.5rem' }}>{c.code} • {c.prof}</p>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                      <span style={{ color: '#64748B' }}>Course Progress</span>
                      <span style={{ color: c.color }}>{c.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${c.progress}%`, height: '100%', background: c.color, borderRadius: '3px' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'attendance') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="dashboard-panels">
          <div className="panel-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="panel-card">
              <div className="panel-header">
                <h3>Attendance Summary</h3>
                <span className="status-badge status-present">Excellent</span>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Total Classes</th>
                    <th>Attended</th>
                    <th>Percentage</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { sub: 'Data Structures', total: 40, att: 36, perc: 90, status: 'status-present', text: 'Good' },
                    { sub: 'Database Systems', total: 35, att: 28, perc: 80, status: 'status-present', text: 'Good' },
                    { sub: 'Web Engineering', total: 30, att: 29, perc: 96, status: 'status-present', text: 'Excellent' },
                    { sub: 'Discrete Math', total: 42, att: 28, perc: 66, status: 'status-absent', text: 'Low' }
                  ].map((a, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{a.sub}</td>
                      <td>{a.total}</td>
                      <td>{a.att}</td>
                      <td style={{ fontWeight: 700, color: a.perc < 75 ? '#EF4444' : '#0F172A' }}>{a.perc}%</td>
                      <td><span className={`status-badge ${a.status}`}>{a.text}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="panel-column">
             <div className="panel-card" style={{ background: '#0F172A', color: 'white', borderColor: '#1E293B' }}>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Attendance Policy</h3>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6 }}>
                  A minimum of <strong>75% attendance</strong> is strictly required in all enrolled subjects to be eligible for the semester-end examinations.
                </p>
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.8rem', color: '#F87171', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={16} /> Warning
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '0.4rem' }}>You have one subject below the required threshold. Please contact your instructor.</p>
                </div>
             </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'schedule') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="panel-card">
            <div className="panel-header">
              <h3>Weekly Schedule</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-glow" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0', boxShadow: 'none' }}>Download PDF</button>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginTop: '1rem' }}>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <div key={day} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem', textAlign: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>{day}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[1,2].map(slot => (
                      <div key={slot} style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', borderLeft: `3px solid ${day === 'Monday' ? '#4F46E5' : '#059669'}` }}>
                        <p style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginBottom: '0.2rem' }}>10:00 AM - 11:30 AM</p>
                        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Data Structures</p>
                        <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>Room 402</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'fees') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="dashboard-panels">
          <div className="panel-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="panel-card">
               <div className="panel-header">
                <h3>Transaction History</h3>
                <button className="panel-action">View Statements</button>
              </div>
              <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jan 15, 2026</td>
                      <td style={{ fontWeight: 600 }}>Semester 4 Tuition Fee</td>
                      <td>$2,250</td>
                      <td><span className="status-badge status-present">Paid</span></td>
                    </tr>
                    <tr>
                      <td>Jan 10, 2026</td>
                      <td style={{ fontWeight: 600 }}>Library Fine</td>
                      <td>$15</td>
                      <td><span className="status-badge status-present">Paid</span></td>
                    </tr>
                    <tr>
                      <td>Aug 20, 2025</td>
                      <td style={{ fontWeight: 600 }}>Semester 3 Tuition Fee</td>
                      <td>$2,250</td>
                      <td><span className="status-badge status-present">Paid</span></td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
          <div className="panel-column">
             <div className="panel-card" style={{ background: 'linear-gradient(135deg, #EEF2FF, #F8FAFC)', borderColor: '#C7D2FE' }}>
                <div className="panel-header">
                  <h3>Current Balance</h3>
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>{studentData.feeStatus.due}</h2>
                <p style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>Due by {studentData.feeStatus.dueDate}</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#64748B' }}>Tuition</span>
                    <span style={{ fontWeight: 600 }}>$2,000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#64748B' }}>Lab Fees</span>
                    <span style={{ fontWeight: 600 }}>$150</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#64748B' }}>Tech Fee</span>
                    <span style={{ fontWeight: 600 }}>$100</span>
                  </div>
                </div>

                <button className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>Proceed to Payment</button>
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
            <h2>ZGU Portal</h2>
            <p>Student</p>
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
            <h2 className="topbar-title">Student Dashboard</h2>
          </div>
          
          <div className="topbar-right">
            <div className="notification-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </div>
            
            <div className="user-profile">
              <div className="user-avatar">
                {studentData.name.charAt(0)}
              </div>
              <div className="user-info">
                <p>{studentData.name}</p>
                <span>{studentData.id}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          <div className="dashboard-header-block">
            <h1>Welcome back, {studentData.name.split(' ')[0]} 👋</h1>
            <p>{studentData.course} • {studentData.semester}</p>
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
