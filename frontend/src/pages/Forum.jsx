import React, { useState, useEffect } from 'react';
import api from '../api';
import { Search, Heart, MessageSquare, AlertTriangle, Plus } from 'lucide-react';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // New Post State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  const fetchPosts = async () => {
    try {
      const res = await api.get('/forum');
      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await api.post('/forum', { title, content, category, isAnonymousPost: true });
      setShowCreate(false);
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert('Error creating post');
    }
  };

  const categories = ['All', 'Anxiety', 'Depression', 'Student Life', 'Success Stories', 'Mindfulness'];
  
  // Dummy data generation if API is empty for mockup precision
  const displayPosts = posts.length > 0 ? posts : [
    { _id: 1, title: 'Dealing with mid-term stress? You\'re not alone.', content: 'I\'ve been feeling really overwhelmed lately with three exams in one week. Just wanted to share what helps me: 10 mins of meditation before bed and prioritizing...', authorName: 'Anonymous Owl', category: 'Student Life', createdAt: new Date() - 7200000, comments: new Array(8), likes: 24, initial: 'A', color: 'var(--primary)' },
    { _id: 2, title: 'Finally spoke to a counselor today', content: 'After months of hesitation, I finally booked a session through MindEase. It was such a relief to talk to someone who listens without judgment. If you\'re on the fence...', authorName: 'Brave Penguin', category: 'Success Stories', createdAt: new Date() - 18000000, comments: new Array(12), likes: 56, initial: 'B', color: '#3b82f6' },
    { _id: 3, title: 'Tips for social anxiety during presentations?', content: 'I have a big presentation coming up and my heart starts racing just thinking about it. Does anyone have techniques to calm down right before starting?', authorName: 'Calm Breeze', category: 'Anxiety', createdAt: new Date() - 86400000, comments: new Array(21), likes: 15, initial: 'C', color: '#22c55e' }
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--secondary)', marginBottom: '0.25rem' }}>Peer Support Community</h1>
          <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
            <Users size={16} /> 1,240 members online now
          </p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem' }}>
          <Plus size={18} /> {showCreate ? 'Cancel' : 'Create New Post'}
        </button>
      </div>

      {showCreate && (
        <div className="card" style={{ marginBottom: '2rem', animation: 'fadeIn 0.3s ease-out' }}>
          <h3>New Discussion</h3>
          <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <input type="text" className="input-field" placeholder="Discussion Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea className="input-field" rows="4" placeholder="Share your thoughts..." value={content} onChange={e => setContent(e.target.value)} required></textarea>
            
            <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
              {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <div style={{ alignSelf: 'flex-end', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-primary">Publish Anonymously</button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '400px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder="Search discussions..." className="input-field" style={{ paddingLeft: '2.5rem', borderRadius: '999px', margin: 0 }} />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                backgroundColor: activeCategory === cat ? 'var(--primary)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                border: activeCategory === cat ? 'none' : '1px solid var(--border-light)',
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.9rem',
                boxShadow: activeCategory === cat ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {displayPosts.map(post => (
          <div key={post._id} className="card" style={{ display: 'flex', flexDirection: 'column', borderRadius: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: post.color || 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {post.initial || post.authorName.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--secondary)', fontSize: '0.95rem' }}>{post.authorName}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    2h ago • {post.category}
                  </div>
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>...</button>
            </div>
            
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>{post.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.content}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <Heart size={16} /> {post.likes || Math.floor(Math.random() * 50)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <MessageSquare size={16} /> {post.comments?.length || 0}
                </span>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                <AlertTriangle size={14} /> Report
              </button>
            </div>

          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button className="btn btn-text" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>View Older Discussions •••</button>
      </div>

    </div>
  );
};

// Helper strictly for the icon mapping since it's not imported at top
import { Users } from 'lucide-react';

export default Forum;
