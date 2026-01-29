import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../../graphql/queries';
import Text from '../Text';

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
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    paddingHorizontal: 12,
    flex: 1,
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
});

const ReviewItem = ({ review, refetch = () => {}, myReview = false }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview({
        variables: { id },
      });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteReview(id),
        },
      ],
    );
  };

  const repositoryId = review.id.split('.').slice(-2).join('.');

  const navigateToRepository = () => {
    navigate(`/repository/${repositoryId}`);
  };

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
          <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text style={{ marginTop: 6 }}>{review.text}</Text>
          {myReview && (
            <View style={styles.buttonsRow}>
              <Pressable
                style={[styles.button, styles.viewButton]}
                onPress={navigateToRepository}
              >
                <Text fontWeight="bold" color="secondary">
                  View Repository
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.deleteButton]}
                onPress={() => confirmDelete(review.id)}
              >
                <Text fontWeight="bold" color="secondary">
                  Delete Review
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
