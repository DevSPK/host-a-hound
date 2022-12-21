// AddHost/index.js

import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkAddHost } from "../../store/host";
import "./AddHost.css"

const AddHost = () => {
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("")
    const [img_url, setImg_url] = useState("");
    const [price_per_night, setPrice_per_night] = useState(0);
    const [lat, setLat] = useState(38.889248);
    const [lng, setLng] = useState(-77.050636);
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        if (!user) {
            history.push('/')
            return
        }
    }, [user])

    useEffect(() => {
        let errorsArr = []

        let parsedPrice = parseFloat(price_per_night)
        
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

        function isImgUrl(url) {
            return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
          }
        

        if (!(name && about && price_per_night && address && city && state && country && img_url)) errorsArr.push("All fields must be filled out")
        if (name && name.length > 75) errorsArr.push("Host name must be less than 75 characters")
        if (address && address.length > 150) errorsArr.push("Host address must be less than 150 characters")
        if (city && city.length > 75) errorsArr.push("Host city must be less than 75 characters")
        if (state && state.length > 25) errorsArr.push("Host state must be less than 25 characters")
        if (country && country.length > 50) errorsArr.push("Host country must be less than 50 characters")
        if (img_url && (isImgUrl(img_url))) errorsArr.push("Please enter a valid imgage URL")
        if (about && about.length > 2000) errorsArr.push("Host about must be less than 2000 characters")
        if (price_per_night && (!parsedPrice || !Number(price_per_night) || parsedPrice <= 0)) errorsArr.push('Price must be greater than zero')
        

        setErrors(errorsArr)
    }, [name, about, price_per_night, address, city, state, country, img_url])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (errors.length) {
            setSubmitted(true)
            return
        }

        

        let hostInfo = {
            name, about, price_per_night, address, city, state, country, img_url, lat, lng
        }

        const host = await dispatch(thunkAddHost(hostInfo))
        history.push(`/hosts/${host.id}`)
    }

    return (
        <div className="add-host-form-wrapper">
            <form onSubmit={handleSubmit} className='add-host-form'>
                <h1>Add a new host</h1>
                {errors.length > 0 && submitted && <ul className="add-host-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                    <label>
                        Image URL
                    </label>
                    <input
                        type="text"
                        value={img_url}
                        onChange={(e) => setImg_url(e.target.value)}
                        required
                        minLength={1}
                        maxLength={2048}
                    />
                </div>
                <div>
                    <label>
                        Price per night
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={price_per_night}
                        onChange={(e) => setPrice_per_night(e.target.value)}
                        required
                        min={0.01}
                    />
                </div>
                <div>
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
                    />
                </div>
               
                <button type='submit'>Create host</button>
            </form>
            <button className='cancel-btn' onClick={() => history.push(`/`)}>Cancel</button>
        </div>
    )
}

export default AddHost
