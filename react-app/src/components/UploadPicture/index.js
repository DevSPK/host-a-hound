// UploadPicture/index.js 

// import React, { useState } from "react";

// const UploadPicture = ({ handleImageUpload }) => {
//     const [image, setImage] = useState(null);
//     const [imageLoading, setImageLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("image", image);

//         setImageLoading(true);

//         const res = await fetch('/api/images', {
//             method: "POST",
//             body: formData,
//         });

//         if (res.ok) {
//             console.log("success")
//             const data = await res.json();
//             const imageUrl = data.url; // Extract the URL from the response data
//             setImageLoading(false);
//             handleImageUpload(imageUrl); // Call the handleImageUpload function with the image URL
//         } else {
//             setImageLoading(false);
//             console.log("error");
//         }
//     };

//     const updateImage = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="file" accept="image/*" onChange={updateImage} />
//             <button type="submit">Upload</button>
//             {imageLoading && <p>Loading...</p>}
//         </form>
//     );
// };

// export default UploadPicture;




// const UploadPicture = ({ handleImageUpload }) => {
//     const [image, setImage] = useState(null);
//     const [imageLoading, setImageLoading] = useState(false);

//     const uploadImage = async () => {
//         const formData = new FormData();
//         formData.append("image", image);

//         // Log the formData to console for debugging
//         for (var pair of formData.entries()) {
//             console.log(pair[0]+ ', ' + pair[1]); 
//         }

//         setImageLoading(true);

//         const res = await fetch('/api/images', {
//             method: "POST",
//             body: formData,
//         });

//         if (res.ok) {
//             console.log("success")
//             const data = await res.json();
//             const imageUrl = data.url; // Extract the URL from the response data
//             setImageLoading(false);
//             handleImageUpload(imageUrl); // Call the handleImageUpload function with the image URL
//         } else {
//             setImageLoading(false);
//             console.log("error");
//         }
//     };

//     const updateImage = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//         uploadImage(); // Call uploadImage here
//     };

//     return (
//         <div> {/* Removed form */}
//             <input type="file" accept="image/*" onChange={updateImage} />
//             {/* Removed button */}
//             {imageLoading && <p>Loading...</p>}
//         </div>
//     );
// };

// export default UploadPicture;

import React, { useState } from "react";

const UploadPicture = ({ handleImageUpload }) => {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("image", image);

        // Log the formData to console for debugging
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            console.log("success")
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
        console.log("This will log the MIME type of the file", file.type); // This will log the MIME type of the file
        setImage(file);
    };

    const handleUploadClick = () => {
        if(image) {
            uploadImage(); // Call uploadImage here
        }
    };

    return (
        <div> {/* Removed form */}
            <input type="file" accept="image/*" onChange={updateImage} />
            <button onClick={handleUploadClick}>Upload</button>
            {imageLoading && <p>Loading...</p>}
        </div>
    );
};

export default UploadPicture;