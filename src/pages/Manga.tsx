import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonPage, IonRouterLink, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import './Manga.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { followManga, getHistoryOfManga, isMangaFollowed, readChapter, unFollowManga } from '../service/LocalStorage';

interface MangaId {
  id: string
}

const Manga: React.FC<any> = (props) => {
  const [manga, setManga] = useState<any>(null);
  const [chapters, setChapters] = useState<any>([]);
  const mangaid: MangaId = useParams();
  const [cover, setCover] = useState<string>();
  const history = useHistory();
  const [mangaHistory, setMangaHistory] = useState<any>([]);
  const [isFollowed, setIsFollowed] = useState<any>();

  useEffect(() => {
    const id: string = mangaid.id;
    axios({
      method: 'get',
      url: 'https://api.mangadex.org/manga/' + id,
    }).then((response) => {
      setManga(response.data.data);
      response.data.data.relationships.map((item: any) => {
        if (item.type === "cover_art") {
          axios({
            method: 'get',
            url: 'https://api.mangadex.org/cover/' + item.id,
          }).then((response) => {
            setCover("https://uploads.mangadex.org/covers/" + id + "/" + response.data.data.attributes.fileName);
          })
        }
      })
      axios({
        method: 'get',
        url: 'https://api.mangadex.org/manga/' + id + "/aggregate",
        params: {
          translatedLanguage: ['en'],
        },
      }).then((response) => {
        setChapters(response.data.volumes);
      });
    })
    var ReadManga = getHistoryOfManga(id);
    setMangaHistory(ReadManga);
    setIsFollowed(isMangaFollowed(id));
  }, []);

  const clickChapter = (chapter: any) => {
    readChapter(chapter, manga, cover);
    history.push(`/chapter/${chapter.id}`);
    history.go(0)
  }

  const clickUnfollow = () => {
    unFollowManga(mangaid.id);
    setIsFollowed(false);
  }

  const clickFollow = () => {
    followManga(manga, cover);
    setIsFollowed(true);
  }

  if (manga != null)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Manga Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className='ion-padding'>
          <IonText className='ion-sm'>
            <h1 className='ion-text-center'>{manga.attributes.title.en && manga.attributes.title.en} {!manga.attributes.title.en && manga.attributes.title.ja} {!manga.attributes.title.en && !manga.attributes.title.ja && manga.attributes.title['ja-ro']}</h1>
          </IonText>
          <IonRow className="ion-justify-content-center">
            {
              !isFollowed && <IonButton shape="round" onClick={() => clickFollow()}>Follow</IonButton>
            }
            {
              isFollowed && <IonButton shape="round" color="danger" onClick={() => clickUnfollow()}>Unfollow</IonButton>
            }
          </IonRow>
          <IonRow>
            <IonCol sizeXl='6' size='12' className='img-container'>
              <IonImg src={cover} alt={manga.attributes.description.en} className='cover-img'></IonImg>
            </IonCol>
            <IonCol sizeXl='6' size='12'>
              <IonText>
                <h3><b>Description:</b></h3>
                <p>{manga.attributes.description.en}</p>
                <p><b>Year: </b>{manga.attributes.year}</p>
              </IonText>
            </IonCol>
          </IonRow>

          <IonText>
            <h3>Chapters</h3>
          </IonText>
          {
            chapters && Object.keys(chapters).map((key: any) => {
              return (
                <IonCard key={key}>
                  <IonCardHeader>
                    <IonText color="dark">
                      <h3>Volume {chapters[key].volume}</h3>
                    </IonText>
                  </IonCardHeader>
                  <IonCardContent>
                    {
                      Object.keys(chapters[key].chapters).map((key1: any) => {
                        var color = "dark"
                        if (mangaHistory != null) {
                          if (mangaHistory.includes(chapters[key].chapters[key1].id))
                            color = "medium"
                        }
                        return (
                          <IonRow className="row" key={chapters[key].chapters[key1].id}>
                            <IonText color={color} onClick={() => clickChapter(chapters[key].chapters[key1])}>
                              <h1>  Chapter {chapters[key].chapters[key1].chapter}</h1>
                            </IonText>
                          </IonRow>
                        )
                      })
                    }
                  </IonCardContent>
                </IonCard>
              );
            })
          }
          {
            chapters.length == 0 && <IonCard>
              <IonText className='ion-text-center'>
                <h1>Cannot find chapters for this manga!</h1>
              </IonText>
            </IonCard>
          }
        </IonContent>
      </IonPage>
    );
  else
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Page is not existing</IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonContent>
      </IonPage>
    );

};

export default Manga;
