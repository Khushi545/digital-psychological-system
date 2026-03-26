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

          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: 1.2, marginBottom: '1.5rem' }}>Welcome back to MindEase.</h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '3rem', lineHeight: 1.6 }}>Your confidential space for mental wellness. Sign in to access your personalized dashboard and resources.</p>

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
        <div style={{ width: '55%', padding: '4rem 5rem', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>{title}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Access your confidential support dashboard.</p>
          
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
              Continue Anonymously
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginAnonymous } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill all required fields.");
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Server connection error.');
      console.error(err);
    }
  };
  
  const handleAnon = async () => {
    try {
      await loginAnonymous();
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Server error creating anonymous account.');
    }
  };

  return (
    <AuthLayout 
      title="Sign In" 
      submitText="Sign In" 
      onSubmit={handleSubmit} 
      error={error}
      onAnonymous={handleAnon}
      alternateLink={<span>Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign up</Link></span>}
    >
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Email Address</label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>✉</span>
          <input type="email" placeholder="name@university.edu" className="input-field" style={{ paddingLeft: '2.5rem', margin: 0 }} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)', textTransform: 'uppercase' }}>Password</label>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Forgot?</span>
        </div>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔒</span>
          <input type="password" placeholder="••••••••" className="input-field" style={{ paddingLeft: '2.5rem', margin: 0 }} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      
      {/* Visual match for Guardian Contact from screenshot */}
      <h4 style={{ fontSize: '0.85rem', color: 'var(--primary)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--primary)' }}></div>
        Guardian Emergency Contact (Required)
      </h4>
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Guardian Name *</label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>👤</span>
          <input type="text" placeholder="Parent/Guardian Full Name" className="input-field" style={{ paddingLeft: '2.5rem', margin: 0 }} />
        </div>
      </div>
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Guardian Contact *</label>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>📞</span>
          <input type="text" placeholder="+1 (555) 000-0000" className="input-field" style={{ paddingLeft: '2.5rem', margin: 0 }} />
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>This information will only be used in crisis situations to ensure your safety.</p>
      </div>
    </AuthLayout>
  );
};

export default Login;
