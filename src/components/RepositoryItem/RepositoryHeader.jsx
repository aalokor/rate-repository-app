import { View, Image, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  languageBadge: {
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 6,
  },
});

const RepositoryHeader = ({ repository }) => (
  <View style={styles.row}>
    <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />

    <View style={styles.info}>
      <Text fontWeight="bold">{repository.fullName}</Text>
      <Text color="textSecondary">{repository.description}</Text>

      <View style={styles.languageBadge}>
        <Text color="secondary">{repository.language}</Text>
      </View>
    </View>
  </View>
);

export default RepositoryHeader;
