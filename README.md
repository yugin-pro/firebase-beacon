# firebase-beacon

Lightweight JavaScript library for collecting browser data using the [Beacon API]('https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API') and [Firebase Realtime Database]('https://firebase.google.com/docs/database')

# Installation

- download project to local storage
- run `npm i`
- create file ./private/const.js with cotent `export const URL = 'your url to firebase realtime database'`
- run `npm run build`
- use file from dist\assets `<script src='dist\assets\index-4587fc62.js'></script>`

# Usage

    send data `fbeacon('pageview', {test: new Date()})`
