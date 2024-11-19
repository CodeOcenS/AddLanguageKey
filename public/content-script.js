
chrome.runtime.onMessage.addListener((e) => {
  if (e.action === 'addExcel') {
    // Proceed with Excel processing
    chrome.storage.local.get(["excelData"]).then((result) => {
      const keyEnArr = result.excelData; // 获取到的是 json数组
      console.log("Value currently is:" + JSON.stringify(keyEnArr));
      if (keyEnArr.length > 0) {
        addKeyToElement(keyEnArr);
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
function addKeyToElement(keyEnArr) {
  var iframe = document.getElementById("mainFrame"); // 先获取 iframe.
  // 获取页面中所有 p 和 span 标签
  var x = iframe.contentDocument.querySelectorAll("span, p");
	for (var i = 0; i < x.length; ++i) {
		const element =  x[i];
    for (const fixObj of keyEnArr) {
      //const fixObj = getKeyEn(obj);
      if (fixObj){
      const key = fixObj.key;
      const en = fixObj.en;
      const innerText = element.innerText;
		if (innerText === en) {
      if (fixObj.count > 1) {
        element.innerText = `【${key}(等${fixObj.count}个)】${innerText}`;
      } else {
        element.innerText = `【${key}】${innerText}`;
      }
      // 获取新的宽高
const newWidth = element.offsetWidth;
const newHeight = element.offsetHeight;

// 设置新的样式
element.style.width = newWidth + 'px';
element.style.height = newHeight + 'px';
      }
    }
  }
}
}


