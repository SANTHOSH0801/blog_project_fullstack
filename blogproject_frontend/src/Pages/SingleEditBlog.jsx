import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UploadImageBlog from '../Components/UploadImageBlog.jsx';
import '../css/SingleEditBlog.css';
import axios from 'axios';
import image1 from '../assets/image-1.jpeg'
import image2 from '../assets/Blogs-center.jpg'



function SingleEditBlog() {
    const navigate = useNavigate();
    const { blogId } = useParams();

    const [blog, setBlog] = useState({ title: '', content: '', image: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch blog data on component mount
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                const token = localStorage.getItem('token');

                const response = await axios.get(`https://blogprojectbackend-production.up.railway.app/api/blogs/${blogId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log("Full API response:", response.data); // Debug log

                // Handle different response structures
                if (response.data) {
                    // Check if it's a direct blog object
                    if (response.data.id) {
                        setBlog(response.data);
                        console.log("Blog data set (direct):", response.data);
                    }
                    // Check if it's wrapped in a success structure
                    else if (response.data.success && response.data.blog) {
                        setBlog(response.data.blog);
                        console.log("Blog data set (wrapped):", response.data.blog);
                    }
                    // Check if it's an array and find the matching blog
                    else if (Array.isArray(response.data)) {
                        const targetBlog = response.data.find(blog => blog.id === parseInt(blogId));
                        if (targetBlog) {
                            setBlog(targetBlog);
                            console.log("Blog data set (from array):", targetBlog);
                        } else {
                            setError('Blog not found in the list');
                        }
                    }
                    // Check if blogs are in a 'data' property
                    else if (response.data.data) {
                        if (Array.isArray(response.data.data)) {
                            const targetBlog = response.data.data.find(blog => blog.id === parseInt(blogId));
                            if (targetBlog) {
                                setBlog(targetBlog);
                                console.log("Blog data set (from data array):", targetBlog);
                            } else {
                                setError('Blog not found');
                            }
                        } else {
                            setBlog(response.data.data);
                            console.log("Blog data set (from data object):", response.data.data);
                        }
                    }
                    else {
                        console.error("Unexpected response structure:", response.data);
                        setError('Unexpected response format from server');
                    }
                } else {
                    setError('No data received from server');
                }
            } catch (error) {
                console.error("Error fetching blog:", error.response ? error.response.data : error.message);
                setError(`Failed to fetch blog data: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (blogId) {
            fetchBlog();
        } else {
            setError('No blog ID provided');
            setLoading(false);
        }
    }, [blogId]);

    // Handlers for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog(prev => ({ ...prev, [name]: value }));
    };

    // Save blog handler
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');

            // Create payload with only the necessary fields
            const payload = {
                title: blog.title,
                content: blog.content,
                // Add description if it exists in your blog object
                ...(blog.description && { description: blog.description }),
                // Add image if it exists
                ...(blog.image && { image: blog.image })
            };

            const response = await axios.put(`https://blogprojectbackend-production.up.railway.app/api/blogs/${blogId}/`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("Save response:", response.data);
            alert("Blog saved successfully!");
            navigate('/EditBlog');
        } catch (error) {
            console.error("Error saving blog:", error.response ? error.response.data : error.message);
            alert(`Failed to save blog: ${error.response?.data?.message || error.message}`);
        }
    };

    // Delete blog handler
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`https://blogprojectbackend-production.up.railway.app/api/blogs/${blogId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                alert("Blog deleted successfully!");
                navigate('/EditBlog');
            } catch (error) {
                console.error("Error deleting blog:", error.response ? error.response.data : error.message);
                alert(`Failed to delete blog: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading blog...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>;

    return (
        <>
            <header className="header">
                <div className="header-left">
                    <img src={image1} alt="Blog image" className="logo" />
                </div>
                <div className="header-center">
                    <img src={image2} alt="Blog center" className="website-name" />
                </div>
                <nav className="nav-links">
                    <button className="signup" onClick={() => navigate('/')}>Home</button>
                    <button className="signup" onClick={() => navigate('/BlogCreation')}>Create Blog</button>
                </nav>
            </header>
            <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
                <h1 className="heading">Edit Your Blog</h1>
                <div>
                    <p>Edit the Photo</p>
                    <UploadImageBlog />
                </div>
                <div className='blog-form'>
                    <input
                        type="text"
                        placeholder="Enter Blog Title"
                        name="title"
                        value={blog.title || ''} // Add fallback
                        onChange={handleChange}
                        className="editable-text"
                    />
                    <textarea
                        name='content'
                        placeholder="Enter Blog Content"
                        value={blog.content || ''} // Add fallback
                        onChange={handleChange}
                        className="editable-text-blog"
                        rows={10} // Add rows for better UX
                    />
                </div>


            </div>
            <div className="widgets">
                <button
                    onClick={handleSave}
                    disabled={!blog.title || !blog.content} // Disable if required fields are empty
                    style={{
                        padding: '10px 20px',
                        marginRight: 10,
                        backgroundColor: (!blog.title || !blog.content) ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: (!blog.title || !blog.content) ? 'not-allowed' : 'pointer'
                    }}
                >
                    Save
                </button>
                <button
                    onClick={handleDelete}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Delete
                </button>
            </div>
        </>
    );
}

export default SingleEditBlog;
