import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [counsellorId, setCounsellorId] = useState('65f2a1b2c3d4e5f6g7h8i9j0'); // Mocked ID for demo
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [notes, setNotes] = useState('');

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/appointments');
      setAppointments(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments', {
        counsellorId,
        date,
        timeSlot,
        notes
      });
      setShowForm(false);
      fetchAppointments();
      alert('Appointment requested successfully!');
    } catch (err) {
      console.error(err);
      alert('Error booking appointment (Note: Counsellor ID must be valid in DB)');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Your Appointments</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your confidential counselling sessions.</p>
        </div>
        {user.role === 'student' && (
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'Book Session'}
          </button>
        )}
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem', animation: 'fadeIn 0.3s ease-out' }}>
          <h3>Book a Counsellor</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label>Select Date</label>
              <input type="date" className="input-field" value={date} onChange={e => setDate(e.target.value)} required />
            </div>

            <div>
              <label>Select Time</label>
              <select className="input-field" value={timeSlot} onChange={e => setTimeSlot(e.target.value)}>
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label>What would you like to discuss? (Optional, completely confidential)</label>
              <textarea className="input-field" rows="3" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">Confirm Request</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {appointments.length > 0 ? appointments.map(apt => (
          <div key={apt._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `6px solid ${apt.status === 'approved' ? 'var(--success)' : apt.status === 'pending' ? 'var(--warning)' : 'var(--danger)'}` }}>
            <div>
              <h3 style={{ margin: 0 }}>{new Date(apt.date).toLocaleDateString()} at {apt.timeSlot}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
                {user.role === 'student' ? 'Session with Campus Counsellor' : `Student Session`}
              </p>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                borderRadius: '999px', 
                fontSize: '0.85rem',
                backgroundColor: 'rgba(0,0,0,0.05)',
                fontWeight: '600'
               }}>
                Status: <span style={{ textTransform: 'capitalize' }}>{apt.status}</span>
              </span>
            </div>
            
            {apt.status === 'approved' && apt.meetingLink && (
              <a href={apt.meetingLink} target="_blank" rel="noreferrer" className="btn btn-primary">Join Video Call</a>
            )}
          </div>
        )) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>You don't have any appointments scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
