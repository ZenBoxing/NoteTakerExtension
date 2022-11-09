
// sample id: 1vBLt4axCgXZ_aYqTfvYXTj-MroWI79fPWrR3uG1GARs


document.getElementById("MainButton").addEventListener("click", onButtonClick);

function onButtonClick(){
     chrome.runtime.sendMessage({ 
      message: 'store_currentDocumentId',
      documentId: document.getElementById("documentId").value
    }, (response) => messageReceivedCallBack(response));
  };


 function messageReceivedCallBack(response){
      if(response.message === "success"){
        document.getElementById("currentDocumentTitle").textContent = response.title;
      }else{
        alert(response.message);
      }
 } 