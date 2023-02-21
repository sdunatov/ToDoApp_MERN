import React from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";

axios.defaults.withCredentials = true;

export const URL = process.env.MONGO_URL;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>

  );
}

export default App;