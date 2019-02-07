import React from "react";
import { StyleSheet, Text, View,Dimensions } from "react-native";
import {Container, Button,Content,Input,Item} from 'native-base';
import {Row,Col,Grid} from 'react-native-easy-grid';
import { MapView } from "expo";
export default class HomeScreen extends React.Component {


//initial map state
  state={focusedLocation:{
    latitude:13.150642,
    longitude:80.104115,
    latitudeDelta:0.0122,
    longitudeDelta:Dimensions.get("window").width/Dimensions.get("window").height*0.0122
  },locationChosen:false};


  //pick up a location on a map
  pickLocation = event =>{
    const coords = event.nativeEvent.coordinate;
    const {latitude,longitude} = coords;
    this.map.animateToRegion({
      ...this.state.focusedLocation,latitude:latitude,longitude:longitude
    })
    this.setState(state=>{return{ focusedLocation:{...state.focusedLocation,latitude:latitude,longitude:longitude},locationChosen:true }})

  }
  

  //get current location of the user 
  getLocationHandler = (event) =>{
    navigator.geolocation.getCurrentPosition(pos=>{
      const coords={
        nativeEvent:{
          coordinate:{latitude:pos.coords.latitude,longitude:pos.coords.longitude}
        }
      }

      this.pickLocation(coords);
    })
  }
  
  render() {

    //initialize marker
    let marker=null;
    if(this.state.locationChosen){
      marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
    }



    return (
      <Container>
         <Content style={{flex:1,borderColor:"red",borderWidth:4}} >
          <Item regular>
            <Input placeholder='Regular Textbox' />
          </Item>
        </Content>
          <MapView 
        ref={ref=>this.map=ref}
        onPress={this.pickLocation}
        style={{ flex: 10}}
        initialRegion={this.state.focusedLocation}>{marker}</MapView>
      </Container>      
    );
  }
}