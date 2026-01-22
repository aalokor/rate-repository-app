import { View, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  item: {
    alignItems: 'center',
  },
});

const Stat = ({ value, label }) => ( 
  <View style={styles.item}>
    <Text fontWeight="bold">{value}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryBody = ({ repository, formatCount }) => (
  <View style={styles.row}>
    <Stat
      value={formatCount(repository.stargazersCount)}
      label="Stars"
    />
    <Stat
      value={formatCount(repository.forksCount)}
      label="Forks"
    />
    <Stat
      value={formatCount(repository.reviewCount)}
      label="Reviews"
    />
    <Stat
      value={formatCount(repository.ratingAverage)}
      label="Rating"
    />
  </View>
);

export default RepositoryBody;
