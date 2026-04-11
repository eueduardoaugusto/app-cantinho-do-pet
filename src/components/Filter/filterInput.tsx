import { TextInput, View, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type InputProps = TextInputProps & {
  label?: string;
};

export default function FilterInput({ placeholder, ...rest }: InputProps) {
  return (
    <View className="mb-6 ml-6 mr-6 h-12 flex-row items-center rounded-2xl bg-white px-3">
      <Ionicons name="search" size={20} color="#94A3B8" />
      <TextInput {...rest} className="ml-2 flex-1" placeholder={placeholder} />
    </View>
  );
}
