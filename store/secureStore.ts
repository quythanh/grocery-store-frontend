import * as SecureStore from "expo-secure-store"

export async function getSecureStore(key: string): Promise<string | null> {
  const value = await SecureStore.getItemAsync(key)
  return value
}

export async function setSecureStore(
  key: string,
  value: string
): Promise<void> {
  await SecureStore.setItemAsync(key, value)
}

export async function deleteSecureStore(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key)
}
