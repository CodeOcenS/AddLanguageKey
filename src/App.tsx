
import './App.css';
import * as  XLSX from 'xlsx';

function App() {
  /// 选择文件回调。
  const onImportExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e) => {
      // 文件读取回调
      const data = e.target?.result;
      // 通过XLSX读取数据
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: object[] = XLSX.utils.sheet_to_json(worksheet);
      //console.log("读取到数据：" + JSON.stringify(jsonData));
     const firstData = jsonData[0] as object;
     // 首行检查是否包含 en,和 key
      if (!firstData || !enValue(firstData) || !keyValue(firstData)) {
        alert('请检查文件格式是否正确， 首行应该包含en|key字段');
        return;
      }
      // 处理数据
      const filterArray = getKeyEn(jsonData)
      //console.log(JSON.stringify(filterArray));
      // 存储到共享中
      chrome.storage.local.set({ excelData: filterArray }).then(() => {
        console.log("Value is set");
        // Data saved successfully, proceed to send message
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tabID: number = tabs[0].id!;
          console.log('tabID:', tabID);
          // 发送消息，以便 contentScript 执行
          chrome.tabs.sendMessage(tabID, { action: 'addExcel' });
        });
      });
    };
    // 读取文件
    //reader.readAsBinaryString(file);
    reader.readAsArrayBuffer(file);
  };
  return (
    <>
      <h3>多语言映射</h3>
      <div>
        <input type="file" id="file" accept='.xlsx, .xls' onChange={onImportExcel} />
      </div>
      <p className="read-the-docs">
        选择多语言excel文件进行多语言映射, 首行应该包含en|key(忽略大小写)。
      </p>
      <p className="read-the-docs">
        注意格式为【Key(等几个)】时，有多个相同的文案，请自行选择对应Key。
      </p>
      <p className="read-the-docs">已知问题：换行文本无法匹配， 少部分key可能无法匹配</p>
    </>
  )
}

// 私有方法
function enValue(obj: object): undefined | string {
  if ('En' in obj || 'en' in obj || 'EN' in obj) {
    return obj['En'] || obj['en'] || obj['EN'];
  } else {
    return undefined;
  }
}

function keyValue(obj: object): undefined | string {
  if ('Key' in obj || 'key' in obj || 'KEY' in obj) {
    return obj['Key'] || obj['key'] || obj['KEY'];
  } else {
    return undefined;
  }
}

// 将数据整理为 en, key, count
interface KeyEn {
  en: string;
  key: string;
  count: number;
}
/// 统计相同 en 内容的数量。
function getKeyEn(data: object[]): KeyEn[] {
  const map = new Map<string, number>();
  const array: KeyEn[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const en = enValue(item);
    const key = keyValue(item);
    if (en && key) { 
      if (map.has(en)) { 
        // 设置en数量加一
        map.set(en, map.get(en)! + 1);
      } else {
        const temp =  {
          en: en,
          key: key,
          count: 1,
        };
        array.push(temp);
        map.set(en, 1);
      }
    }
  }
  // 将 map 中的数量赋值给对应key对象
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    item.count = map.get(item.en)!;
  }
  return array; // 添加了返回语句
}


export default App
