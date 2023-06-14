import { IonCard, IonCardHeader, IonCardTitle, IonAlert, IonCol, IonContent, IonHeader, IonImg, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { clearFollow, clearHistory, exportData } from "../service/LocalStorage";
import { useState } from "react";


export const Settings: React.FC = () => {
    const [isOpenHis, setIsOpenHis] = useState(false);
    const [isOpenFol, setisOpenFol] = useState(false);

    const clearHistoryBtn = () => {
        setIsOpenHis(true);
    }
    const clearHistoryData = () => {
        clearHistory();
    }

    const clearFollowBtn = () => {
        setisOpenFol(true);
    }
    const clearFollowData = () => {
        clearFollow();
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Settings
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard color="danger">
                    <IonCardHeader>
                        <IonCardTitle onClick={clearHistoryBtn}>
                            <h1 className="ion-text-center">Clear history</h1>
                        </IonCardTitle>
                    </IonCardHeader>
                </IonCard>
                <IonCard color="danger">
                    <IonCardHeader>
                        <IonCardTitle onClick={clearHistoryBtn}>
                            <h1 className="ion-text-center">Clear followed manga</h1>
                        </IonCardTitle>
                    </IonCardHeader>
                </IonCard>
            </IonContent>
            <IonAlert
                isOpen={isOpenHis}
                header="Are you wanna delete history?"
                message="This action will permamently delete your history."
                buttons={[
                    {
                      text: 'No',
                      role: 'cancel',
                      handler: () => {
                        
                      },
                    },
                    {
                      text: 'Yes',
                      role: 'confirm',
                      handler: () => {
                        clearHistoryData();
                      },
                    },
                  ]}
                onDidDismiss={() => setIsOpenHis(false)}
            ></IonAlert>
            <IonAlert
                isOpen={isOpenHis}
                header="Are you wanna delete followed manga?"
                message="This action will permamently delete your followed manga."
                buttons={[
                    {
                      text: 'No',
                      role: 'cancel',
                      handler: () => {
                        
                      },
                    },
                    {
                      text: 'Yes',
                      role: 'confirm',
                      handler: () => {
                        clearFollowData();
                      },
                    },
                  ]}
                onDidDismiss={() => setIsOpenHis(false)}
            ></IonAlert>
        </IonPage>
    );
}