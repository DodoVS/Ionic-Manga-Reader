import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../config/firebaseConfig';
import { setUserState } from '../reducers/action';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorForm, setErrorForm] = useState<string>("");
    const [present, dismiss] = useIonToast();
    const history = useHistory();
    const dispatch = useDispatch();

    const submitForm = async (e:any) => {
        e.preventDefault();
        const res = await loginUser(email, password);
        if(res){
            present('Login success',2000);
            dispatch(setUserState(email));
            history.push("/account");
            return;
        }
        present('Login failed',2000);
        setErrorForm("Invalid email or password!");
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-padding'>
                <IonText className='ion-text-center'>
                    <h2>Login</h2>
                    <form onSubmit={submitForm}>
                        {
                            errorForm != "" &&
                            <IonItem>
                                <IonText color="danger" className='ion-text-center'>
                                    <h5>{errorForm}</h5>
                                </IonText>
                            </IonItem>
                        }
                        <IonItem>
                            <IonLabel position='floating'>Email</IonLabel>
                            <IonInput value={email} name='email' onIonChange={e => setEmail(e.detail.value!)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position='floating'>Hasło</IonLabel>
                            <IonInput value={password} type='password' name='password' onIonChange={e => setPassword(e.detail.value!)} />
                        </IonItem>
                        <IonButton expand='block' type='submit' className='ion-margin-top'>
                            Login
                        </IonButton>
                    </form>
                </IonText>
                <IonCol>
                    <IonText className='ion-text-center'>
                        <h5>New here? <Link to="/register">Sing up</Link></h5>
                    </IonText>
                </IonCol>
            </IonContent>
        </IonPage>
    );
};

export default Login;
