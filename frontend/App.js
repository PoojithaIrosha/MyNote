import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Alert } from "react-native";
import AddNote from "./AddNote";

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let user;

      try {
        user = await AsyncStorage.getItem("user");
      } catch (e) {
        console.error("Error restoring token:", e);
      }

      dispatch({ type: "RESTORE_TOKEN", token: user });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const resp = await fetch("http://localhost/mynote/login.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mobile: data.mobile,
              password: data.password,
            }),
          });
        
          if (resp.ok) {
            const data = await resp.json();
            if (data.msg === "success") {
              await AsyncStorage.setItem("user", JSON.stringify(data.user));
              dispatch({ type: "SIGN_IN", token: JSON.stringify(data.user) });
            } else {
              Alert.alert("Error", data.msg);
            }
          } else {
            console.error("Error fetching data:", resp.statusText);
            Alert.alert("Error", "Failed to fetch data");
          }
        } catch (err) {
          console.error("Error:", err);
          Alert.alert("Error", "An error occurred");
        }
        
      },
      signOut: async () => {
        AsyncStorage.removeItem("user");
        dispatch({ type: "SIGN_OUT" })
      },
      signUp: async (data) => {
        try {
          const resp = await fetch("http://localhost/mynote/register.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: data.firstName,
              lastName: data.lastName,
              mobile: data.mobile,
              password: data.password,
              userType: data.userType
            }),
          });
        
          if (resp.ok) {
            const data = await resp.json();
            if (data.msg === "success") {
              await AsyncStorage.setItem("user", JSON.stringify(data.user));
              dispatch({ type: "SIGN_IN", token: JSON.stringify(data.user) });
            } else {
              Alert.alert("Error", data.msg);
            }
          } else {
            console.error("Error fetching data:", resp.statusText);
            Alert.alert("Error", "Failed to fetch data");
          }
        } catch (err) {
          console.error("Error:", err);
          Alert.alert("Error", "An error occurred");
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken != null ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false, title: "My Note"}}
              ></Stack.Screen>
              <Stack.Screen
                name="AddNote"
                component={AddNote}
                options={{title: "Add new note"}}
              ></Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              ></Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
