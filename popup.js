
//sample id: 1vBLt4axCgXZ_aYqTfvYXTj-MroWI79fPWrR3uG1GARs

window.onload = onTitleLoaded;

document.getElementById("MainButton").addEventListener("click", onButtonClick);

function onButtonClick(){
     chrome.runtime.sendMessage({ 
      message: 'store_currentDocumentId',
      documentId: document.getElementById("documentId").value
    }, (response) => messageReceivedCallBack(response));
  };


 function messageReceivedCallBack(response){
      if(response.message === "success"){
        
        chrome.storage.local.set({documentTitle: response.title});

        chrome.storage.local.get(['documentTitle'], data => {
          document.getElementById("title").textContent = data.documentTitle;
        });

        //document.getElementById("title").textContent = title;
      }else{
        alert(response.message);
      }
 }
 
 



 function onTitleLoaded(){

      chrome.storage.local.get(['documentTitle'], data => {
        document.getElementById("title").textContent = data.documentTitle;
      });

      //document.getElementById("title").textContent = "  Page Loaded";
 }