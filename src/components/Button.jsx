import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0366d6',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#ffffff',
    paddingVertical: 4,
  },
});

const Button = ({ onPress, label, style, ...props }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress} {...props}>
      <Text fontWeight="bold" style={styles.buttonText}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;
