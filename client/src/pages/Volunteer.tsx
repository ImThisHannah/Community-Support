import React, { useEffect, useState } from 'react';

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
            .then(response => response.json())
            .then(data => {
                setVolunteers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching volunteers:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Volunteers</h1>
            <ul>
                {volunteers.map(volunteer => (
                    <li key={volunteer.id}>
                        {volunteer.name} - {volunteer.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VolunteerPage;
