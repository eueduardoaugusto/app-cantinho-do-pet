import { View, Text, Image, ImageSourcePropType } from 'react-native';

export default function WrapperSummaryInfo() {
  return (
    <View className="mb-8 flex-row gap-4">
      <SummaryCard
        title="Vendas Mensais"
        imageUrl={require('@/assets/money-note-icon.png')}
        data={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(12.5)}
      />
      <SummaryCard title="Pets Atendidos" imageUrl={require('@/assets/paw-icon.png')} data={145} />
    </View>
  );
}

export function SummaryCard({
  title,
  imageUrl,
  data,
}: {
  title: string;
  imageUrl: ImageSourcePropType;
  data: number | string;
}) {
  return (
    <View className="flex-1 rounded-xl bg-white p-4 shadow">
      <View className="flex-row items-center justify-between">
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-orange-600/10">
          <Image source={imageUrl} />
        </View>
        <Text className="text-sm font-bold text-emerald-500">+12%</Text>
      </View>
      <Text className="mt-4 text-sm font-normal text-slate-500">{title}</Text>
      <Text className="text-xl/7 font-bold text-slate-900 ">{data}</Text>
    </View>
  );
}
