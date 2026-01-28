import { View, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import Button from './Button';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import FormField from './FormField';
import { CREATE_REVIEW } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
});

const validationSchema = yup.object().shape({
  repositoryOwner: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().typeError('Rating must be a number').required('Rating is required').min(0, 'Rating must be at least 0').max(100, 'Rating cannot be more than 100'),
  review: yup.string(),

});

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const result = await createReview({
        variables: {
          review: {
            ownerName: values.repositoryOwner,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.review || "",
          },
        },
      });

      const repositoryId = result?.data?.createReview?.repositoryId;
      if (repositoryId) {
        navigate(`/repository/${repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export const CreateReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    repositoryOwner: '',
    repositoryName: '',
    rating: '',
    review: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormField 
        formik={formik} 
        name="repositoryOwner" 
        placeholder="Repository owner name" 
      />
      <FormField 
        formik={formik} 
        name="repositoryName" 
        placeholder="Repository name" 
      />
      <FormField 
        formik={formik} 
        name="rating" 
        placeholder="Rating between 0 and 100" 
      />
      <FormField 
        formik={formik} 
        name="review" 
        placeholder="Review"
        multiline
      />
      <Button label="Create a review" onPress={formik.handleSubmit} />
    </View>
  );
};

export default CreateReview;
