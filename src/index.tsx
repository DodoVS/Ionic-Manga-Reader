import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import { createStore } from 'redux';
import OneSignal from 'onesignal-cordova-plugin';

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);



function OneSignalInit(): void {
  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("<Your ID>");
  OneSignal.setNotificationOpenedHandler(function(jsonData: any) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });
}

OneSignalInit();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
