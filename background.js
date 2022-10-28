

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

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id:'notetaker',
        title: "Append '%s' to doc",
        contexts:["selection"]
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("hello");
    console.log(tab.title);
    console.log(info.pageUrl);
    console.log(info.selectionText);
});