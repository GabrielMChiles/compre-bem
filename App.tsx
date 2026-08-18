import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaListaProdutos from './TelaListaProdutos';
import TelaDetalheProduto from './TelaDetalheProduto';

export type RootStackParamList = {
  TelaListaProdutos: undefined;
  TelaDetalheProduto: { produtoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaListaProdutos">
        <Stack.Screen 
          name="TelaListaProdutos" 
          component={TelaListaProdutos} 
          options={{ title: 'Loja Compre Bem' }} 
        />
        <Stack.Screen 
          name="TelaDetalheProduto" 
          component={TelaDetalheProduto} 
          options={{ title: 'Detalhes do Produto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}