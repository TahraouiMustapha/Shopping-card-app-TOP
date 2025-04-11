import { Link } from "react-router-dom"

export default function ErrorPage() {
    return (
        <div style={{
            position: 'absolute', 
            top: '50%', 
            right: '50%',
            transform: 'translateX(50%)'
        }}>
            <h1>oh no, this route doesn't exist!</h1>
            <Link to='/'>
                You can go back to the home page by clicking here, through!
            </Link>
        </div>
    )
}