import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, accessibility, search ,reload } from 'ionicons/icons';
import Manga from './pages/Manga';
import Chapter from './pages/Chapter';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Search from './pages/Search';
import { History } from './pages/History';
import { FollowedManga } from './pages/FollowedManga';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect } from 'react';
import {getCurrentUser} from './config/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUserState } from './reducers/action';
import OneSignal from 'onesignal-cordova-plugin';

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser().then((user:any) =>{
      if(user){
        dispatch(setUserState(user.email))
      }
    })
  }, [])
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/history">
              <History />
            </Route>
            <Route exact path="/followed">
              <FollowedManga />
            </Route>
            <Route path="/manga/:id" exact>
              <Manga />
            </Route>
            <Route path="/manga/:id/chapter/:idChapter" exact>
              <Chapter />
            </Route>
            <Route exact path="/">
              <Redirect to="/followed" />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/account">
              <Account />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="followed" href="/followed">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="history" href="/history">
              <IonIcon icon={reload} />
              <IonLabel>History</IonLabel>
            </IonTabButton>
            <IonTabButton tab="search" href="/search">
              <IonIcon icon={search} />
              <IonLabel>Search</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
              <IonIcon icon={accessibility} />
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}


export default App;
