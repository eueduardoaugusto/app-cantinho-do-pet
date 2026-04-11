import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface AppButtonProps extends TouchableOpacityProps {
  children: string;
  modal?: 'login' | 'servicesStart' | 'servicesEnd' | 'stockAlert' | 'suggestStock';
  variant?:
    | 'primary'
    | 'secondary'
    | 'servicesStart'
    | 'servicesEnd'
    | 'stockAlert'
    | 'suggestStock';
}

export function AppButton({
  children,
  variant = 'primary',
  modal = 'login',
  ...rest
}: AppButtonProps) {
  const modalVariants = {
    login: 'mt-6 w-full items-center justify-center rounded-3xl bg-[#EC5C14] px-4 py-6',
    servicesStart:
      'mt-6 w-40 h-10 items-center justify-center rounded-2xl bg-[#CDDEF9] border border-[#57679F]',
    servicesEnd:
      'mt-6 w-40 h-10 items-center justify-center rounded-2xl bg-[#CCF2DA] border border-[#076539]',
    stockAlert:
      'mt-6 w-40 h-10 items-center justify-center rounded-2xl bg-[#FEE2E2] border border-[#B91C1C]',
    suggestStock:
      'mt-2 w-40 h-10 items-center justify-center rounded-2xl bg-[#2E19E1] border border-[#95A7E6]',
  };

  const textVariants = {
    primary: 'text-white',
    secondary: 'text-center',
    servicesStart: 'text-[#375BD8]',
    servicesEnd: 'text-[#1CB91F]',
    stockAlert: 'text-[#B91C1C]',
    suggestStock: 'text-white',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      className={modalVariants[modal]}
      {...rest}
    >
      <Text className={`font-semibold ${textVariants[variant]}`}>{children}</Text>
    </TouchableOpacity>
  );
}
