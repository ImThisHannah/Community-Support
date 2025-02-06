import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // if the path is one level deeper


const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1>Welcome, {user.username || 'Guest'}!</h1>
      {user.email && <p>Email: {user.email}</p>}
    </div>
  );
};

export default Dashboard;
