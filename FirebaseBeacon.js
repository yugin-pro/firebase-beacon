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
  navigatorInfo.platform = window.navigator.platform
  navigatorInfo.language = window.navigator.language

  const performanceInfo = {}
  performanceInfo.connectEnd = performance.timing.connectEnd
  performanceInfo.connectStart = performance.timing.connectStart
  performanceInfo.domComplete = performance.timing.domComplete
  performanceInfo.domContentLoadedEventEnd = performance.timing.domContentLoadedEventEnd
  performanceInfo.domContentLoadedEventStart = performance.timing.domContentLoadedEventStart
  performanceInfo.domInteractive = performance.timing.domInteractive
  performanceInfo.domLoading = performance.timing.domLoading
  performanceInfo.domainLookupEnd = performance.timing.domainLookupEnd
  performanceInfo.domainLookupStart = performance.timing.domainLookupStart
  performanceInfo.fetchStart = performance.timing.fetchStart
  performanceInfo.loadEventEnd = performance.timing.loadEventEnd
  performanceInfo.loadEventStart = performance.timing.loadEventStart
  performanceInfo.navigationStart = performance.timing.navigationStart
  performanceInfo.redirectEnd = performance.timing.redirectEnd
  performanceInfo.redirectStart = performance.timing.redirectStart
  performanceInfo.requestStart = performance.timing.requestStart
  performanceInfo.responseEnd = performance.timing.responseEnd
  performanceInfo.responseStart = performance.timing.responseStart
  performanceInfo.secureConnectionStart = performance.timing.secureConnectionStart


  return function (type, content) {
    let timestamp = Date.now()
    let platform = window.navigator.platform
    let sbjsInfo = typeof sbjs === 'object' ? {      
      current: sbjs.get.current,
      current_add: sbjs.get.current_add,
      session: sbjs.get.session,
      udata: sbjs.get.udata,
      promo: sbjs.get.promo
    } : {sbjs: 'not defined'}
    send({
      timestamp, type, content,
      innerHeight, innerWidth, outerHeight, outerWidth, pageXOffset, pageYOffset, closed,
      ...sbjsInfo,
      ...navigatorInfo,
      ...performanceInfo
    })
    return timestamp
  }
}