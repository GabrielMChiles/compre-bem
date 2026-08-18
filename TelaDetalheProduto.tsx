import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { produtosMock } from './TelaListaProdutos';

export default function TelaDetalheProduto({ route }: any) {
  const { produtoId } = route.params;
  const produto = produtosMock.find((p) => p.id === produtoId);

  if (!produto) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.erroTexto}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={produto.imagem} style={styles.imagemDestaque} />
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>{produto.preco}</Text>
      <Text style={styles.descricao}>
        Esta é uma descrição mockada do produto. O detalhe visual está encapsulado nesta tela e reflete os dados do ID {produto.id}.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  containerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imagemDestaque: { width: '100%', height: 200, borderRadius: 12, marginBottom: 20, resizeMode: 'cover' },
  nome: { fontSize: 24, fontWeight: 'bold', color: '#1B3A5C', marginBottom: 8 },
  preco: { fontSize: 20, fontWeight: '600', color: '#2E7D32', marginBottom: 16 },
  descricao: { fontSize: 16, color: '#4A4A4A', lineHeight: 24 },
  erroTexto: { fontSize: 18, color: '#E74C3C', fontWeight: 'bold' }
});