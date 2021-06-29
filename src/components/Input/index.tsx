import React, { forwardRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';

import { theme } from '../../global/styles/theme';

import { Container, Icon, ScanButtonIcon } from './styles';

interface InputProps extends TextInputProps {
  icon:
    | 'close-circle-outline'
    | 'document-text-outline'
    | 'card-outline'
    | 'barcode-outline';
  type?: 'text' | 'scan';
  handlePressButtonScan?: () => void;
}

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const { icon, type = 'text', handlePressButtonScan, ...rest } = props;

  return (
    <Container>
      <Icon>
        <Ionicons name={icon} size={34} color={theme.colors.primary} />
      </Icon>
      <TextInput
        ref={ref}
        style={{
          flex: 1,
          height: '100%',
          fontSize: 14,
          lineHeight: 18,
          fontFamily: theme.fonts.textRegular,
          paddingLeft: 16,
        }}
        placeholderTextColor="#B1B0B8"
        {...rest}
      />
      {type === 'scan' && (
        <TouchableOpacity onPress={handlePressButtonScan}>
          <ScanButtonIcon>
            <Ionicons
              name="camera-outline"
              size={24}
              color={theme.colors.primary}
            />
          </ScanButtonIcon>
        </TouchableOpacity>
      )}
    </Container>
  );
});

export { Input };
