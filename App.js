import React, {useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, FlatList, ActivityIndicator, Keyboard } from 'react-native';
import firebase from "./src/firebaseConection";
import * as Animatable from 'react-native-animatable';

import Listagem from "./src/Listagem";

console.disableYellowBox = true;

export default function App(){

  const BotaoAnimado = Animatable.createAnimatableComponent(TouchableOpacity);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  async function CriarConta(){
      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then( (value) => {
        alert('Bem-vindo: ' + value.user.email);
        setUser(value.user.email)
      }).catch( (error) => {

          alert('Ops, algo deu errado')
          return;
        
      })

      setEmail('');
      setPassword('');
      Keyboard.dismiss();
  }

  async function Logout(){
    await firebase.auth().signOut();
    setUser('');
    alert('Saiu com sucesso')
  }

  return(
    <View style={styles.container}> 
      <StatusBar hidden />
      <View style={styles.areaLogin}>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 20}}>Criar conta</Text>
        <Text style={styles.titulo}>Email</Text>
        <TextInput
        placeholder="Insira seu melhor email"
        onChangeText={ (texto) => setEmail(texto)}
        value={email}
        style={styles.inputEmail}
        />

        <Text style={styles.titulo}>Senha</Text>
        <TextInput
        placeholder="Crie uma senha"
        onChangeText={ (texto) => setPassword(texto)}
        value={password}
        style={styles.inputPassword}
        />

        <BotaoAnimado style={styles.botao} animation={'shake'} duration={2500} onPress={CriarConta}>
          <Text 
          style={{color: 'white', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          fontSize: 18}}
          >
            Logar
          </Text>
          </BotaoAnimado>

      </View>

      {user.length > 0 ? (
      <View style={{alignItems: 'center', marginTop: 50}}>
      <Text>
        {user}
      </Text>
      <TouchableOpacity style={styles.botao} onPress={Logout}>
      <Text 
          style={{color: 'white', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          fontSize: 18}}
          >
            Deslogar</Text>
      </TouchableOpacity>
      </View>) :
      (
        <Text>Nenhum usuario logado</Text>
      )
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#3EDCE8'
  },
  areaLogin:{
    alignItems: 'center',
    width: '90%',
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: '#f9f9f9'
  },
  inputEmail:{
    width: '90%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    marginBottom: 20,
  },
  inputPassword:{
    width: '90%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
  },
  botao:{
    width: 100,
    height: 40,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#000'
  },
  titulo:{
    width: '90%',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'left'
  }
})