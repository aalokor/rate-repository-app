import { View, StyleSheet, Pressable } from 'react-native';
import RepositoryHeader from './RepositoryHeader';
import RepositoryBody from './RepositoryBody';
import Text from '../Text'
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },
   button: {
    backgroundColor: '#0366d6',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
  },
});

const RepositoryItem = ({ repository, single = false }) => {
  
  const formatCount = (count) => {
    return count >= 1000
      ? `${(count / 1000).toFixed(1)}k`
      : String(count);
    };

  return (
    <View style={styles.container} testID="repositoryItem">
      <RepositoryHeader repository={repository} />
      <RepositoryBody repository={repository} formatCount={formatCount} />
      {single && (
        <Pressable style={styles.button} onPress={() => Linking.openURL(repository.url)}>
          <Text color="secondary" fontWeight="bold">Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
