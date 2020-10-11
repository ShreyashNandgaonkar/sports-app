const api_url =  "https://api.jsonbin.io/b/5d0c6e6a860ae0341876aac6/2"; 

let data=[];
const search = document.getElementById('search');
search.addEventListener('keyup', (e)=>{
        const searchString = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        const filteredPlayers= data.filter((da)=>{
            return (
                da.PFName.includes(searchString)
                );
        })
        show(filteredPlayers)
})

// Defining async function 
async function getapi(url) { 
    
    // Storing response 
    const response = await fetch(url); 
    
    // Storing data in form of JSON 
    data = await response.json(); 
    console.log(data); 
    if (response) { 
        hideloader(); 
    } 
    show(data); 
} 
// Calling async function 
getapi(api_url); 

// Function to hide the loader 
function hideloader() { 
    document.getElementById('loading').style.display = 'none'; 
} 

// Function
function show(data) { 

    // Sorting data in ascending values according to Value
    let sortedValues = data.sort(function(a,b){
            return a.Value - b.Value
        })
    let tab =""
    for(let r of sortedValues){

        let firstNode= r[Object.keys(r)[0]];
        let dateTime = new Date(firstNode[0].MDate);
        let ourDate = dateTime.toString();
        tab +=` <li class="article">
                    <div class="article-img-wrap">
                        <img class="article-img" src="cr.jpg" alt="player image" />
                        
                    </div>
                        <h2 class="article-title">${r.PFName}</h2>
                        <p class="article-description"><b>Skills:</b> ${r.SkillDesc}<p>
                        <p class="article-description"><b>Value:</b> ${r.Value}</p>
                        <p class="matches"><b>Upcoming Match:</b> ${firstNode[0].CCode} vs ${firstNode[0].VsCCode}</p>
                        <p class="date">${ourDate}</p>
                </li>`
    }
  
    // Setting innerHTML as tab variable 
    document.getElementById("news-articles").innerHTML = tab; 
} 

// Note :- There is no key name 'TName' in API, also, there are no images. There is Id which can be displayed using
// <img class="article-img" src=${r.Id} alt="player image" />, but i have not used it as it looks bad for UI. Instead,
// I have used my own downloaded image for better UX experience. Thanks.

