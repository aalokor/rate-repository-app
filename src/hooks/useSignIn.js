import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        username,
        password,
      },
    });

    const accessToken = response.data.authenticate.accessToken;
    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
