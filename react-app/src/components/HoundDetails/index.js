//  HoundDetails/index.js

import { useLayoutEffect } from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { thunkGetOneHound, thunkUpdateHound, thunkRemoveHound } from "../../store/hound";



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

console.log("this is hound in hounddetails", hounds)

let normalizedHounds = {};

hounds.forEach((hound) => (normalizedHounds[hound.id] = hound));

console.log("this is hounds after normalized", normalizedHounds)

const hound = normalizedHounds[houndId]

let houndDetailButtons = null

if (!hound) return null

console.log("this is houndId in hounddetails", houndId)

if (sessionUser.id === hound.owner_id) {

    houndDetailButtons = (
      <>
       <Link to={`/hound/${hound.id}/edit`}>
      <button className="hounddetails-button">Edit hound</button>
        </Link>
      <button className="hounddetails-button" onClick={() => handleDelete(hound.id)}>Delete hound</button>
      </>
   )
} else {
    houndDetailButtons = null
}

 

    return (
        <div className="hounddetails-wrapper">
            <div className="hounddetails-name-item">{hound.name}</div>
            <div className="hounddetails-age-item">{hound.age}</div>
            <div className="hounddetails-description-item">{hound.description}</div>
            <div className="hostdetials-hound-image" style={{ backgroundImage: `url(${hound.img_url})` }}></div>
            <div className="hounddetails-id-item">hound ID{hound.id}</div>
            {houndDetailButtons}

        </div>
    )
}
export default HoundDetails