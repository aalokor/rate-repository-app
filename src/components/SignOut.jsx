import { useEffect } from 'react';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      navigate('/signin');
    };

    logout();
  }, []);
};

export default SignOut;
