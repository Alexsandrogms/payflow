import React, { SyntheticEvent, useRef, useState, useCallback } from 'react';
import Clipboard from 'expo-clipboard';
import { nanoid } from 'nanoid';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeEvent } from 'expo-barcode-scanner';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import {
  Alert,
  NativeSyntheticEvent,
  ScrollView,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

import { Input } from '../../components/Input';
import { DatePicker } from '../../components/DatePicker';
import { BarCodeScan } from '../../components/BarCodeScan';
import { formatDate } from '../../utils/formatDate';
import { removeCurrencyMask } from '../../utils/formatCurrency';

import {
  Button,
  ButtonText,
  Container,
  Form,
  Header,
  InputBlock,
  Title,
} from './styles';
import { Load } from '../../components/Load';
import { COLLECTION_TICKETS } from '../../constants';
import { getStorageItem, setStorageItem } from '../../utils/storage';

type TicketType = {
  id: string;
  title: string;
  dueDate: Date;
  value: number;
  barcode: string;
  createdAt: Date;
  isPay: boolean;
  hasNotification: boolean;
};

type EventChangeDate = SyntheticEvent<Readonly<{ timestamp: number }>, Event>;

export function CreateTicket() {
  const navigation = useNavigation();

  const [dueDate, setDueDate] = useState(new Date());
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('');
  const [barcode, setBarcode] = useState('');

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [isOpenScan, setIsOpenScan] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputDueDateRef = useRef<TextInput>(null);
  const inputValueRef = useRef<TextInput>(null);
  const inputBarCodeRef = useRef<TextInput>(null);

  function handleOpenDatePicker() {
    setIsShowDatePicker(true);
  }

  function handleFocusNextInput(inputName: 'dueDate' | 'currency' | 'barcode') {
    const inputRefs = {
      dueDate: inputDueDateRef.current,
      currency: inputValueRef.current,
      barcode: inputBarCodeRef.current,
    };

    if (inputName === 'dueDate') {
      handleOpenDatePicker();
    }

    return inputRefs[inputName]?.focus();
  }

  function handleChangeDate(
    _event: EventChangeDate,
    selectedDate: Date | undefined
  ) {
    setDueDate(selectedDate || dueDate);
    setIsShowDatePicker(false);
  }

  function handleChangeCurrencyValue(
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    let { text } = event.nativeEvent;

    text = text.replace(/\D/g, '');
    text = text.replace(/(\d)(\d{2})$/, '$1,$2');
    text = text.replace(/(?=(\d{3})+(\D))\B/g, '.');

    setCurrency(`R$ ${text}`);

    return event;
  }

  async function handleBarCodeScanned({ data }: BarCodeEvent) {
    if (data) {
      setBarcode(data);
      setIsOpenScan(false);
    }
  }

  function handleNavigateGoBack() {
    navigation.goBack();
  }

  async function fetchCopiedTextBarcodeExists() {
    const textCopied = await Clipboard.getStringAsync();

    if (Number(textCopied) && textCopied.length >= 25 && !barcode) {
      Alert.alert(
        'Atenção 😄',
        'Identificamos um código na sua área de transferência, deseja copia-lo ?',
        [
          { text: 'Não', style: 'cancel' },
          { text: 'Sim', onPress: () => setBarcode(textCopied) },
        ],
        { cancelable: false }
      );
    }
  }

  function resetForm() {
    setDueDate(new Date());
    setName('');
    setCurrency('');
    setBarcode('');
  }

  function onValidateForm(values: TicketType) {
    return Object.entries(values).find(([_key, value]) => value === '')?.[0];
  }

  async function handleCreateTicket() {
    const ticket = {
      id: nanoid(),
      title: name,
      dueDate,
      value: Number(removeCurrencyMask(currency)),
      barcode,
      createdAt: new Date(),
      isPay: false,
      hasNotification: false,
    };

    if (onValidateForm(ticket)) {
      return Alert.alert(
        'Atenção 😄',
        'É necessário preencher todos os campos para adicionar um novo boleto!'
      );
    }

    setLoading(true);

    try {
      const storedTickets = await getStorageItem(COLLECTION_TICKETS);

      const ticketsStored = JSON.parse(storedTickets || '[]');

      await setStorageItem({
        key: COLLECTION_TICKETS,
        value: [ticket, ...ticketsStored],
      });

      resetForm();
      navigation.navigate('Home');
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchCopiedTextBarcodeExists();
    }, [])
  );

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        <Header>
          <BorderlessButton onPress={handleNavigateGoBack}>
            <Ionicons name="arrow-back-outline" size={24} color="#B1B0B8" />
          </BorderlessButton>
        </Header>

        <Form>
          <Title>Preencha os dados{'\n'}do boleto</Title>
          <View style={{ width: '100%', marginVertical: 50 }}>
            <InputBlock>
              <Input
                icon="document-text-outline"
                placeholder="Nome do boleto"
                returnKeyType="next"
                blurOnSubmit={false}
                value={name}
                onChangeText={(text) => setName(text)}
                onSubmitEditing={() => handleFocusNextInput('dueDate')}
              />
            </InputBlock>
            <InputBlock>
              <Input
                icon="close-circle-outline"
                placeholder="Vencimento"
                returnKeyType="next"
                ref={inputDueDateRef}
                blurOnSubmit={false}
                value={formatDate(dueDate, 'P')}
                onResponderStart={handleOpenDatePicker}
                onSubmitEditing={() => handleFocusNextInput('currency')}
              />

              <DatePicker
                show={isShowDatePicker}
                value={dueDate}
                onChange={handleChangeDate}
              />
            </InputBlock>
            <InputBlock>
              <Input
                icon="card-outline"
                placeholder="Valor"
                returnKeyType="next"
                keyboardType="numeric"
                ref={inputValueRef}
                value={currency}
                blurOnSubmit={false}
                onChange={handleChangeCurrencyValue}
                onSubmitEditing={() => handleFocusNextInput('barcode')}
              />
            </InputBlock>
            <InputBlock>
              <Input
                icon="barcode-outline"
                placeholder="Código"
                keyboardType="numeric"
                returnKeyType="send"
                type="scan"
                ref={inputBarCodeRef}
                value={barcode}
                onChangeText={(text) => setBarcode(text)}
                handlePressButtonScan={() => setIsOpenScan(true)}
                onSubmitEditing={handleCreateTicket}
              />

              <BarCodeScan
                open={isOpenScan}
                onBarCodeScanned={handleBarCodeScanned}
                onClose={() => setIsOpenScan(false)}
              />
            </InputBlock>
          </View>

          <Button enabled={!loading} onPress={handleCreateTicket}>
            {loading ? (
              <Load color="white" />
            ) : (
              <ButtonText variant="primary">Cadastrar</ButtonText>
            )}
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
}
