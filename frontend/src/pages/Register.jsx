import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Heart, CheckCircle2 } from 'lucide-react';

const AuthLayout = ({ title, submitText, onSubmit, children, alternateLink, error, onAnonymous }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary)', padding: '2rem' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '1000px', backgroundColor: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Left Purple Banner */}
        <div style={{ width: '45%', backgroundColor: '#9b51e0', color: 'white', padding: '3rem', display: 'flex', flexDirection: 'column' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '0.9rem', marginBottom: '3rem' }}>&lt; Back to Home</Link>
          
          <div style={{ backgroundColor: 'white', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <Heart size={24} fill="#9b51e0" color="#9b51e0" />
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: 1.2, marginBottom: '1.5rem' }}>Start your journey with MindEase.</h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '3rem', lineHeight: 1.6 }}>Create a secure, private account to access personalized support and community resources.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.9 }}>
              <CheckCircle2 size={20} /> <span>100% Anonymous Support</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.9 }}>
              <CheckCircle2 size={20} /> <span>End-to-End Encrypted Journals</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.9 }}>
              <CheckCircle2 size={20} /> <span>Guardian Emergency Alerts</span>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>MindEase Mental Health Platform v2.0</div>
        </div>

        {/* Right Form */}
        <div style={{ width: '55%', padding: '4rem 5rem', display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>{title}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Create your confidential account.</p>
          
          {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {children}
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', borderRadius: '8px', fontSize: '1rem' }}>{submitText} →</button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0', opacity: 0.5 }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--text-secondary)' }}></div>
            <span style={{ padding: '0 1rem', fontSize: '0.85rem' }}>OR</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--text-secondary)' }}></div>
          </div>

          <button onClick={onAnonymous} className="btn btn-outline" style={{ width: '100%', padding: '1rem', borderRadius: '8px', fontWeight: '500', color: 'var(--text-secondary)', borderColor: 'var(--border-light)' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--primary)' }}></div>
              Register Anonymously
            </span>
          </button>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {alternateLink}
          </p>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const { register, loginAnonymous } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return setError("Please fill all required fields.");
    setError('');
    try {
      await register(name, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Ensure email is unique or check server.');
    }
  };
  
  const handleAnon = async () => {
    try {
      await loginAnonymous();
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Ensure email is unique or check server.');
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      submitText="Sign Up" 
      onSubmit={handleSubmit} 
      error={error}
      onAnonymous={handleAnon}
      alternateLink={<span>Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign In</Link></span>}
    >
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Full Name</label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>👤</span>
          <input type="text" placeholder="John Doe" className="input-field" style={{ paddingLeft: '2.5rem', margin: 0 }} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Email Address</label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>✉</span>
          <input type="email" placeholder="name@university.edu" className="input-field" style={{ paddingLeft: '2.5rem', margin: 0 }} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Password</label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔒</span>
          <input type="password" placeholder="••••••••" className="input-field" style={{ paddingLeft: '2.5rem', margin: 0 }} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Role</label>
        <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)} style={{ margin: 0 }}>
          <option value="student">Student</option>
          <option value="counsellor">Counsellor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </AuthLayout>
  );
};

export default Register;
