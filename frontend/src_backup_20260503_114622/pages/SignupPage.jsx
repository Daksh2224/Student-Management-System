import React, { useState } from 'react';
import './auth.css';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowRight, ArrowLeft, User, ShieldCheck, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const SignupPage = () => {
  const [role, setRole] = useState('student');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', dob: '', gender: '', phone: '', address: '',
    course: '', semester: '', department: '', employeeId: '', securityCode: '',
    email: '', password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  const handleBack = () => setStep(step - 1);

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    login(formData.email, role);
    alert(`${role === 'admin' ? 'Admin' : 'Student'} Registration Successful!`);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="grid"
          >
            <div className="role-switcher" style={{ marginBottom: '1.5rem' }}>
              <button 
                type="button"
                onClick={() => setRole('student')}
                className={`role-btn ${role === 'student' ? 'active' : ''}`}
              >
                <User size={16} style={{ marginBottom: '-3px', marginRight: '6px' }} />
                Student
              </button>
              <button 
                type="button"
                onClick={() => setRole('admin')}
                className={`role-btn ${role === 'admin' ? 'active' : ''}`}
              >
                <ShieldCheck size={16} style={{ marginBottom: '-3px', marginRight: '6px' }} />
                Admin
              </button>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
            </div>
            <div className="grid grid-2">
              <div className="form-group">
                <label>Date of Birth</label>
                <input className="form-control" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select className="form-control" name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234..." required />
            </div>
            <button onClick={handleNext} className="btn btn-primary" style={{ marginTop: '1rem', backgroundColor: '#003366', borderColor: '#003366' }}>
              Next Step <ArrowRight size={18} />
            </button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="grid"
          >
            {role === 'student' ? (
              <>
                <div className="form-group">
                  <label>Course</label>
                  <select className="form-control" name="course" value={formData.course} onChange={handleChange} required>
                    <option value="">Select Course</option>
                    <option value="cs">Computer Science</option>
                    <option value="ee">Electrical Engineering</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Semester</label>
                  <select className="form-control" name="semester" value={formData.semester} onChange={handleChange} required>
                    <option value="">Select Semester</option>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Semester {n}</option>)}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Department</label>
                  <select className="form-control" name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    <option value="admin">Administration</option>
                    <option value="exam">Examination Cell</option>
                    <option value="it">IT Services</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Employee ID</label>
                  <input className="form-control" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="EMP-12345" required />
                </div>
              </>
            )}
            <div className="form-group">
              <label>Home Address</label>
              <input className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City..." required />
            </div>
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <button onClick={handleBack} className="btn" style={{ background: '#F1F5F9' }}>
                <ArrowLeft size={18} /> Back
              </button>
              <button onClick={handleNext} className="btn btn-primary" style={{ backgroundColor: '#003366', borderColor: '#003366' }}>
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="grid"
          >
            <div className="form-group">
              <label>{role === 'admin' ? 'Work Email' : 'Institutional Email'}</label>
              <input className="form-control" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={role === 'admin' ? 'admin@college.edu' : 'student@college.edu'} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="form-control" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
            </div>
            {role === 'admin' && (
              <div className="form-group">
                <label>Admin Security Code</label>
                <input className="form-control" name="securityCode" type="password" value={formData.securityCode} onChange={handleChange} placeholder="Enter provided code" required />
              </div>
            )}
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <button onClick={handleBack} className="btn" style={{ background: '#F1F5F9' }}>
                <ArrowLeft size={18} /> Back
              </button>
              <button onClick={handleSubmit} className="btn btn-primary" style={{ backgroundColor: '#003366', borderColor: '#003366' }}>
                <UserPlus size={18} /> Complete
              </button>
            </div>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-card"
          style={{ maxWidth: '480px' }}
        >
          <div className="auth-card-inner">
            <div className="auth-header">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ background: '#003366', padding: '12px', borderRadius: '12px', color: 'white' }}>
                  <Landmark size={32} />
                </div>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#003366', marginBottom: '0.5rem' }}>Zenith Global University</h2>
              <p>Register as a new {role}</p>
            </div>

            <div className="step-indicator">
              {[1,2,3].map(i => (
                <div key={i} className={`step-dot ${step >= i ? 'active' : ''}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            <div className="footer-link">
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </div>
          </div>
          <div className="portal-disclaimer">
            © 2026 Heritage State University. All Rights Reserved. <br/>
            Institutional records are protected by Section 43A of the IT Act.
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignupPage;
