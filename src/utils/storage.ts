import AsyncStorage from '@react-native-async-storage/async-storage';

type SetStorageItemProps = {
  key: string;
  value: unknown;
};

export async function setStorageItem({ key, value }: SetStorageItemProps) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getStorageItem(keyStorage: string) {
  const stored = await AsyncStorage.getItem(keyStorage);

  return stored;
}

export async function removeStorageItem(keyStorage: string) {
  await AsyncStorage.getItem(keyStorage);
}
