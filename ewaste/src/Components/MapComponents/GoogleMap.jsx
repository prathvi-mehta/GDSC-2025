import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { mapStyles } from './mapStyles';
import { calculateDistance } from '../../utils/locationUtils';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
};

const defaultCenter = {
  lat: 26.7606, // Gorakhpur's latitude
  lng: 83.3688, // Gorakhpur's longitude
};

// Helper function to convert degrees to radians
const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};

const GoogleMapComponent = ({ dropPoints, selectedLocation, onLocationSelect, userLocation, focusedRecycler }) => {
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [hoverInfoWindow, setHoverInfoWindow] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markerRefs = useRef({});
  const hoverTimeoutRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  // Filter drop points based on whether we have a focused recycler
  const visibleDropPoints = focusedRecycler 
    ? [focusedRecycler] 
    : dropPoints;

  const onLoad = useCallback((map) => {
    setMap(map);
    
    // Create bounds that include all visible markers
    const bounds = new window.google.maps.LatLngBounds();
    
    // Add visible drop points to bounds
    visibleDropPoints.forEach(point => {
      bounds.extend(new window.google.maps.LatLng(
        point.coordinates.lat, 
        point.coordinates.lng
      ));
    });
    
    // Add user location to bounds if available
    if (userLocation) {
      bounds.extend(new window.google.maps.LatLng(
        userLocation.lat, 
        userLocation.lng
      ));
    }
    
    setBounds(bounds);
    
    // For focused recycler or single point, fit bounds with padding for better view
    if (focusedRecycler || visibleDropPoints.length === 1) {
      const padding = {
        top: 80,
        right: 80,
        bottom: 80,
        left: 80
      };
      map.fitBounds(bounds, padding);
    } else if (visibleDropPoints.length > 1) {
      // For multiple points, fit all with some padding
      map.fitBounds(bounds, 50);
    }
    
    // Animation effect on map load
    setTimeout(() => {
      setMapLoaded(true);
    }, 300);
  }, [visibleDropPoints, userLocation, focusedRecycler]);

  // Update bounds when points, user location, or focused recycler changes
  useEffect(() => {
    if (map && bounds) {
      // Create new bounds
      const newBounds = new window.google.maps.LatLngBounds();
      
      // Add visible drop points to bounds
      visibleDropPoints.forEach(point => {
        newBounds.extend(new window.google.maps.LatLng(
          point.coordinates.lat, 
          point.coordinates.lng
        ));
      });
      
      // Add user location to bounds if available
      if (userLocation) {
        newBounds.extend(new window.google.maps.LatLng(
          userLocation.lat, 
          userLocation.lng
        ));
      }
      
      // For focused recycler or single point, fit bounds with padding for better view
      if (focusedRecycler || visibleDropPoints.length === 1) {
        const padding = {
          top: 80,
          right: 80,
          bottom: 80,
          left: 80
        };
        map.fitBounds(newBounds, padding);
      } else if (visibleDropPoints.length > 1) {
        // For multiple points, fit all with some padding
        map.fitBounds(newBounds, 50);
      } else if (userLocation) {
        // If just user location, center on it
        map.setCenter(userLocation);
        map.setZoom(15);
      } else {
        // Fallback to default center
        map.setCenter(defaultCenter);
        map.setZoom(13);
      }
    }
  }, [map, bounds, visibleDropPoints, userLocation, focusedRecycler]);

  // Update info windows when focused recycler changes
  useEffect(() => {
    if (focusedRecycler) {
      setInfoWindow(focusedRecycler);
    } else {
      setInfoWindow(null);
    }
  }, [focusedRecycler]);

  const onUnmount = useCallback(() => {
    setMap(null);
    setBounds(null);
    setMapLoaded(false);
    
    // Clear any pending timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);
  
  // Handle hover events with debounce to prevent flickering
  const handleMarkerMouseOver = (point) => {
    // Clear any existing timeout first
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set a timeout before showing the hover info window
    hoverTimeoutRef.current = setTimeout(() => {
      if (userLocation) {
        const distance = calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          point.coordinates.lat, 
          point.coordinates.lng
        );
        setHoverInfoWindow({...point, distance});
      } else {
        setHoverInfoWindow(point);
      }
    }, 100);
  };
  
  const handleMarkerMouseOut = () => {
    // Clear the timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set a timeout before hiding the hover info window
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverInfoWindow(null);
    }, 100);
  };

  // Create a reference to a marker
  const setMarkerRef = (marker, id) => {
    if (marker) {
      markerRefs.current[id] = marker;
    }
  };

  if (loadError) {
    return (
      <div className="map-error">
        <i className="fas fa-exclamation-triangle"></i>
        <h3>Error loading map</h3>
        <p>There was an issue loading Google Maps. Please try again later.</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          <i className="fas fa-redo"></i> Retry
        </button>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="map-loading">
        <div className="spinner"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="map-container"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={selectedLocation ? selectedLocation.coordinates : 
               userLocation ? userLocation : defaultCenter}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: mapStyles,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          scrollwheel: true,
          disableDefaultUI: false,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM
          },
          fullscreenControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_TOP
          }
        }}
      >
        {userLocation && (
          <>
            <Marker
              position={userLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 40)
              }}
              title="Your Location"
              zIndex={1000}
            />
            <div className="user-location-pulse" 
                 style={{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   zIndex: 999,
                   display: mapLoaded ? 'block' : 'none'
                 }}>
              <div className="pulse-ring"></div>
              <div className="pulse-ring pulse-ring-delay"></div>
            </div>
          </>
        )}

        {visibleDropPoints.map((point) => (
          <Marker
            key={point.id}
            position={point.coordinates}
            onClick={() => {
              onLocationSelect(point);
              setInfoWindow(point);
            }}
            onMouseOver={() => handleMarkerMouseOver(point)}
            onMouseOut={handleMarkerMouseOut}
            ref={(marker) => setMarkerRef(marker, point.id)}
            icon={{
              url: "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='%234CAF50' stroke='white' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3e%3c/path%3e%3ccircle cx='12' cy='10' r='3'%3e%3c/circle%3e%3c/svg%3e",
              scaledSize: new window.google.maps.Size(36, 36),
              anchor: new window.google.maps.Point(18, 36),
            }}
            animation={
              (focusedRecycler && focusedRecycler.id === point.id) 
                ? window.google.maps.Animation.BOUNCE 
                : mapLoaded ? window.google.maps.Animation.DROP : null
            }
            zIndex={
              focusedRecycler && focusedRecycler.id === point.id
                ? 900
                : hoveredMarker && hoveredMarker.id === point.id
                ? 800
                : 1
            }
          />
        ))}

        {infoWindow && (
          <InfoWindow
            position={infoWindow.coordinates}
            onCloseClick={() => setInfoWindow(null)}
            options={{
              maxWidth: 320,
              pixelOffset: new window.google.maps.Size(0, -40)
            }}
          >
            <div className="info-window">
              <h4>{infoWindow.name}</h4>
              <p><i className="fas fa-map-marker-alt"></i> {infoWindow.address}</p>
              <p><i className="far fa-clock"></i> {infoWindow.hours}</p>
              <p><i className="fas fa-phone-alt"></i> {infoWindow.phone}</p>
              
              {userLocation && (
                <p className="distance">
                  <i className="fas fa-route"></i> 
                  Distance: {calculateDistance(
                    userLocation.lat, 
                    userLocation.lng, 
                    infoWindow.coordinates.lat, 
                    infoWindow.coordinates.lng
                  )} km
                </p>
              )}
              
              <div className="accepted-items-mini">
                <span className="label">Accepts:</span>
                <div className="items-tags-mini">
                  {infoWindow.acceptedItems.slice(0, 3).map((item, index) => (
                    <span key={index} className="item-tag-mini">{item}</span>
                  ))}
                  {infoWindow.acceptedItems.length > 3 && 
                    <span className="more-tag">+{infoWindow.acceptedItems.length - 3} more</span>
                  }
                </div>
              </div>
              
              <div className="info-window-actions">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation ? `${userLocation.lat},${userLocation.lng}` : ''}&destination=${infoWindow.coordinates.lat},${infoWindow.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directions-btn"
                >
                  <i className="fas fa-directions"></i> Get Directions
                </a>
              </div>
            </div>
          </InfoWindow>
        )}

        {hoverInfoWindow && !infoWindow && (
          <InfoWindow
            position={{
              lat: hoverInfoWindow.coordinates.lat,
              lng: hoverInfoWindow.coordinates.lng
            }}
            onCloseClick={() => setHoverInfoWindow(null)}
            options={{
              pixelOffset: new window.google.maps.Size(0, -40),
              disableAutoPan: true
            }}
          >
            <div className="hover-info-window">
              <h4>{hoverInfoWindow.name}</h4>
              {userLocation ? (
                <p className="distance">
                  <i className="fas fa-route"></i> 
                  Distance: {hoverInfoWindow.distance} km
                </p>
              ) : (
                <p className="address-mini">{hoverInfoWindow.address}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {mapLoaded && (
        <div className="map-overlay-controls">
          {/* Custom controls can be added here */}
        </div>
      )}
    </motion.div>
  );
};

export default GoogleMapComponent;