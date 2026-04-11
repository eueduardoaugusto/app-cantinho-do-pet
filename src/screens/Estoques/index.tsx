import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import Header from '@/components/Header/header';
import { FilterButton } from '@/components/Filter';
import { CardEstoque } from '@/components/ProductCard';
import FilterInput from '@/components/Filter/filterInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProduct } from '@/services/product';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function ScreenEstoque() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('todos');

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await getProduct();
      setProdutos(data || []);
    } catch (error) {
      console.log('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const filteredBySearch = produtos.filter((p) =>
    normalize(p?.nome || '').includes(normalize(search))
  );

  const finalProducts = filteredBySearch
    .filter((p) => {
      const setor = normalize(p.setor || '');

      if (filter === 'baixo') {
        return p.quantidade_estoque <= p.quantidade_min && !p.sugerir_compra;
      }

      if (filter === 'racoes') {
        return setor === 'racao' && p.quantidade_estoque > 0;
      }

      if (filter === 'acessorios') {
        return setor === 'acessorios' && p.quantidade_estoque > 0;
      }

      return true;
    })
    .sort((a, b) => {
      const setorA = normalize(a.setor || '');
      const setorB = normalize(b.setor || '');

      if (setorA !== setorB) {
        return setorA.localeCompare(setorB);
      }

      return normalize(a.nome).localeCompare(normalize(b.nome));
    });

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text>Carregando produtos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <Header />
      <Text className="p-6 text-center text-3xl font-bold">Estoque</Text>

      <FilterInput placeholder="Pesquisar produtos..." value={search} onChangeText={setSearch} />

      <View className="mb-4 flex-row justify-center gap-2">
        <FilterButton
          title="Todos"
          active={filter === 'todos'}
          onPress={() => setFilter('todos')}
        />
        <FilterButton
          title="Rações"
          active={filter === 'racoes'}
          onPress={() => setFilter('racoes')}
        />
        <FilterButton
          title="Acessórios"
          active={filter === 'acessorios'}
          onPress={() => setFilter('acessorios')}
        />
        <FilterButton
          title="Enviar Alerta"
          active={filter === 'baixo'}
          onPress={() => setFilter('baixo')}
        />
      </View>

      <FlatList
        data={finalProducts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <CardEstoque item={item} currentFilter={filter} reload={loadProducts} />
        )}
        ListEmptyComponent={<Text className="mt-10 text-center">Nenhum produto encontrado</Text>}
      />
    </SafeAreaView>
  );
}
