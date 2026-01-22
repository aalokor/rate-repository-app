import { FlatList, View, StyleSheet } from 'react-native';
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
        <RepositoryItem repository={item} />
      )}
    />
  );
};

export default RepositoryList;