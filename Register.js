import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "./AuthContext";

export default function Register({ navigation }) {
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [items, setItems] = useState([]);

  const { signUp } = React.useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost/mynote/get-user-types.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.msg == "success") {
          setItems(data.userTypes);
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo1} source={require("./assets/book.png")} />
      <Text style={styles.mainTitle}>My Note</Text>
      <Text style={styles.loginTitle}>Register</Text>

      <View style={styles.view1}>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          value={getFirstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          value={getLastName}
          onChangeText={setLastName}
        />

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

        <DropDownPicker
          style={styles.dropdown}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            console.log(value);
            signUp({
              firstName: getFirstName,
              lastName: getLastName,
              mobile: getMobile,
              password: getPassword,
              userType: value,
            });
          }}
        >
          <Text style={styles.loginBtnTxt}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Already registered? Login here</Text>
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
    objectFit: "contain",
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
  dropdown: {
    width: 300,
    marginBottom: 10,
    borderColor: "#053B50",
    borderWidth: 2,
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
