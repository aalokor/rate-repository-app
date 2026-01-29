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

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: {
      first: 10,
      orderBy,
      orderDirection,
      searchKeyword: search,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first: 10,
        orderBy,
        orderDirection,
        searchKeyword: search,
      },
    });
  };

  const repositories = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
