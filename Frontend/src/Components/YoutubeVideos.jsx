import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './YouTubeVideos.css'; // Import CSS for styling

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        const params = {
          part: 'snippet',
          maxResults: 20,
          q: 'Food Waste Reduction',
          type: 'video',
          key: 'AIzaSyCxxCPLWwyqG_Z2gX3kGB9yUL2qwnU5M6c', // Replace with your YouTube Data API key
        };

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
        const videoItems = response.data.items;
        setVideos(videoItems);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      }
    };

    fetchYouTubeVideos();
  }, []);

  return (
    <div className="youtube-videos-container">
      <h2 className="video-heading">Food Waste Reduction</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <YouTube videoId={video.id.videoId} />
            <h3 className="video-title">{video.snippet.title}</h3>
            <p className="video-description">{video.snippet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;
