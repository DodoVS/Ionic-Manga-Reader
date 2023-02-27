import { IonCard, IonCol, IonContent, IonHeader, IonImg, IonItem, IonList, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const FollowedManga: React.FC  = () => {
    const [followeManga, setFolloweManga] = useState<any[]>([]);
    const history = useHistory();

    useEffect(() => {
        var followed = localStorage.getItem("FollowManga");
        if(followed != null){
            setFolloweManga(JSON.parse(followed));
        }
    }, []);

    const clickManga = (id: string) => {
        var link: string = "/manga/" + id
        history.push(link);
        history.go(0)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Followed Manga
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonList>
                        {
                            followeManga && followeManga.map((result: any) => {
                                return (
                                    <IonItem key={result.id}>
                                        <IonCol sizeXl="1" size="4">
                                            <IonImg src={result.cover}></IonImg>
                                        </IonCol>
                                        <IonCol>
                                        <IonText onClick={() => clickManga(result.id)}>
                                            <h3>{result.title}</h3>
                                        </IonText>
                                        </IonCol>
                                        
                                        
                                    </IonItem>
                                );
                            })
                        }

                        {
                            followeManga.length == 0 && <IonText className="ion-text-center">
                                <h1>There isn't any manga! Try to search for a new one!</h1>
                                </IonText>
                        }
                    </IonList>
                </IonCard>
            </IonContent>

        </IonPage>
    );
}