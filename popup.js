import {config} from './config.js';
document.getElementById("MainButton").addEventListener("click", onButtonClick);

function onButtonClick(){
    
    
    console.log("clicked");
    alert("clicked");
    const documentID = document.getElementById("Test").textContent;
    
    let fetch_url = `https://docs.googleapis.com/v1/documents/${documentID}:batchUpdate?key=${config.API_KEY}`;

    let fetch_options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              text: "test this out",
              location: {
                index: 1,
              },
            },
          },
        ],
      }),
    };


    fetch(fetch_url, fetch_options).then(response => response.json()).then(response => { document.getElementById("log").textContent = response.statusText;});
    document.getElementById("end").textContent = "end of function";
  };

 