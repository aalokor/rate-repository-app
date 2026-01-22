import { View, StyleSheet } from 'react-native';
import RepositoryHeader from './RepositoryHeader';
import RepositoryBody from './RepositoryBody';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },
});

const RepositoryItem = ({ repository }) => {
  
  const formatCount = (count) => {
    return count >= 1000
      ? `${(count / 1000).toFixed(1)}k`
      : String(count);
    };

  return (
    <View style={styles.container}>
      <RepositoryHeader repository={repository} />
      <RepositoryBody repository={repository} formatCount={formatCount} />
    </View>
  );
};

export default RepositoryItem;
