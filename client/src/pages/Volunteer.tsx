import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Volunteer {
    id: number;
    name: string;
    email: string;
}

const VolunteerPage: React.FC = () => {
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/volunteers')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }
                setVolunteers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching volunteers:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Volunteers</h1>
            <ul className="list-group">
                {volunteers.map(volunteer => (
                    <li key={volunteer.id} className="list-group-item">
                        <strong>{volunteer.name}</strong> - {volunteer.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VolunteerPage;
