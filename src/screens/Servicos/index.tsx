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

  // ======================================================
  // LOAD SERVICES
  // ======================================================
  async function loadServices() {
    try {
      setLoading(true);

      const data = await getService();

      console.log('SERVICES:', data);

      setServices(data || []);
    } catch (error) {
      console.log('Erro ao buscar serviços:', error);
    } finally {
      setLoading(false);
    }
  }

  // ======================================================
  // INIT
  // ======================================================
  useEffect(() => {
    loadServices();
  }, []);

  // ======================================================
  // RELOAD AO FOCAR
  // ======================================================
  useFocusEffect(
    useCallback(() => {
      loadServices();
    }, [])
  );

  // ======================================================
  // NORMALIZAR TEXTO
  // ======================================================
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  // ======================================================
  // MAPA FILTROS
  // ======================================================
  const filterMap: any = {
    banho: 'banho',
    tosa: 'tosa',
    banho_tosa: 'banho e tosa',
  };

  // ======================================================
  // FILTRO BUSCA
  // ======================================================
  const filteredBySearch = services.filter((s) => {
    const busca = normalize(search);

    return (
      normalize(s?.cliente?.nome || '').includes(busca) ||
      normalize(s?.pet?.pet_name || '').includes(busca) ||
      normalize(s?.servico?.nome || '').includes(busca)
    );
  });

  // ======================================================
  // FILTRO FINAL
  // ======================================================
  const finalServices = filteredBySearch
    .filter((s) => {
      if (normalize(s?.status || '') === 'finalizado') {
        return false;
      }

      if (filter === 'todos') {
        return true;
      }

      return normalize(s?.servico?.nome || '') === filterMap[filter];
    })
    .sort((a, b) =>
      normalize(a?.pet?.pet_name || '').localeCompare(normalize(b?.pet?.pet_name || ''))
    );

  // ======================================================
  // LOADING
  // ======================================================
  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />

        <Text>Carregando serviços...</Text>
      </SafeAreaView>
    );
  }

  // ======================================================
  // RENDER
  // ======================================================
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
        keyExtractor={(item: any) => item.id_agendamento.toString()}
        renderItem={({ item }: any) => (
          <CardServico item={item} reload={loadServices} currentFilter={filter} />
        )}
        ListEmptyComponent={<Text className="mt-10 text-center">Nenhum serviço encontrado</Text>}
      />
    </SafeAreaView>
  );
}
