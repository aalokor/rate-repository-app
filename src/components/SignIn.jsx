import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Button from './BaseComponents/Button';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import FormField from './BaseComponents/FormField';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const result = await signIn({ username, password });
      if (result?.data?.authenticate?.accessToken) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormField formik={formik} name="username" placeholder="Username" />
      <FormField
        formik={formik}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Button label="Sign in" onPress={formik.handleSubmit} />
    </View>
  );
};

export default SignIn;
