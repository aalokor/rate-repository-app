import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { USER } from '../../graphql/queries';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#372940',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
  },
})

const AppBar = () => {
  const { data, loading } = useQuery(USER);

  if (loading) {
    return (
    <View style={styles.container}>
        <Text color="secondary" fontWeight="bold">Loading...</Text>
    </View>
  );
  }

  const loggedIn = data?.me ? true : false;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" to="/"/>
        {loggedIn ? (
          <>
            <AppBarTab label="Create a review" to="/create_review"/>
            <AppBarTab label="My reviews" to="/my_reviews"/>
            <AppBarTab label="Sign out" to="/sign_out" />
          </>
        ) : (
          <>
            <AppBarTab label="Sign in" to="/sign_in" />
            <AppBarTab label="Sign up" to="/sign_up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
