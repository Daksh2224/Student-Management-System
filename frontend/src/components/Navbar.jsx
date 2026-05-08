import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { departmentsData } from '../data/departments';
import { 
  Landmark, Search, Mail, Phone, Globe, ChevronDown, User, LayoutDashboard, LogOut
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'The University', path: 'university' },
    { label: 'Academics', path: 'academics' },
    { label: 'Examination', path: 'exams' },
    { label: 'Student Corner', path: 'studentCorner' },
  ];

  const handleScrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Simple search logic: find first matching department
    const deptId = Object.keys(departmentsData).find(key => 
      departmentsData[key].name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (deptId) {
      navigate(`/department/${deptId}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="institutional-header">
      {/* Upper Utility Bar - Tier 1 */}
      <div className="top-utility-bar">
        <div className="utility-container">
          <div className="contact-info">
            <span className="contact-item"><Phone size={14} /> +91 79 2630 1341</span>
            <span className="contact-item"><Mail size={14} /> admissions@zenith.edu</span>
          </div>

          <div className="utility-right">
            <span className="contact-item"><Globe size={14} /> English (EN)</span>
            <span className="contact-item" style={{ marginLeft: '1.5rem', cursor: 'pointer' }}>Support</span>
          </div>
        </div>
      </div>

      {/* Main Navbar - Tier 2 */}
      <div className="main-navbar-wrapper">
        <div className="main-nav-container">
          <div className="nav-brand-main" onClick={() => navigate('/')}>
            <div className="nav-logo-box">
              <Landmark size={28} />
            </div>
            <div className="brand-text-stack">
              <h2>Zenith Global</h2>
              <p>University of Excellence</p>
            </div>
          </div>

          <nav className="main-nav-links">
            {navLinks.map((link) => (
              <button 
                key={link.label} 
                className="main-nav-link-item"
                onClick={() => handleScrollTo(link.path)}
              >
                {link.label}
              </button>
            ))}

            {/* Portal Dropdown */}
            {user ? (
              <div className="nav-portal-dropdown">
                <button 
                  className="main-nav-link-item active-portal"
                  onClick={() => navigate(`/${user.role}/dashboard/overview`)}
                >
                  <User size={16} /> My Portal <ChevronDown size={14} />
                </button>
                <div className="dropdown-menu">
                   <div className="dropdown-header">
                      <strong>{user.name}</strong>
                      <p>{user.role?.toUpperCase()}</p>
                   </div>
                   <button onClick={() => navigate(`/${user.role}/dashboard/overview`)}><LayoutDashboard size={14} /> Dashboard</button>
                   <button onClick={logout} className="logout-btn"><LogOut size={14} /> Sign Out</button>
                </div>
              </div>
            ) : (
              <button 
                className="main-nav-link-item portal-login-btn"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            )}
          </nav>

          <div className="nav-right-tools">
            <form className="header-search" onSubmit={handleSearch}>
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search departments..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
