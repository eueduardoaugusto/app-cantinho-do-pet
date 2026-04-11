import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  if (data.token) {
    await AsyncStorage.setItem('token', data.token);
  } else {
    console.log('Token não veio da API', data);
    throw new Error('Token não recebido');
  }

  return data;
}
