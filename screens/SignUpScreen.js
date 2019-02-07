import React from 'react';
import { ScrollView,AsyncStorage, StyleSheet,Text ,View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class SignUpScreen extends React.Component {

  render() {
    return (
      <View style={styles.container} >
<Text>SignUp Screen</Text>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
