import { View, TextInput, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginTop: 4,  
  },
});

const FormField = ({ formik, name, placeholder, secureTextEntry = false, ...props }) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, hasError && styles.inputError, props.style]}
        placeholder={placeholder}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {hasError && <Text style={styles.errorText}>{formik.errors[name]}</Text>}
    </View>
  );
};


export default FormField;
