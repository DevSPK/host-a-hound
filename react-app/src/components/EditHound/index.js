// EditHound/index.js

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {thunkUpdateHound}  from '../../store/hound'
import { thunkReadAllHounds } from '../../store/hound'
import { thunkGetOneHound } from '../../store/hound'
import './EditHound.css'

function EditHound() {
    const { houndId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    let editedHound
    const sessionUser = useSelector(state => state.session.user)
    
    
    
    useEffect(() => {
        dispatch(thunkReadAllHounds());
    }, [dispatch, houndId]);
    
    const hounds = useSelector((state) => Object.values(state.hound))

    console.log("this is hounds in edit hounds", hounds)
   

  

  let normalizedHounds = {};

  hounds?.forEach((hound) => (normalizedHounds[hound.id] = hound));

  const hound = normalizedHounds[houndId];

//   if (hound.owner_id !== sessionUser.id) {
//     history.push("/403")
//   }

  editedHound = hound

    const [name, setName] = useState(editedHound?.name);
    const [description, setDescription] = useState(editedHound?.description);
    const [age, setAge] = useState(editedHound?.age);
    const [spayedNeutered, setSpayedNeutered] = useState(editedHound?.spayedNeutered);
    const [img_url, setImg_url] = useState(editedHound?.img_url);
    const [errors, setErrors] = useState([])


    
  useEffect(() => {
    if (!editedHound) {
      return;
    }
  }, [dispatch, houndId, editedHound]);

  useEffect(() => {
    const errorsArr = [];

    function isImgUrl(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
      }
    

    
        

      if (!(name && description && age && img_url)) errorsArr.push("All fields must be filled out")
      if (name && (name.length < 5 || name.length > 75)) errorsArr.push("Hound name must be between 5 and 75 characters")
      if (age && (age.length < 1 || age.length) > 3) errorsArr.push("Hound age must be between 1 and 2 characters")
      // if (spayedNeutered) errorsArr.push("Must provide spayed/neutered status")
      if (!isImgUrl(img_url)) errorsArr.push("Please enter a valid imgage URL")
      if (description && (description.length < 10 || description.length > 2000)) errorsArr.push("Description must be at least 10 characters and less than 2000 characters")
      
    setErrors(errorsArr);
  }, [name, description, age, spayedNeutered, img_url]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    let newInfo = {
        id:houndId, name, description, spayed_neutered:true, age, img_url
    };

   

    console.log({ newInfo });

    setErrors([]);

    try {
        const data = await dispatch(thunkUpdateHound(newInfo))
        
        if (data.errors) {
            await setErrors(data.errors);
        } else {
            history.push(`/hound/${houndId}`)
        }
    } catch (res) {
        console.log("this is res", res)
        history.push('/404')
    }
}


  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrors([]);

    history.push(`/hounds`);
  };

  if (!editedHound) return null;


    
    return (
        <div id='edit-hound-form-wrapper'>
        <form className='edit-hound-form' onSubmit={handleSubmit}>
            <h1>Edit this hound</h1>
           
            <div>
                <label>Name</label>
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
                        Hound's age
                    </label>
                    <input
                        type="number"
                        step="1"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        min={1}
                        placeholder="years old"
                    />
                </div>
                <div>
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
                    />
                </div>
                <div>
                {errors.length > 0 && <ul className="edit-hound-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
            </div>
           {
            errors.length === 0 &&
            <button  type='submit'>Edit hound</button>
           }
        <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
        </form>
    </div>
    )
}

export default EditHound