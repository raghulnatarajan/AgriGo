import React from "react";
import Book from '../components/bookingForm';
import {View} from 'react-native';
import {Container, Button,Content,Input,Item} from 'native-base';

export default class HomeScreen extends React.Component {


  render() {
    return (
<View style={{flex:1}}>
  <Container>
  <Book/>
  </Container>
  </View>      
    );
  }
}