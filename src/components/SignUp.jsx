import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Button from './BaseComponents/Button';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import FormField from './BaseComponents/FormField';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username length must be at least 5 characters')
    .max(30, 'Username length cannot be more than 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password length must be at least 5 characters')
    .max(50, 'Password length cannot be more than 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const result = await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      const id = result?.data?.createUser?.id;
      if (!id) return;

      const signInResult = await signIn({ username, password });

      if (signInResult?.data?.authenticate?.accessToken) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
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
      <FormField
        formik={formik}
        name="passwordConfirmation"
        placeholder="Password cofirmation"
        secureTextEntry
      />
      <Button label="Sign up" onPress={formik.handleSubmit} />
    </View>
  );
};

export default SignUp;
