import { View, Text, Image } from 'react-native';
import { AppButton } from '@/components/Button/buttonLogin';
import { updateServiceStatus } from '@/services/service';

export function CardServico({ item, reload, currentFilter }: any) {
  const podeIniciar =
    currentFilter === 'todos' && item.status !== 'confirmado' && item.status !== 'finalizado';
  const podeFinalizar = item.status === 'confirmado';

  async function handleStart() {
    if (!podeIniciar) return;

    try {
      await updateServiceStatus(item.id, 'confirmado');
      await reload();
    } catch (error) {
      console.log('Erro ao iniciar:', error);
    }
  }

  async function handleFinish() {
    if (!podeFinalizar) return;

    try {
      await updateServiceStatus(item.id, 'finalizado');
      await reload();
    } catch (error) {
      console.log('Erro ao finalizar:', error);
    }
  }

  return (
    <View className="relative mx-4 my-2 rounded-2xl border-l-8 border-[#EC5B13] bg-white px-6 py-6 shadow">
      <View className="absolute right-0 top-0 rounded-bl-2xl rounded-tr-2xl bg-[#EC5C14] px-4 py-2">
        <Text className="text-sm font-bold text-white">{item.servico}</Text>
      </View>

      <View className="flex-row items-center">
        <Image source={require('@/assets/Pet.png')} className="w-15 h-15 rounded-2xl" />

        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold uppercase text-[#EC5C14]">{item.pet}</Text>
          <Text className="text-base font-bold">Dono: {item.nome}</Text>
          <Text className="text-sm">
            Previsão de Saída: <Text className="font-bold">{item.horario_final}</Text>
          </Text>

          <Text className="mt-1 text-sm font-semibold">Status: {item.status}</Text>
        </View>
      </View>

      <View className="mt-4 flex-row justify-around">
        <AppButton
          variant="servicesStart"
          modal="servicesStart"
          onPress={handleStart}
          disabled={!podeIniciar}
          style={{ opacity: podeIniciar ? 1 : 0.5 }}>
          INICIAR
        </AppButton>

        <AppButton
          variant="servicesEnd"
          modal="servicesEnd"
          onPress={handleFinish}
          disabled={!podeFinalizar}
          style={{ opacity: podeFinalizar ? 1 : 0.5 }}>
          FINALIZAR
        </AppButton>
      </View>
    </View>
  );
}
