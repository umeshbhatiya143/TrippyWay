import React from 'react';
import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </PersistGate>
    </Provider>
  );
}
