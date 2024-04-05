import { useNavigate } from "react-router-dom"
import "./CLink.css"

export const CLink = ({ title, path }) => {

    const navigate = useNavigate()

    return (
        <div className="clink-design" onClick={() => navigate(path)}>{title}</div>
    )
}