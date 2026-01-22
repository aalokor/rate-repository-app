import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES);

  const repositories = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return {
    repositories,
    loading,
  };
};

export default useRepositories;