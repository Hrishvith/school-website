import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import './Notes.css';

const Notes = () => {
  const { auth } = useContext(AuthContext);
  const [notes, setNotes] = useState({
    '8th': {},
    '9th': {},
    '10th': {}
  });
  const [uploadStandard, setUploadStandard] = useState('8th');
  const [uploadSubject, setUploadSubject] = useState('Maths');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const subjects = ['Maths', 'Science', 'Social', 'Kannada', 'English', 'Hindi'];

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      for (const standard of ['8th', '9th', '10th']) {
        const res = await api.get(`/api/notes?standard=${standard}`);
        const notesMap = {};
        subjects.forEach(subj => {
          notesMap[subj] = res.data.filter(n => n.subject === subj);
        });
        setNotes(prev => ({ ...prev, [standard]: notesMap }));
      }
    } catch (err) {
      console.error('Error loading notes:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }
    if (!auth.token) {
      setMessage('You must be logged in to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('standard', uploadStandard);
    formData.append('subject', uploadSubject);
    formData.append('title', file.name);

    setLoading(true);
    try {
      await api.post('/api/notes/upload', formData, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Notes uploaded successfully!');
      setFile(null);
      loadNotes();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await api.delete(`/api/notes/${id}`, {
        headers: { 'Authorization': `Bearer ${auth.token}` }
      });
      setMessage('Note deleted');
      loadNotes();
    } catch (err) {
      setMessage('Delete failed');
    }
  };

  return (
    <div className="notes-container">
      <div className="container">
        <h1>Study Notes</h1>

        {auth.userRole === 'teacher' && (
          <section className="upload-section">
            <h3>Upload New Notes</h3>
            {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
            <form onSubmit={handleUpload}>
              <select value={uploadStandard} onChange={(e) => setUploadStandard(e.target.value)}>
                <option value="8th">8th Standard</option>
                <option value="9th">9th Standard</option>
                <option value="10th">10th Standard</option>
              </select>
              <select value={uploadSubject} onChange={(e) => setUploadSubject(e.target.value)}>
                {subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload Notes'}</button>
            </form>
          </section>
        )}

        {['8th', '9th', '10th'].map(standard => (
          <section key={standard} className="notes-section">
            <h2>{standard} Standard</h2>
            {subjects.map(subject => (
              <div key={subject} className="subject-group">
                <h3>{subject}</h3>
                <div className="notes-list">
                  {notes[standard][subject]?.length > 0 ? (
                    notes[standard][subject].map(note => (
                      <div key={note._id} className="note-item">
                        <div>
                          <a href={note.fileUrl} download target="_blank" rel="noopener noreferrer">
                            📄 {note.title}
                          </a>
                          <p className="date">{new Date(note.createdAt).toLocaleDateString()}</p>
                        </div>
                        {auth.userRole === 'teacher' && (
                          <button className="delete-btn" onClick={() => handleDelete(note._id)}>Delete</button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="no-notes">No notes yet</p>
                  )}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Notes;
