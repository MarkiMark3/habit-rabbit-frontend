// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import { Provider } from 'react-redux'
// import { store } from './store'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// )

import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";

import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
