import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle2, Eye, EyeOff, User, Mail, Lock, ArrowLeft } from 'lucide-react';

// Shared Brain Logo
const BrainLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 4C13.5 4 11.5 5.5 10.5 7.5C9.8 7.2 9 7 8.2 7C5.8 7 4 8.8 4 11.2C4 11.8 4.1 12.4 4.4 12.9C3 13.7 2 15.2 2 17C2 19.5 3.8 21.5 6.2 21.9C6.5 24.2 8.5 26 11 26L21 26C23.5 26 25.5 24.2 25.8 21.9C28.2 21.5 30 19.5 30 17C30 15.2 29 13.7 27.6 12.9C27.9 12.4 28 11.8 28 11.2C28 8.8 26.2 7 23.8 7C23 7 22.2 7.2 21.5 7.5C20.5 5.5 18.5 4 16 4Z"
      stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255,255,255,0.2)"
    />
    <path d="M16 6 L16 26" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 2.5" />
    <path d="M10 11 Q13.5 15 10 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M22 11 Q18.5 15 22 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="16" r="2.5" fill="white" opacity="0.8" />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [anonLoading, setAnonLoading] = useState(false);
  const { login, loginAnonymous } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please fill in all fields.');
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnon = async () => {
    setError('');
    setAnonLoading(true);
    try {
      await loginAnonymous();
      navigate('/dashboard');
    } catch (err) {
      setError('Could not start anonymous session. Please try again.');
    } finally {
      setAnonLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(160deg, #F1FAEE 0%, #d4ecee 50%, #F1FAEE 100%)',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Left Panel */}
      <div style={{
        width: '42%',
        background: 'linear-gradient(160deg, #457B9D 0%, #1D3557 100%)',
        color: 'white',
        padding: '3.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(168,218,220,0.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '3rem', transition: 'opacity 0.2s', width: 'fit-content' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '16px', padding: '10px', border: '1px solid rgba(255,255,255,0.25)' }}>
            <BrainLogo size={32} />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.03em' }}>MindCare</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', lineHeight: 1.2, marginBottom: '1.25rem', letterSpacing: '-0.03em', position: 'relative', zIndex: 1 }}>
          Welcome back to your safe space.
        </h1>
        <p style={{ fontSize: '0.95rem', opacity: 0.85, marginBottom: '3rem', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
          Sign in to access your personalized dashboard, mood tracker, and confidential support resources.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
          {[
            '100% Anonymous Support Available',
            'End-to-End Encrypted Journals',
            'AI-Powered Crisis Detection',
            'Professional Counsellor Access',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', opacity: 0.9 }}>
              <CheckCircle2 size={18} color="#A8DADC" />
              {item}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', fontSize: '0.78rem', opacity: 0.5, position: 'relative', zIndex: 1 }}>
          MindCare Mental Health Platform · Secure & Private
        </div>
      </div>

      {/* Right Form Panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }} className="animate-fade-in">
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-hover)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
            Sign In
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Access your confidential wellness dashboard.
          </p>

          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.9rem 1.1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.88rem', border: '1px solid #fca5a5', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  placeholder="name@university.edu"
                  className="input-field"
                  style={{ paddingLeft: '2.75rem' }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--primary)' }}>Password</label>
                <button type="button" style={{ fontSize: '0.78rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Forgot password?</button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-field"
                  style={{ paddingLeft: '2.75rem', paddingRight: '3rem' }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', borderRadius: '12px', marginTop: '0.5rem', opacity: loading ? 0.75 : 1 }}
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '1.75rem 0', gap: '1rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          </div>

          <button
            type="button"
            onClick={handleAnon}
            disabled={anonLoading}
            className="btn btn-outline"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}
          >
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
            </div>
            {anonLoading ? 'Starting session…' : 'Continue Anonymously'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '700' }}>Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
