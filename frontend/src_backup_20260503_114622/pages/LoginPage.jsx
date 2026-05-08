import React, { useState } from 'react';
import './auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, User, ShieldCheck, AlertCircle, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Mock validation: In a real app, this would be an API call
    // For now, we allow login but show a warning if it's not a mock user
    if (email && password.length >= 6) {
      login(email, role);
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      setError('Please enter a valid email and password (min 6 chars)');
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="auth-card"
      >
        <div className="auth-card-inner">
          <div className="auth-header">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ background: '#003366', padding: '12px', borderRadius: '12px', color: 'white' }}>
                <Landmark size={32} />
              </div>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#003366', marginBottom: '0.5rem' }}>Zenith Global University</h2>
            <p>Institutional Login Portal</p>
          </div>

          <div className="role-switcher">
            <button 
              onClick={() => setRole('student')}
              className={`role-btn ${role === 'student' ? 'active' : ''}`}
            >
              <User size={16} style={{ marginBottom: '-3px', marginRight: '6px' }} />
              Student
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            >
              <ShieldCheck size={16} style={{ marginBottom: '-3px', marginRight: '6px' }} />
              Admin
            </button>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="error-alert"
              style={{ 
                background: '#FEF2F2', 
                color: '#EF4444', 
                padding: '0.75rem', 
                borderRadius: '8px', 
                marginBottom: '1rem',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid #FEE2E2'
              }}
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="e.g. john@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>Password</label>
                <a href="#" style={{ fontSize: '0.8125rem', color: '#003366', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
              </div>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem', backgroundColor: '#003366', borderColor: '#003366' }}>
              <LogIn size={18} />
              Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>

          <div className="footer-link">
            Don't have an account?{' '}
            <Link to="/signup">Register here</Link>
          </div>
        </div>
        <div className="portal-disclaimer">
          © 2026 Heritage State University. All Rights Reserved. <br/>
          Unauthorized access is strictly prohibited and subject to legal action.
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default LoginPage;
