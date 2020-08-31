document.addEventListener("DOMContentLoaded", function()
{

const ul = document.getElementById("quote-list")

const url = "http://localhost:3000/quotes?_embed=likes"

fetch(url).then(resp => resp.json()).then(quotes => addAllQuotes(quotes))
})

function addAllQuotes(quotes){

    quotes.forEach(quote=>addQuote(quote))

}

function addQuote(quote){
    
const ul = document.getElementById("quote-list")
    let li = document.createElement("li")
    li.className = 'quote-card'

    let blockedQuote = document.createElement("blockquote")
    blockedQuote.className = 'blockquote'

    let p = document.createElement('p')
    p.className = "mb-0"
    p.innerText = quote.quote

    let footer = document.createElement('footer')
    footer.className =  "blockquote-footer"
    footer.innerText = quote.author


    let br = document.createElement("br")

    let likeBtn = document.createElement("button")
    likeBtn.className = "btn-success"
    let span = document.createElement("span")
    


    if (!Array.isArray(quote.likes) || !quote.likes.length){
          span.innerText = 0
    } else {
    span.innerText = quote.likes.length
    }

    likeBtn.innerText = "Likes: "

    likeBtn.append(span)

    let deleteBtn = document.createElement("button")
    deleteBtn.className = "btn-danger"
    deleteBtn.innerText = "Delete"


    blockedQuote.append(p,footer,br,likeBtn,deleteBtn)
    li.append(blockedQuote)


    
    ul.append(li)


    deleteBtn.addEventListener("click", function()
    {   

        fetch(`http://localhost:3000/quotes/${quote.id}/?_embed=likes/`, {
            method: "DELETE" })
        .then(()=> li.remove())
        

    })

    likeBtn.addEventListener("click", function()
    {   

        let configObj = {method: 'POST', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({quoteID: quote.id, likes:   })
        }




    fetch(`http://localhost:3000/quotes/${quote.id}/?_embed=likes/`, {
        method: "POST" })
    .then(()=> li.())
    

    })
    
   
}




let form = document.getElementById("new-quote-form")

form.addEventListener("submit",function(e){
    e.preventDefault()


    let quote = e.target[0].value
    let author = e.target[1].value
    
   
    let configObj = {method: 'POST', 
         headers: {"Content-Type": "application/json"},
        body: JSON.stringify({quote: quote, author: author })
    }

    const url = "http://localhost:3000/quotes?_embed=likes"
  
    fetch(url,configObj).then(resp => resp.json()).then(quote => addQuote(quote))

    
    // addQuote(quote)

})






