export const readChapter = (chapter: any, manga: any, cover: any) => {
    var readHistory = localStorage.getItem("ReadHistory");
    if (readHistory == null) {
        var readHistoryTMP: any[] = []
        var chaptern: any = {
            id: chapter.id,
            chapter: chapter.chapter,
            date: new Date()
        }
        var chapters: string[] = []
        var title = "";
        if (manga.attributes.title.en)
            title = manga.attributes.title.en
        else if (manga.attributes.title.ja)
            title = manga.attributes.title.ja
        else
            title = manga.attributes.title["ja-ro"]
        chapters.push(chaptern);
        var newHistory = {
            mangaid: manga.id,
            cover: cover,
            title: title,
            chapters: chapters
        }
        readHistoryTMP.push(newHistory)
        localStorage.setItem("ReadHistory", JSON.stringify(readHistoryTMP));
        readHistory = localStorage.getItem("ReadHistory");
    } else if (readHistory != null) {
        var readHistoryArr = JSON.parse(readHistory);
        var finded: boolean = false
        for (let i = 0; i < readHistoryArr.length; i++) {
            if (readHistoryArr[i].mangaid == manga.id) {
                var chaptern: any = {
                    id: chapter.id,
                    chapter: chapter.chapter,
                    date: new Date()
                }
                finded = true;
                var findedChapter = false;
                const chapters = readHistoryArr[i].chapters;
                for (let j = 0; j < chapters.length; j++) {
                    if (chapters[j].id === chapter.id) {
                        chapters[j] = chaptern;
                        readHistoryArr[i].chapters = chapters;
                        findedChapter = true;
                        break;
                    }
                }
                if (!findedChapter) {
                    chapters.push(chaptern);
                    readHistoryArr[i].chapters = chapters;
                }
                break;
            }
        }
        if (!finded) {
            var chapters: string[] = []

            var chaptern: any = {
                id: chapter.id,
                chapter: chapter.chapter,
                date: new Date()
            }
            var title = "";
            if (manga.attributes.title.en)
                title = manga.attributes.title.en
            else if (manga.attributes.title.ja)
                title = manga.attributes.title.ja
            else
                title = manga.attributes.title["ja-ro"]

            chapters.push(chaptern);
            var newHistory = {
                mangaid: manga.id,
                cover: cover,
                title: title,
                chapters: chapters
            }
            readHistoryArr.push(newHistory);
        }
        localStorage.setItem("ReadHistory", JSON.stringify(readHistoryArr))
    }
}

export const getHistoryOfManga = (mangaid: string) => {
    const readHistory = localStorage.getItem("ReadHistory");
    if (readHistory != null) {
        var readHistoryArr = JSON.parse(readHistory);
        var chapterList: any[] = [];
        var mangaRead = readHistoryArr.find((x: any) => x.mangaid === mangaid);
        if (mangaRead != null) {
            const chapters = mangaRead.chapters;
            for (let i = 0; i < chapters.length; i++) {
                chapterList.push(chapters[i].id);

            }
            return chapterList;
        }
    }
    return null;
}

export const isMangaFollowed = (mangaid: string) => {
    var followedManga = localStorage.getItem("FollowManga");
    if (followedManga != null) {
        var followedMangaArr = JSON.parse(followedManga);
        for (let i = 0; i < followedMangaArr.length; i++) {
            if (followedMangaArr[i].id === mangaid)
                return true;
        }
    }
    return false;
}

export const followManga = (manga: any, cover: any) => {
    var followedManga = localStorage.getItem("FollowManga");
    var title = "";
        if (manga.attributes.title.en)
            title = manga.attributes.title.en
        else if (manga.attributes.title.ja)
            title = manga.attributes.title.ja
        else
            title = manga.attributes.title["ja-ro"]
    var newManga = {
        id: manga.id,
        cover: cover + ".256.jpg",
        title: title
    };
    if (followedManga == null) {
        var newMangaArray: any[] = [];
        newMangaArray.push(newManga);
        localStorage.setItem("FollowManga", JSON.stringify(newMangaArray));
    } else {
        var followedMangaArr = JSON.parse(followedManga);
        followedMangaArr.push(newManga);
        localStorage.setItem("FollowManga", JSON.stringify(followedMangaArr));
    }
}

export const unFollowManga = (mangaid: string) => {
    var followedManga = localStorage.getItem("FollowManga");
    if (followedManga != null) {
        var followedMangaArr = JSON.parse(followedManga);
        var newArray = followedMangaArr.filter((item: any) => item.id != mangaid);
        localStorage.setItem("FollowManga", JSON.stringify(newArray));
    }
}

export const clearHistory = () => {
    localStorage.removeItem("ReadHistory");
}

export const clearFollow = () => {
    localStorage.removeItem("FollowManga");
}

export const exportData = () => {
    var storage = {
        history: localStorage.getItem("ReadHistory"),
        follow: localStorage.getItem("FollowManga")
    }
    return storage;
}