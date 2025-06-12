import React, { useState } from 'react';
import '../css/BlogCreationPage.css';
import '../css/Signup.css'
import axios from 'axios'
import UploadImageBlog from '../Components/UploadImageBlog.jsx'
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/image-1.jpeg'
import image2 from '../assets/Blogs-center.jpg'
import bgImage from '../assets/image-5.webp';


function BlogCreationPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showTextarea, setShowTextarea] = useState(false);
    const [blogType, setBlogType] = useState("")

    const [Errors, setErrors] = useState({});


    function checkBlocks({ title, blogType, content }) {
        const errors = {}
        if (!title || title.trim() === "") {
            errors.title = "Blog Title is required"
        }
        if (!blogType || blogType.trim() === "") {
            errors.blogType = "Blog Type is required"
        }
        if (!content || content.trim() === "") {
            errors.content = "Blog content is required"
        }
        return errors;
    }

    async function sendData({ title, blogType, content }) {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };

            const response = await axios.post(
                "https://blogprojectbackend-production.up.railway.app/api/blogs/",
                {
                    title: title,
                    content: content,
                    description: content,
                    blog_type: blogType, // if your model has this field
                },
                config
            );

            console.log("Successfully created the blog", response.data);
            navigate('/'); // redirect or show success
        } catch (error) {
            console.error("Blog creation failed:", error.response?.data || error.message);
            // alert("Failed to create blog");
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = checkBlocks({ title, blogType, content });
        console.log("errors:", newErrors)
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            // console.log("Submitted blog:", { title, blogType, content });
            sendData({ title, blogType, content });
        }
        // You would POST this to your backend here.
    };

    const handlePlaceHolder = () => {
        setShowTextarea(true);
    }


    return (
        <>
            <header className="header">
                {/* Left: Logo */}
                <div className="header-left">
                    <img src= {image1} alt="Blog image" className="logo" />
                </div>

                {/* Center: Blog Title Image */}
                <div className="header-center">
                    <img src= {image2} alt="Blog center" className="website-name" />
                </div>

                {/* Right: Navigation */}
                <nav className="nav-links">
                    <button className="signup" onClick={() => navigate('/')}>Home</button>
                    <button className="active" onClick={() => navigate('/BlogCreation')}>Create Blog</button>

                </nav>
            </header>
            <div className="blog-create-container">
                <h1 className="heading">Create Your Blog</h1>
                <form onSubmit={handleSubmit} className="blog-form">
                    <div className="blog-image">
                        <UploadImageBlog />
                    </div>
                    <input
                        type="text"
                        placeholder="Enter Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="editable-text"
                    />
                    {Errors.title && (
                        <span className='error-message'>
                            {Errors.title}
                        </span>
                    )}
                    <input
                        type="text"
                        placeholder="Enter Blog Type"
                        value={blogType}
                        onChange={(e) => setBlogType(e.target.value)}
                        className="editable-text-blog"
                    />
                    {Errors.blogType && (
                        <span className='error-message'>
                            {Errors.blogType}
                        </span>
                    )}
                    <p className="blog-date">{new Date().toLocaleDateString()}</p>
                    {!showTextarea && (
                        <div className="blog-placeholder-container"  style={{ backgroundImage: `url(${bgImage})` }} onClick={handlePlaceHolder}>
                            <div className="blog-placeholder-box">
                                <a role="button" tabIndex="0" className="placeholder-text">Click to add text</a>
                            </div>
                        </div>
                    )}

                    {showTextarea && (
                        <textarea
                            placeholder="Write your blog here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="blog-content"
                            rows="10"
                        />
                    )}
                    {Errors.content && (
                        <span className='error-message'>
                            {Errors.content}
                        </span>
                    )}
                    <p className="word-count">
                        Words: {content.trim() === '' ? 0 : content.trim().split(/\s+/).length}
                    </p>

                    <button type="submit" className="submit-btn" style={{ backgroundColor: "#facc24" }}>Share this post</button>
                </form>
            </div>
        </>
    );
}

export default BlogCreationPage;
