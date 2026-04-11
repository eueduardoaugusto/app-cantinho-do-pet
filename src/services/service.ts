import { api } from './api';

export async function getService() {
  const { data } = await api.get('/agendamento');
  return data;
}
export async function updateServiceStatus(id: number, status: string) {
  const { data } = await api.patch(`/agendamento/${id}/status`, {
    status,
  });

  return data;
}
