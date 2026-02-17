import { useState, useEffect } from 'react';
import './Testimonials.css';

function Testimonials() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetch('http://localhost:8080/displayed/1')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error("Error fetching reviews:", err));
    }, []);

    if (reviews.length === 0) return null; // Don't show section if empty

    return (
        <section id="testimonials" className="section-bg">
            <div className="container">
                <div className="section-title fade-in">
                    <h2>What People Say</h2>
                    <p>Recent feedback from visitors and collaborators</p>
                </div>

                <div className="testimonials-grid">
                    {reviews.map((review) => (
                        <div key={review.id} className="testimonial-card fade-in">
                            <div className="testimonial-header">
                                <div className="reviewer-img">
                                    {review.profilePicture ? (
                                        <img src={review.profilePicture} alt={review.name} />
                                    ) : (
                                        <div className="fallback-initial">
                                            {review.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="reviewer-info">
                                    <h4>{review.name}</h4>
                                    <span className="review-date">
                                        {new Date(review.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="review-stars">
                                {[...Array(5)].map((_, i) => (
                                    <i
                                        key={i}
                                        className={`fas fa-star ${i < review.rating ? 'gold' : 'grey'}`}
                                    ></i>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;