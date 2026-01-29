import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList/RepositoryList';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import AppBar from './AppBar/AppBar';
import SingleRepository from './SingleRepository/SingleRepository';
import CreateReview from './CreateReview';
import { Route, Routes, Navigate } from 'react-router-native';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#decfe8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_out" element={<SignOut />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/create_review" element={<CreateReview />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/my_reviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
