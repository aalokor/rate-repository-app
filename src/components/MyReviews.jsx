import { FlatList, StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { USER } from '../graphql/queries';
import Text from './BaseComponents/Text';
import ReviewItem from './SingleRepository/ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text fontWeight="bold">Loading...</Text>
      </View>
    );
  }

  const reviews = data?.me?.reviews?.edges
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  if (reviews.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text fontWeight="bold">No reviews yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} refetch={refetch} myReview={true} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
