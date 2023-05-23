// AddHost/index.js

import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkAddHost } from "../../store/host";
import UploadPicture from "../UploadPicture";
import "./AddHost.css"

const AddHost = () => {
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("")
    const [img_url, setImg_url] = useState("");
    const [image, setImage] = useState("");
    const [price_per_night, setPrice_per_night] = useState("");
    const [lat, setLat] = useState(38.889248);
    const [lng, setLng] = useState(-77.050636);
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const [imageLoading, setImageLoading] = useState(false);
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        if (!user) {
            history.push('/')
            return
        }
    }, [user])

    let parsedPrice = parseFloat(price_per_night).toFixed(2)

    useEffect(() => {
        let errorsArr = []

        
        // async function isImgUrl(url) {
        //     const res = await fetch(url, { method: 'HEAD' });

        //     if (res.ok) {

        //         return res.headers.get('Content-Type').startsWith('image');
        //     }else{
        //         return false
        //     }
            
        //   }

        // function isImgUrl(url) {
        //     const img = new Image();
        //     img.src = url;
        //     return new Promise((resolve) => {
        //       img.onload = () => resolve(true);
        //       img.onerror = () => resolve(false);
        //     });
        //   }

        // function isImgUrl(url) {
        //     return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
        //   }
        

        if (!(name && about && price_per_night && address && city && state && country && img_url)) errorsArr.push("All fields must be filled out")
        if (name && name.length > 75) errorsArr.push("Host name must be less than 75 characters")
        if (address && address.length > 150) errorsArr.push("Host address must be less than 150 characters")
        if (city && city.length > 75) errorsArr.push("Host city must be less than 75 characters")
        if (state && state.length > 25) errorsArr.push("Host state must be less than 25 characters")
        if (country && country.length > 50) errorsArr.push("Host country must be less than 50 characters")
        // if (img_url && (isImgUrl(img_url))) errorsArr.push("Please enter a valid imgage URL")
        if (about && about.length > 2000) errorsArr.push("Host about must be less than 2000 characters")
        if (price_per_night && (!parsedPrice || !Number(price_per_night) || parsedPrice <= 0)) errorsArr.push('Price must be greater than zero')
        
       

        setErrors(errorsArr)
    }, [name, about, price_per_night, address, city, state, country])

    const handleImageUpload = (imageUrl) => {
        setImg_url(imageUrl); // Update the img_url state with the provided image URL
    };

    // function isImgUrl(url) {

    //     let checkURL = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(url)
        
    //     if (url === null) {
    //         return false
    //     }
    //     // console.log(checkURL)

    //     if (checkURL) {
    //         return true
    //     }

    //     else {return false}
    //   }



      const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        console.log("this is image", image)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setImageLoading(true);

        if (errors.length === 0) {
            let hostInfo = {
                name, about, price_per_night, address, city, state, country, img_url:image, lat, lng
            }
            
            setSubmitted(true)
            
            await dispatch(thunkAddHost(hostInfo))
       
        
            setImageLoading(false);
            await history.push(`/`)
            return
        } else {
            setImageLoading(false);
            return setErrors(errors)
        }

        history.push(`/`)
        
       
    }

    // console.log("these are errors", errors)
    return (
        <div className="add-host-form-wrapper">
            <form onSubmit={handleSubmit} className='add-host-form'>
                <h1>Add a new host</h1>
                {/* {errors.length > 0 && <ul className="add-host-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>} */}
                <div className="add-host-form-item">
                    <label>
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={1}
                        maxLength={75}
                    />
                </div>
                <div className="add-host-form-item">
                    <label>
                        Address
                    </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        minLength={1}
                        maxLength={150}
                    />
                </div>
                <div className="add-host-form-item">
                    <label>
                        City
                    </label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        minLength={1}
                        maxLength={75}
                    />
                </div>
                <div className="add-host-form-item">
                    <label>
                        State
                    </label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        minLength={1}
                        maxLength={25}
                    />
                </div>
                <div className="add-host-form-item">
                    <label>
                        Country
                    </label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        minLength={1}
                        maxLength={50}
                    />
                </div>
                <div>
                <label>Image</label>
                    <UploadPicture handleImageUpload={handleImageUpload} /> {/* Pass handleImageUpload as a prop */}
                </div>
                <div className="add-host-form-item">
                    <label>
                        Price per night
                    </label>
                    <input
                        placeholder="$"
                        type="number"
                        step="0.01"
                        value={price_per_night}
                        onChange={(e) => setPrice_per_night(e.target.value)}
                        required
                        min={0.01}
                    />
                </div>
                <div className="add-host-form-item">
                <label>
                        About your host
                    </label>
                    <textarea
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                        minLength={1}
                        maxLength={2000}
                        // placeholder="About your host"
                    />
                </div>
                {errors.length > 0 && <ul className="add-host-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                {errors.length === 0 && 
                <button className="add-host-form-item submit-btn" type='submit'>Create host</button>
                }
            <button className='cancel-btn add-host-form-item' onClick={() => history.push(`/`)}>Cancel</button>
            </form>
        </div>
    )
}

export default AddHost
