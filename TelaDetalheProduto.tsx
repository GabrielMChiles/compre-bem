import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Produto } from './TelaListaProdutos';

// Contrato estrito: A tela exige o route (com o ID) e a lista global de produtos
type Props = {
  route: any; // O ideal é tipar com RouteProp, mas manteremos o foco na injeção de dados
  produtos: Produto[];
};

export default function TelaDetalheProduto({ route, produtos }: Props) {
  const { produtoId } = route.params;
  
  // Agora a busca é feita na base de dados em memória (estado global), não no mock estático
  const produto = produtos.find((p) => p.id === produtoId);

  // Programação Defensiva (Null Pointer Defense)
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
      <View style={styles.cabecalho}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>{produto.preco}</Text>
      </View>
      
      {/* Exibindo o novo campo adicionado no exercício */}
      <View style={styles.badgeEstoque}>
        <Text style={styles.textoEstoque}>Em estoque: {produto.estoqueDisponivel} unidades</Text>
      </View>

      <Text style={styles.descricao}>
        Descrição mockada do produto. O detalhe visual está encapsulado nesta tela e reflete os dados do ID {produto.id}. Em um sistema real, essas informações viriam do banco de dados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  containerCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imagemDestaque: { width: '100%', height: 250, borderRadius: 12, marginBottom: 20, resizeMode: 'cover' },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  nome: { flex: 1, fontSize: 22, fontWeight: 'bold', color: '#1B3A5C', marginRight: 10 },
  preco: { fontSize: 22, fontWeight: '900', color: '#2E7D32' },
  badgeEstoque: { alignSelf: 'flex-start', backgroundColor: '#E8F6F3', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, marginBottom: 16 },
  textoEstoque: { color: '#0E6655', fontWeight: 'bold', fontSize: 14 },
  descricao: { fontSize: 16, color: '#4A4A4A', lineHeight: 24 },
  erroTexto: { fontSize: 18, color: '#E74C3C', fontWeight: 'bold' }
});