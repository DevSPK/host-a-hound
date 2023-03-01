// AddHound/index.js

import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkAddHound} from "../../store/hound";
import "./AddHound.css"

const AddHound = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState("");
    const [spayedNeutered, setSpayedNeutered] = useState(true);
    const [img_url, setImg_url] = useState("");
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

console.log("this is add hounds user", user)


    useEffect(() => {
        let errorsArr = []

        

        
        
        if (!(name && description && age && img_url)) errorsArr.push("All fields must be filled out")
        if (name && (name.length < 2 || name.length > 75)) errorsArr.push("Hound name must be between 2 and 75 characters")
        if (age && (age.length < 1 || age.length) > 3) errorsArr.push("Hound age must be between 1 and 2 characters")
        // if (spayedNeutered) errorsArr.push("Must provide spayed/neutered status")
        if (!isImgUrl(img_url)) errorsArr.push("Please enter a valid imgage URL")
        if (description && (description.length < 10 || description.length > 2000)) errorsArr.push("Description must be at least 10 characters and less than 2000 characters")
        
        
       

        setErrors(errorsArr)
    }, [name, description, age, spayedNeutered, img_url])

    function isImgUrl(url) {

        let checkURL = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(url)
        
        if (url === null) {
            return false
        }
        console.log(checkURL)

        if (checkURL) {
            return true
        }

        else {return false}
      }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (errors.length === 0) {
            let houndInfo = {
                name, description, age, spayed_neutered:spayedNeutered, img_url
            }

            console.log("this is houndInfo", houndInfo)
    
            setSubmitted(true)
            await dispatch(thunkAddHound(houndInfo))
       
        

            await history.push(`/hounds`)
            return
        } else {
            return setErrors(errors)
        }

        

        
        
        
       
    }

    console.log("these are errors", errors)
    return (
        <div className="add-hound-form-wrapper">
            <form onSubmit={handleSubmit} className='add-hound-form'>
                <h1>Add a new hound</h1>
                {/* {errors.length > 0 && <ul className="add-hound-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>} */}
                <div className="add-hound-form-item">
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
                {/* <div className="add-hound-form-item">
                    <label>
                        Spayed or Nuetered?
                    </label>
                    <select>
                        value={spayedNeutered}
                        onChange={(e) => setSpayedNeutered(e.target.value)}
                        <option
                        value=''
                        disabled>
                       Select one
                      </option>
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                </div> */}
                <div className="add-hound-form-item">
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
                        // placeholder="Image URL"
                    />
                </div>
                <div className="add-hound-form-item">
                    <label>
                        Hound's age 
                    </label>
                    <input
                        placeholder="years old"
                        type="number"
                        step="1"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        min={1}
                    />
                </div>
                <div className="add-hound-form-item">
                <label>
                        About your hound
                    </label>
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        minLength={1}
                        maxLength={2000}
                        // placeholder="About your hound"
                    />
                </div>
                {errors.length > 0 && <ul className="add-hound-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                {errors.length === 0 && 
                <button className="add-hound-form-item submit-btn" type='submit'>Create hound</button>
                }
            <button className='cancel-btn add-hound-form-item' onClick={() => history.push(`/`)}>Cancel</button>
            </form>
        </div>
    )
}

export default AddHound
