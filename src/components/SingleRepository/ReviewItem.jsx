import { View, StyleSheet } from 'react-native';
import Text from '../Text'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  rating: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: '#0366d6',
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
});

const ReviewItem = ({ review }) => {
  console.log(review)

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return (
  <View style={styles.container}>
    <View style={styles.row}>
      <View style={styles.rating}>
        <Text fontWeight="bold" style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.info}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {formatDate(review.createdAt)}
        </Text>
        <Text style={{ marginTop: 6 }}>
          {review.text}
        </Text>
      </View>
    </View>
  </View>
  );
};

export default ReviewItem