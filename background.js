import {config} from './config.js';

const API_KEY = config.API_KEY;
//const DISCOVERY_DOC = 'https://docs.googleapis.com/$discovery/rest?version=v1';

let documentId = "1vBLt4axCgXZ_aYqTfvYXTj-MroWI79fPWrR3uG1GARs";

// function onGAPILoad() {
//     gapi.client.init({
//       apiKey: API_KEY,
//       discoveryDocs: DISCOVERY_DOC,
//     }).then(function () {
//       console.log('gapi initialized')
//     }, function(error) {
//       console.log('error', error)
//     });
//   }



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if(request.message === 'store_currentDocumentId'){
        let currentDocumentId = request.documentId;
        
        chrome.storage.sync.set({'currentDocumentId' : currentDocumentId},() => sendResponse({message : "DocumendId Added"}));
        
        return true;
    }    
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id:'notetaker',
        title: "Append '%s' to doc",
        contexts:["selection"]
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {


    console.log(tab.title);
    console.log(info.pageUrl);
    console.log(info.selectionText);

    chrome.identity.getAuthToken({ interactive: true }, (token) => {
        let fetch_url =  `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate?key=${API_KEY}`;

        let fetch_options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                requests: [
                {
                    insertText: {
                    text: "/n" + info.selectionText + "/n",
                    endOfSegmentLocation: {
                        
                    },
                    },
                },
                ],
            }),
            };

        fetch(fetch_url, fetch_options).then(res => res.json()).then(res => console.log(res));
    });


});
