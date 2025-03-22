// Calculate distance between two coordinates in kilometers
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  // Haversine formula
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get user location using the Geolocation API
export const getUserLocation = (onSuccess, onError) => {
  if (!navigator.geolocation) {
    onError("Geolocation is not supported by your browser");
    return;
  }
  
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      onSuccess({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    },
    (error) => {
      let errorMessage;
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location permission was denied";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable";
          break;
        case error.TIMEOUT:
          errorMessage = "Request for location timed out";
          break;
        case error.UNKNOWN_ERROR:
        default:
          errorMessage = "An unknown error occurred";
          break;
      }
      
      onError(errorMessage);
    },
    options
  );
}; 