import React, { useState } from 'react';
import axios from 'axios';

function BlogPost() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/blog', formData);
      // Clear form after successful submission (optional)
      setFormData({
        title: '',
        author: '',
        content: ''
      });
      alert('Blog post submitted successfully!');
    } catch (error) {
      console.error('Error submitting blog post:', error);
      alert('Failed to submit blog post. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="5"
            value={formData.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default BlogPost;
