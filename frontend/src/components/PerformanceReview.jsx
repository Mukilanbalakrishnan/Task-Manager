import React, { useEffect, useState } from "react";
import "./PerformanceReview.css";

const PerformanceReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/performance/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch performance reviews");
        }
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching performance reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="performance-loading">Loading your performance...</div>;

  return (
    <div className="performance-review-container">
      <h2>Your Performance Reviews</h2>
      {reviews.length > 0 ? (
        <div className="review-list">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <h4>{review.period || "Review Period"}</h4>
              <p><strong>Manager Comments:</strong> {review.comments}</p>
              <p><strong>Rating:</strong> {review.rating} / 5</p>
              <p><strong>Reviewed By:</strong> {review.reviewer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No performance reviews found.</p>
      )}
    </div>
  );
};

export default PerformanceReview;
