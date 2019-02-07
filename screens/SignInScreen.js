import React from 'react';
import { ScrollView,AsyncStorage, StyleSheet,Text ,View,Button} from 'react-native';


export default class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };


  signIn = async()=>{
     await AsyncStorage.setItem("userToken","kiruba");
    this.props.navigation.navigate("App");
  }
  
  render() {
    return (
      <View style={styles.container} >
      <Button onPress={this.signIn} title="click to signin" />
<Text>SignIn Screen</Text>
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
