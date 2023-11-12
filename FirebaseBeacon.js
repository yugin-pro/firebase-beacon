export function newFirebaseBeacon(url) {
  function getBeaconUrl() { return url + formPath() + '.json' }
  function formPath() { return getDate() + '/' + getId() }
  function getId() { return 'asdfasdf1212' }
  function getDate() {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Date(Date.now()).toLocaleDateString('en-ZA', options)
  }
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