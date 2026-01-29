import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

import theme from '../../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  colorButtonSecondary: {
    backgroundColor: theme.colors.buttonSecondary,
  },
  ButtonSecondary: {
    borderRadius: 4,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    paddingVertical: 4,
  },
});

const Button = ({ onPress, color, button, label, style, ...props }) => {
  const ButtonStyle = [
    styles.button,
    color === 'buttonRed' && styles.colorButtonSecondary,
    button === 'buttonSecondary' && styles.ButtonSecondary,
    style,
  ];

  return (
    <Pressable style={ButtonStyle} onPress={onPress} {...props}>
      <Text fontWeight="bold" color="secondary" style={styles.buttonText}>
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;
