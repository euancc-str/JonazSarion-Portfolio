import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css'; // Make sure this imports UserProfile.css

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('error')) {
            alert("❌ Login failed or was canceled.");
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        fetch('http://localhost:8080/api/user-info', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.name) setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

    }, []);

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>;

    if (!user) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <h2>Not Logged In</h2>
                    <a href="http://localhost:8080/oauth2/authorization/google" className="logout-btn" style={{ background: '#3b82f6' }}>
                        Login with Google
                    </a>
                    <a href="http://localhost:8080/oauth2/authorization/github" className="logout-btn" style={{ background: '#3b82f6' }}>
                        Login with Github
                    </a>
                    <div style={{ marginTop: '20px' }}>
                        <Link to="/" className="logout-btn">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-img-container">
                    {user.photo && !user.photo.includes("profile/picture/0") ? (
                        <img src={user.photo} alt="Profile" className="profile-img" />
                    ) : (
                        <div className="default-icon" style={{ fontSize: '100px', lineHeight: '100px' }}>
                            <i className="fas fa-user-circle"></i>
                        </div>
                    )}
                </div>

                <h2 className="user-name">{user.name}</h2>
                <p className="user-email">{user.email}</p>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                    <a href="http://localhost:8080/logout" className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </a>

                    <Link to="/" className="logout-btn" style={{ background: '#3b82f6' }}>
                        <i className="fas fa-home"></i> Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;