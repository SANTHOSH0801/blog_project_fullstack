/* eslint-disable no-unused-vars */
import React from 'react';
import './PostList.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import mockPosts from '../data/mockPosts.json'

import { useNavigate } from 'react-router-dom';
import { useSelectedBlogId } from '../Context/SelectedBlog';

import image1 from '../assets/images/image-1.avif';
import image2 from '../assets/images/image-2.avif';
import image3 from '../assets/images/image-3.avif';
import image4 from '../assets/images/image-4.avif';
import image5 from '../assets/images/image-5.avif';
import image6 from '../assets/images/image-6.avif';
import image7 from '../assets/images/image-7.avif';

const fallbackImages = [image1, image2, image3, image4, image5, image6, image7];


const PostList = () => {

    const navigate = useNavigate();
    const { setSelectedBlogId } = useSelectedBlogId();

    /// eslint-disable-next-line no-unused-vars
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])


    const selectBlog = (id) => {
        setSelectedBlogId(id);
        navigate(`/SingleBlog`);
        console.log("Selected Blog ID:", id);
    }


    const nextPage = () => {
        setPage(prev => prev + 1)
    }

    const token = localStorage.getItem('token');

    async function getPost() {
        try {
            const response = await axios.get("https://blogprojectbackend-production.up.railway.app/api/blogs/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.success) {
                console.log("Post Data got success")
                // console.log("posts", response.data);
                setPosts(response.data.posts);
            } else {
                console.log("posts", response.data.posts);
                console.log("Issue with the data");
            }
        }
        catch (error) {
            console.log("Error in establishing the server:", error);
        }
    }

    useEffect(() => {
        getPost();
        // setPosts(mockPosts);
    }, []);

    console.log("posts", posts);

    const postsPerPage = 7;
    const paginatedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

    return (
        <>
            <div className="container">
                <div className="categories__grid__post">
                    <div className="row">
                        {paginatedPosts.map((post, index) => (
                            <div className="categories__list__post__item" key={index}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="categories__post__item__pic set-bg" style={{ backgroundImage: post.image ? `url(${post.image})` : `url(${fallbackImages[index % fallbackImages.length]})`}}>
                                            <div className="post__meta">
                                                <h4>{new Date(post.created_at).getDate()}</h4>
                                                <span>{new Date(post.created_at).toLocaleString('default', { month: 'short' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="categories__post__item__text">
                                            <span className="post__label">Blog</span>
                                            <h3 className="title"><button onClick={() => selectBlog(post.id)}>{post.title || "Untitled Post"}</button></h3>
                                            <ul className="post__widget">
                                                <li>By <span>{post.author?.username || 'Unknown'}</span></li>
                                                <li>{post.comments || 0} Comments</li>
                                            </ul>
                                            <p className="truncate-description">{post.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="categories__pagination">
                                    <a onClick={nextPage} className="page-button">1</a>
                                    <a onClick={nextPage} className="page-button">2</a>
                                    <a onClick={nextPage} className="page-button">3</a>
                                    <a onClick={nextPage} className="page-button">Next</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostList;
