import { IonCard, IonCol, IonContent, IonHeader, IonImg, IonItem, IonList, IonPage, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const History: React.FC<any> = () => {
    const [historyList, setHistoryList] = useState<any[]>([]);
    const history = useHistory();

    useEffect(() => {
        var history = localStorage.getItem("ReadHistory");
        if (history != null) {
            var newList: any[] = [];
            var historyL = JSON.parse(history);
            for (let i = 0; i < historyL.length; i++) {
                const element = historyL[i].chapters;
                let latestChapter: any;
                for (let j = 0; j < element.length; j++) {
                    if (latestChapter == null)
                        latestChapter = element[j];
                    var dateO = new Date(latestChapter.date);
                    var dateE = new Date(element[j].date)
                    if (dateO.getTime() < dateE.getTime()){
                        latestChapter = element[j];
                    }  
                }
                let newElement = {
                    id: historyL[i].mangaid,
                    title: historyL[i].title,
                    cover: historyL[i].cover,
                    chapter: latestChapter.chapter,
                    date: new Date(latestChapter.date)
                }
                newList.push(newElement);
            }
            newList.sort((a,b) => b.date.getTime() - a.date.getTime());
            setHistoryList(newList);
        }
    }, []);

    const goToManga = (id: string) => {
        var link: string = "/manga/" + id
        history.push(link);
        history.go(0)
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Reading History
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonList>
                        {
                            historyList && historyList.map((result: any) => {
                                return (
                                    <IonItem key={result.id}>
                                        <IonRow>

                                        </IonRow>
                                        <IonCol sizeXl="1" size="4">
                                            <IonImg src={result.cover+".256.jpg"}></IonImg>
                                        </IonCol>
                                        <IonCol>
                                        <IonText>
                                            <h3 onClick={() => goToManga(result.id)}>{result.title}</h3>
                                            <p>Chapter {result.chapter}</p>
                                        </IonText>
                                        </IonCol>
                                        
                                        
                                    </IonItem>
                                );
                            })
                        }

                        {
                            historyList.length == 0 && <IonText className="ion-text-center">
                                <h1>History is empty!</h1>
                                </IonText>
                        }
                    </IonList>
                </IonCard>
            </IonContent>

        </IonPage>
    );
}