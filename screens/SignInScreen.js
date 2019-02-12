import React from "react";
import { ScrollView, AsyncStorage, StyleSheet, Text, View } from "react-native";
import {
  Label,
  Icon,
  Item,
  Textarea,
  Button,
  Input,
  Form,
  Container
} from "native-base";
// import { Input, Button } from "react-native-elements";
// import { RkTextInput } from "react-native-ui-kitten";
export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: "",
        password: ""
      }
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onValueChangePassword = this.onValueChangePassword.bind(this);
    this._handleAdd = this._handleAdd.bind(this);
  }

  onValueChange(e) {
    // let acre = e.toString();
    let state = { ...this.state };
    state.value.username = e;
    this.setState({ state });
  }

  onValueChangePassword(e) {
    let state = { ...this.state };
    state.value.password = e;
    this.setState({ state });
  }

  _handleAdd = value => {
    // const value = this.refs.form.getValue();
    // If the form is valid...

    const data = {
      username: this.state.value.username,
      password: this.state.value.password
    };
    console.log(data);
    // Serialize and post the data
    const json = JSON.stringify(data);
    fetch("https://agrigo.herokuapp.com/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          AsyncStorage.setItem("jwt", res.token);
          alert(`Success! You may now access protected content.`);
          // Redirect to home screen
          this.props.navigation.navigate("Profile");
        }
      })
      .catch(() => {
        alert("There was an error logging in.");
      })
      .done();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.deliverideStyle}>
          <Text style={{ fontSize: 40 }}>Deliveride</Text>
        </View>
        <View style={{ flex: 3, borderColor: "green", borderWidth: 4 }}>
          <View
            style={{
              ...styles.generalCenter,
              paddingHorizontal: 20,
              paddingVertical: 20
            }}
          >
            <Item regular>
              <Input
                onChangeText={this.onValueChange.bind(this)}
                placeholder="Username"
              />
            </Item>
            <Item style={{ marginTop: 20 }} regular>
              <Input
                onChangeText={this.onValueChange.bind(this)}
                placeholder="Password"
              />
            </Item>
          </View>
        </View>
        <View style={{ flex: 2, borderColor: "blue", borderWidth: 4 }}>
          <Button style={{ marginHorizontal: 20 }} block>
            <Text>Login</Text>
          </Button>
          <View style={{ marginTop: 10 }}>
            <Button style={{ marginHorizontal: 20 }} block>
              <Text>SignUp</Text>
            </Button>
          </View>
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
  },
  deliverideStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3
  },
  generalCenter: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});
