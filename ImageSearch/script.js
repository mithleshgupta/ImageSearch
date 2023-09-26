const key = "SVMMjyRv1rYTDU0m-6JCbxA2lEnnQdolH_q0eQmWiG8";

const formElement = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMoreBtn = document.getElementById("show-more-btn")

let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`
    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if(page===1){
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src =  result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        imageWrapper.appendChild(imageWrapper)
        
    });

    page++;

    if(page>1){
        showMoreBtn.style.display = "block"
    }
}


formElement.addEventListener("submit",(event) =>{
    event.preventDefault()
    page = 1;
    searchImages()
})

showMoreBtn.addEventListener("click" ,() =>{
    searchImages()
})

