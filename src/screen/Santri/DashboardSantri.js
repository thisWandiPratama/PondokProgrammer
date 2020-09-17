import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  ToastAndroid,
  Modal,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import {boxIcon} from './images';
import {styles} from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {authenticationChange} from '../../redux/action';
import Spinner from 'react-native-spinkit';
import {jurusanID} from '../../redux/action';

const axios = require ('axios');

class DashboardSantri extends React.Component {
  state = {
    modalVisible: false,
    boxIcon: boxIcon,
    refreshing: false,
    status: true,
    animationLoad: false,
    email: '',
    email_verified_at: null,
  };
  componentDidMount () {
    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButtonClick,
    // );

    AsyncStorage.getItem ('data').then (value => {
      let data = {
        id: JSON.parse (value).id,
        token: JSON.parse (value).token,
        role: JSON.parse (value).role,
        jurusan_id: JSON.parse (value).jurusan_id,
        email: JSON.parse (value).email,
        email_verified_at: JSON.parse (value).email_verified_at,
      };

      this.setState ({
        email: data.email,
        email_verified_at: data.email_verified_at,
      });

      // console.log(data.jurusan_id +' dashboard santri')

      this.props.authenticationChange (data);
      this.props.jurusanID (data);
    });
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  // handleBackButtonClick() {
  //   BackHandler.exitApp();
  //   return true;
  // }


  verifikasiEmail = () => {
    let data = this.props.authentication;
    let token = data.token;
  }


  logout = () => {
    let data = this.props.authentication;
    let token = data.token;
    let id = data.id;
    this.setState ({modalVisible: true});
    // AsyncStorage.removeItem ('data');

    fetch ('https://api.pondokprogrammer.com/api/student_logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify ({
        id: id,
      }),
    })
      .then (response => response.json ())
      .then (json => {
        if (json.status == 'success') {
          console.log (json.status);
          this.setState ({modalVisible: false});
          AsyncStorage.removeItem ('data');
          this.props.navigation.replace ('Main');
          ToastAndroid.show (
            'Anda berhasil logout akun',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
      })
      .catch (error => {
        console.log (error);
        this.setState ({modalVisible: false});
        ToastAndroid.show (
          'Network error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  };
  cautionExit = () => {
    Alert.alert (
      'Keluar Akun',
      'Apa anda yakin ingin keluar ?',
      [
        {
          text: 'Tidak',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.logout ();
          },
        },
      ],
      {cancelable: false}
    );
  };
  // Full
  // changeScreen = key => {
  //   switch (key) {
  //     case 0:
  //       this.props.navigation.navigate('DompetSaya');
  //       break;
  //     case 1:
  //       this.props.navigation.navigate('Toko');
  //       break;
  //     case 2:
  //       this.props.navigation.navigate('IDCard');
  //       break;
  //     case 3:
  //       this.props.navigation.navigate('SOP');
  //       break;
  //     case 4:
  //       this.props.navigation.navigate('Kurikulum');
  //       break;
  //     case 5:
  //       this.props.navigation.navigate('MasukKelas');
  //       break;
  //     case 6:
  //       this.props.navigation.navigate('MateriDasar');
  //       break;
  //     case 7:
  //       this.props.navigation.navigate('TugasHarian');
  //       break;
  //     case 8:
  //       this.props.navigation.navigate('MiniProject');
  //       break;
  //     case 9:
  //       this.props.navigation.navigate('VideoCheck');
  //       break;
  //     case 10:
  //       this.props.navigation.navigate('Portofolio');
  //       break;
  //     case 11:
  //       this.props.navigation.navigate('CatatanPelanggaran');
  //       break;
  //     case 12:
  //       this.props.navigation.navigate('Raport');
  //       break;
  //     case 13:
  //       this.props.navigation.navigate('ImpianSaya');
  //       break;
  //     case 14:
  //       this.cautionExit();
  //       break;
  //     default:
  //       alert('lainnya');
  //   }
  // };

  // Setengah
  changeScreen = key => {
    switch (key) {
      case 0:
        this.props.navigation.navigate ('IDCard');
        break;
      case 1:
        this.props.navigation.navigate ('SOP');
        break;
      case 2:
        this.props.navigation.navigate ('Kurikulum');
        break;
      case 3:
        this.props.navigation.navigate ('MasukKelas');
        break;
      case 4:
        this.props.navigation.navigate ('MateriDasar');
        break;
      case 5:
        this.props.navigation.navigate ('TugasHarian');
        break;
      case 6:
        this.props.navigation.navigate ('VideoCheck');
        break;
      case 7:
        this.cautionExit ();
        break;
      default:
        alert ('lainnya');
    }
  };

  onRefreshScreen = () => {
    this.getDataDiri ();
  };

  getDataDiri = () => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState ({refreshing: true, animationLoad: true});
    axios
      .get (`https://api.pondokprogrammer.com/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then (response => {
        // if (data.status || null) {
        const data = {
          id: response.data.id,
          token: token,
          role: response.data.role,
          jurusan_id: response.data.jurusan_id,
          email: response.data.email,
          email_verified_at: response.data.email_verified_at,
        };

        // console.log (data);
        AsyncStorage.setItem ('data', JSON.stringify (data));

        setTimeout (() => {
          AsyncStorage.getItem ('data').then (value => {
            let data = {
              id: JSON.parse (value).id,
              token: JSON.parse (value).token,
              role: JSON.parse (value).role,
              jurusan_id: JSON.parse (value).jurusan_id,
              email: JSON.parse (value).email,
              email_verified_at: JSON.parse (value).email_verified_at,
            };

            // console.log (data.jurusan_id + ' dashboard santri');

            this.setState ({
              email: data.email,
              email_verified_at: data.email_verified_at,
            });

            this.props.authenticationChange (data);
            this.props.jurusanID (data);
          });
        }, 1200);

        setTimeout (() => {
          this.setState ({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        }, 2000);
      })
      .catch (error => {
        console.log (error);
        ToastAndroid.show (
          'Gagal Update',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        this.setState ({
          refreshing: false,
          status: false,
          animationLoad: false,
        });
      });
  };

  render () {
    const {boxIcon} = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            ToastAndroid.show (
              'Tunggu proses sampai selesai',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalContainer}>
              <Spinner visible={true} type="Wave" color="rgb(0,184,150)" />
              <Text style={styles.textModal}>Loading</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.dashboardTemplate}>
          <Image
            source={require ('../../assets/images/banner.png')}
            style={styles.banner}
          />
          {/* {this.state.email_verified_at == null
            ? <View style={styles.TouchableOpacityStyle}>
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  Email Belum Terverifikasi
                </Text>
                <Text
                  style={{marginLeft: 10, color: 'red', fontWeight: 'bold'}}
                >
                  Klik Disini
                </Text>
              </View>
            : null} */}
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={['rgb(0,184,150)']}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefreshScreen ()}
              />
            }
          >
            <View style={styles.iconTemplates}>
              <View style={styles.dashboardTitleBox}>
                <Text style={styles.dashboardTitle}>DASHBOARD SANTRI</Text>
              </View>
              {boxIcon.map ((value, key) => {
                return (
                  <View key={key} style={styles.iconField}>
                    <TouchableOpacity
                      style={{
                        ...styles.boxIcon,
                        borderColor: `${value.color}`,
                      }}
                      onPress={() => this.changeScreen (key)}
                      delayPressIn={10}
                      activeOpacity={0.5}
                    >
                      <Icon
                        name={value.iconName}
                        size={value.size}
                        color={value.color}
                      />
                    </TouchableOpacity>
                    <Text style={styles.textIcon}>{value.title}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={{marginLeft: 10, fontSize: 10, color: 'red'}}>
              * Tarik Dari Atas Ke Bawah Untuk Reload Jurusan
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {authentication, jurusan_id} = state.reducers;
  return {authentication, jurusan_id};
};

export default connect (mapStateToProps, {
  authenticationChange,
  jurusanID,
}) (DashboardSantri);
