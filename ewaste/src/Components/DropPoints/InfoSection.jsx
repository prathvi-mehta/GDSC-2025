import React from 'react';

const InfoSection = () => {
  return (
    <div className="drop-points-info">
      <h3>About E-Waste Drop-off Points</h3>
      <p>
        E-waste drop-off points are designated locations where you can safely dispose of your electronic waste. 
        These centers ensure that your devices are recycled properly, preventing harmful materials from entering landfills.
      </p>
      <div className="info-tips">
        <div className="info-tip">
          <i className="fas fa-info-circle"></i>
          <span>Call ahead to confirm operating hours and accepted items</span>
        </div>
        <div className="info-tip">
          <i className="fas fa-shield-alt"></i>
          <span>Remember to wipe personal data from devices before recycling</span>
        </div>
        <div className="info-tip">
          <i className="fas fa-truck"></i>
          <span>Some locations offer pickup services for large items</span>
        </div>
      </div>
    </div>
  );
};

export default InfoSection; 