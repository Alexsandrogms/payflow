import React, { useCallback, useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Ionicons } from '@expo/vector-icons';

import {
  BarCodeScanner,
  BarCodeScannerProps,
  requestPermissionsAsync,
} from 'expo-barcode-scanner';

import { TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';

import {
  Button,
  ButtonText,
  Container,
  Footer,
  Header,
  Highlight,
  Title,
  Warning,
  WarningFooter,
  WarningText,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

type BarCodeScanProps = BarCodeScannerProps & {
  open: boolean;
  onClose: () => void;
};

export function BarCodeScan({
  open,
  onClose,
  onBarCodeScanned,
  ...rest
}: BarCodeScanProps) {
  const [isScannerTimeExpired, setIsScannerTimeExpired] = useState(true);
  const [hasPermission, setHasPermission] = useState<unknown>(null);

  const scannerTimeExpiredDefault = 15000;
  let timeout: number | undefined;

  async function handleCloseScan() {
    setIsScannerTimeExpired(false);
    onClose();
  }

  function handleScanAgain() {
    clearTimeout(timeout);
    setIsScannerTimeExpired(false);
  }

  async function getPermissions() {
    const { status } = await requestPermissionsAsync();

    setHasPermission(status === 'granted');
  }

  useFocusEffect(
    useCallback(() => {
      getPermissions().then(async () => {
        if (open) {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
          );

          return;
        }

        setIsScannerTimeExpired(false);
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      });
    }, [open])
  );

  useEffect(() => {
    if (open && !isScannerTimeExpired) {
      timeout = setTimeout(() => {
        setIsScannerTimeExpired(true);
      }, scannerTimeExpiredDefault);
    }
  }, [isScannerTimeExpired, open]);

  if (hasPermission === false) {
    Alert.alert('', 'Nenhum acesso à câmera');
    return <></>;
  }

  return (
    <Modal visible={open} statusBarTranslucent animationType="slide">
      <Container>
        <Header>
          <TouchableOpacity
            onPress={handleCloseScan}
            style={{ position: 'absolute', left: 24 }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <Title>Escaneie o código de barras do boleto</Title>
        </Header>

        <BarCodeScanner
          type="back"
          barCodeTypes={['itf14', 'interleaved2of5']}
          style={StyleSheet.absoluteFill}
          onBarCodeScanned={
            open && !isScannerTimeExpired ? onBarCodeScanned : undefined
          }
          {...rest}
        />

        <Footer secondary style={{ height: 120 }} />
        <Footer>
          <Button onPress={handleCloseScan}>
            <ButtonText>Inserir código do boleto</ButtonText>
          </Button>
        </Footer>

        {isScannerTimeExpired && (
          <Warning>
            <WarningText>
              <Highlight>
                Não foi possível identificar um código de barras.{'\n'}
              </Highlight>
              Tente escanear novamente ou digite o código do seu boleto.
            </WarningText>
            <WarningFooter>
              <Button onPress={handleScanAgain}>
                <ButtonText>Escanear Novamente</ButtonText>
              </Button>
              <Button onPress={handleCloseScan}>
                <ButtonText>Inserir código do boleto</ButtonText>
              </Button>
            </WarningFooter>
          </Warning>
        )}
      </Container>
    </Modal>
  );
}
