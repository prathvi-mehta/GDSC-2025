import React from 'react';

const RecyclerCard = ({ recycler, onRecyclerSelect }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="rating-stars">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {halfStar && <i className="fas fa-star-half-alt"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
        <span className="rating-value">{rating}</span>
      </div>
    );
  };

  return (
    <div className="drop-point-card" onClick={() => onRecyclerSelect(recycler)}>
      {recycler.rating >= 4.5 && <div className="top-rated-badge">Top Rated</div>}
      <div className="drop-point-header">
        <h3>{recycler.name}</h3>
        <div className="distance">
          <i className="fas fa-map-marker-alt animated-location-icon"></i>
          {typeof recycler.distance === 'string' ? recycler.distance : recycler.distance.toFixed(1)} km
        </div>
      </div>
      <div className="drop-point-details">
        <p>
          <i className="fas fa-map-pin"></i>
          {recycler.address}
        </p>
        <p>
          <i className="far fa-clock"></i>
          {recycler.hours}
        </p>
        <p>
          <i className="fas fa-phone-alt"></i>
          {recycler.phone}
        </p>
      </div>
      <div className="drop-point-footer">
        <div className="rating-stars">
          {renderStars(recycler.rating)}
        </div>
      </div>
      <div className="accepted-items">
        <span className="label">Accepted Items:</span>
        <div className="items-tags">
          {recycler.acceptedItems.map((item, index) => (
            <span className="item-tag" key={index}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="card-actions">
        <button
          className="view-on-map-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRecyclerSelect(recycler);
          }}
        >
          <i className="fas fa-map-marked-alt"></i>
          View on Map
        </button>
        <a
          className="get-directions-btn"
          href={`https://www.google.com/maps/dir/?api=1&destination=${recycler.coordinates.lat},${recycler.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <i className="fas fa-directions"></i>
          Get Directions
        </a>
      </div>
    </div>
  );
};

export default RecyclerCard; 