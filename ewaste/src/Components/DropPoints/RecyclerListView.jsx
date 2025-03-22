import React from 'react';
import RecyclerCard from './RecyclerCard';

const RecyclerListView = ({ loading, locationError, recyclers, onRecyclerSelect, resetSearch }) => {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Finding recyclers near you...</p>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="error-state">
        <i className="fas fa-exclamation-circle"></i>
        <p>
          {locationError}. We're showing default locations for Gorakhpur.
        </p>
      </div>
    );
  }

  if (recyclers.length === 0) {
    return (
      <div className="no-results">
        <i className="fas fa-search"></i>
        <h3>No recyclers found</h3>
        <p>Try adjusting your search criteria or view all recyclers.</p>
        <button className="reset-search" onClick={resetSearch}>
          View All Recyclers
        </button>
      </div>
    );
  }

  return (
    <div className="drop-points-grid">
      {recyclers.map((recycler) => (
        <RecyclerCard 
          key={recycler.id} 
          recycler={recycler} 
          onRecyclerSelect={onRecyclerSelect} 
        />
      ))}
    </div>
  );
};

export default RecyclerListView; 