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
          q: 'Charity donations platform', // Updated query for broader donation-related topics
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
      <h2 className="video-heading text-center text-2xl font-bold mb-5">
        Learn About Donations and Social Impact
      </h2>
      <div className="video-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item bg-gray-100 rounded-lg shadow-md p-4">
            {/* Embedded YouTube video */}
            <YouTube videoId={video.id.videoId} />
            <h3 className="video-title text-lg font-medium mt-3 text-gray-800">
              {video.snippet.title}
            </h3>
            <p className="video-description text-sm text-gray-600 mt-2">
              {video.snippet.description.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;
