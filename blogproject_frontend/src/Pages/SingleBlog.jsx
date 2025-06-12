import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/SingleBlog.css'
import BlogDetail from '../Components/BlogDetail.jsx'
import image1 from '../assets/image-1.jpeg'
import image2 from '../assets/Blogs-center.jpg'


function SingleBlog() {
    const navigate = useNavigate()
    // console.log("Entered")
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
                    <button className="active" onClick={() => navigate('/')}>Home</button>
                    <a>About</a>
                    <button onClick={() => navigate('/Login')}>Login</button>
                    <a className="signup" onClick={() => navigate('/Signup')}>Sign up</a>
                </nav>
            </header>
            <BlogDetail />
        </>
    )
}

export default SingleBlog
