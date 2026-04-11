import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import Header from '@/components/Header/header';
import { FilterButton } from '@/components/Filter';
import { CardServico } from '@/components/ServiceCard';
import FilterInput from '@/components/Filter/filterInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getService } from '@/services/service';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function ScreenServicos() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('todos');

  async function loadServices() {
    try {
      setLoading(true);
      const data = await getService();
      setServices(data?.agendamento || []);
    } catch (error) {
      console.log('Erro ao buscar serviços:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadServices();
    }, [])
  );

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  const filterMap: any = {
    banho: 'banho',
    tosa: 'tosa',
    banho_tosa: 'banho e tosa',
  };

  
  const filteredBySearch = services.filter((s) => {
    const busca = normalize(search);

    return (
      normalize(s?.nome || '').includes(busca) ||
      normalize(s?.pet || '').includes(busca) ||
      normalize(s?.servico || '').includes(busca)
    );
  });

  
  const finalServices = filteredBySearch
    .filter((s) => {
     
      if (s.status === 'finalizado') return false;

      if (filter === 'todos') return true;

      return normalize(s?.servico || '') === filterMap[filter];
    })
    .sort((a, b) => normalize(a.pet).localeCompare(normalize(b.pet)));

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text>Carregando serviços...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <Header />
      <Text className="p-6 text-center text-3xl font-bold">Serviços</Text>

      <FilterInput
        placeholder="Buscar por dono, pet ou serviço..."
        value={search}
        onChangeText={setSearch}
      />

      <View className="mb-4 flex-row justify-center gap-4">
        <FilterButton
          title="Todos"
          active={filter === 'todos'}
          onPress={() => setFilter('todos')}
        />
        <FilterButton
          title="Banho e Tosa"
          active={filter === 'banho_tosa'}
          onPress={() => setFilter('banho_tosa')}
        />
        <FilterButton
          title="Banho"
          active={filter === 'banho'}
          onPress={() => setFilter('banho')}
        />
        <FilterButton title="Tosa" active={filter === 'tosa'} onPress={() => setFilter('tosa')} />
      </View>

      <FlatList
        data={finalServices}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <CardServico item={item} reload={loadServices} currentFilter={filter} />
        )}
        ListEmptyComponent={<Text className="mt-10 text-center">Nenhum serviço encontrado</Text>}
      />
    </SafeAreaView>
  );
}
