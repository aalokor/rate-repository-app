import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../../graphql/queries';
import Text from '../Text';
import ReviewItem from './ReviewItem';
import RepositoryInfo from './RepositoryInfo';

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading) {
    return <Text fontWeight="bold">Loading...</Text>;
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryInfo id={id} />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
    />
  );
};

export default SingleRepository;
