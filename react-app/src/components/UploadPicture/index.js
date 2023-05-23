// UploadPicture/index.js 

import React, { useState } from "react";

const UploadPicture = ({ handleImageUpload }) => {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            const imageUrl = data.url; // Extract the URL from the response data
            setImageLoading(false);
            handleImageUpload(imageUrl); // Call the handleImageUpload function with the image URL
        } else {
            setImageLoading(false);
            console.log("error");
        }
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={updateImage} />
            <button type="submit">Submit</button>
            {imageLoading && <p>Loading...</p>}
        </form>
    );
};

export default UploadPicture;