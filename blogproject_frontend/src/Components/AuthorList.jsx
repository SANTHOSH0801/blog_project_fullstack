import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthorList.css'; // Import your CSS for styling

import image1 from '../assets/images/image-1.avif';
import image2 from '../assets/images/image-2.avif';
import image3 from '../assets/images/image-3.avif';
import image4 from '../assets/images/image-4.avif';
import image5 from '../assets/images/image-5.avif';
import image6 from '../assets/images/image-6.avif';
import image7 from '../assets/images/image-7.avif';

const fallbackImages = [image1, image2, image3, image4, image5, image6, image7];


function AuthorList({ blogs = [] }) {
    const navigate = useNavigate();
    const postsPerPage = 7;
    const [page, setPage] = React.useState(1);

    const nextPage = () => {
        setPage(prev => Math.min(prev + 1, Math.ceil(blogs.length / postsPerPage)));
    };

    const prevPage = () => {
        setPage(prev => Math.max(prev - 1, 1));
    };

    const selectBlog = (id) => {
        navigate(`/EditBlog/SingleEditBlog/${id}`);
    };

    // Calculate total pages
    const totalPages = Math.ceil(blogs.length / postsPerPage);
    const currentBlogs = blogs.slice((page - 1) * postsPerPage, page * postsPerPage);

    return (
        <div className="container">
            <div className="categories__grid__post">
                <div className="row">
                    {currentBlogs.length > 0 ? (
                        currentBlogs.map((post, index) => (
                            <div className="categories__list__post__item" key={post.id}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="categories__post__item__pic set-bg"
                                            style={{ backgroundImage: `url(${post.image || fallbackImages[index % fallbackImages.length]})`}}>
                                            <div className="post__meta">
                                                <h4>{new Date(post.created_at).getDate()}</h4>
                                                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="categories__post__item__text">
                                            <span className="post__label">Blog</span>
                                            <h3>
                                                <a onClick={() => selectBlog(post.id)} style={{ cursor: 'pointer' }}>
                                                    {post.title || 'Untitled Blog Post'}
                                                </a>
                                            </h3>
                                            <ul className="post__widget">
                                                <li>by <span>{post.author.username || 'Admin'}</span></li>
                                                <li>{post.read_time || '3'} min read</li>
                                                <li>{post.comments} Comment{post.comments !== 1 ? 's' : ''}</li>
                                            </ul>
                                            <p>
                                                {post.content.substring(0, 150) + '...'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p>No blogs found.</p>
                        </div>
                    )}

                    {blogs.length > postsPerPage && (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="categories__pagination">
                                    {page > 1 && (
                                        <a onClick={prevPage} className="page-button" style={{ cursor: 'pointer' }}>
                                            Previous
                                        </a>
                                    )}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                                        <a
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`page-button ${page === pageNum ? 'active' : ''}`}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {pageNum}
                                        </a>
                                    ))}
                                    {page < totalPages && (
                                        <a onClick={nextPage} className="page-button" style={{ cursor: 'pointer' }}>
                                            Next
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthorList;
