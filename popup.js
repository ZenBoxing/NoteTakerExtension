//use queryselector instead of getElementById?

// sample id: 1vBLt4axCgXZ_aYqTfvYXTj-MroWI79fPWrR3uG1GARs


document.getElementById("MainButton").addEventListener("click", onButtonClick);

function onButtonClick(){
     chrome.runtime.sendMessage({ 
      message: 'store_currentDocumentId',
      documentId: document.getElementById("documentId").value
    }, (response) => { alert(response.message);});
  };

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        
// });

 