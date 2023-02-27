import { IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Chapter.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface IChapter {
    id: string,
    idChapter: string
}

const Chapter: React.FC = () => {
    const [pages, setPages] = useState<string[]>([]);
    const [data, setData] = useState<string[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(true);
    const [lastText, setLastText] = useState<string>();
    let params: IChapter = useParams();

    useEffect(() => {
        const id = params.idChapter;
        axios({
            method: 'get',
            url: "https://api.mangadex.org/at-home/server/" + id,
        }).then((response) => {
            let array: Array<string> = [];
            let pagesn: Array<string> = [];
            const link = response.data.baseUrl + "/data-saver/" + response.data.chapter.hash + "/";
            const max = 4
            response.data.chapter.dataSaver.map((element: string, i: Number) => {
                const page = link + element;
                array.push(page);
                if (i < max) {
                    pagesn.push(page)
                }
            });
            setPages(array);
            setData([
                ...data,
                ...pagesn
            ]);
            setInfiniteDisabled(false);
        });
    }, []);


    const loadData = (e: any) => {
        if (data.length == pages.length) {
            setInfiniteDisabled(true);
            setLastText("The end of chapter");
        }
        let newData: string[] = [];
        const max = 4;

        pages.map((element: string, i: Number) => {
            if (i > data.length - 1 && i < data.length + max) {
                newData.push(element);
            }
        });

        setData([
            ...data,
            ...newData
        ])
        e.target.complete();
    }

    const imgError = (link: string, img: any) => {
        console.log(img.target);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Read Chapter</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {
                        data.map((element: string, i) => {
                            return (
                                <IonRow key={i} className="page-img ion-justify-content-center">
                                    <IonImg onIonError={(e) => imgError(element, e)} src={element} />
                                </IonRow>
                            )
                        })
                    }
                </IonList>
                <IonInfiniteScroll onIonInfinite={loadData} threshold="100px" disabled={isInfiniteDisabled}>
                    <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data..." />
                </IonInfiniteScroll>
                <IonText>
                    <h5 className='ion-text-center'>{lastText}</h5>
                </IonText>
            </IonContent>
        </IonPage>
    );

};

export default Chapter;
