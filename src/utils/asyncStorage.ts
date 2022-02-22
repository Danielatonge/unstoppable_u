import AsyncStorage from "@react-native-async-storage/async-storage";

export const printAsyncStorageValues = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
