import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelectedEmailid } from '../Context/UserDataContext.jsx';
import axios from 'axios';
import AuthorList from '../Components/AuthorList.jsx';
import image1 from '../assets/image-1.jpeg'
import image2 from '../assets/Blogs-center.jpg'



function BlogEditPage() {
    const navigate = useNavigate();
    const [authorBlogList, setAuthorBlogList] = useState([]);
    const { selectedEmailid } = useSelectedEmailid();
    const EmailId = selectedEmailid;
    const [hasBlogs, setHasBlogs] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem('token');

                if (!token) {
                    navigate('/Login');
                    return;
                }

                const response = await axios.get(
                    `https://blogprojectbackend-production.up.railway.app/api/my-blogs/`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.data.success) {
                    if (response.data.blogs && response.data.blogs.length > 0) {
                        setAuthorBlogList(response.data.blogs);
                        console.log("Blogs fetched successfully:", response.data.blogs);
                        setHasBlogs(true);
                    } else {
                        setAuthorBlogList([]);
                        setHasBlogs(false);
                    }
                } else {
                    setError('Failed to fetch blogs');
                    setHasBlogs(false);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/Login');
                } else {
                    setError('Failed to fetch blogs');
                    setHasBlogs(false);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, [navigate]);

    return (
        <>
            <header className="header">
                <div className="header-left">
                    <img src= {image1} alt="Blog image" className="logo" />
                </div>
                <div className="header-center">
                    <img src={image2} alt="Blog center" className="website-name" />
                </div>
                <nav className="nav-links">
                    <button className="signup" onClick={() => navigate('/')}>Home</button>
                    <button className="signup" onClick={() => navigate('/Login')}>Login</button>
                    <button className="signup" onClick={() => navigate('/Signup')}>Sign up</button>
                    <button className="signup" onClick={() => navigate('/BlogCreation')}>Create Blog</button>
                    <button className="active" onClick={() => navigate('/EditBlog')}>Edit Blogs</button>
                </nav>
            </header>

            <div className="content">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : hasBlogs ? (
                    <AuthorList blogs={authorBlogList} />
                ) : (
                    <div>
                        <h2>You haven't created any blogs yet.</h2>
                        <button onClick={() => navigate('/BlogCreation')}>Create Blog</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default BlogEditPage;
