//  HostDetails/index.js

import { useLayoutEffect } from "react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { thunkGetOneHost, thunkReadAllHosts, thunkRemoveHost } from "../../store/host";
import "./HostDetails.css"



const HostDetails = () => {

    const {hostId} = useParams();
    const dispatch = useDispatch();
  const history = useHistory();
  const [showDetails, setShowDetails] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);

  // const handleDelete = (hostId) => {
  //   if (
  //     window.confirm(
  //       "Are you sure you want to permanently delete this host?"
  //     )
  //   ) {
  //     dispatch(thunkRemoveHost(hostId)).then(() => history.push("/"));
  //   }
  // };

//  useEffect(() => {
//     async function getDetails() {
//         try {
//             const host = await dispatch(thunkGetOneHost(hostId))
//             setShowDetails(true)
//         }catch {
//             history.push("/404")
//         }
//     }
//     getDetails()
//  }, [dispatch, hostId])

useEffect(() => {
  dispatch(thunkReadAllHosts());
}, [dispatch, hostId]);


async function handleDelete(hostId) {
  await dispatch(thunkRemoveHost(hostId));

 await history.push("/");
}



let hosts = useSelector((state) => Object.values(state.host));

// console.log("this is host in hostdetails", hosts)

let normalizedHosts = {};

hosts.forEach((host) => (normalizedHosts[host.id] = host));

// console.log("this is hosts after normalized", normalizedHosts)

const host = normalizedHosts[hostId]

let hostDetailButtons = null

if (!host) return null


if (!sessionUser) {hostDetailButtons = null} else
if (sessionUser.id === host.user_id) {

    hostDetailButtons = (
      <div className="host-buttons">
       <Link to={`/host/${host.id}/edit`}>
      <button className="hostdetails-button">Edit host</button>
        </Link>
      <button className="hostdetails-button" onClick={() => handleDelete(host.id)}>Delete host</button>
      </div>
   )
} 

 

    return (
        <div className="hostdetails-wrapper">
            <div className="hostdetials-host-image" style={{ backgroundImage: `url(${host.img_url}), url(https://picsum.photos/seed/${host.id}/1024/720.jpg)` }}></div>
           <span className="host-info-span">

            <div className="hostdetails-name-item">{host.name}</div>
            <div className="hostdetails-city-state-item">{host.city}, {host.state}</div>
            
            <div className="hostdetails-price-item">${host.price_per_night} night</div>
            <div className="hostdetails-about-item">{host.about}</div>
            
           </span>
            {hostDetailButtons}

        </div>
    )
}
export default HostDetails