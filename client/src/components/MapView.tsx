import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setVolunteers } from '../redux/slices/volunteerSlice';

const MapView: React.FC = () => {
  const dispatch = useDispatch();
  const volunteers = useSelector((state: RootState) => state.volunteers.list);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('/api/volunteers');
        const data = await response.json();
        dispatch(setVolunteers(data));
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };

    fetchVolunteers();
  }, [dispatch]);

  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
        zoom: 10,
      });

      volunteers.forEach((volunteer) => {
        new google.maps.Marker({
          position: {
            lat: volunteer.location.coordinates[1],
            lng: volunteer.location.coordinates[0],
          },
          map,
          title: volunteer.skills,
        });
      });
    }
  }, [volunteers]);

  return (
    <div>
      <h2>Volunteer Locations</h2>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default MapView;
