import { View, Text, Image, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '@/components/Header/header';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import WrapperSummaryInfo from '@/components/SummaryCards/SummaryInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { uploadAvatarImage } from '@/services/config';
import { getAuthUserData } from '@/services/auth';

export default function ScreenSettings() {
  const navigation: any = useNavigation();

  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  const picker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (result.canceled) return; // 🔥 IMPORTANTE

    const asset = result.assets[0];

    setImage(asset.uri);

    const formData = new FormData();

    formData.append('avatar', {
      uri: asset.uri,
      name: asset.fileName || 'avatar.jpg',
      type: asset.mimeType || 'image/jpeg',
    } as any);

    await uploadAvatarImage(formData);
  };

  useFocusEffect(
    useCallback(() => {
      async function loadUser() {
        try {
          const userStorage = await AsyncStorage.getItem('user');
          const { user } = await getAuthUserData();

          console.log('USER STORAGE:', userStorage);

          if (userStorage && user) {
            setUser({ ...JSON.parse(userStorage), ...user });
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
        <View className="relative">
          <View className="rounded-full border-4 border-orange-600">
            {!user?.avatar ? (
              <Text>Carregando...</Text>
            ) : (
              <Image
                source={
                  image
                    ? { uri: image }
                    : user?.avatar
                      ? {
                          uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/${user.avatar}`,
                        }
                      : require('@/assets/example-image-avatar-user.png')
                }
                className="h-28 w-28 rounded-full border-4 border-transparent"
              />
            )}
          </View>
          <Pressable
            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-orange-600 shadow"
            onPress={picker}>
            <Octicons name="pencil" size={16} color="#fff" />
          </Pressable>
        </View>
        <Text className="mb-2 mt-4 text-2xl font-bold text-slate-900">
          {user ? user.name : 'Carregando...'}
        </Text>
        <View className="mb-8 flex-row items-center gap-2">
          <View className="rounded-xl bg-orange-600/10 px-10 py-1">
            <Text className="w-full text-sm font-semibold uppercase text-orange-600">
              {user ? user.role : '...'}
            </Text>
          </View>
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
              <View className="flex-1">
                <Text className="text-base font-semibold text-slate-800">Termos e condições</Text>
                <Text className="text-sm text-slate-500">Legal e políticas de uso</Text>
              </View>
            </View>
          </Pressable>
          <View className="h-[1px] w-full bg-slate-300" />
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
