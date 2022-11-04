//use queryselector instead of getElementById?

// sample id: 1vBLt4axCgXZ_aYqTfvYXTj-MroWI79fPWrR3uG1GARs


document.getElementById("MainButton").addEventListener("click", onButtonClick);

function onButtonClick(){
     chrome.runtime.sendMessage({ 
      message: 'load_document',
      documentId: document.getElementById("documentId").value
    }, function(response){ alert(response.message);});
  };

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        
// });

 