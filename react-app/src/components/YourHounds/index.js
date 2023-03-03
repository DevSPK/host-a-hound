import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { thunkReadYourHounds } from "../../store/hound"
import "./YourHounds.css"

const YourHounds = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    // const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector((state) => state.session.user)
    
    const hounds = useSelector((state) => Object.values(state.hound))

    
    useEffect( () => {
        dispatch(thunkReadYourHounds(user.id))
    }, [dispatch, user])
    
    // if (hounds.length === 0) return null
    
    

    // console.log("this is user", user)
    
    // console.log("this is hounds in yourhounds", hounds)

    // console.log("this is hounds mapped", hounds.map((hound) => hound))

    
    return (
        <div className="yourhounds-wrapper">
           
            {hounds.map((hound)=> (
                <div key={hound.id} className="yourhounds-hound-card-container">
                    <Link to={`/hound/${hound.id}`}>
                    <div className="yourhounds-hound-image" style={{ backgroundImage: `url(${hound.img_url}), url(https://picsum.photos/seed/${hound.id}/1024/720.jpg)` }}></div>
                    <div className="yourhounds-hound-info">
                        <div className="yourhounds-hound-name">{hound.name}</div> 
                    </div>
                    </Link>
                </div>  
            ))}
            </div>
    
);
    };

export default YourHounds