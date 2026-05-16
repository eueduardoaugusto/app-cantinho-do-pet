import { Alert } from 'react-native';
import { api } from './api';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function uploadAvatarImage(formData: FormData) {
  try {
    const token = await AsyncStorage.getItem('token');

    const { data } = await api.patch('/user/upload-image', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    let message = 'Erro desconhecido';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ errors: string[] }>;

      message = axiosError.response?.data?.errors?.[0] || axiosError.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    Alert.alert('Erro na atualização da foto', message);
  }
}
