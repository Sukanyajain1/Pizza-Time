import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WithAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    // const history = useHistory();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const res = await axios.get('http://localhost:8000/api/users/getloggedinuser', { withCredentials: true });

          if (res.data.results) {
            // User is logged in
            setCurrentUser(res.data.results);
            setIsLoading(false);
            setIsLogged(true);
            console.log('This is the current user data: WithAuth', res.data.results);
          }
        } catch (error) {
          // User is not logged in
          setIsLogged(false);
          setIsLoading(false);
          navigate("/welcome/signin", { replace: true });
        }
      };

      checkAuthStatus();
    }, [navigate]);

    if (isLoading) {
      // Render a loading spinner or component while checking the authentication status
      return <div>Loading...</div>;
    }

    return <Component currentUser={currentUser} isLogged={isLogged} {...props} />;
  };

  return AuthenticatedComponent;
};

export default WithAuth;