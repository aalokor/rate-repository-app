import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import Text from '../Text';
import ReviewItem from './ReviewItem';
import RepositoryInfo from './RepositoryInfo';
import useRepository from '../../hooks/useRepository';

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository(id);

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return <Text fontWeight="bold">Loading...</Text>;
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryInfo id={id} />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
