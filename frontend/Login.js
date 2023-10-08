import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "./AuthContext";

export default function Login({ navigation }) {
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo1} source={require("./assets/book.png")} />
      <Text style={styles.mainTitle}>My Note</Text>
      <Text style={styles.loginTitle}>Login</Text>

      <View style={styles.view1}>
        <TextInput
          style={styles.textInput}
          placeholder="Mobile Number"
          value={getMobile}
          onChangeText={setMobile}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={getPassword}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={() => {signIn({ mobile: getMobile, password: getPassword })}}>
          <Text style={styles.loginBtnTxt}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo1: {
    height: 200,
    width: 200,
    objectFit: 'contain'
  },    
  view1: {
    marginTop: 30,
    marginBottom: 15,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#053B50",
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#053B50",
  },
  textInput: {
    height: 40,
    width: 300,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#053B50",
    borderWidth: 2,
    fontSize: 15,
  },
  loginBtn: {
    height: 40,
    width: 300,
    borderRadius: 10,
    backgroundColor: "#053B50",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
