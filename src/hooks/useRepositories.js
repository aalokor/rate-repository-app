import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, search) => {
  let orderBy;
  let orderDirection;

  switch (order) {
    case 'ratingDesc':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'ratingAsc':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    default:
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
  }

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      first: 10,
      orderBy,
      orderDirection,
      searchKeyword: search,
    },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return {
    repositories,
    loading,
  };
};

export default useRepositories;
