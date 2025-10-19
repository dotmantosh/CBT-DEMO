import react from 'react';
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 admin-login admin-container">
      <h1 className="text-4xl font-bold mb-4">Welcome to OBMS CBT</h1>
      <p className="text-lg text-gray-700">Please click the button below to get started.</p>
        <button onClick={()=>navigate('/student')}>Get Started</button>
    </div>
  );
};

export default Home;