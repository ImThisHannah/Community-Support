import React from 'react';

const ResourceList: React.FC = () => {
  const resources = [
    { id: 1, type: 'Food Bank', location: 'Downtown' },
    { id: 2, type: 'Shelter', location: 'West Side' },
    { id: 3, type: 'Medical Aid', location: 'East Side' }
  ];

  return (
    <div>
      <h2>Available Resources</h2>
      <ul>
        {resources.map(resource => (
          <li key={resource.id}>{resource.type} - {resource.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
