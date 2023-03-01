// EditHost/index.js

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {thunkUpdateHost}  from '../../store/host'
import { thunkReadAllHosts } from '../../store/host'
import { thunkGetOneHost } from '../../store/host'
import './EditHost.css'

function EditHost() {
    const { hostId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    let editedHost
    const sessionUser = useSelector(state => state.session.user)
    
    
    
    useEffect(() => {
        dispatch(thunkReadAllHosts());
    }, [dispatch, hostId]);
    
    const hosts = useSelector((state) => Object.values(state.host))

    console.log("this is hosts in edit hosts", hosts)
    //   let gottenHost

    //   async function getHost(hostId) {
    //     gottenHost = await dispatch(thunkGetOneHost(hostId))
    //     return
    //   }

    //   getHost(hostId)

    //   console.log("this is gottenHost", gottenHost)

  

  let normalizedHosts = {};

  hosts?.forEach((host) => (normalizedHosts[host.id] = host));

  const host = normalizedHosts[hostId];

  if (host.user_id !== sessionUser.id) {
    history.push("/403")
  }

  editedHost = host

    const [name, setName] = useState(editedHost?.name);
    const [about, setAbout] = useState(editedHost?.about);
    const [address, setAddress] = useState(editedHost?.address);
    const [city, setCity] = useState(editedHost?.city);
    const [state, setState] = useState(editedHost?.state);
    const [country, setCountry] = useState(editedHost?.country)
    const [img_url, setImg_url] = useState(editedHost?.img_url);
    const [price_per_night, setPrice_per_night] = useState(editedHost?.price_per_night);
    const [lat, setLat] = useState(38.889248);
    const [lng, setLng] = useState(-77.050636);
    const [errors, setErrors] = useState([])


    
  useEffect(() => {
    if (!editedHost) {
      return;
    }
  }, [dispatch, hostId, editedHost]);

  useEffect(() => {
    let errorsArr = [];

    function isImgUrl(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
      }
    

      let parsedPrice = parseFloat(price_per_night).toFixed(2)
        

    // if (!(name && about && price_per_night && address && city && state && country && img_url)) errorsArr.push("All fields must be filled out")
    // if (name && name.length > 75) errorsArr.push("Host name must be less than 75 characters")
    // if (address && address.length > 150) errorsArr.push("Host address must be less than 150 characters")
    // if (city && city.length > 75) errorsArr.push("Host city must be less than 75 characters")
    // if (state && state.length > 25) errorsArr.push("Host state must be less than 25 characters")
    // if (country && country.length > 50) errorsArr.push("Host country must be less than 50 characters")
    // if (img_url && (isImgUrl(img_url))) errorsArr.push("Please enter a valid imgage URL")
    // if (about && about.length > 2000) errorsArr.push("Host about must be less than 2000 characters")
    // if (price_per_night && (!parsedPrice || !Number(price_per_night) || parsedPrice <= 0)) errorsArr.push('Price must be greater than zero')
    

    if (!(name && about && price_per_night && address && city && state && country && img_url)) errorsArr.push("All fields must be filled out")
    if (name && (name.length < 5 || name.length > 75)) errorsArr.push("Host name must be between 5 and 75 characters")
    if (address && (address.length < 10 || address.length) > 150) errorsArr.push("Host address must be between 10 and 150 characters")
    if (city && (city.length < 5 ||  city.length > 75)) errorsArr.push("Host city must be between 5 and 75 characters")
    if (state && (state.length < 2 || state.length > 25)) errorsArr.push("Host state must be between 2 and 25 characters")
    if (country && (country.length < 2 || country.length > 50)) errorsArr.push("Host country must be between 2 and 50 characters")
    if (!isImgUrl(img_url)) errorsArr.push("Please enter a valid imgage URL")
    if (about && (about.length < 10 || about.length > 2000)) errorsArr.push("About must be at least 10 characters and less than 2000 characters")
    if (price_per_night && price_per_night < 0) errorsArr.push('Price must be greater than zero')
        
    setErrors(errorsArr);
  }, [name, about, price_per_night, address, city, state, country, img_url]);


    // let host = {}
    // if (!host) {
    //     (async () => {
    //         host = await dispatch(thunkGetOneHost(hostId))

    //         console.log("this is host in async func", host)

    //         // checks if user can edit
    //         if(host.user_id !== sessionUser.id) {
    //             history.push('/403')
    //         }

    //         await setName(host.name)
    //         await setAbout(host.about)
    //         await setAddress(host.address)
    //         await setCity(host.city)
    //         await setState(host.state)
    //         await setCountry(host.country)
    //         await setImg_url(host.img_url)
    //         await setPrice_per_night(host.price_per_night)
    //         await setLat(host.lat)
    //         await setLng(host.lng)

    //     })()
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const editedHost = {
    //        id: hostId, name, about, price_per_night, address, city, state, country, img_url, lat, lng
    //     }

    //     setErrors([]);

    //     try {
    //         const data = await dispatch(thunkUpdateHost(editedHost))
    //         if (data.errors) {
    //             await setErrors(data.errors);
    //         } else {
    //             history.push(`/host/${hostId}`)
    //         }
    //     } catch (res) {
    //         history.push('/404')
    //     }
    // }


  const handleSubmit = async (e) => {
    e.preventDefault();

    let newInfo = {
        id: hostId, name, about, price_per_night, address, city, state, country, img_url, lat, lng
    };

    if (errors.length === 0) {
        
        await dispatch(thunkUpdateHost(newInfo))

        await history.push(`/host/${hostId}`)
        return
    } else {
        return setErrors(errors)
    }
}

    // console.log({ newInfo });

    // setErrors([]);

//     try {
//         const data = await dispatch(thunkUpdateHost(newInfo))
        
//         if (data.errors) {
//             await setErrors(data.errors);
//         } else {
//             history.push(`/host/${hostId}`)
//         }
//     } catch (res) {
//         history.push('/404')
//     }
// }
console.log("these are errors in edit host", errors)

  const handleCancelClick = (e) => {
    e.preventDefault();
    setErrors([]);

    history.push(`/`);
  };

  if (!editedHost) return null;


    
    return (
        <div className='edit-host-form-wrapper'>
        <form className='edit-host-form' onSubmit={handleSubmit}>
            <h1>Edit this Host</h1>
           
            <div className='edit-host-form-item'>
                <label>Name </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={1}
                    maxLength={75}
                />
            </div>
            <div className='edit-host-form-item'>
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
                <div className='edit-host-form-item'>
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
                <div className='edit-host-form-item'>
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
                <div className='edit-host-form-item'>
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
                <div className='edit-host-form-item'>
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
                <div className='edit-host-form-item'>
                    <label>
                        Price per night
                    </label>
                    <input
                        placeholder='$'
                        type="number"
                        step="0.01"
                        value={price_per_night}
                        onChange={(e) => setPrice_per_night(e.target.value)}
                        required
                        
                    />
                </div>
                <div className='edit-host-form-item'>
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
                
                 {errors.length > 0 && <ul className="edit-host-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                {errors.length === 0 && 
           <button className="edit-host-form-item submit-btn" type='submit'>Edit host</button>
        }
        <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
        </form>
    </div>
    )
}

export default EditHost