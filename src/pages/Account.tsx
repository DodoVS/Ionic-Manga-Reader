import { IonButton, IonCol, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { logOut } from '../config/firebaseConfig';
import { setUserState } from '../reducers/action';

const Account: React.FC = () => {
  const history = useHistory()
  const email = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();

  const logOutBtn = async() => {
    await logOut()
    dispatch(setUserState(""));
    history.push("/")
    history.go(0);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          email === undefined && <IonText className='ion-text-center'>
            <h3>You are not login in please <Link to="/login">login here</Link>!</h3>
          </IonText>
        }
        {
          email !== undefined &&
          <IonContent>
            <IonText className='ion-text-center'>
              <h3>You are log in as: {email}</h3>
            </IonText>
              <IonButton onClick={() => logOutBtn()} expand='block' className='ion-margin' color="danger">Logout</IonButton>

          </IonContent>
        }

      </IonContent>
    </IonPage>
  );
};

export default Account;
