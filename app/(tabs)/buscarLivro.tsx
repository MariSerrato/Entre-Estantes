import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  Linking,
  ListRenderItem,
} from 'react-native';

interface Livro {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    infoLink?: string;
  };
}

export default function BusqueSeuLivro(): JSX.Element {
  const [busca, setBusca] = useState<string>('');
  const [resultados, setResultados] = useState<Livro[]>([]);

  async function buscarLivros(): Promise<void> {
    if (busca.trim() === '') {
      Alert.alert('Erro', 'Digite um termo para buscar.');
      return;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(busca)}`);
      const data = await response.json();

      const livros: Livro[] = (data.items || []).map((item: any) => ({
        id: item.id,
        volumeInfo: {
          title: item.volumeInfo?.title || 'Sem título',
          authors: item.volumeInfo?.authors,
          infoLink: item.volumeInfo?.infoLink,
        },
      }));

      setResultados(livros);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível buscar os livros.');
    }
  }

  const renderResultado: ListRenderItem<Livro> = ({ item }) => {
    const { title, authors, infoLink } = item.volumeInfo;

    return (
      <View style={styles.resultado}>
        <View style={{ flex: 1 }}>
          <Text style={styles.link} onPress={() => infoLink && Linking.openURL(infoLink)}>
            {title}
          </Text>
          <Text style={styles.snippet}>
            {authors ? authors.join(', ') : 'Autor desconhecido'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busque Seu Livro</Text>
      <TextInput
        style={styles.textinput}
        placeholder="Busque aqui o livro que deseja"
        placeholderTextColor="#937d62"
        value={busca}
        onChangeText={setBusca}
      />
      <Button title="Buscar" onPress={buscarLivros} color="#5C4F4B" />

      <FlatList
        data={resultados}
        renderItem={renderResultado}
        keyExtractor={(item) => item.id}
        style={styles.resultados}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefaf9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3e2925',
    marginBottom: 20,
    textAlign: 'center',
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#5C4F4B',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#5C4F4B',
  },
  resultados: {
    marginTop: 20,
  },
  resultado: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#937d62',
    marginBottom: 5,
  },
  snippet: {
    fontSize: 14,
    color: '#666',
  },
});
