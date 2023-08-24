import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import CallBackType from "../shared/types/callbacktype.type"


const Logout = ({ callback }: CallBackType) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        callback()
        setTimeout(() => {
            navigate('/')
        }, 2000)
    })

    return (
        <div className="center-container form-padding">
            You've successfully been signed out.
        </div>
    )

}

export default Logout