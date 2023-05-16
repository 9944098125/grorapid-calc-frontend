import { Provider } from "react-redux";
import "./App.css";
import BaseRoutes from "./Routing/BaseRoutes";
import store from "./Redux/Store/Store";

function App() {
  return (
    <Provider store={store}>
      <BaseRoutes />
    </Provider>
  );
}

export default App;
