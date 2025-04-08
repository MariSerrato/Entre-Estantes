import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function About() {
  return (
    <View style= { style.container}>
      <Text style = {style.text}> Faça resenhas sobre seus livros. Comente-os e seja livre para expressar sua opnião.
        Encontre pessoas que pensam como você.
      </Text>
      
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fefaf9',
  },
  text: {
    color: '#5C4F4B',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    color: '#0f4d04',
    textDecorationLine: 'underline',
  },
}
);
