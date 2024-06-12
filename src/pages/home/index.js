import { useState } from 'react' // useState é um hook
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { ModalPassword } from '../../components/modal/index.js'

let charset="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?"

export function Home() {
  const [size, setSize] = useState(12) // size é o tamanho da senha a ser gerada; setSize é o novo tamanho quando o slider for alterado; 12 é o valor inicial de size
  const [passwordValue, setPasswordValue] = useState("")
  const [modalVisible, setModalVisible] = useState(false) // serve para exibir ou não exibir o modal (booleano)

  function generatePasswd() { // função que gera a senha de acordo com a quantidade de caracteres definida

    let password = "";
    for (let i=0, n = charset.length; i < size; i++) {
      password+=charset.charAt(Math.floor(Math.random()*n))
    }

    console.log(password)
    setModalVisible(true)
    setPasswordValue(password)

  }

  return(
    
    <View style={styles.container}>
      <Image source={require("../../assets/logopms.jpg")} style={styles.logo} visible={false}/>

      <Text style={styles.title}>
        {size} caracteres
      </Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={8}
          maximumValue={32}
          minimumTrackTintColor='#f00'
          thumbTintColor='#0062D1'
          value={size}
          onValueChange={(value)=>setSize(parseInt(value.toFixed(0)))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePasswd}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalPassword password={passwordValue} handleClose={ () => setModalVisible(false) }/>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex:1,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 50,
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 6,
  },
  button: {
    backgroundColor: '#0062D1',
    width: "80%",
    height: 50,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
})