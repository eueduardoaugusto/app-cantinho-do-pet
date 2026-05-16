import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';

export async function login(email: string, password: string) {
  const response = await api.post(
    '/auth/login',
    {
      email,
      password,
    },
    {
      headers: {
        'x-platform': 'mobile',
      },
    }
  );

  const data = response.data;

  if (data.token && data.user) {
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  } else {
    console.log('Dados incompletos da API', data);
    throw new Error('Token ou usuário não recebido');
  }

  return data;
}

export async function getAuthUserData() {
  try {
    const token = await AsyncStorage.getItem('token');

    const { data } = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
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

    Alert.alert('Erro na busca dos dados do usuário', message);
  }
}
