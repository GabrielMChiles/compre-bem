import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, FlatList, ImageSourcePropType } from 'react-native';

export interface Produto {
  id: string;
  nome: string;
  preco: string;
  imagem: ImageSourcePropType;
  estoqueDisponivel: number;
}

export const produtosMock: Produto[] = [
  { id: '1', nome: 'Cadeira Confort Plus', preco: 'R$ 349,90', imagem: require('./assets/produto-cadeira.png'), estoqueDisponivel: 10 },
  { id: '2', nome: 'Mesa para Escritório Compacta', preco: 'R$ 589,00', imagem: require('./assets/produto-mesa.jpg'), estoqueDisponivel: 10 },
];

function ProdutoItem({ produto, navigation }: { produto: Produto; navigation: any }) {
  const [favorito, setFavorito] = useState(false);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(0);

  const adicionarItem = () => {
    if (quantidadeSelecionada < produto.estoqueDisponivel) {
      setQuantidadeSelecionada(quantidadeSelecionada + 1);
    }
  };

  const removerItem = () => {
    if (quantidadeSelecionada > 0) {
      setQuantidadeSelecionada(quantidadeSelecionada - 1);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => navigation.navigate('TelaDetalheProduto', { produtoId: produto.id })}
      activeOpacity={0.8}
    >
      <Image source={produto.imagem} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>{produto.preco}</Text>
        <Text style={styles.estoqueDisponivel}>Em estoque: {produto.estoqueDisponivel}</Text>
        <View style={styles.controles}>
          <Button title=" - " onPress={removerItem} /> 
          <Text style={styles.quantidade}>{quantidadeSelecionada}</Text>
          <Button title=" + " onPress={adicionarItem} />
        </View>
      </View>
      <Button title={favorito ? '♥' : '♡'} onPress={() => setFavorito(!favorito)} />
    </TouchableOpacity>
  );
}

export default function TelaListaProdutos({ navigation }: any) {
  return (
    <View style={styles.container}>
      <FlatList
        data={produtosMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProdutoItem produto={item} navigation={navigation} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, padding: 12, backgroundColor: '#FFF', borderRadius: 8, elevation: 2 },
  imagem: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#1B3A5C' },
  preco: { fontSize: 15, fontWeight: '600', color: '#2E7D32', marginTop: 4 },
  estoqueDisponivel: { fontSize: 13, fontWeight: '500', color: '#7F8C8D', marginTop: 4 },
  controles: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantidade: { marginHorizontal: 16, fontSize: 16, fontWeight: 'bold' }
});