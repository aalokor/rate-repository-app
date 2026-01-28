import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { USER } from '../graphql/queries';
import Text from './Text';
import ReviewItem from './SingleRepository/ReviewItem';

const MyReviews = () => {
  const { data, loading } = useQuery(USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text fontWeight="bold">Loading...</Text>;
  }

  const reviews = data?.me?.reviews?.edges
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

  if (reviews.length === 0) {
    return <Text fontWeight="bold">No reviews yet</Text>;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;