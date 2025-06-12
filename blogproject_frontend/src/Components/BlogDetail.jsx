import React, { useEffect, useState } from 'react';
import './BlogDetail.css';
// import moment from 'moment';
import axios from 'axios';
import image1 from '../assets/image-2.jpg';

import { useSelectedBlogId } from '../Context/SelectedBlog.jsx'

const BlogDetail = () => {
    const { selectedBlogId } = useSelectedBlogId();
    const Id = parseInt(selectedBlogId)

    const [blog, setBlog] = useState(null);

    const token = localStorage.getItem('token');


    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await axios.get(`https://blogprojectbackend-production.up.railway.app/api/blogs/${Id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (response) {
                    console.log("Post Data got success")
                    console.log("Blog", response.data);
                    setBlog(response.data);

                } else {
                    console.log("Issue with the data");
                }
            }
            catch (error) {
                console.log("Error in establishing the server:", error);
            }
        }
        fetchBlog();
        // setPosts(mockPosts);
    }, [Id, token]);


    if (!blog) {
        return <div className="blog-container">No blog found with ID {Id}</div>;
    }

    return (
        <div className="blog-container">
            <div className="blog-content" style={{ width: "100%", height: "1000px" }}>
                <h1 className="blog-title">{blog.title}</h1>
                <div className="blog-meta">
                    <div className="blog-author">
                        <div>
                            <p className="author-name">{blog.author?.username || "Unknown"}</p>
                            <p className="blog-date">
                                Date: {new Date(blog.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="blog-interactions">
                        <p className="comment-count">{blog.comments} Comments</p>
                    </div>
                </div>
                <div className="blog-image">
                    <img
                        src={image1}
                        alt="featured"
                    />
                </div>
                <div
                    className="blog-html-content"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                ></div>

            </div>
        </div>
    );
};

export default BlogDetail;
