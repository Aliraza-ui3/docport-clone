import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

const Feature = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-3">
        <img src={icon} alt={`${title} Icon`} className="h-8 w-8 mr-3" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFeatures([
      {
        icon: '/images/dashboard-icon.png',
        title: 'Centralized Dashboard',
        description:
          'Manage all your logistics operations from a single, intuitive interface. Track shipments, view analytics, and control settings with ease.',
      },
      {
        icon: '/images/documents.png',
        title: 'Document Management',
        description:
          'Store, organize, and access all your important documents in one secure location. Reduce paperwork and streamline your workflows.',
      },
      {
        icon: '/images/analytics.png',
        title: 'Real-time Analytics',
        description:
          'Gain insights into your logistics performance with real-time data and analytics. Identify bottlenecks, optimize routes, and improve efficiency.',
      },
      {
        icon: '/images/collaboration-icon.png',
        title: 'Team Collaboration',
        description:
          'Facilitate seamless collaboration among your team members. Assign tasks, share updates, and communicate effectively within the platform.',
      },
      {
        icon: '/images/engagement-icon.png',
        title: 'Customer Engagement',
        description:
          'Enhance customer satisfaction with proactive communication and real-time updates. Keep your customers informed about their shipments and delivery schedules.',
      },
    ]);
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate('/login'); // Redirect to login after logout
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar user={user} onLogout={handleLogout} />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="text-center mb-4">
            <Link to="/">
              <img src="/images/logo.png" alt="DocPort Logo" className="h-12 mx-auto mb-2" />
            </Link>
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>

          {/* User Information Section */}
          {user && (
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold">{user.displayName || user.email}</h2>
              <p className="text-lg text-gray-600">{user.email}</p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
