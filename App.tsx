import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TelaListaProdutos, { Produto, produtosMock } from './TelaListaProdutos';
import TelaDetalheProduto from './TelaDetalheProduto';

export type RootStackParamList = {
  TelaListaProdutos: undefined;
  TelaDetalheProduto: { produtoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosMock);

  function adicionarProduto(novoProduto: Produto) {
    setProdutos((estadoAtual) => [...estadoAtual, novoProduto]);
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TelaListaProdutos">
          <Stack.Screen name="TelaListaProdutos" options={{ title: 'Loja Compre Bem' }}>
            {(props) => (
              <TelaListaProdutos 
                {...props} 
                produtos={produtos} 
                onAdicionarProduto={adicionarProduto} 
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="TelaDetalheProduto" options={{ title: 'Detalhes do Produto' }}>
            {(props) => <TelaDetalheProduto {...props} produtos={produtos} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}