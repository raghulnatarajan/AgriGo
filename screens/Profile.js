import React from "react";
import { ScrollView, AsyncStorage, StyleSheet, Text, View } from "react-native";
import { Label, Icon, Item, Input, Textarea, Button } from "native-base";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: "",
        address: "",
        phoneNo: ""
      }
    };
    this.onValueChangeName = this.onValueChangeName.bind(this);
    this.onValueChangeAddress = this.onValueChangeAddress.bind(this);
    this.onValueChangeNumber = this.onValueChangeNumber.bind(this);

    this._handleAdd = this._handleNext.bind(this);
  }

  onClickNext() {
    this.props.navigation.navigate("Home");
  }

  onValueChangeName(e) {
    let state = { ...this.state };
    state.value.name = e;
    this.setState({ state });
  }

  onValueChangeAddress(e) {
    let state = { ...this.state };
    state.value.address = e;
    this.setState({ state });
  }

  onValueChangeNumber(e) {
    let state = { ...this.state };
    state.value.phoneNo = e;
    this.setState({ state });
  }

  _handleNext = async value => {
    let token = await AsyncStorage.getItem("jwt");
    const data = {
      name: this.state.value.name,
      address: this.state.value.address,
      phoneNo: this.state.value.phoneNo
    };
    console.log(data);
    const json = JSON.stringify(data);
    fetch("https://agrigo.herokuapp.com/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${token}`
      },
      body: json
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(res.message);
          // Redirect to home screen
          this.props.navigation.navigate("Home");
        }
      })
      .catch(() => {
        alert("There was an error logging in.");
      })
      .done();
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Button onPress={()=>{this.props.navigation.navigate("AuthLoader");AsyncStorage.clear();}} title="logout" /> */}

        <View style={{ flex: 4 }}>
          <View>
            <Label style={styles.inputStyles}>Enter Name</Label>
            <Item style={{ margin: 10 }} regular>
              <Input
                onChangeText={this.onValueChangeName.bind(this)}
                placeholder="Name"
              />
            </Item>
          </View>

          <View>
            <Label style={styles.inputStyles}>Enter Phone No</Label>
            <Item style={{ margin: 10 }} regular>
              <Input
                onChangeText={this.onValueChangeNumber.bind(this)}
                placeholder="Phone No"
                keyboardType="number-pad"
              />
            </Item>
          </View>

          <View>
            <Label style={styles.inputStyles}>Enter Address</Label>
            <Textarea
              onChangeText={this.onValueChangeAddress.bind(this)}
              rowSpan={5}
              bordered
              placeholder="Address"
            />
          </View>
        </View>

        <View style={{ marginTop: 50, flex: 1 }}>
          <Button
            onPress={this._handleNext.bind(this)}
            style={{ alignSelf: "flex-end", paddingHorizontal: 30 }}
          >
            <Text style={{ color: "white" }}>Next</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    margin: 20,
    backgroundColor: "#fff"
  },
  inputStyles: {
    fontFamily: "monserrat-m",
    margin: 5
  }
});
