import React from "react";
import { StyleSheet, Text, View,Dimensions } from "react-native";
import axios from 'axios';
import { Container, Header, Content, Form,Button, Item, Picker,Input ,DatePicker,Icon, Label, Left} from 'native-base';

import {Row,Col,Grid} from 'react-native-easy-grid';
export default class HomeScreen extends React.Component {
    state = {
        selected2: undefined,
      date: new Date(),
          machineryName:undefined,
          phoneNo:"",
          address: "",
          Acre:"",
          status:""
      };

    constructor(props) {
        super(props);
       
        this.setDate = this.setDate.bind(this);
        this.handleSubmitRequest=this.handleSubmitRequest.bind(this);
      }

      setDate(newDate) {
        this.setState({ date:newDate });
      }

      onValueChange2(value) {
        this.setState({
         machineryName:value
        });
      }


      async handleSubmitRequest(){
        const req = await axios.post("https://agrigo.herokuapp.com/api/book",this.state);
        if(req){
            this.setState({status:"success"});
        }
      }
      



  render() {
    return (
        <Container style={{flex:1}} >
       
        <Content>
          <Form>

       
         <View style={{margin:20}} >
            {/**selct machinery */}
            <View>
            <Label><Text  style={{fontWeight:"800"}}>Select Machinery</Text></Label>
         <Item picker >
           <Picker
             mode="dropdown"
             iosIcon={<Icon name="arrow-down" />}
             style={{ width: undefined }}
             placeholder="Select your SIM"
             placeholderStyle={{ color: "#bfc6ea" }}
             placeholderIconColor="#007aff"
             selectedValue={this.state.machineryName}
             onValueChange={(e)=>this.onValueChange2.bind(this)}
           >
             <Picker.Item label="Wallet" value="key0" />
             <Picker.Item label="ATM Card" value="key1" />
             <Picker.Item label="Debit Card" value="key2" />
             <Picker.Item label="Credit Card" value="key3" />
             <Picker.Item label="Net Banking" value="key4" />
           </Picker>
         </Item>

         {/**select date */}
                <View style={{marginTop:20}} >
                        
                                <Content>
                                    <Label><Text style={{fontWeight:"800"}} >Select Date</Text></Label>
                        <DatePicker
                            defaultDate={new Date(2018, 4, 4)}
                            minimumDate={new Date(2018, 1, 1)}
                            maximumDate={new Date(2018, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select date"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={this.setDate}
                            disabled={false}
                            />
                            <Text>
                            Date: {this.state.Acre}
                            </Text>
                        </Content>


                            {/**Enter Acre */}
                            <View style={{marginTop:20}} >
                            <Label><Text style={{fontWeight:"800"}} >Acre</Text></Label>
                            <Item >
                            <Input onChange={(e)=>{this.setState({Acre:e.target.value})}} /></Item>
                            </View>


                            <View>
                            <Button onPress={this.handleSubmitRequest} block>
                            <Text style={{color:"white"}} >Book Request</Text>
                            </Button>
                            </View>





                </View>


                 
           

            </View>
         </View>
         
            
         
          </Form>
        </Content>
      </Container>     
    );
  }
}