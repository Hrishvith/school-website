import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import './Gallery.css';

const Gallery = () => {
  const { auth } = useContext(AuthContext);
  const [images, setImages] = useState({
    faculty: [],
    '8th': [],
    '9th': [],
    '10th': []
  });
  const [uploadCategory, setUploadCategory] = useState('faculty');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, image: null });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      for (const category of ['faculty', '8th', '9th', '10th']) {
        const res = await api.get(`/api/gallery?category=${category}`);
        setImages(prev => ({ ...prev, [category]: res.data }));
      }
    } catch (err) {
      console.error('Error loading images:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select an image');
      return;
    }
    if (!auth.token) {
      setMessage('You must be logged in to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', uploadCategory);

    setLoading(true);
    try {
      await api.post('/api/gallery/upload', formData, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Image uploaded successfully!');
      setFile(null);
      loadImages();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api.delete(`/api/gallery/${id}`, {
        headers: { 'Authorization': `Bearer ${auth.token}` }
      });
      setMessage('Image deleted');
      loadImages();
    } catch (err) {
      setMessage('Delete failed');
    }
  };

  const categories = [
    { key: 'faculty', label: 'Faculty' },
    { key: '8th', label: '8th Standard Students' },
    { key: '9th', label: '9th Standard Students' },
    { key: '10th', label: '10th Standard Students' }
  ];

  return (
    <div className="gallery-container">
      <div className="container">
        <h1>School Gallery</h1>

        {auth.userRole === 'teacher' && (
          <section className="upload-section">
            <h3>Upload New Image</h3>
            {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
            <form onSubmit={handleUpload}>
              <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value)}>
                {categories.map(cat => (
                  <option key={cat.key} value={cat.key}>{cat.label}</option>
                ))}
              </select>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload Image'}</button>
            </form>
          </section>
        )}

        {categories.map(cat => (
          <section key={cat.key} className="gallery-section">
            <h2>{cat.label}</h2>
            <div className="gallery-grid">
              {images[cat.key]?.length > 0 ? (
                images[cat.key].map(img => (
                  <div key={img._id} className="gallery-item">
                    <img src={img.url} alt="gallery" onClick={() => setModal({ show: true, image: img })} />
                    {auth.userRole === 'teacher' && (
                      <button className="delete-btn" onClick={() => handleDelete(img._id)}>Delete</button>
                    )}
                  </div>
                ))
              ) : (
                <p>No images yet</p>
              )}
            </div>
          </section>
        ))}

        {modal.show && (
          <div className="modal" onClick={() => setModal({ show: false, image: null })}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img src={modal.image?.url} alt="enlarged" />
              <button onClick={() => setModal({ show: false, image: null })}>&times;</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
