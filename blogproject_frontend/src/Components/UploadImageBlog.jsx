import React, { useState } from 'react';
import '../Components/UploadImageBlog.css'


function UploadImageBlog() {
    const [imagePreview, setImagePreview] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [imageFile, setImageFile] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // preview
        } else {
            alert("Please upload a valid image file.");
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-upload"
            />

            {/* Preview the uploaded image */}
            {imagePreview && (
                <div className="image-preview-container">
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                </div>
            )}
        </div>
    );
}

export default UploadImageBlog;
