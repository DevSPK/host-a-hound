import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { thunkReadAllHounds } from "../../store/hound"
import "./AllHounds.css"

const AllHounds = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    // const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector((state) => state.session.user)
    
    const hounds = useSelector((state) => Object.values(state.hound))

    
    useEffect( () => {
        dispatch(thunkReadAllHounds())
    }, [dispatch])
    
    // if (hounds.length === 0) return null
    
    

    // console.log("this is user", user)
    
    // console.log("this is hounds in allhounds", hounds)

    // console.log("this is hounds mapped", hounds.map((hound) => hound))

    
    return (
        <div className="allhounds-wrapper">
           
            {hounds.map((hound)=> (
                <div key={hound.id} className="allhounds-hound-card-container">
                    <Link to={`/hound/${hound.id}`}>
                    <div className="allhounds-hound-image" style={{ backgroundImage: `url(${hound.img_url})` }}></div>
                    <div className="allhounds-hound-info">
                        <div className="allhounds-hound-name">{hound.name}</div> 
                    </div>
                    </Link>
                </div>  
            ))}
            </div>
    
);
    };

export default AllHounds