const inputEl = document.getElementById("input")
const infoEl = document.getElementById("info-text")
const meaningcontainerEl=document.getElementById("meaning-container")
const titleEl = document.getElementById("title")
const  meaningEl = document.getElementById("meaning")
const audioEl = document.getElementById("audio")
async function fetchApi(word){
    try {
        infoEl.style.display = "block";
        meaningcontainerEl.style.display = "none"
        infoEl.innerText =`searching the meaning of "${word}"`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result =await fetch(url).then((response)=> response.json());
        if(result.title){
            meaningcontainerEl.style.display = "block";
            infoEl.style.display = "none";
            titleEl.innerText = word;
            meaningEl.innerText = "N/A"
            audioEl.style.display = "none"
        }
       else{
            infoEl.style.display = "none";
            meaningcontainerEl.style.display = "block";
            audioEl.style.display = "inline flex"
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio
       }
    } 
    catch (error) {
        infoEl.innerText = "An error happend, try again";
        
    }  
      
}

inputEl,addEventListener("keyup",(event)=>{
    if(event.target.value && event.key === 'Enter')
    fetchApi(event.target.value)
});
