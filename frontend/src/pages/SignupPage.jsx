import React, { useState } from 'react';
import './auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowRight, ArrowLeft, User, ShieldCheck, Landmark, GraduationCap, Star, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const [role, setRole] = useState('student');
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '', dob: '', gender: '', phone: '', address: '',
    course: '', semester: '', department: '', employeeId: '', securityCode: '',
    email: '', password: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleNext = (e) => { e.preventDefault(); setStep(s => s + 1); };
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, role);
    navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
  };

  const slideVariants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };

  const features = [
    { icon: GraduationCap, label: 'Academic excellence tracking' },
    { icon: Star, label: 'Personalized learning dashboard' },
    { icon: Globe, label: 'Global campus community' },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28 }}>
            <div className="auth-role-switcher" style={{ marginBottom: '1.75rem' }}>
              <button type="button" onClick={() => setRole('student')} className={`auth-role-btn ${role === 'student' ? 'active' : ''}`}>
                <User size={15} /> Student
              </button>
              <button type="button" onClick={() => setRole('admin')} className={`auth-role-btn ${role === 'admin' ? 'active' : ''}`}>
                <ShieldCheck size={15} /> Admin
              </button>
            </div>

            <div className="auth-form-group">
              <label>Full Name</label>
              <input className="auth-input" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
            </div>
            <div className="auth-grid-2">
              <div className="auth-form-group">
                <label>Date of Birth</label>
                <input className="auth-input" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="auth-form-group">
                <label>Gender</label>
                <select className="auth-input" name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="auth-form-group">
              <label>Phone Number</label>
              <input className="auth-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
            </div>

            <button onClick={handleNext} className="auth-submit-btn">
              Next Step <ArrowRight size={17} />
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28 }}>
            {role === 'student' ? (
              <>
                <div className="auth-form-group">
                  <label>Course</label>
                  <select className="auth-input" name="course" value={formData.course} onChange={handleChange} required>
                    <option value="">Select Course</option>
                    <option value="cs">Computer Science & Engineering</option>
                    <option value="ee">Electrical Engineering</option>
                    <option value="mba">Business Administration (MBA)</option>
                    <option value="law">Law & Governance</option>
                    <option value="health">Health Sciences</option>
                  </select>
                </div>
                <div className="auth-form-group">
                  <label>Semester</label>
                  <select className="auth-input" name="semester" value={formData.semester} onChange={handleChange} required>
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>Semester {n}</option>)}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="auth-form-group">
                  <label>Department</label>
                  <select className="auth-input" name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    <option value="admin">Administration</option>
                    <option value="exam">Examination Cell</option>
                    <option value="it">IT Services</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
                <div className="auth-form-group">
                  <label>Employee ID</label>
                  <input className="auth-input" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="EMP-12345" required />
                </div>
              </>
            )}
            <div className="auth-form-group">
              <label>Home Address</label>
              <input className="auth-input" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City, State..." required />
            </div>

            <div className="auth-nav-row">
              <button type="button" onClick={handleBack} className="auth-back-btn"><ArrowLeft size={16} /> Back</button>
              <button type="button" onClick={handleNext} className="auth-next-btn">Next <ArrowRight size={16} /></button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28 }}>
            <div className="auth-form-group">
              <label>{role === 'admin' ? 'Work Email' : 'Institutional Email'}</label>
              <input className="auth-input" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={role === 'admin' ? 'admin@zenith.edu' : 'student@zenith.edu'} required />
            </div>
            <div className="auth-form-group">
              <label>Password</label>
              <input className="auth-input" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Min. 8 characters" required />
            </div>
            {role === 'admin' && (
              <div className="auth-form-group">
                <label>Admin Security Code</label>
                <input className="auth-input" name="securityCode" type="password" value={formData.securityCode} onChange={handleChange} placeholder="Provided by IT admin" required />
              </div>
            )}

            <div className="auth-nav-row">
              <button type="button" onClick={handleBack} className="auth-back-btn"><ArrowLeft size={16} /> Back</button>
              <button type="button" onClick={handleSubmit} className="auth-next-btn"><UserPlus size={16} /> Complete</button>
            </div>
          </motion.div>
        );

      default: return null;
    }
  };

  return (
    <div className="auth-root">
      {/* Left Visual Panel */}
      <motion.div
        className="auth-visual-panel"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-visual-orb-1" />
        <div className="auth-visual-orb-2" />
        <div className="auth-visual-content">
          <motion.div className="auth-logo-box" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
            <Landmark size={34} />
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            Join Zenith Global University
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            Create your institutional account and unlock access to world-class education management tools.
          </motion.p>
          <motion.div className="auth-visual-features" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
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
            <h2>Create Account</h2>
            <p>Step {step} of {totalSteps} — Fill in your details</p>
          </div>

          {/* Step Progress */}
          <div className="auth-steps">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`auth-step-dot ${step > i ? 'done' : ''}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          <div className="auth-footer-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
          <div className="auth-disclaimer">
            © 2026 Zenith Global University. All Rights Reserved.<br />
            Institutional records are protected by applicable privacy laws.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
