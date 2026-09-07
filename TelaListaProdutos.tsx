import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Keyboard, ImageSourcePropType, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface Produto {
  id: string;
  nome: string;
  preco: string;
  imagem: ImageSourcePropType;
  estoqueDisponivel: number;
}

export const produtosMock: Produto[] = [
  { id: '1', nome: 'Cadeira Confort Plus', preco: 'R$ 349,90', imagem: require('./assets/produto-cadeira.png'), estoqueDisponivel: 10 },
  { id: '2', nome: 'Mesa para Escritório Compacta', preco: 'R$ 589,00', imagem: require('./assets/produto-mesa.jpg'), estoqueDisponivel: 5 },
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
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('TelaDetalheProduto', { produtoId: produto.id })} activeOpacity={0.8}>
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

type Props = {
  navigation: any;
  produtos: Produto[];
  onAdicionarProduto: (produto: Produto) => void;
};

export default function TelaListaProdutos({ navigation, produtos, onAdicionarProduto }: Props) {
  const [inputBusca, setInputBusca] = useState('');
  const [termoDebounced, setTermoDebounced] = useState('');
  
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [erro, setErro] = useState('');
  
  const inputPrecoRef = useRef<TextInput>(null);
  const inputEstoqueRef = useRef<TextInput>(null);

  useEffect(() => {
    const handler = setTimeout(() => setTermoDebounced(inputBusca), 400);
    return () => clearTimeout(handler);
  }, [inputBusca]);

  const produtosFiltrados = useMemo(() => {
    if (!termoDebounced.trim()) return produtos;
    const buscaNorm = termoDebounced.trim().toLowerCase();
    return produtos.filter(p => p.nome.toLowerCase().includes(buscaNorm));
  }, [termoDebounced, produtos]);

  function validarESalvar() {
    if (nome.trim() === '') {
      setErro('O nome não pode ficar vazio.');
      return;
    }
    
    const precoNumerico = Number(preco.trim().replace(',', '.'));
    if (preco.trim() === '' || isNaN(precoNumerico) || precoNumerico <= 0) {
      setErro('O preço precisa ser um número maior que zero (ex.: 89,90).');
      return;
    }

    const estoqueNumerico = Number(estoque);
    if (estoque.trim() === '' || !Number.isInteger(estoqueNumerico) || estoqueNumerico < 0) {
      setErro('O estoque deve ser um número inteiro válido, maior ou igual a zero.');
      return;
    }

    onAdicionarProduto({
      id: Date.now().toString(),
      nome,
      preco: `R$ ${precoNumerico.toFixed(2).replace('.', ',')}`,
      estoqueDisponivel: estoqueNumerico,
      imagem: require('./assets/produto-suporte.avif'), 
    });

    setNome('');
    setPreco('');
    setEstoque('');
    setErro('');
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <View style={styles.container}>
        
        <View style={styles.cadastroContainer}>
          <TextInput
            style={styles.inputCadastro}
            placeholder="Nome do produto"
            value={nome}
            onChangeText={setNome}
            returnKeyType="next"
            onSubmitEditing={() => inputPrecoRef.current?.focus()}
          />
          <TextInput
            ref={inputPrecoRef}
            style={styles.inputCadastro}
            placeholder="Preço (ex.: 89,90)"
            value={preco}
            onChangeText={setPreco}
            keyboardType="decimal-pad"
            returnKeyType="next"
            onSubmitEditing={() => inputEstoqueRef.current?.focus()}
          />
          <TextInput
            ref={inputEstoqueRef}
            style={styles.inputCadastro}
            placeholder="Estoque inicial (ex: 10)"
            value={estoque}
            onChangeText={setEstoque}
            keyboardType="number-pad"
            returnKeyType="done"
            onSubmitEditing={validarESalvar}
          />
          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
          <TouchableOpacity style={styles.botaoCadastro} onPress={validarESalvar}>
            <Text style={styles.textoBotao}>Cadastrar produto</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar produtos..."
          value={inputBusca}
          onChangeText={setInputBusca}
        />
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProdutoItem produto={item} navigation={navigation} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.textoVazio}>Nenhum produto encontrado.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cadastroContainer: { marginBottom: 20, backgroundColor: '#FFF', padding: 16, borderRadius: 8, elevation: 2 },
  inputCadastro: { height: 45, borderBottomWidth: 1, borderBottomColor: '#CCC', marginBottom: 10, fontSize: 16 },
  botaoCadastro: { backgroundColor: '#1B3A5C', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  erro: { color: '#C62828', marginBottom: 8, fontSize: 14, fontWeight: '500' },
  inputBusca: { height: 50, backgroundColor: '#FFF', borderRadius: 8, paddingHorizontal: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E0E0E0', fontSize: 16 },
  textoVazio: { textAlign: 'center', marginTop: 24, fontSize: 16, color: '#7F8C8D' },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, padding: 12, backgroundColor: '#FFF', borderRadius: 8, elevation: 2 },
  imagem: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#1B3A5C' },
  preco: { fontSize: 15, fontWeight: '600', color: '#2E7D32', marginTop: 4 },
  estoqueDisponivel: { fontSize: 13, fontWeight: '500', color: '#7F8C8D', marginTop: 4 },
  controles: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantidade: { marginHorizontal: 16, fontSize: 16, fontWeight: 'bold' }
});