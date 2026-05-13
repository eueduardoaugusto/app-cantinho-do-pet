import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

import Servicos from '@/screens/Servicos';
import Configuracoes from '@/screens/Configuracoes';
import Estoque from '@/screens/Estoques';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#EC5B13',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Servicos"
        component={Servicos}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bag-outline" size={size} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontWeight: focused ? 'bold' : 'normal' }}>Servicos</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Estoque"
        component={Estoque}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="storefront-outline" size={size} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontWeight: focused ? 'bold' : 'normal' }}>Estoque</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Configuracoes"
        component={Configuracoes}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontWeight: focused ? 'bold' : 'normal' }}>Configuracoes</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
