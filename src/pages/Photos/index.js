import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Photos.css';

const Photos = () => {
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading photos (you can replace with actual API call)
    const loadPhotos = () => {
      setTimeout(() => {
        // Mock photo data - replace with your actual photos
        const mockPhotos = [
          {
            id: 1,
            title: 'Beautiful Sunset',
            url: '/images/image01.jpg',
            description: 'A stunning sunset captured during our evening walk.',
            date: '2024-01-15'
          },
          {
            id: 2,
            title: 'Mountain Adventure',
            url: '/images/image02.jpg',
            description: 'Hiking through the beautiful mountain trails.',
            date: '2024-01-10'
          },
          {
            id: 3,
            title: 'City Lights',
            url: '/images/image03.jpg',
            description: 'The city skyline illuminated at night.',
            date: '2024-01-05'
          },
          {
            id: 4,
            title: 'Nature Walk',
            url: '/images/image04.jpg',
            description: 'Peaceful moments in nature.',
            date: '2024-01-01'
          }
        ];
        
        setPhotos(mockPhotos);
        setLoading(false);
      }, 1000);
    };

    loadPhotos();
  }, []);

  if (loading) {
    return (
      <div className="photos">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading your photos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="photos">
      <div className="container">
        <div className="photos-header">
          <h1>My Photos</h1>
          <p className="photos-intro">
            Welcome back, {user?.name || user?.username}! Here are your private photo collections.
          </p>
        </div>

        <div className="photos-grid">
          {photos.map(photo => (
            <div key={photo.id} className="photo-card">
              <div className="photo-image">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  loading="lazy"
                />
              </div>
              <div className="photo-info">
                <h3>{photo.title}</h3>
                <p className="photo-description">{photo.description}</p>
                <p className="photo-date">{new Date(photo.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="no-photos">
            <h3>No photos yet</h3>
            <p>Your photo collection is empty. Upload some photos to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
