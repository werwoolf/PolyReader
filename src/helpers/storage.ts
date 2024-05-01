import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
    alert(`Data successfully saved: ${value}`)
  } catch (e) {
    alert('Failed to save the data to the storage')
  }
}

export const readData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    alert(`Data successfully read: ${value}`)
    return value;
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};
