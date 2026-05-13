import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getProduct() {
  const token = await AsyncStorage.getItem('token');

  const { data } = await api.get('/produtos/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function sugerirCompra(id: number) {
  const token = await AsyncStorage.getItem('token');

  const { data } = await api.patch(
    `/produtos/${id}/sugestao-compra`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
