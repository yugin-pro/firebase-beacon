export function newFirebaseBeacon(url) {
  function getBeaconUrl() { return url + formPath() + '.json' }
  function formPath() { return getDate() + '/' + beaconid }
  function getId() { 
    let id = readCookie('beaconid') || makeid(8) + '_' + new Date().getTime() || '12345678' + '_' + new Date().getTime()
    setCookie('beaconid', id)
    return id }
  function getDate() {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Date(Date.now()).toLocaleDateString('en-ZA', options)
  }
  function makeid(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  } 
  function readCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function setCookie(key,value) {
    const d = new Date();
    d.setTime(d.getTime() + (180*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
    return readCookie(key)
  }
  const beaconid = getId() 
  const endpoint = getBeaconUrl()
  const send = function (data) { return navigator.sendBeacon(endpoint, JSON.stringify(data)) }

  const navigatorInfo = {}
    navigatorInfo.cookieEnabled = navigator.cookieEnabled
    navigatorInfo.language = navigator.language
    navigatorInfo.maxTouchPoints = navigator.maxTouchPoints
    navigatorInfo.pdfViewerEnabled = navigator.pdfViewerEnabled
    if("serviceWorker" in navigator) {navigatorInfo.serviceWorker = true} else {navigatorInfo.serviceWorker = false}
    navigatorInfo.userAgent = navigator.userAgent

  const documentInfo = {}
  documentInfo.referrer = document.referrer
  documentInfo.title = document.title
  documentInfo.URL = document.URL
  documentInfo.visibilityState = document.visibilityState
  documentInfo.fullscreenEnabled = document.fullscreenEnabled


  return function (type, content) {
    let timestamp = Date.now()
    let historyState = window.history.state
    let historyLength = window.history.length
    let sbjsInfo = typeof sbjs === 'object' ? {      
      current: sbjs.get.current,
      current_add: sbjs.get.current_add,
      session: sbjs.get.session,
      udata: sbjs.get.udata,
      promo: sbjs.get.promo
    } : {sbjs: 'not defined'}
    send({
      timestamp, type, content, historyState, historyLength, devicePixelRatio,
      innerHeight, innerWidth, outerHeight, outerWidth, pageXOffset, pageYOffset,
      ...sbjsInfo,
      ...navigatorInfo,
      ...documentInfo
    })
    return timestamp
  }
}