import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // if the path is one level deeper
import { getItem } from '../utils/localStorage';

interface User {
  username: string;
  email: string;
}

const Dashboard = () => {
  const [localUser, setLocalUser] = useState<User | null>(null);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const storedUser = getItem('user');
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  const displayUser = user.username ? user : localUser;

  return (
    <div>
      <h1>Welcome, {displayUser?.username || 'Guest'}!</h1>
      {displayUser?.email && <p>Email: {displayUser.email}</p>}
    </div>
  );
};

export default Dashboard;