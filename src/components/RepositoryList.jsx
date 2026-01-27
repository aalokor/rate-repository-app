import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem/RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

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

const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  return <RepositoryListContainer repositories={repositories} loading={loading} />;
};

export const RepositoryListContainer = ({ repositories, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text fontWeight="bold">Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryList;