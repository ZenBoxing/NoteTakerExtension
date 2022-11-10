import {config} from './config.js';

const API_KEY = config.API_KEY;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if(request.message === 'store_currentDocumentId'){

        let currentDocumentId = request.documentId;

        chrome.identity.getAuthToken({ interactive: true }, function(token){

            let fetch_url =  `https://docs.googleapis.com/v1/documents/${currentDocumentId}`;
            
            let fetch_options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type" : "application/json",
                },
            };

            fetch(fetch_url,fetch_options)
            .then((response) => response.json())
            .then((data) => sendResponse({message : "success", title : data.title}))
            .catch((error) => sendResponse({message: error}));

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
                    text: "\n" + info.selectionText + "\n",
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