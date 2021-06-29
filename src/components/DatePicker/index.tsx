import React from 'react';
import DateTimePicker, {
  BaseProps,
} from '@react-native-community/datetimepicker';

type DateTimePickerProps = BaseProps & {
  show: boolean;
};

export function DatePicker({ show, ...rest }: DateTimePickerProps) {
  if (!show) return <></>;

  return (
    <DateTimePicker mode="date" locale="pt-BR" display="default" {...rest} />
  );
}
