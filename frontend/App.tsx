import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Route from "./src/navigation/main";

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}