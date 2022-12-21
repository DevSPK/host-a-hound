import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { thunkGetAllHosts } from "../../store/host"
import "./AllHosts.css"

const AllHosts = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    // const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector((state) => state.session.user)
    
    console.log(user)
    
    
    useEffect( () => {
        dispatch(thunkGetAllHosts())
    }, [dispatch, user])

    

    const testhosts = useSelector((state => state.host))
    console.log("this is testhosts", testhosts)
    
    const hosts = useSelector((state) => Object.values(state.host))
   
    if (!hosts) return null
    
    

    console.log("this is user", user)
    
    console.log("this is hosts in allhosts", hosts)

    console.log("this is hosts mapped", hosts.map((host) => host))

    
    return (
        <div className="allhosts-wrapper">
           
            {hosts.map((host)=> (
                <div key={host.id} className="allhosts-host-card-container">
                    <Link to={`/host/${host.id}`}>
                    <div className="allhosts-host-image" style={{ backgroundImage: `url(${host.img_url})` }}></div>
                    <div className="allhosts-host-info">
                        <div className="allhosts-host-name">{host.name}</div>
                        <div className="allhosts-host-city-state">{host.city}, {host.state}</div>
                        <div className="allhosts-host-price">${host.price_per_night} night</div>
                    </div>
                    </Link>
                </div>  
            ))}
            </div>
    
);

};

export default AllHosts