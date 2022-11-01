//use queryselector instead of getElementById?


document.getElementById("MainButton").addEventListener("click", onButtonClick);

function onButtonClick(){
     
     chrome.runtime.sendMessage({ 
      message: 'load_document',
      documentId: document.getElementById("documentId").value
    });
  };

 