import { View, Text, Image } from 'react-native';
import { AppButton } from '@/components/Button/buttonLogin';
import { sugerirCompra } from '@/services/product';

export function CardEstoque({ item, currentFilter, reload }: any) {
  const estoque = item.quantidade_estoque;
  const textUn = estoque === 1 ? 'unidade' : 'unidades';

  const statusConfig: any = {
    critico: {
      label: 'SEM ESTOQUE',
      color: 'bg-red-600',
      text: 'text-white',
    },
    baixo: {
      label: 'BAIXO',
      color: 'bg-red-500',
      text: 'text-white',
    },
    excedido: {
      label: 'ALTO',
      color: 'bg-blue-500',
      text: 'text-white',
    },
    ok: {
      label: 'EM DIA',
      color: 'bg-green-500',
      text: 'text-white',
    },
  };

  const status = item.status_estoque;
  const statusInfo = statusConfig[status];

  const mostrarBotaoRepor =
    currentFilter === 'baixo' &&
    (status === 'baixo' || status === 'critico') &&
    !item.sugerir_compra;

  async function handleRepor() {
    try {
      await sugerirCompra(item.id);
      await reload();
    } catch (error: any) {
      console.log('Erro:', error?.response?.data || error);
    }
  }

  return (
    <View className="mx-4 my-2 rounded-2xl bg-white p-4 shadow">
      {statusInfo && (
        <View className={`absolute right-3 top-3 rounded-full px-3 py-1 ${statusInfo.color}`}>
          <Text className={`text-xs font-bold ${statusInfo.text}`}>{statusInfo.label}</Text>
        </View>
      )}

      <View className="mb-2 ml-2">
        <Text className="text-xs font-bold uppercase text-[#EC5C14]">{item.setor}</Text>
        <Text className="text-lg font-bold">{item.nome}</Text>
      </View>

      <View className="flex-row items-center justify-around">
        <Image
          source={require('@/assets/Background+Border.png')}
          className="h-28 w-28 rounded-2xl"
        />

        <View className="h-20 justify-center rounded-xl border-2 border-red-100 bg-red-50 px-4">
          <Text className="text-sm text-red-600">Estoque</Text>
          <Text className="text-lg font-bold text-red-700">
            {estoque} {textUn}
          </Text>
        </View>

        <View className="h-20 justify-center rounded-xl border-2 border-slate-200 bg-slate-50 px-4">
          <Text className="text-slate-500">Venda</Text>
          <Text className="text-lg font-bold text-slate-700">R$ {item.preco}</Text>
        </View>
      </View>

      <View className="mt-3 h-[1px] bg-black/5" />

      <View className="mt-3 items-end">
        {mostrarBotaoRepor && (
          <AppButton variant="suggestStock" modal="suggestStock" onPress={handleRepor}>
            SUGERIR COMPRA
          </AppButton>
        )}
      </View>
    </View>
  );
}
