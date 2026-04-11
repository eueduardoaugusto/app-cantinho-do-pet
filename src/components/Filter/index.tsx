import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type filterProps = TouchableOpacityProps & {
  title: string;
  active?: boolean;
};

export function FilterButton({ title, active, ...rest }: filterProps) {
  return (
    <TouchableOpacity
      {...rest}
      className={`rounded-3xl border px-4 py-2 ${
        active ? 'border-[#EC5C14] bg-[#EC5C14]' : 'border-[#475569] bg-white'
      }`}>
      <Text className={active ? 'font-bold text-white' : 'text-black'}>{title}</Text>
    </TouchableOpacity>
  );
}
