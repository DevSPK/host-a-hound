import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { thunkReadAllHosts } from "../../store/host"
import "./YourHosts.css"

const YourHosts = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    // const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector((state) => state.session.user)
    
    const allhosts = useSelector((state) => Object.values(state.host))

    
    useEffect( () => {
        dispatch(thunkReadAllHosts())
    }, [dispatch])
    
    // if (hosts.length === 0) return null
    
    

    // console.log("this is user", user)
    
    // console.log("this is hosts in yourhosts", hosts)

    // console.log("this is hosts mapped", hosts.map((host) => host))

    let normalizedHosts = {};

allhosts.forEach((host) => (normalizedHosts[host.id] = host));

console.log("this is hosts after normalized", normalizedHosts)

// const host = normalizedHosts[hostId]

// let hostDetailButtons = null

// if (!host) return null

    
    return (
        <div className="yourhosts-wrapper">
           
            {hosts.map((host)=> (
                <div key={host.id} className="yourhosts-host-card-container">
                    <Link to={`/host/${host.id}`}>
                    <div className="yourhosts-host-image" style={{ backgroundImage: `url(${host.img_url}), url(https://picsum.photos/seed/${host.id}/1024/720.jpg)` }}></div>
                    <div className="yourhosts-host-info">
                        <div className="yourhosts-host-name">{host.name}</div>
                        <div className="yourhosts-host-city-state">{host.city}, {host.state}</div>
                        <div className="yourhosts-host-price">${host.price_per_night.toFixed(2)} night</div>
                    </div>
                    </Link>
                </div>  
            ))}
            </div>
    
);
    };

export default YourHosts