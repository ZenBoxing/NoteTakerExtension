import {config} from './config.js';

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ["./main.js"]
//         })
//             .then(() => {
//                 console.log("INJECTED THE FOREGROUND SCRIPT.");
//             })
//             .catch(err => console.log(err));
//     }
// });

const API_KEY = config.API_KEY;
let documentID = "1vBLt4axCgXZ_aYqTfvYXTj-MroWI79fPWrR3uG1GARs";
let user_signed_in = false;

//possibly don't need this listener
chrome.identity.onSignInChanged.addListener((account_id, signedIn) => {
    if(signedIn){
        user_signed_in = true;
    } else {
        user_signed_in = false;
    }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if(request.message === 'append_document'){
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            let fetch_url =  `https://docs.googleapis.com/v1/documents/${documentID}:batchUpdate?key=${API_KEY}`;

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
                        text: "test this out",
                        endOfSegmentLocation: {
                            
                        },
                        },
                    },
                    ],
                }),
                };

            fetch(fetch_url, fetch_options).then(res => res.json()).then(res => console.log(res));

        });
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
        let fetch_url =  `https://docs.googleapis.com/v1/documents/${documentID}:batchUpdate?key=${API_KEY}`;

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
                    location: {
                        index: 1,
                    },
                    },
                },
                ],
            }),
            };

        fetch(fetch_url, fetch_options).then(res => res.json()).then(res => console.log(res));

    });



});
