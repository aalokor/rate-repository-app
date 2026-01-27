import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../Text'

const styles = StyleSheet.create({
  tab: {
    marginRight: 15,
  },
});

const AppBarTab = ({ label, to }) => {
  return (
    <Link to={to} style={styles.tab} underlayColor="transparent">
      <Text color="secondary" fontWeight="bold">{label}</Text>
    </Link>
  );
};

export default AppBarTab;

