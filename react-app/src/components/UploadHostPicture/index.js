import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const UploadHostPicture = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    
    
    const handleSubmit = async (e) => {
        console.log("inside UploadHostPicture handlesubmit")
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea

        //check for filename issue from aws directions
        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            console.log("this is response from api/images", res)
            await res.json();
            setImageLoading(false);
            history.push("/images");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }
    
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    
    return (
        <>
            <input
            
              type="file"
              accept="image/*"
              onChange={updateImage}
            /> 
            {(imageLoading)&& <p>Loading...</p>}
        </>
    )
}

export default UploadHostPicture;