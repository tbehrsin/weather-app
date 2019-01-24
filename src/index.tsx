
import React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import { persistor, store } from "./store";

import Application from "./components/Application";

interface IApplicationRootProps {
  persistor: any;
  store: any;
}

const ApplicationRoot = ({ persistor: applicationPersistor, store: applicationStore }: IApplicationRootProps) => (
  <Provider store={applicationStore}>
    <PersistGate loading={null} persistor={applicationPersistor} >
      <Application />
    </PersistGate>
  </Provider>
);

const root = document.getElementById("react");
render(<ApplicationRoot persistor={persistor} store={store} />, root);
