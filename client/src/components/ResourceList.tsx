import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setResources } from '../redux/slices/resourceSlice';

const ResourceList: React.FC = () => {
  const dispatch = useDispatch();
  const resources = useSelector((state: RootState) => state.resources.list);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/resources');
        const data = await response.json();
        dispatch(setResources(data));
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, [dispatch]);

  return (
    <div>
      <h2>Available Resources</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>
            {resource.name} ({resource.type}) - {resource.contactInfo?.email || 'No contact info'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
