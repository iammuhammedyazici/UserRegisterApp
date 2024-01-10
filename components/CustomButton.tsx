import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {palette} from '../theme';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
}
export default function CustomButton({label, onPress}: CustomButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: palette.mainColor,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
});
