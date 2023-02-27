import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonList, IonPage, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Search.css';

import { search } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Search: React.FC = () => {
    const [text, setText] = useState<string>();
    const [searchResult, setSearchResult] = useState<any[]>()
    const [images, setImages] = useState<any[]>()
    const history = useHistory();
    const [arrayImg, setArrayimg] = useState<string[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);


    const searchBtn = async () => {
        // setArrayimg([]);
        // setSearchResult([]);
        var arrayOfSearch: any[] = [];
        if (text != "" && text != null) {
            await axios({
                method: 'get',
                url: 'https://api.mangadex.org/manga/',
                params: {
                    title: text,
                }
            }).then(response => {
                var result = response.data.data;
                for (var i = 0; i < result.length; i++) {
                    var result1 = result[i].relationships
                    var title = "";
                    if (result[i].attributes.title.en)
                        title = result[i].attributes.title.en
                    else if(result[i].attributes.title.ja)
                        title = result[i].attributes.title.ja
                    else
                        title = result[i].attributes.title["ja-ro"]
                    for (var j = 0; j < result1.length; j++) {
                        if (result1[j].type === "cover_art") {
                            arrayOfSearch.push({
                                id: result[i].id,
                                title: title,
                                cover: result1[j].id,
                            })
                        }
                    }
                }
                for (let i = 0; i < arrayOfSearch.length; i++) {
                    axios({
                        method: 'get',
                        url: 'https://api.mangadex.org/cover/' + arrayOfSearch[i].cover
                    }).then((response1) => {
                        var el = "https://uploads.mangadex.org/covers/" + response1.data.data.relationships[0].id + '/' + response1.data.data.attributes.fileName + ".256.jpg";
                        arrayOfSearch[i].cover = el;
                        if(i==arrayOfSearch.length-1)
                            setSearchResult(arrayOfSearch);
                    })
                }
            })
        }
    }

    const nextResult = (e: any) => {
        var length = Number(searchResult?.length) + 1;
        // if (text != "" && text != null) {
        //     axios({
        //         method: 'get',
        //         url: 'https://api.mangadex.org/manga/',
        //         params: {
        //             title: text,
        //             offset: length,
        //         }
        //     }).then(response => {
        //         var array: any[] = Object.assign([], searchResult);;
        //         setSearchResult([
        //             ...array,
        //             ...response.data.data
        //         ]);
        //         var result = response.data.data;
        //         for (var i = 0; i < result.length; i++) {
        //             var result1 = result[i].relationships
        //             for (var j = 0; j < result1.length; j++) {
        //                 if (result1[j].type === "cover_art") {
        //                     axios({
        //                         method: 'get',
        //                         url: 'https://api.mangadex.org/cover/' + result1[j].id
        //                     }).then((response1) => {
        //                         var el = "https://uploads.mangadex.org/covers/" + response1.data.data.relationships[0].id + '/' + response1.data.data.attributes.fileName + ".256.jpg";
        //                         setArrayimg(oldarray => [
        //                             ...oldarray,
        //                             el
        //                         ]);
        //                     })
        //                 }
        //             }
        //         }
        //     })
        // }
        


        var arrayOfSearch: any[] = [];
        if (text != "" && text != null) {
            axios({
                method: 'get',
                url: 'https://api.mangadex.org/manga/',
                params: {
                    title: text,
                    offset: length,
                }
            }).then(response => {
                var array: any[] = Object.assign([], searchResult);
                var result = response.data.data;
                for (var i = 0; i < result.length; i++) {
                    var result1 = result[i].relationships
                    var title = "";
                    if (result[i].attributes.title.en)
                        title = result[i].attributes.title.en
                    else if(result[i].attributes.title.ja)
                        title = result[i].attributes.title.ja
                    else
                        title = result[i].attributes.title["ja-ro"]
                    for (var j = 0; j < result1.length; j++) {
                        if (result1[j].type === "cover_art") {
                            arrayOfSearch.push({
                                id: result[i].id,
                                title: title,
                                cover: result1[j].id,
                            })
                        }
                    }
                }
                for (let i = 0; i < arrayOfSearch.length; i++) {
                    axios({
                        method: 'get',
                        url: 'https://api.mangadex.org/cover/' + arrayOfSearch[i].cover
                    }).then((response1) => {
                        var el = "https://uploads.mangadex.org/covers/" + response1.data.data.relationships[0].id + '/' + response1.data.data.attributes.fileName + ".256.jpg";
                        arrayOfSearch[i].cover = el;
                        if(i==arrayOfSearch.length-1)
                            setSearchResult([
                                ...array,
                                ...arrayOfSearch
                            ]);
                    })
                }
            })
        }
        e.target.complete();
    }



    const goDetails = (id: string) => {
        history.push("/manga/" + id);
        history.go(0);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Search Manga</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow className="ion-justify-content-around">
                        <IonCol size='6'>
                            <IonInput value={text} type='text' placeholder='Search' onIonChange={e => setText(e.detail.value!)} />
                        </IonCol>
                        <IonCol size='3'>
                            <IonButton expand='block' onClick={() => searchBtn()}>
                                <IonIcon icon={search} />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonList>
                    {
                        searchResult?.map((element: any, index: number) => {
                            return (
                                <IonItem className="" key={element.id} lines="full">
                                    <IonCol size='3' sizeXl='1'>
                                        <IonImg src={element.cover}></IonImg>
                                    </IonCol>
                                    <IonCol size='9'>
                                        <IonText onClick={() => goDetails(element.id)}>
                                            <h3>{element.title}</h3>
                                        </IonText>
                                    </IonCol>
                                </IonItem>
                            )
                        })
                    }
                </IonList>
                <IonInfiniteScroll onIonInfinite={nextResult} threshold="100px" disabled={isInfiniteDisabled}>
                    <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data..." />
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
};

export default Search;
