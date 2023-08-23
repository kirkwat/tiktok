import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";

import { store } from "./src/store/store";
import { increment, decrement } from "./src/store/slices/counterSlice";

export default function App() {
  return (
    <Provider store={store}>
      <CounterComponent />
    </Provider>
  );
}

function CounterComponent() {
  const dispatch = useDispatch();

  // Replace 'counter' with whatever key you used in your rootReducer
  const count = useSelector((state) => state.counter.value);

  return (
    <View style={styles.container}>
      <Text>{`Count: ${count}`}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
