// App.js
import React from 'react';
import Navigation from './navigations/Navigation';
import  {Store , persistor } from './Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
        < Navigation />
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

