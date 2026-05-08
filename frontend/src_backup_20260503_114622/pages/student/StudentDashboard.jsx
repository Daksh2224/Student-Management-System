import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import CollegeHome from '../CollegeHome';
import Navbar from '../../components/Navbar';
import {
  LayoutDashboard, BookOpen, Calendar, CreditCard,
  ClipboardCheck, Bell, LogOut, ChevronRight, User,
  TrendingUp, AlertCircle, CheckCircle, Clock, Menu, X, Users, Star, MapPin, Landmark, Loader2
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const student = {
  name: 'Alex Johnson',
  rollNo: 'CS-2023-042',
  course: 'Computer Science',
  semester: '4th Semester',
  avatar: 'AJ',
};

const stats = [
  { label: 'Attendance', value: '87%', icon: ClipboardCheck, color: '#10B981', bg: '#ECFDF5', trend: '+2% this month' },
  { label: 'GPA', value: '3.8', icon: TrendingUp, color: '#4F46E5', bg: '#EEF2FF', trend: 'Top 10% of class' },
  { label: 'Fee Status', value: 'Paid', icon: CreditCard, color: '#F59E0B', bg: '#FFFBEB', trend: 'Next due: Aug 2025' },
  { label: 'Pending Tasks', value: '3', icon: AlertCircle, color: '#EF4444', bg: '#FEF2F2', trend: '2 assignments due soon' },
];

const schedule = [
  { time: '09:00 AM', subject: 'Data Structures', room: 'Lab 3', type: 'Practical', status: 'upcoming' },
  { time: '11:00 AM', subject: 'Operating Systems', room: 'Room 204', type: 'Lecture', status: 'upcoming' },
  { time: '01:00 PM', subject: 'Lunch Break', room: '—', type: 'Break', status: 'break' },
  { time: '02:00 PM', subject: 'Computer Networks', room: 'Room 101', type: 'Lecture', status: 'upcoming' },
  { time: '04:00 PM', subject: 'DBMS Lab', room: 'Lab 1', type: 'Practical', status: 'upcoming' },
];

const attendance = [
  { subject: 'Data Structures', attended: 28, total: 32, pct: 87 },
  { subject: 'Operating Systems', attended: 24, total: 30, pct: 80 },
  { subject: 'Computer Networks', attended: 31, total: 34, pct: 91 },
  { subject: 'DBMS', attended: 25, total: 28, pct: 89 },
  { subject: 'Software Engg.', attended: 18, total: 25, pct: 72 },
];

const notifications = [
  { id: 1, text: 'Assignment 3 due in 2 days', type: 'warning', time: '2h ago' },
  { id: 2, text: 'Fee receipt uploaded successfully', type: 'success', time: '1d ago' },
  { id: 3, text: 'Mid-term results published', type: 'info', time: '2d ago' },
  { id: 4, text: 'Class cancelled: OS (Tomorrow)', type: 'error', time: '3d ago' },
];

const courses = [
  { name: 'Data Structures', code: 'CS301', credits: 4, grade: 'A', progress: 70 },
  { name: 'Operating Systems', code: 'CS302', credits: 3, grade: 'B+', progress: 55 },
  { name: 'Computer Networks', code: 'CS303', credits: 4, grade: 'A-', progress: 65 },
  { name: 'DBMS', code: 'CS304', credits: 4, grade: 'A', progress: 80 },
  { name: 'Software Engineering', code: 'CS305', credits: 3, grade: 'B', progress: 45 },
];

const fees = [
  { term: 'Semester 4', amount: '45000', due_date: 'Aug 15, 2025', status: 'Paid', paid_amount: '45000' },
  { term: 'Semester 3', amount: '45000', due_date: 'Jan 15, 2025', status: 'Paid', paid_amount: '45000' },
  { term: 'Semester 2', amount: '42000', due_date: 'Aug 15, 2024', status: 'Paid', paid_amount: '42000' },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`sd-nav-item ${active ? 'active' : ''}`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

const StatCard = ({ label, value, icon: Icon, color, bg, trend }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.1)' }}
    transition={{ duration: 0.2 }}
    className="sd-stat-card"
  >
    <div className="sd-stat-icon" style={{ background: bg, color }}>
      <Icon size={22} />
    </div>
    <div>
      <p className="sd-stat-value" style={{ color }}>{value}</p>
      <p className="sd-stat-label">{label}</p>
      <p className="sd-stat-trend">{trend}</p>
    </div>
  </motion.div>
);

// ─── Views ────────────────────────────────────────────────────────────────────
const MyPortalView = ({ stats: displayStats }) => (
  <div className="sd-view">
    <div className="sd-stats-grid">
      {(displayStats || stats).map((s, i) => (
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

    <div className="sd-two-col">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="sd-card"
      >
        <div className="sd-card-header">
          <Calendar size={18} />
          <h3>Today's Schedule</h3>
        </div>
        <div className="sd-schedule-list">
          {schedule.map((item, i) => (
            <div key={i} className={`sd-schedule-item ${item.status}`}>
              <div className="sd-time">{item.time}</div>
              <div className="sd-schedule-info">
                <p className="sd-subject">{item.subject}</p>
                <p className="sd-room">{item.room} · {item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
        className="sd-card"
      >
        <div className="sd-card-header">
          <Bell size={18} />
          <h3>My Notifications</h3>
        </div>
        <div className="sd-notif-list">
          {notifications.map((n) => (
            <div key={n.id} className={`sd-notif-item sd-notif-${n.type}`}>
              <div className="sd-notif-dot" />
              <div>
                <p>{n.text}</p>
                <span>{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

const AttendanceView = ({ data, list }) => {
  const pct = data.total > 0 ? Math.round((data.attended / data.total) * 100) : 0;
  
  return (
    <div className="sd-view">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sd-card" style={{ marginBottom: '1.5rem' }}>
        <div className="sd-card-header">
          <ClipboardCheck size={18} />
          <h3>Attendance Summary</h3>
        </div>
        <div className="sd-attendance-grid">
          <div className="sd-att-summary-box" style={{ background: '#ECFDF5', color: '#10B981' }}>
            <p className="sd-att-big">{pct}%</p>
            <p>Overall Attendance</p>
          </div>
          <div className="sd-att-summary-box" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
            <p className="sd-att-big">{data.attended}</p>
            <p>Classes Attended</p>
          </div>
          <div className="sd-att-summary-box" style={{ background: '#FEF2F2', color: '#EF4444' }}>
            <p className="sd-att-big">{data.total - data.attended}</p>
            <p>Classes Missed</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="sd-card">
        <div className="sd-card-header">
          <BookOpen size={18} />
          <h3>Subject-wise Attendance</h3>
        </div>
        <div>
          {(list && list.length > 0 ? list : attendance).map((a, i) => {
            const subjectTotal = parseInt(a.total) || 1;
            const subjectAttended = parseInt(a.attended) || 0;
            const subjectPct = Math.round((subjectAttended / subjectTotal) * 100);
            return (
              <div key={i} className="sd-att-row">
                <div className="sd-att-row-header">
                  <span className="sd-att-subject">{a.subject}</span>
                  <span className={`sd-att-pct ${subjectPct < 75 ? 'danger' : subjectPct < 85 ? 'warn' : 'ok'}`}>
                    {subjectPct}%
                  </span>
                </div>
                <div className="sd-progress-track">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${subjectPct}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className="sd-progress-bar"
                    style={{ background: subjectPct < 75 ? '#EF4444' : subjectPct < 85 ? '#F59E0B' : '#10B981' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

const CoursesView = () => (
  <div className="sd-view">
    <div className="sd-courses-grid">
      {courses.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.1)' }}
          className="sd-course-card"
        >
          <div className="sd-course-header">
            <div className="sd-course-icon">
              <BookOpen size={20} />
            </div>
            <span className="sd-course-code">{c.code}</span>
          </div>
          <h4 className="sd-course-name">{c.name}</h4>
          <p className="sd-course-credits">{c.credits} Credits</p>

          <div className="sd-course-progress-row">
            <span>Progress</span>
            <span>{c.progress}%</span>
          </div>
          <div className="sd-progress-track">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${c.progress}%` }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: 'easeOut' }}
              className="sd-progress-bar"
              style={{ background: '#4F46E5' }}
            />
          </div>

          <div className="sd-course-footer">
            <span>Current Grade</span>
            <span className="sd-grade-badge">{c.grade}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ScheduleView = ({ exams }) => (
  <div className="sd-view">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sd-card">
      <div className="sd-card-header">
        <Calendar size={18} />
        <h3>Examination Schedule</h3>
      </div>
      {exams && exams.length > 0 ? (
        exams.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="sd-week-item"
            style={{ marginBottom: '1rem' }}
          >
            <div className="sd-time-pill">{item.exam_date}</div>
            <div>
              <p className="sd-subject">{item.subject}</p>
              <p className="sd-room">{item.room} · {item.exam_name}</p>
            </div>
            <span className={`sd-type-badge ${item.status === 'Upcoming' ? 'lecture' : 'practical'}`}>
              {item.status}
            </span>
          </motion.div>
        ))
      ) : (
        <p style={{ color: '#64748B' }}>No exams scheduled at this time.</p>
      )}
    </motion.div>
  </div>
);

const FeesView = ({ fees: dynamicFees }) => {
  const displayFees = dynamicFees && dynamicFees.length > 0 ? dynamicFees : fees;
  const totalDue = displayFees.filter(f => f.status === 'Pending').reduce((acc, f) => acc + parseInt(f.amount || 0), 0);
  const totalPaid = displayFees.filter(f => f.status === 'Paid').reduce((acc, f) => acc + parseInt(f.paid_amount || f.amount || 0), 0);

  return (
    <div className="sd-view">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sd-card" style={{ marginBottom: '1.5rem' }}>
        <div className="sd-card-header">
          <CreditCard size={18} />
          <h3>Fee Overview</h3>
        </div>
        <div className="sd-fees-summary">
          <div className="sd-fee-box" style={{ background: '#ECFDF5', color: '#10B981' }}>
            <CheckCircle size={24} />
            <p className="sd-fee-big">₹{totalPaid.toLocaleString()}</p>
            <p>Total Paid</p>
          </div>
          <div className="sd-fee-box" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
            <Clock size={24} />
            <p className="sd-fee-big">₹{totalDue.toLocaleString()}</p>
            <p>Pending Due</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="sd-card">
        <div className="sd-card-header">
          <ClipboardCheck size={18} />
          <h3>Payment History</h3>
        </div>
        <div className="sd-fees-table">
          <div className="sd-fees-thead">
            <span>Term</span><span>Amount</span><span>Due Date</span><span>Status</span>
          </div>
          {displayFees.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="sd-fees-row"
            >
              <span className="sd-fees-term">{f.term}</span>
              <span>₹{parseInt(f.amount).toLocaleString()}</span>
              <span>{f.due_date || f.due}</span>
              <span className={`sd-status-badge ${f.status === 'Paid' ? 'paid' : 'pending'}`}>{f.status}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const navItems = [
  { key: 'overview', label: 'College Home', icon: LayoutDashboard },
  { key: 'my-portal', label: 'My Portal', icon: User },
  { key: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { key: 'courses', label: 'Courses', icon: BookOpen },
  { key: 'schedule', label: 'Schedule', icon: Calendar },
  { key: 'fees', label: 'Fees', icon: CreditCard },
];

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userId = user?.id || 1; // Fallback for demo
        const response = await fetch(`http://localhost/student_management_system/backend/get_student_dashboard.php?user_id=${userId}`);
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <Loader2 className="animate-spin" size={48} color="#003366" />
    </div>
  );

  const currentStudent = dashboardData?.student || { ...student, name: user?.name || student.name };
  const attList = dashboardData?.attendance || attendance;
  const feeList = dashboardData?.fees || fees;
  const examList = dashboardData?.exams || schedule.map(s => ({ exam_date: s.time, subject: s.subject, room: s.room, exam_name: s.type, status: s.status === 'upcoming' ? 'Upcoming' : 'Completed' }));
  
  const totalAttended = attList.reduce((acc, a) => acc + parseInt(a.attended || 0), 0);
  const totalPossible = attList.reduce((acc, a) => acc + parseInt(a.total || 1), 0);
  const overallPct = totalPossible > 0 ? Math.round((totalAttended / totalPossible) * 100) : 0;

  const dynamicStats = dashboardData?.stats || [
    { label: 'Attendance', value: `${overallPct}%`, icon: ClipboardCheck, color: '#10B981', bg: '#ECFDF5', trend: 'Mock Data' },
    { label: 'GPA', value: '3.8', icon: TrendingUp, color: '#4F46E5', bg: '#EEF2FF', trend: 'Top 10% of class' },
    { label: 'Fee Status', value: feeList[0]?.status || 'Paid', icon: CreditCard, color: '#F59E0B', bg: '#FFFBEB', trend: 'Next due: Aug 2025' },
    { label: 'Pending Tasks', value: notifications.length.toString(), icon: AlertCircle, color: '#EF4444', bg: '#FEF2F2', trend: '2 assignments due soon' },
  ];

  const currentViewMap = {
    overview: <CollegeHome role="student" />,
    'my-portal': <MyPortalView stats={dynamicStats} />,
    attendance: <AttendanceView data={{ attended: totalAttended, total: totalPossible }} list={attList} />,
    courses: <CoursesView />,
    schedule: <ScheduleView exams={examList} />,
    fees: <FeesView fees={feeList} />,
  };

  return (
    <div className="sd-root">
      <Navbar />
      <div className="sd-dashboard-container">
        <aside className={`sd-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sd-sidebar-brand" style={{ background: '#003366' }}>
            <div className="sd-brand-icon" style={{ background: '#F59E0B' }}>
              <Landmark size={22} />
            </div>
            <div>
              <p className="sd-brand-title">Portal</p>
              <p className="sd-brand-sub" style={{ fontSize: '0.65rem', opacity: 0.8, color: 'white' }}>Student Portal</p>
            </div>
          </div>

          <nav className="sd-nav">
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

          <div className="sd-sidebar-profile">
            <div className="sd-avatar">{currentStudent.avatar || currentStudent.name.charAt(0)}</div>
            <div className="sd-profile-info">
              <p className="sd-profile-name">{currentStudent.name}</p>
              <p className="sd-profile-roll">ID: {currentStudent.rollNo}</p>
            </div>
          </div>
        </aside>

        {sidebarOpen && <div className="sd-overlay" onClick={() => setSidebarOpen(false)} />}

        <div className="sd-main">
          <main className="sd-content" style={{ paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
               <button className="sd-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: 'block', color: '#003366', background: 'none', border: 'none' }}>
                <Menu size={24} />
              </button>
              <h2 className="sd-page-title" style={{ margin: 0 }}>
                {navItems.find(n => n.key === activeView)?.label}
              </h2>
            </div>

            {activeView === 'overview' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="sd-welcome-banner">
                <div>
                  <h2>Welcome back, {currentStudent.name.split(' ')[0]}! 👋</h2>
                  <p>{currentStudent.course} · {currentStudent.semester} · {currentStudent.rollNo}</p>
                </div>
                <div className="sd-welcome-badge">
                  <TrendingUp size={16} /> GPA 3.8
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

export default StudentDashboard;
