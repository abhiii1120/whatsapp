import React from "react";
import { Provider } from "react-redux";
import { store } from "./app.store";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <div>
          <h1>whatsapp clone</h1>
        </div>
      </Provider>
    </>
  );
};

export default App;
