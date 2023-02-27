<h1 align="center">Ionic Manga Reader</h1>

## About
Ionic Manga Reader is simple cross-platform manga reader written in Ionic. Application require to always be online because for manga catalog it's using external API called <a href="https://mangadex.org/">MangaDex</a>.

## Features
- Searching manga from MangaDex catalog.
- Follow manga so you can have easy access from home screen.
- History tab which show latest readed chapter of manga.
- Showing simple details about manga like english description.
- Showing in details of manga if specific chapter was already readed.
- You can read every type of comics which is availible at <a href="https://mangadex.org/">MangaDex</a> catalog.

## Installation

What will you need:
- Nodejs recommended the latest version.
- Firebase service for user autorization and notification
- OneSignal service for notification

After downloading the repository you need to download every dependecies to do that you can write below command.

### `npm install` 

Next think you must change values in file `firebaseConfig.ts` which is located in directory `src/config`. In this file you need to change firebaseConfig variable which is given by Firebase service. Second think to change is in file `index.tsx` which is located in `src`. In this file you can find function `OneSignalInit()` where you can change OneSignal ID for your service.

To run project in browser you can write below command.

### `ionic server`


## Building for Android

What will you need:
- Capacitor you can install it by writting in console below command.
### `npm install @capacitor/cli --save-dev`
- Android Studio

You need to add capacitor to project in repo it is added but you can do it manually again. You can do that by writting below command and do every prompt process like naming the app and giving to.
### `npx cap init`

Next you need to add Android platform to project which can be done by writting command below.
### `npx cap add android`

To open project in Android Studio where you can build to platform you need to write below command.
### `npx cap open android`

For more information about building app in Android Studio you can <a href="https://developer.android.com/studio/run">click here</a>

## Screenshots

| Home | History |
|:-:|:-:|
| ![Home](./screenshots/home.png?raw=true) | ![History](./screenshots/history.png?raw=true) |

| Search | Manga Details |
|:-:|:-:|
| ![Search](./screenshots/search.png?raw=true) | ![Manga Details](./screenshots/details.png?raw=true) |

| Reading |
|:-:|
| ![Reading](./screenshots/reading.png?raw=true) |