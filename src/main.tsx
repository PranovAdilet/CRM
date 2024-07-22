import React from 'react'
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {store} from "@/shared/store";

import App from './App.tsx'
import "./shared/scss/index.scss"
import './shared/localization/i18n.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
