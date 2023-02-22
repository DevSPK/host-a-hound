import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { thunkReadAllHounds } from "../../store/hound.js"
import "./AllHounds.css"

const AllHounds = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    // const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector((state) => state.session.user)
    
    const hounds = useSelector((state) => Object.values(state.hounds))

    
    useEffect( () => {
        dispatch(thunkReadAllHounds())
    }, [dispatch])
    
    // if (hosts.length === 0) return null
    
    

    console.log("this is user", user)
    
    console.log("this is hounds in allhounds", hounds)

    // console.log("this is hosts mapped", hosts.map((host) => host))

    
    return (
        <div className="allhounds-wrapper">
           
            {hounds.map((hound)=> (
                <div key={hound.id} className="allhounds-hound-card-container">
                    <Link to={`/hound/${hound.id}`}>
                    <div className="allhounds-hound-image" style={{ backgroundImage: `url(${hound.img_url})` }}></div>
                    <div className="allhounds-hound-info">
                        <div className="allhounds-hound-name">{hound.name}</div>
                        <div className="allhounds-hound-city-state">{hound.city}, {hound.state}</div>
                        <div className="allhounds-hound-price">${hound.price_per_night} night</div>
                    </div>
                    </Link>
                </div>  
            ))}
            </div>
    
);
    };

export default AllHounds