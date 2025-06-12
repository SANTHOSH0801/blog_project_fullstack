import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelectedEmailid } from '../Context/UserDataContext.jsx'
import image from "../assets/image-3.avif"
import blogimage from "../assets/image-1.jpeg"
import blogcenter from "../assets/Blogs-center.jpg"

import axios from 'axios';
import '../css/login.css'
import '../css/Signup.css'

function Login() {
    const [inputs, setInputs] = useState({})
    const { setSelectedEmailid } = useSelectedEmailid();

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://blogprojectbackend-production.up.railway.app/api/login/', inputs);
            if (response.data.success) {
                console.log("Login successful");

                localStorage.setItem("token", response.data.token);

                console.log("Data:", response);

                setSelectedEmailid(inputs.email);
                navigate('/');
            } else {
                console.log("Login failed:", response.data.error);
                // alert(response.data.error);
            }
        } catch (error) {
            console.log("Login error:", error);
            alert("Invalid creddentials.");
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };





    return (
        <>
            <header className="header">
                {/* Left: Logo */}
                <div className="header-left">
                    <img src={blogimage} alt="Blog image" className="logo" />
                </div>

                {/* Center: Blog Title Image */}
                <div className="header-center">
                    <img src={blogcenter} alt="Blog center" className="website-name" />
                </div>

                {/* Right: Navigation */}
                <nav className="nav-links">
                    <button className="signup" onClick={() => navigate('/')}>Home</button>
                    <button className="active" onClick={() => navigate('/Login')}>Login</button>
                    <button className="signup" onClick={() => navigate('/Signup')}>Sign up</button>

                </nav>

            </header>

            <section className="login-section">
                <div className="login-container">
                    {/* Left Side */}
                    <div className="form-side">
                        <div className="form-header">
                            <i className="fas fa-crow icon"></i>
                            <span className="title">SIGN IN</span>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">

                            <div className="input-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={inputs.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={inputs.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="login-btn">Login</button>

                            <div className="extra-links">
                                <p><a href="#">Forgot password?</a></p>
                                <p>Don't have an account? <a onClick={() => navigate('/Signup')} >Register here</a></p>
                            </div>
                        </form>
                    </div>

                    {/* Right Side */}
                    <div className="image-side">
                        <img src= {image} alt="Login side image" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
