function getHtmlComment(el){
    return `
        <div className="score-comment">
            <img src="./images/icon-plus.svg" alt="" />
            <div className="score-number">${el.score}</div>
            <img src="./images/icon-minus.svg" alt="" />
        </div>
        <div className="main-comment">
            <div className="header-comment">
                <img className="userimage-comment" src="${el.user.image.png}" alt="" />
                <div className="username-comment">${el.user.username}</div>
                <div className="time">${el.createdAt}</div>
            </div>
            <div className="body-comment">
                ${el.content}
            </div>
            <img src="./images/icon-reply.svg" alt="" className="replay" />
        </div>
    `
}

const getComments = async ()=>{
    try {
        const comments = await fetch('./data.json')
        const res = await comments.json()
        const $fragment =document.createDocumentFragment()
        console.log(res.comments)
        res.comments.map(el=>{
            const comment =document.createElement("div")
            comment.classList.add("comment")
            comment.innerHTML= getHtmlComment(el)
            console.log(el.replies.length)
            if (el.replies.length>0){
                el.replies.map(el=>{
                    const element = document.createElement('div')
                    element.classList.add("comment-replay")
                    element.innerHTML=getHtmlComment(el)
                    comment.appendChild(element)
                })
            }
            $fragment.appendChild(comment)
        })
        console.log($fragment)
        document.getElementById("comments-component").appendChild($fragment)
        
    } catch (error) {
        console.error(error)
    }
}
getComments()