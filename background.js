import {config} from './config.js';

const API_KEY = config.API_KEY;
let documentId = "1vBLt4axCgXZ_aYqTfvYXTj-MroWI79fPWrR3uG1GARs";
let user_signed_in = false;// probably don't need this property

//possibly don't need this listener
chrome.identity.onSignInChanged.addListener((account_id, signedIn) => {
    if(signedIn){
        user_signed_in = true;
    } else {
        user_signed_in = false;
    }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if(request.message === 'load_document'){

        
        const user_submitted_documentId = request.documentId;
        
        let fetch_status = null;


        // chrome.identity.getAuthToken({ interactive: true }, function(token){

        //     let fetch_url =  `https://docs.googleapis.com/v1/documents/${user_submitted_documentId}`;
            
        //     let fetch_options = {
        //         method: "GET",
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             "Content-Type" : "application/json",
        //         },
        //     };

        //     //fetch(fetch_url,fetch_options);


        sendResponse({message : "end of function"})
        

        // });

        
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
