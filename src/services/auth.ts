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

  if (data.token && data.user) {
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
  } else {
    console.log('Dados incompletos da API', data);
    throw new Error('Token ou usuário não recebido');
  }

  return data;
}
