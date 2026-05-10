import React, { useState, useEffect } from 'react';
import '../student/Dashboard.css';
import './ParentDashboard.css';
import { 
  Users, CreditCard, ClipboardCheck, Bell, 
  LogOut, Landmark, User, FileText, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ParentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`http://localhost:8000/get_parent_dashboard.php?user_id=${user.id}`);
        const data = await res.json();
        setDashboardData(data);
        if (data.children && data.children.length > 0) {
          setSelectedChild(data.children[0]);
        }
      } catch (err) {
        console.error("Failed to fetch parent dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchDashboard();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="loading-screen">Loading Parent Portal...</div>;

  return (
    <div className="dashboard-root">
      {/* Sidebar (Simplified for Parents) */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo-box"><Landmark size={22} /></div>
          <div>
            <h2>Parent Portal</h2>
            <p>SPIT Pune</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-nav-item active">
            <Users size={20} />
            <span>Child Performance</span>
          </div>
          <div className="sidebar-nav-item">
            <CreditCard size={20} />
            <span>Fee Reports</span>
          </div>
          <div className="sidebar-nav-item">
            <Bell size={20} />
            <span>Notices</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <h2 className="topbar-title">Guardian Dashboard</h2>
          <div className="user-profile">
            <div className="user-avatar" style={{ background: '#4F46E5' }}>
              <User size={16} />
            </div>
            <div className="user-info">
              <p>{user?.full_name || 'Guardian'}</p>
              <span>Parent</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-header-block">
            <h1>Welcome, {user?.full_name?.split(' ')[0]}</h1>
            <p>Monitor your child's academic progress and institutional reports.</p>
          </div>

          {/* Child Selector */}
          <div className="child-selector">
            {dashboardData?.children?.map((child) => (
              <button 
                key={child.id} 
                className={`child-tab ${selectedChild?.id === child.id ? 'active' : ''}`}
                onClick={() => setSelectedChild(child)}
              >
                <div className="child-avatar">{child.full_name.charAt(0)}</div>
                <span>{child.full_name}</span>
              </button>
            ))}
          </div>

          {selectedChild && (
            <motion.div 
              key={selectedChild.id}
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="performance-grid"
            >
              {/* Summary Card */}
              <div className="panel-card child-info-card">
                <div className="panel-header">
                  <h3>Academic Profile</h3>
                </div>
                <div className="profile-details">
                  <div className="detail-row"><span>Roll No:</span> <strong>{selectedChild.roll_no}</strong></div>
                  <div className="detail-row"><span>Course:</span> <strong>{selectedChild.course}</strong></div>
                  <div className="detail-row"><span>Semester:</span> <strong>{selectedChild.semester}</strong></div>
                </div>
              </div>

              {/* Attendance Summary */}
              <div className="panel-card">
                <div className="panel-header">
                  <h3>Attendance Report</h3>
                  <ClipboardCheck size={20} color="#4F46E5" />
                </div>
                <div className="attendance-list">
                  {selectedChild.attendance?.map((att, i) => (
                    <div key={i} className="att-item">
                      <div className="att-info">
                        <span>{att.subject}</span>
                        <p>{att.attended}/{att.total} Lectures</p>
                      </div>
                      <div className="att-progress-container">
                        <div 
                          className="att-progress-bar" 
                          style={{ 
                            width: `${(att.attended / att.total) * 100}%`,
                            background: (att.attended / att.total) < 0.75 ? '#EF4444' : '#10B981'
                          }} 
                        />
                      </div>
                      <span className="att-percentage">{Math.round((att.attended / att.total) * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee Status */}
              <div className="panel-card">
                <div className="panel-header">
                  <h3>Fee Payments (₹)</h3>
                  <CreditCard size={20} color="#F59E0B" />
                </div>
                <div className="fee-summary">
                  {selectedChild.fees?.map((fee, i) => (
                    <div key={i} className="fee-card-mini">
                      <div className="fee-row">
                        <span>{fee.term}</span>
                        <span className={`status-pill ${fee.status.toLowerCase()}`}>{fee.status}</span>
                      </div>
                      <div className="fee-amount-row">
                        <div className="amount-group">
                          <label>Total</label>
                          <p>₹{Number(fee.total_amount).toLocaleString('en-IN')}</p>
                        </div>
                        <div className="amount-group">
                          <label>Paid</label>
                          <p>₹{Number(fee.paid_amount).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Result/Report Quick Link */}
              <div className="panel-card report-card">
                <div className="panel-header">
                  <h3>Institutional Reports</h3>
                </div>
                <div className="report-links">
                  <div className="report-link">
                    <FileText size={18} />
                    <span>Internal Assessment 1</span>
                    <ChevronRight size={16} />
                  </div>
                  <div className="report-link">
                    <FileText size={18} />
                    <span>Monthly Attendance Summary</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
