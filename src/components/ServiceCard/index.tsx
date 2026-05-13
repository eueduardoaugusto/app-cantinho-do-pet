import { View, Text, Image } from 'react-native';
import { AppButton } from '@/components/Button/buttonLogin';
import { updateServiceStatus } from '@/services/service';

export function CardServico({ item, reload, currentFilter }: any) {
  // ======================================================
  // STATUS
  // ======================================================
  const status = item?.status?.toLowerCase();

  const podeIniciar =
    currentFilter === 'todos' && status !== 'confirmado' && status !== 'finalizado';

  const podeFinalizar = status === 'confirmado';

  // ======================================================
  // FORMATAR HORÁRIO
  // ======================================================
  function formatHorario(data: string) {
    if (!data) return '--:--';

    return new Date(data).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // ======================================================
  // INICIAR
  // ======================================================
  async function handleStart() {
    if (!podeIniciar) return;

    try {
      await updateServiceStatus(item.id_agendamento, 'Confirmado');

      await reload();
    } catch (error) {
      console.log('Erro ao iniciar:', error);
    }
  }

  // ======================================================
  // FINALIZAR
  // ======================================================
  async function handleFinish() {
    if (!podeFinalizar) return;

    try {
      await updateServiceStatus(item.id_agendamento, 'Finalizado');

      await reload();
    } catch (error) {
      console.log('Erro ao finalizar:', error);
    }
  }

  // ======================================================
  // DADOS
  // ======================================================
  const nomeCliente = item?.cliente?.nome || 'Cliente';

  const nomePet = item?.pet?.pet_name || 'Pet';

  const nomeServico = item?.servico?.nome || 'Serviço';

  const horario = formatHorario(item?.data_horario);

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <View className="relative mx-4 my-2 rounded-2xl border-l-8 border-[#EC5B13] bg-white px-6 py-6 shadow">
      {/* TAG SERVIÇO */}
      <View className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-[#EC5C14] px-4 py-2">
        <Text className="text-sm font-bold text-white">{nomeServico}</Text>
      </View>

      {/* CONTEÚDO */}
      <View className="flex-row items-center">
        <Image source={require('@/assets/Pet.png')} className="h-15 w-15 rounded-2xl" />

        <View className="ml-4 flex-1">
          {/* PET */}
          <Text className="text-lg font-bold uppercase text-[#EC5C14]">{nomePet}</Text>

          {/* DONO */}
          <Text className="text-base font-bold">Dono: {nomeCliente}</Text>

          {/* HORÁRIO */}
          <Text className="text-sm">
            Horário: <Text className="font-bold">{horario}</Text>
          </Text>

          {/* STATUS */}
          <Text className="mt-1 text-sm font-semibold">Status: {item.status}</Text>
        </View>
      </View>

      {/* BOTÕES */}
      <View className="mt-4 flex-row justify-around">
        <AppButton
          variant="servicesStart"
          modal="servicesStart"
          onPress={handleStart}
          disabled={!podeIniciar}
          style={{
            opacity: podeIniciar ? 1 : 0.5,
          }}>
          INICIAR
        </AppButton>

        <AppButton
          variant="servicesEnd"
          modal="servicesEnd"
          onPress={handleFinish}
          disabled={!podeFinalizar}
          style={{
            opacity: podeFinalizar ? 1 : 0.5,
          }}>
          FINALIZAR
        </AppButton>
      </View>
    </View>
  );
}
