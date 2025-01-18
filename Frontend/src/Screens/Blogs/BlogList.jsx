import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Blogs.css';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const location = useLocation();

  // Determine the base path dynamically
  const basePath = location.pathname.split('/').slice(0, -1).join('/');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/blogs');
        const sortedBlogs = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 blog-title">Latest Blogs</h2>
      <div className="blogsList">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-6 mb-3">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{new Date(blog.createdAt).toDateString()}</p>
                <Link to={`${basePath}/blogs/${blog._id}`} className="blogButton">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
