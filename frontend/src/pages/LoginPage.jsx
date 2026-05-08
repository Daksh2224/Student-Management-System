import React, { useState } from 'react';
import './auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, User, ShieldCheck, AlertCircle, Landmark, BookOpen, CreditCard, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

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
    if (email && password.length >= 6) {
      login(email, role);
      navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } else {
      setError('Please enter a valid email and password (min 6 chars)');
    }
  };

  const features = [
    { icon: BookOpen, label: 'Academic records & courses' },
    { icon: ClipboardCheck, label: 'Attendance tracking & alerts' },
    { icon: CreditCard, label: 'Fee management portal' },
  ];

  return (
    <div className="auth-root">
      {/* Left Visual Panel */}
      <motion.div
        className="auth-visual-panel"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="auth-visual-orb-1" />
        <div className="auth-visual-orb-2" />
        <div className="auth-visual-content">
          <motion.div
            className="auth-logo-box"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Landmark size={34} />
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            Zenith Global University
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            Your all-in-one institutional management platform for students and administrators.
          </motion.p>
          <motion.div
            className="auth-visual-features"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {features.map((f, i) => (
              <div key={i} className="auth-feature-item">
                <div className="auth-feature-icon"><f.icon size={16} /></div>
                <span>{f.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <motion.div
          className="auth-form-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="auth-form-header">
            <h2>Welcome back</h2>
            <p>Sign in to access your institutional portal</p>
          </div>

          <div className="auth-role-switcher">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`auth-role-btn ${role === 'student' ? 'active' : ''}`}
            >
              <User size={15} /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`auth-role-btn ${role === 'admin' ? 'active' : ''}`}
            >
              <ShieldCheck size={15} /> Admin
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                className="auth-error"
                initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <AlertCircle size={15} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin}>
            <div className="auth-form-group">
              <label>Email Address</label>
              <input
                className="auth-input"
                type="email"
                required
                placeholder="e.g. john@zenith.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-form-group">
              <div className="auth-label-row">
                <label>Password</label>
                <button type="button" className="auth-forgot">Forgot password?</button>
              </div>
              <input
                className="auth-input"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              <LogIn size={18} />
              Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>

          <div className="auth-footer-link">
            Don't have an account? <Link to="/signup">Register here</Link>
          </div>

          <div className="auth-disclaimer">
            © 2026 Zenith Global University. All Rights Reserved.<br />
            Unauthorized access is strictly prohibited.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
