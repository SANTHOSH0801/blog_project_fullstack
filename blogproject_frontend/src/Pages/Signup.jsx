import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../css/Signup.css';
import logoImage from '../assets/image-1.jpeg';
import bannerImage from '../assets/Blogs-center.jpg';
import image3 from '../assets/image-4.jpg'

function Signup() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [Data, SetData] = useState({
        username: "",
        password: "",
        email: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleData = (e) => {
        const { name, value } = e.target;
        SetData({ ...Data, [name]: value });
    };

    async function submitData(Data) {
        try {
            const response = await axios.post("https://blogprojectbackend-production.up.railway.app/api/register/", Data);
            console.log("Signup successful", response.data);
            setSuccessMessage("User  registered successfully!"); // Set success message
            setErrorMessage(""); // Clear any previous error messages
            SetData({ username: "", password: "", email: "" }); // Clear form fields
        } catch (error) {
            console.log("Error:", error);
            setErrorMessage(error.response?.data?.error || "An error occurred during registration."); // Set error message
            setSuccessMessage(""); // Clear any previous success messages
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(Data);
        console.log(newErrors);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Data is valid");
            submitData(Data);
        }
    };

    const validateForm = (Data) => {
        const errors = {};
        if (!Data.username || Data.username.trim() === "") {
            errors.username = "Username should not be empty";
        } else if (Data.username.trim().length < 4) {
            errors.username = "Username should be minimum 4 characters length";
        }
        if (!Data.password || Data.password.trim() === "") {
            errors.password = "Password should not be empty";
        } else if (Data.password.trim().length < 8) {
            errors.password = "Password should be minimum 8 characters length";
        }
        if (!Data.email || Data.email.trim() === "") {
            errors.email = "Email should not be empty";
        }
        return errors;
    };

    return (
        <>
            <header className="header">
                <div className="header-left">
                    <img src={logoImage} alt="Blog image" className="logo" />
                </div>
                <div className="header-center">
                    <img src= {bannerImage} alt="Blog center" className="website-name" />
                </div>
                <nav className="nav-links">
                    <button className="signup" onClick={() => navigate('/')}>Home</button>
                    <button className="signup" onClick={() => navigate('/Login')}>Login</button>
                    <button className="active" onClick={() => navigate('/Signup')}>Sign up</button>
                </nav>
            </header>

            {/* Main */}
            <main className="main-container">
                {/* Left Side: Form */}
                <div className="form-section">
                    <h1 className="form-title">Register here</h1>
                    <p className="form-subtitle">Start Your Blog Writing Today</p>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your name"
                                value={Data.username}
                                onChange={handleData}
                                className="input-field"
                            />
                            {errors.username && (
                                <span className='error-message'>
                                    {errors.username}
                                </span>
                            )}
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="xyz@gmail.com"
                                className="input-field"
                                value={Data.email}
                                onChange={handleData}
                            />
                            {errors.email && (
                                <span className='error-message'>
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div>
                            <input
                                type="password" // Changed to password type for security
                                name="password"
                                placeholder="Enter your password"
                                className="input-field"
                                value={Data.password}
                                onChange={handleData}
                            />
                            {errors.password && (
                                <span className='error-message'>
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="submit-btn" style={{ backgroundColor: "#facc24" }}
                        >
                            Create Account
                        </button>
                    </form>
                    {successMessage && <p className='success-message'>{successMessage}</p>}
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                </div>

                {/* Right Side Image */}
                <div className="image-section">
                    <img
                        src={image3}
                        alt="image"
                        className="rounded-3xl object-cover w-full h-[500px]"
                    />
                </div>
            </main>
        </>
    );
}

export default Signup;
