import { useState, useEffect } from 'react';
import './FloatingProfile.css';
import { Link, useLocation } from 'react-router-dom';
function FloatingProfile() {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        fetch('http://localhost:8080/api/user-info', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.name) setUser(data);
            })
            .catch(err => console.error(err));
    }, []);


    if (location.pathname === '/admin') {
        return null;
    }

    if (!user) {
        return (
            <a href="http://localhost:5173/profile" className="floating-badge login-mode">
                <i className="fas fa-sign-in-alt"></i> Login
            </a>
        );
    }
    return (
        <Link to="/profile" className="floating-badge user-mode">
            {user.photo && !user.photo.includes("profile/picture/0") ? (
                <img src={user.photo} alt="User" />
            ) : (
                <div className="fallback-avatar">{user.name.charAt(0)}</div>
            )}
            <span className="tooltip">View Profile</span>
        </Link>
    );
}

export default FloatingProfile;