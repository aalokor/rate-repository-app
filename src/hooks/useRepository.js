import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
      first: 2,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const reviews = data?.repository?.reviews;
    const canFetchMore = !loading && reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: reviews.pageInfo.endCursor,
        first: 2,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        return {
          repository: {
            ...prevResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...prevResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
      },
    });
  };

  const repository = data?.repository;

  return {
    repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
