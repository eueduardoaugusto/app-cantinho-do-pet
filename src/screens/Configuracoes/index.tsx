import { View, Text, Image, Pressable } from 'react-native';
import Header from '@/components/Header/header';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import WrapperSummaryInfo from '@/components/SummaryCards/SummaryInfo';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';

export default function ScreenSettings() {
  const navigation: any = useNavigation();

  const [user, setUser] = useState<any>(null);

  // 🔥 AGORA CARREGA SEMPRE QUE A TELA ENTRA EM FOCO
  useFocusEffect(
    useCallback(() => {
      async function loadUser() {
        try {
          const userStorage = await AsyncStorage.getItem('user');

          console.log('USER STORAGE:', userStorage);

          if (userStorage) {
            setUser(JSON.parse(userStorage));
          } else {
            setUser(null);
          }
        } catch (error) {
          console.log('Erro ao carregar usuário:', error);
        }
      }

      loadUser();
    }, [])
  );

  async function handleLogout() {
    try {
      await AsyncStorage.multiRemove(['token', 'user']);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Erro ao deslogar:', error);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <Header />

      <View className="items-center px-4 py-[50px]">
        {/* Avatar */}
        <View className="relative">
          <View className="rounded-full border-4 border-orange-600">
            <Image
              source={require('../../assets/example-image-avatar-user.png')}
              className="h-28 w-28 rounded-full border-4 border-transparent"
            />
          </View>

          <Pressable className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-orange-600 shadow">
            <Octicons name="pencil" size={16} color="#fff" />
          </Pressable>
        </View>

        {/* Nome */}
        <Text className="mb-2 mt-4 text-2xl font-bold text-slate-900">
          {user ? user.name : 'Carregando...'}
        </Text>

        {/* Cargo */}
        <View className="mb-8 flex-row items-center gap-2">
          <View className="rounded-xl bg-orange-600/10 px-10 py-1">
            <Text className="w-full text-sm font-semibold uppercase text-orange-600">
              {user ? user.role : '...'}
            </Text>
          </View>
        </View>

        {/* Resumo */}
        <Text className="mb-3 self-start text-sm font-bold uppercase text-slate-500">
          Resumo do Mês
        </Text>

        <WrapperSummaryInfo />

        {/* Configurações */}
        <Text className="mb-3 self-start text-sm font-bold uppercase text-slate-500">
          Configurações
        </Text>

        <View className="w-full rounded-xl bg-white shadow">
          {/* Termos */}
          <Pressable>
            <View className="flex-row items-center gap-4 p-4">
              <MaterialCommunityIcons name="file-document-outline" size={24} color="#1e293b" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-slate-800">Termos e condições</Text>
                <Text className="text-sm text-slate-500">Legal e políticas de uso</Text>
              </View>
            </View>
          </Pressable>

          <View className="h-[1px] w-full bg-slate-300" />

          {/* Logout */}
          <Pressable onPress={handleLogout}>
            <View className="flex-row items-center gap-4 p-4">
              <MaterialIcons name="logout" size={24} color="#ef4444" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-red-500">Sair da conta</Text>
                <Text className="text-sm text-red-400">Desconectar do dispositivo</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
