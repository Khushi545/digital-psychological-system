import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Heart, MessageCircle, Users, Shield, BookOpen, Calendar, Activity, Lock, PhoneCall } from 'lucide-react';

const Landing = () => {
  const { loginAnonymous } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAnonymous = async () => {
    try {
      await loginAnonymous();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-card)' }}>
      {/* Top Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 5%', maxWidth: '1400px', margin: '0 auto', backgroundColor: 'var(--bg-main)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          <Heart size={28} fill="var(--primary)" color="var(--primary)" /> MindEase
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: '500', fontSize: '0.95rem' }}>
          <Link to="#" style={{ color: 'var(--text-secondary)' }}>Features</Link>
          <Link to="#" style={{ color: 'var(--text-secondary)' }}>How it Works</Link>
          <Link to="#" style={{ color: 'var(--text-secondary)' }}>Resources</Link>
          <Link to="/login" style={{ color: 'var(--text-secondary)' }}>Log In</Link>
          <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ backgroundColor: 'var(--bg-main)', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '4rem 5%', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>
          
          {/* Left Column */}
          <div style={{ flex: 1, maxWidth: '600px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '2rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid var(--primary)' }}></span>
              Trusted by 50,000+ Students
            </div>
            
            <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', color: 'var(--secondary)', marginBottom: '1.5rem' }}>
              Your Mental <br/>
              <span style={{ color: 'var(--primary)' }}>Wellbeing</span><br/>
              Matters.
            </h1>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '500px' }}>
              A confidential, student-first platform providing AI support, peer community, and professional counselling. 100% anonymous, 100% secure.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={handleAnonymous} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Start Anonymously →</button>
              <Link to="/register" className="btn btn-outline" style={{ background: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1rem', color: 'var(--text-secondary)', boxShadow: 'var(--shadow-sm)' }}>Learn More</Link>
            </div>
          </div>

          {/* Right Column (Graphic Placeholder) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '500px', aspectRatio: '1/1', background: 'white', borderRadius: '40px', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ width: '100%', height: '100%', border: '2px solid rgba(155,81,224,0.1)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(155,81,224,0.2)' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(155,81,224,0.3)' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(155,81,224,0.4)', backgroundColor: 'var(--primary-light)' }}></div>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(155,81,224,0.1)' }}></div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: 'rgba(155,81,224,0.1)' }}></div>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(155,81,224,0.1)', transform: 'rotate(45deg)' }}></div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: 'rgba(155,81,224,0.1)', transform: 'rotate(45deg)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Support Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Comprehensive Support</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Everything you need to navigate college life with confidence and peace of mind.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            <MessageCircle size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>AI-Guided Chat Support</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>24/7 confidential support for anxiety, stress, and panic episodes. Smart crisis detection and immediate help.</p>
          </div>
          
          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            <Users size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Peer Support Forum</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Connect with others anonymously. Share experiences and find strength in community.</p>
          </div>
          
          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            <Shield size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>100% Anonymous</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Privacy-first approach. Use anonymous IDs to access all features without revealing your identity.</p>
          </div>

          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            <BookOpen size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Resource Hub</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Curated videos, articles, and guides for mental wellness tailored for students.</p>
          </div>

          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            <Calendar size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Counselling System</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Book secure, private appointments with professional counsellors at your convenience.</p>
          </div>

          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            <Activity size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Wellness Tools</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Mood tracking, breathing exercises, and journaling modules to build resilience.</p>
          </div>
        </div>
      </div>

      {/* Data Privacy Section (Dark) */}
      <div style={{ backgroundColor: '#181224', color: 'white', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: '400px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '2.5rem', lineHeight: 1.1 }}>Your Data is Yours. Always.</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                <span style={{ color: '#9b51e0' }}>●</span> End-to-end encrypted personal journaling
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                <span style={{ color: '#9b51e0' }}>●</span> No academic records linked to your support
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                <span style={{ color: '#9b51e0' }}>●</span> Full control over your data and anonymity
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                <span style={{ color: '#9b51e0' }}>●</span> Compliant with international privacy standards
              </div>
            </div>
            
            <Link to="#" style={{ color: '#9b51e0', textDecoration: 'underline', fontWeight: '500' }}>Read our Privacy & Consent Policy</Link>
          </div>

          <div style={{ flex: 1, minWidth: '400px' }}>
            <div style={{ backgroundColor: '#261f36', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(155,81,224,0.2)' }}>
              <Lock size={48} color="#9b51e0" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Encryption Level: Military Grade</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>We use advanced AES-256 encryption for all journals and chats. Even our admins can't read your private thoughts.</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Crisis Banner */}
      <div style={{ padding: '6rem 2rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1000px', backgroundColor: '#af6df0', borderRadius: '32px', padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Dot background pattern logic mock using CSS gradient dots for simplicity in inline-styles */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }}></div>
          
          <h2 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>In a Crisis? We're Here.</h2>
          <p style={{ color: 'white', fontSize: '1.1rem', marginBottom: '3rem', opacity: 0.9, position: 'relative', zIndex: 1 }}>Our AI detect system is always on, but you can access immediate support right now.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
            <button className="btn" style={{ backgroundColor: 'white', color: '#9b51e0', padding: '1rem 2rem' }}>
              <PhoneCall size={18} style={{ marginRight: '0.5rem' }} /> View Crisis Helplines
            </button>
            <button className="btn" style={{ backgroundColor: '#1c1c1c', color: 'white', padding: '1rem 2rem' }}>
              <MessageCircle size={18} style={{ marginRight: '0.5rem' }} /> Start Chatting Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--bg-main)', padding: '4rem 5%', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '1.5rem' }}>
              <Heart size={24} fill="var(--primary)" color="var(--primary)" /> MindEase
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>Empowering college students through accessible, anonymous, and effective mental health support.</p>
          </div>

          <div style={{ display: 'flex', gap: '6rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontSize: '1rem' }}>Support</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <Link to="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>AI Chat</Link>
                <Link to="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Professional Help</Link>
                <Link to="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Crisis Numbers</Link>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontSize: '1rem' }}>Resources</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <Link to="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Wellness Library</Link>
                <Link to="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Peer Support</Link>
                <Link to="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Success Stories</Link>
              </div>
            </div>

            <div>
              <h4 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontSize: '1rem' }}>Company</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <Link to="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About Us</Link>
                <Link to="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link>
                <Link to="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</Link>
              </div>
            </div>
          </div>
          
        </div>
        
        <div style={{ maxWidth: '1400px', margin: '3rem auto 0 auto', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <div>© 2025 MindEase Platform. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Social icons placeholder */}
            <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(155,81,224,0.1)' }}></span>
            <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(155,81,224,0.1)' }}></span>
            <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(155,81,224,0.1)' }}></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
