import { api } from './api';

export async function getService() {
  const { data } = await api.get('/scheduling');
  console.log(data.scheduling);
  return data.scheduling;
}
export async function updateServiceStatus(id: number, status: string) {
  const { data } = await api.patch(`/scheduling/status/${id}`, {
    status,
  });

  return data;
}
