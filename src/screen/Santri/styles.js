import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#fff'
  },
  banner: {
    marginTop : 10,
    height: '40%',
    width: '100%',
  },
  dashboardTemplate: {
    flex: 1,
  },
  iconTemplates: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 15,
  },
  iconField: {
    height: 115,
    width: windowWidth / 4,
    alignItems: 'center',
  },
  boxIcon: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(0, 184, 150)',
  },
  textIcon: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  dashboardTitleBox: {
    width: '100%',
    margin: 15,
  },
  dashboardTitle: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: 100,
    width: 100,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModal: {
    color: 'grey',
    marginTop: 5,
  },
  TouchableOpacityStyle: {
    flex : 1,
    position: 'absolute',
    flexDirection : 'row',
    margin : 5,
    backgroundColor : 'rgba(125,125,135,0.8)',
    height : 25,
    width : '70%',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 20
  },
});
