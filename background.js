import {config} from './config.js';

const API_KEY = config.API_KEY;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if(request.message === 'store_currentDocumentId'){

        let currentDocumentId = request.documentId
        //console.log(currentDocumentId);

        chrome.identity.getAuthToken({ interactive: true }, async function(token){

            let fetch_url =  `https://docs.googleapis.com/v1/documents/${currentDocumentId}`;
            
            let fetch_options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type" : "application/json",
                },
            };

            let fetch_response = await fetch(fetch_url,fetch_options);

            if(fetch_response.status === 200){
                chrome.storage.local.set({'currentDocumentId' : currentDocumentId});
                
                sendResponse({message : "Document Loaded"});
            } else{
                sendResponse({message :"Invalid DocumentId"});
            }
            
        });

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

    let documentId = null;
    chrome.storage.local.get(['currentDocumentId'], data => {
        documentId = data.currentDocumentId;
        console.log(documentId);
    });


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