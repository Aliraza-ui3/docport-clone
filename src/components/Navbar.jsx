import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen to auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setIsMenuOpen(false); // Close the mobile menu after logout
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-secondary py-4" id="navbar">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="DocPort Logo" className="h-10" />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium">
            <li>
              <Link to="/" className="nav-link active block py-2 md:py-0">Home</Link>
            </li>
            <li>
              <a href="#features" className="nav-link block py-2 md:py-0 text-gray-500">About</a>
            </li>
            <li>
              <a href="#expectations" className="nav-link block py-2 md:py-0 text-gray-500">Features</a>
            </li>
            <li>
              <a href="#benefits" className="nav-link block py-2 md:py-0 text-gray-500">Benefits</a>
            </li>
            <li>
              <a href="#contact" className="nav-link block py-2 md:py-0 text-gray-500">Contact Us</a>
            </li>

            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              {!user ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block w-full text-left py-2 text-gray-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="block w-full text-left py-2 text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-red-500"
                  >
                    Logout
                  </button>
                </li>
              )}
            </div>
          </ul>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-2">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-dark hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
