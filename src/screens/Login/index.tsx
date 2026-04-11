import { Image, Text, View, Alert } from 'react-native';
import { AppButton } from '@/components/Button/buttonLogin';
import Input from '@/components/Input/input';
import { useNavigation } from '@react-navigation/native';
import { login } from '@/services/auth';
import { useState } from 'react';

export default function ScreenLogin() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const data = await login(email, password);

      console.log('Usuário logado:', data);

      navigation.replace('Tabs');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha no login');
    }
  }

  return (
    <View className="flex-1 justify-center bg-[#EC5C14]">
      <View className="mx-5 items-center rounded-3xl bg-white p-6">
        <Image
          source={require('@/assets/Logo-Pet.png')}
          className="h-72 w-72"
          resizeMode="contain"
        />

        <Text className="mb-10 px-10 text-center text-2xl color-[#6B7280]">
          Realize login para acessar o painel de controle.
        </Text>

        <Input
          label="Usuário"
          placeholder="Seu nome de usuário"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          label="Senha"
          placeholder="Insira sua Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AppButton
          className="mt-6 w-full items-center justify-center rounded-3xl bg-[#EC5C14] px-4 py-6"
          onPress={handleLogin}>
          LOGIN
        </AppButton>
      </View>
    </View>
  );
}
