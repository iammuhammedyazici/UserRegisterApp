import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {palette} from '../theme';
import {TextInput} from 'react-native-paper';

interface Props {
  label: any;
  icon?: any;
  inputType?: 'password';
  keyboardType?: '' | any;
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
  onChangeText?: (text: string) => void;
  value: any;
}

export default function CustomInput({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  value,
}: Props) {
  return (
    <View style={styles.container}>
      {inputType === 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={onChangeText}
          value={value}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.input}
          placeholderTextColor="gray"
          value={value}
          onChangeText={onChangeText}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: palette.secondaryColor, fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    color: '#000',
    height: 40,
    backgroundColor: 'white',
  },
});
