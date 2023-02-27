import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../config/firebaseConfig';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorForm, setErrorForm] = useState<string>("");
    const history = useHistory()
    const [present, dismiss] = useIonToast();

    const submitForm = async (e: any) => {
        e.preventDefault();

        if(email==""){
            setErrorForm("Email is required!");
            present("Register failed!",2000);
            return;
        }
        if(password==""){
            setErrorForm("Password is required!");
            present("Register failed!",2000);
            return;
        }
        if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))){
            setErrorForm("Email in not valid! Example of valid: email@host.com");
            present("Register failed!",2000);
            return;
        }
        if(password.length<6){
            setErrorForm("Password should be at least 6 characters");
            present("Register failed!",2000);
            return;
        }
        setErrorForm("");

        const res = await registerUser(email, password);
        if(res){
            history.push("/login");
            present("Register success!",2000);
            return;
        }

        setErrorForm("Email already in use!");
        present("Register failed!",2000);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-padding'>
                <IonText className='ion-text-center'>
                    <h2>Register</h2>
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
                            Register
                        </IonButton>
                    </form>
                </IonText>
                <IonCol>
                    <IonText class='ion-text-center'>
                        <h5>Already have an account? <Link to="/login">Login</Link></h5>
                    </IonText>
                </IonCol>
            </IonContent>
        </IonPage>
    );
};

export default Register;
