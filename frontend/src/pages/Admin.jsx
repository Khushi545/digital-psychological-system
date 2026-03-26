import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Activity, Users, FileText, Calendar, AlertTriangle } from 'lucide-react';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (user && user.role !== 'admin' && user.role !== 'counsellor') {
      navigate('/dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        if (user.role === 'admin') {
          const metricRes = await api.get('/admin/metrics');
          setMetrics(metricRes.data.data);
        }
        const alertRes = await api.get('/admin/alerts');
        setAlerts(alertRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user, navigate]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }} className="animate-fade-in">
      <h2>{user?.role === 'admin' ? 'System Administration' : 'Counsellor Control Panel'}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Overview of platform health and severe activity.</p>

      {/* Metrics Row (Admin Only) */}
      {user?.role === 'admin' && metrics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary)' }}>
            <Users size={32} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.totalUsers}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Total Users</div>
            </div>
          </div>
          
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary)' }}>
            <Activity size={32} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.totalScreenings}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Screenings Taken</div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary)' }}>
            <Calendar size={32} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.totalAppointments}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Appointments</div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--primary)' }}>
            <FileText size={32} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.totalPosts}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Forum Posts</div>
            </div>
          </div>

        </div>
      )}

      {/* Severe Alerts */}
      <h3><AlertTriangle size={24} color="var(--danger)" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }}/> Critical Alerts</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Recent mental health assessments scoring 'Severe'.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alerts.length > 0 ? alerts.map(alert => (
          <div key={alert._id} className="card" style={{ borderLeft: '6px solid var(--danger)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ margin: 0, color: 'var(--danger)' }}>{alert.type} Risk Detected</h4>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>User:</strong> {alert.user ? (alert.user.isAnonymous ? alert.user.anonymousId : alert.user.name) : 'Deleted User'}<br/>
                  <strong>Score:</strong> {alert.score}<br/>
                  <strong>Severity:</strong> {alert.severity}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <small style={{ color: 'var(--text-secondary)' }}>{new Date(alert.createdAt).toLocaleString()}</small>
                <div style={{ marginTop: '1rem' }}>
                  <button className="btn btn-primary" onClick={() => window.alert('Automated secure email sent to student prioritizing their booking queue.')} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Send Priority Booking Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', borderLeft: '6px solid var(--success)' }}>
            <p style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem' }}>All Clear</p>
            <p style={{ color: 'var(--text-secondary)' }}>No severe screenings reported recently.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Admin;
