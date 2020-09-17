import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Linking,
  Modal,
} from 'react-native';

import BackButton from '../components/BackButton';
import Spinner from 'react-native-spinkit';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const axios = require ('axios');

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    secureText: true,
    isLoading: false,
    isModal: true,
  };
  seePassword = () => {
    if (this.state.secureText) {
      return (
        <Text onPress={() => this.setState ({secureText: false})}>Lihat</Text>
      );
    } else {
      return (
        <Text onPress={() => this.setState ({secureText: true})}>Kunci</Text>
      );
    }
  };
  login = (email, password) => {
    this.setState ({isLoading: true});
    if (email != '' && password != '') {
      axios
        .post ('https://api.pondokprogrammer.com/api/student_login', {
          email: email,
          password: password,
          mobile: true,
        })
        .then (response => {
          console.log (response.data);
          if (response.data.token) {
            if (response.data.data.role == '1') {
              this.setState ({isLoading: false});
              // console.log(response.data.token + 'token') ;
              let data = {
                id: response.data.data.id,
                token: response.data.token,
                role: response.data.data.role,
              };

              AsyncStorage.setItem ('data', JSON.stringify (data));

              ToastAndroid.show (
                'Login berhasil',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              this.props.navigation.replace ('MainMentor');
            } else if (response.data.data.role == '2') {
              this.setState ({isLoading: false});
              // console.log(response.data.data.jurusan_id);

              let data = {
                id: response.data.data.id,
                token: response.data.token,
                role: response.data.data.role,
                // Jurusan_id tambahan wandi karena digunakan untuk dashboard santri
                jurusan_id: response.data.data.jurusan_id,
                email : response.data.data.email,
                email_verified_at : response.data.data.email_verified_at
              };

              AsyncStorage.setItem ('data', JSON.stringify (data));

              ToastAndroid.show (
                'Login berhasil',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              this.props.navigation.replace ('MainSantri');
            }
          } else if (response.data.status) {
            this.setState ({isLoading: false});
            console.log (response.data.status);
            ToastAndroid.show (
              response.data.status,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          } else {
            // else if (response.data.errors.email) {
            //   this.setState({isLoading: false});
            //   console.log(response.data.errors.email[0]);
            //   ToastAndroid.show(
            //     response.data.errors.email[0],
            //     ToastAndroid.SHORT,
            //     ToastAndroid.CENTER,
            //   );
            // } else if (response.data.errors.password) {
            //   this.setState({isLoading: false});
            //   console.log(response.data.errors.password[0]);
            //   ToastAndroid.show(
            //     response.data.errors.password[0],
            //     ToastAndroid.SHORT,
            //     ToastAndroid.CENTER,
            //   );
            // }
            this.setState ({isLoading: false});
            console.log (response.data);
            ToastAndroid.show (
              'Login Gagal Email atau Password Salah',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        })
        .catch (error => {
          this.setState ({isLoading: false});
          console.log (error);
          ToastAndroid.show (
            'Login Gagal Email atau Password Salah',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        });
    } else {
      this.setState ({isLoading: false});
      ToastAndroid.show (
        'Data tidak boleh ada yang kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };
  animationLoading = () => {
    if (this.state.isLoading) {
      return <Spinner visible={true} type="Wave" color="white" />;
    } else {
      return <Text style={styles.textButton}>Masuk</Text>;
    }
  };

  render () {
    const {email, password} = this.state;
    return (
      <View style={styles.container}>
        <Text style={[styles.title, {textAlign: 'center'}]}>Masuk</Text>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={text => this.setState ({email: text})}
            value={this.state.email}
            placeholderTextColor="grey"
          />
          <View style={styles.boxTextInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Kata Sandi"
              onChangeText={text => this.setState ({password: text})}
              value={this.state.password}
              placeholderTextColor="grey"
              secureTextEntry={this.state.secureText}
            />
            {this.seePassword ()}
          </View>
          <TouchableOpacity onPress= { () => this.props.navigation.navigate('LupaPassword') } style={{height : 50, width: '60%', justifyContent : 'center', alignItems : 'flex-end', marginLeft : '20%'}}>
          <Text style={{fontSize: 12}}>Lupa Password ? </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.login (email, password)}
            style={styles.button}
            activeOpacity={0.5}
            delayPressIn={10}
          >
            {this.animationLoading ()}
          </TouchableOpacity>
          <BackButton params={() => this.props.navigation.goBack ()} />
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(0,184,150)',
    margin: 30,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderBottomWidth: 1,
    borderColor: 'rgb(0,184,150)',
  },
  boxTextInput: {
    height: 40,
    width: '80%',
    borderBottomWidth: 1,
    borderColor: 'rgb(0,184,150)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: '80%',
    fontSize: 16,
    borderRadius: 3,
    padding: 10,
    backgroundColor: 'rgb(0,184,150)',
    marginTop: 20,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modal: {
    flex: 1,
  },
});
