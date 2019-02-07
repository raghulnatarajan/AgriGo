import React from 'react';
import { ScrollView,AsyncStorage, Button,StyleSheet,Text ,View} from 'react-native';

export default class ShareScreen extends React.Component {


  render() {
    return (
      <View style={styles.container} >
          <Button onPress={()=>{this.props.navigation.navigate("AuthLoader");AsyncStorage.clear();}} title="logout" />
          <Text>ShareScreen</Text>
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
