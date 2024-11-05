
chrome.runtime.onMessage.addListener((e) => {
  if (e.action === 'addExcel') {
    // Proceed with Excel processing
    chrome.storage.local.get(["excelData"]).then((result) => {
      const keyEnArr = result.excelData; // 获取到的是 json数组
      console.log("Value currently is:" + JSON.stringify(keyEnArr));
      if (keyEnArr.length > 0) {
      replaceTextInElement(document.body, keyEnArr);
      }
    });
  }
});

function getKeyEn(object) {
    let key = object.key;
    if(object.Key){
        key = object.Key
    }
    if(object.KEY){
        key = object.KEY
    }
    let en =  object.en;
    if(object.En){
        en = object.En
    }
    if(object.EN){
        en = object.EN
    }
    if (key && en){
     return {
       key:key,
       en:en
     }
    } else {
      return null;
    }
}
function replaceTextInElement(element, keyEnArr) {
  if (element.nodeType === Node.TEXT_NODE) {
    for (const obj of keyEnArr) {
      const fixObj = getKeyEn(obj);
      if (fixObj){
      const key = fixObj.key;
      const en = fixObj.en;
      console.log(key, en);
      if (element.nodeValue.includes(en)) {
        element.nodeValue = element.nodeValue.replace(new RegExp(en, 'g'), `${key} ${en}`);
      }
    }
    }
  } else {
    element.childNodes.forEach(child => replaceTextInElement(child, keyEnArr));
  }
}


