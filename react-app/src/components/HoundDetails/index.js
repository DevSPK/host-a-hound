//  HoundDetails/index.js


import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { thunkRemoveHound, thunkReadAllHounds } from "../../store/hound";
import "./HoundDetails.css"



const HoundDetails = () => {

    const {houndId} = useParams();
    const dispatch = useDispatch();
  const history = useHistory();
  const [showDetails, setShowDetails] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);

  
async function handleDelete(houndId) {
await dispatch(thunkRemoveHound(houndId));

 await history.push("/hounds");
}



let hounds = useSelector((state) => Object.values(state.hound));

useEffect(() => {
  dispatch(thunkReadAllHounds());
}, [dispatch, houndId]);


// console.log("this is hound in hounddetails", hounds)

let normalizedHounds = {};

hounds.forEach((hound) => (normalizedHounds[hound.id] = hound));

// console.log("this is hounds after normalized", normalizedHounds)

const hound = normalizedHounds[houndId]

let houndDetailButtons = null

if (!hound) return null

// console.log("this is houndId in hounddetails", houndId)

if (!sessionUser) {houndDetailButtons = null} else 

if (sessionUser.id === hound.owner_id) {

    houndDetailButtons = (
      <div className="hound-buttons">
       <Link to={`/hound/${hound.id}/edit`}>
      <button className="hounddetails-button">Edit hound</button>
        </Link>
      <button className="hounddetails-button" onClick={() => handleDelete(hound.id)}>Delete hound</button>
      </div>
   )
} 

 

    return (
        <div className="hounddetails-wrapper">
            <div className="hounddetials-hound-image" style={{ backgroundImage: `url(${hound.img_url}), url(https://picsum.photos/seed/${hound.id}/1024/720.jpg)` }}></div>
            <span className="hound-info-span">

            <div className="hounddetails-name-item">{hound.name}</div>
            <div className="hounddetails-age-item">{hound.age} years old</div>
            <div className="hounddetails-description-item">{hound.description}</div>
           
            </span>
            {houndDetailButtons}

        </div>
    )
}
export default HoundDetails