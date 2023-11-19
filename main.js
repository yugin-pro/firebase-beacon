import { newFirebaseBeacon } from './FirebaseBeacon.js'
import { URL } from './private/const.js'


if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", () => window.fbeacon = newFirebaseBeacon(URL));
  } else {
    // `DOMContentLoaded` has already fired
    window.fbeacon = newFirebaseBeacon(URL);
  }