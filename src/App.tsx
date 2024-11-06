
import './App.css'
import * as  XLSX from 'xlsx'; 

function App() {
  const onImportExcel = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type:'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log(jsonData);
      chrome.storage.local.set({ excelData: jsonData }).then(() => {
        console.log("Value is set");
        // Data saved successfully, proceed to send message
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tabID: number = tabs[0].id!;
          console.log('tabID:', tabID);
          chrome.tabs.sendMessage(tabID, { action: 'addExcel' });
        });
      });
    };
    reader.readAsBinaryString(file);
  };
  return (
    <>
      <h1>多语言映射</h1>
      <div>
        <input type="file" id="file" accept='.xlsx, .xls' onChange={onImportExcel} />
      </div>
      <p className="read-the-docs">
        选择多语言excel文件进行多语言映射。
      </p>
      <p className="read-the-docs">已知问题：换行文本无法匹配， 少部分key可能无法匹配</p>
    </>
  )
}




export default App
