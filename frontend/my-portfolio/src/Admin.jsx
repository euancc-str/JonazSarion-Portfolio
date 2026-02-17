import { useState, useEffect } from 'react';
import './Admin.css';
function Admin() {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/allRating', {
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch url")
                return res.json();
            })
            .then(data => {
                setRatings(data);
                setLoading(false);
            })
            .catch(err => {
                console.log("Error ", err);
                setLoading(false);
            });
    }, []);
    const handleToggleStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1;

        // Update UI 
        setRatings(prevRatings =>
            prevRatings.map(rating =>
                rating.id === id
                    ? { ...rating, status: newStatus }
                    : rating
            )
        );


        fetch(`http://localhost:8080/rating/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {

                    setRatings(prevRatings =>
                        prevRatings.map(rating =>
                            rating.id === id
                                ? { ...rating, status: currentStatus }
                                : rating
                        )
                    );
                    alert("Failed to update status");
                }
            })
            .catch(err => {

                setRatings(prevRatings =>
                    prevRatings.map(rating =>
                        rating.id === id
                            ? { ...rating, status: currentStatus }
                            : rating
                    )
                );
                console.error("Error updating:", err);
            });
    };
    if (loading) return <div className="admin-container"><h2>Loading Dashboard...</h2></div>;
    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ratings.map(rating => (
                            <tr key={rating.id}>
                                <td>#{rating.id}</td>
                                <td>
                                    <div className="user-cell">
                                        {/* Display Profile Pic if it exists */}
                                        {rating.profilePicture && (
                                            <img src={rating.profilePicture} alt="avatar" className="admin-avatar" />
                                        )}
                                        <div className="user-info">
                                            <span className="user-name">{rating.name}</span>
                                            <span className="user-email">{rating.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="star-rating">⭐ {rating.rating}</span>
                                </td>
                                <td>

                                    <span className={`status-badge ${rating.status === 1 ? 'approved' : 'pending'}`}>
                                        {rating.status === 1 ? 'Live' : 'Hidden'}
                                    </span>
                                </td>
                                <td>{new Date(rating.createdAt).toLocaleDateString()}</td>
                                <td>

                                    <button
                                        className={`btn-action ${rating.status === 1 ? 'btn-hide' : 'btn-approve'}`}
                                        onClick={() => handleToggleStatus(rating.id, rating.status)}
                                    >
                                        {rating.status === 1 ? 'Hide' : 'Approve'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;