import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Blog() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams(); // Access the 'id' parameter from the URL

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]); // Include 'id' in the dependency array to re-fetch blog when 'id' changes

  return (
    <div className="min-h-screen flex justify-center items-center px-4 mt-4  bg-transparent">
      {blog ? (
        <div className="overflow-hidden bg-transparent">
          <div className="px-6 py-8">
            <h1 className="text-7xl font-extrabold text-gray-800 mb-4 text-center">{blog.title}</h1>
            <p className="text-sm text-gray-500 mb-6 font-semibold">
              Published: {new Date(blog.createdAt).toDateString()}
            </p>
            <p className="text-gray-700 text-lg text-justify">{blog.content}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-lg">Loading...</p>
      )}
    </div>
  );
}

export default Blog;
