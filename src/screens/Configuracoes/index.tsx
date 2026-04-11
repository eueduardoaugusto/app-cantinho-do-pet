import { View, Text, Image, Pressable } from 'react-native';
import Header from '@/components/Header/header';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import WrapperSummaryInfo from '@/components/SummaryCards/SummaryInfo';

export default function ScreenSettings({ goBack }: any) {
  return (
    <View className="flex-1">
      <Header />
      <View className="items-center px-4 py-[50px]">
        <View className="relative">
          <View className="rounded-full border-4 border-orange-600">
            <Image
              source={require('../../assets/example-image-avatar-user.png')}
              className="block h-28 w-28 rounded-full border-4 border-transparent"
            />
          </View>
          <Pressable className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-orange-600 shadow">
            <Octicons name="pencil" size={16} color="#fff" />
          </Pressable>
        </View>
        <Text className="mb-2 mt-4 text-2xl font-bold text-slate-900">Ricardo Silva</Text>
        <View className="mb-8 flex-row items-center gap-2">
          <View className="rounded-xl bg-orange-600/10 px-3 py-1">
            <Text className="text-sm font-semibold text-orange-600">Proprietario</Text>
          </View>
          <Text className=" font-normal text-slate-500">• Desde Jan 2023</Text>
        </View>
        <Text className="mb-3 self-start text-sm font-bold uppercase text-slate-500">
          Resumo do Mês
        </Text>
        <WrapperSummaryInfo />
        <Text className="mb-3 self-start text-sm font-bold uppercase text-slate-500">
          Configurações
        </Text>
        <View className="w-full rounded-xl bg-white shadow">
          <Pressable>
            <View className="flex-row items-center gap-4 p-4">
              <MaterialCommunityIcons name="file-document-outline" size={24} color="#1e293b" />
              <View className="w-full">
                <Text className="text-base font-semibold text-slate-800">Termos e condições</Text>
                <Text className="text-sm font-normal text-slate-500">Legal e políticas de uso</Text>
              </View>
            </View>
          </Pressable>
          <View className="h-[1px] w-full bg-slate-300" />
          <Pressable>
            <View className="flex-row items-center gap-4 p-4">
              <MaterialIcons name="logout" size={24} color="#ef4444" />
              <View className="w-full">
                <Text className="text-base font-semibold text-red-500">Sair da conta</Text>
                <Text className="text-sm font-normal text-red-400">Desconectar do dispositivo</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
