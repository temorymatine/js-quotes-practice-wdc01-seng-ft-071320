document.addEventListener("DOMContentLoaded", function()
{

const ul = document.getElementById("quote-list")

const url = "http://localhost:3000/quotes?_embed=likes"

fetch(url)
.then(resp => resp.json())
.then(quotes => addAllQuotes(quotes))


function addAllQuotes(quotes){
    quotes.forEach(quote=>addQuote(quote))
}

function addQuote(quote){
    
    const ul = document.getElementById("quote-list")
    let li = document.createElement("li")
    li.className = 'quote-card'
    li.id = `quote-${quote.id}`

    let blockedQuote = document.createElement("blockquote")
    blockedQuote.className = 'blockquote'

    let p = document.createElement('p')
    p.className = "mb-0"
    p.innerText = quote.quote
    p.id = `p-${quote.id}`

    let footer = document.createElement('footer')
    footer.className =  "blockquote-footer"
    footer.innerText = quote.author
    footer.id = `footer-${quote.id}`


    let br = document.createElement("br")

    let likeBtn = document.createElement("button")
    likeBtn.className = "btn-success"
    let span = document.createElement("span")
    


    if (!Array.isArray(quote.likes) || !quote.likes.length){
          span.innerText = 0
          span.id = quote.id
    } else {
        span.innerText = quote.likes.length
        span.id = quote.id
    }

    likeBtn.innerText = "Likes: "

    likeBtn.append(span)

    let deleteBtn = document.createElement("button")
    deleteBtn.className = "btn-danger"
    deleteBtn.innerText = "Delete"

    let editBtn = document.createElement("button")
    editBtn.className = "btn-edit"
    editBtn.innerText = "Edit"

    blockedQuote.append(p,footer,br,likeBtn,deleteBtn, editBtn)
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
            body: JSON.stringify({
                quoteId: quote.id,
                createdAt: new Date()})
        }

        fetch("http://localhost:3000/likes", configObj)
        .then(res => res.json())
        .then(newLike => {
            let id = newLike.quoteId
            let quoteSpan = document.getElementById(`${id}`)
            let num = parseInt(quoteSpan.innerText)
            //debugger
            quoteSpan.innerText = num += 1
        })

    })

    // Create edit form
    const editForm = document.createElement('FORM')
    editForm.id = `edit-quote-${quote.id}`
    editForm.style.display = "none"

    let formDiv = document.createElement('div')
    formDiv.className = "form-group"
    formDiv.id = `form-id-${quote.id}`

    let quoteLabel = document.createElement('label')
    quoteLabel.for = "edited-quote"
    quoteLabel.innerText = "Quote"

    let quoteInput = document.createElement('input')
    quoteInput.name = "quote"
    quoteInput.type = "text"
    quoteInput.class = "form-control"
    quoteInput.id = `edited-quote-${quote.id}`
    quoteInput.value = `${quote.quote}`

    formDiv.append(quoteLabel, quoteInput)

    
    let formDiv2 = document.createElement('div')
    formDiv2.className = "form-group"

    let authorLabel = document.createElement('label')
    authorLabel.for = "Author"
    authorLabel.innerText = "Author"

    let authorInput = document.createElement('input')
    authorInput.name = "author"
    authorInput.type = "text"
    authorInput.class = "form-control"
    authorInput.id = `author-quote-${quote.id}`
    authorInput.value = quote.author

    let editSubmitBtn = document.createElement('button')
    editSubmitBtn.innerText = "Submit Edits"

    formDiv2.append(authorLabel, authorInput)
    editForm.append(formDiv, formDiv2, editSubmitBtn)

    li.append(editForm)

    editBtn.addEventListener("click",function(){
        let quoteEditForm = document.getElementById(`edit-quote-${quote.id}`)
        quoteEditForm.style.display = "block"

        quoteEditForm.addEventListener('submit', function(e){
            e.preventDefault()
            
            let newQuoteValue = e.target[0].value
            let newAuthorValue = e.target[1].value

            let configObj = { 
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    quote: newQuoteValue,
                    author: newAuthorValue
                })
            }

            fetch(`http://localhost:3000/quotes/${quote.id}/?_embed=likes/`, configObj)
            .then(res => res.json())
            .then(updatedQuote => {
                debugger
                let pToUpdate = document.getElementById(`p-${updatedQuote.id}`)
                pToUpdate.innerText = updatedQuote.quote
                let footerToUpdate = document.getElementById(`footer-${updatedQuote.id}`)
                footerToUpdate.innerText = updatedQuote.author

                quoteEditForm.style.display = "none"
            })
            //debugger

        })
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
  
    fetch(url,configObj)
    .then(resp => resp.json())
    .then(quote => addQuote(quote))

    })
})






