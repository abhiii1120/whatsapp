import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./app.store";
import AppRoutes from "./routes/app.routes";
import useAuth from "../features/auth/hooks/useAuth";
function Main() {
  const { handleGetCurrentUser } = useAuth();

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return <AppRoutes />;
}

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
};

export default App;
