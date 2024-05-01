import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Blog.css"
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
    <div className="container py-5">
      {blog ? (
        <div className="card shadow">
          <div className="card-body">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="card-text text-muted mb-3">Author: {blog.author}</p>
            <p className="card-text text-muted mb-3">Published: {new Date(blog.createdAt).toDateString()}</p>
            <p className="card-text">{blog.content}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Blog;
