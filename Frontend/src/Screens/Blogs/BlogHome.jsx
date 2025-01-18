import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pen, Book } from 'lucide-react';

function BlogHome() {
  const location = useLocation();

  // Base path without the current endpoint
  const basePath = location.pathname.split('/').slice(0, -1).join('/');

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5 text-center">Welcome to Blog Home</h1>

      <div className="d-flex flex-column align-items-center">
        {/* Button to Read Blogs */}
        <Link to={`${basePath}/blogList`} className="btn btn-primary btn-lg mb-4 Blogsbutton">
          <Book className="mb-1" size={36} />
          <span className="ms-2">Read Blogs</span>
        </Link>

        {/* Button to Write a Blog */}
        <Link to={`${basePath}/blogPost`} className="btn btn-primary btn-lg Blogsbutton">
          <Pen className="mb-1" size={36} />
          <span className="ms-2">Write a Blog</span>
        </Link>
      </div>
    </div>
  );
}

export default BlogHome;
