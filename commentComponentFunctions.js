function createCommentComponent(commentData,currentUser){
    let editDeleteBtns = `
        <a href="#" class=delete-comment>
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
            Delete
        </a>
        <a href="#" class="edit-comment">
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
            Edit
        </a>
    `
    let rplyBtn = `
    <a href="#" class="reply-btn">
        <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
        Reply
    </a>
    `
    let innerHtlmComment = `
            <div class="comment" data-id=${commentData.id}>
                <div class="score-comment">
                    <div class="score-icon">
                        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
                    </div>
                    <div class="score-number">${commentData.score}</div>
                    <div class="score-icon">
                        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
                    </div>
                </div>
                <div class="main-comment">
                    <div class="header-comment">
                        <div class="maininfo-comment">
                            <img class="userimage-comment" src="${commentData.user.image.png}" alt="" />
                            <div class="username-comment">${commentData.user.username}</div>
                            ${commentData.user.username ===currentUser.username ? '<div class="isCurrentUser">you</div>' : ''}
                            <div class="time">${commentData.createdAt}</div>
                        </div>
                        <div class="reply-button">
                            ${(commentData.user.username === currentUser.username) ? editDeleteBtns : rplyBtn}
                        </div>
                    </div>
                    <div class="body-comment">
                        <span class="replyingTo">${commentData.replyingTo ? '@'+commentData.replyingTo :''}</span> ${commentData.content}
                    </div>
                </div>
            </div>
    `
    const elementCreated = document.createElement("div")
    elementCreated.classList.add("comment-component")
    elementCreated.innerHTML = innerHtlmComment
    return elementCreated
}

function insertReplyElementCommentElement(commentElement,replyElement){
    if(commentElement.querySelector('.list-replies')){
        commentElement.querySelector('.list-replies').appendChild(replyElement)
    }else{
        const ripliesElement = document.createElement("div")
        ripliesElement.classList.add("list-replies")
        ripliesElement.appendChild(replyElement)

        const verticalElement = document.createElement("div")
        verticalElement.classList.add("vertical-line")

        const sectionReplies = document.createElement("div")
        sectionReplies.classList.add("replies-section")

        sectionReplies.appendChild(verticalElement)
        sectionReplies.appendChild(ripliesElement)

        commentElement.appendChild(sectionReplies)
    }
}

function maxIdComments(comments,accum=[]){
    comments.map(el=>{
        if(el.replies && el.replies.length>0){
            maxIdComments(el.replies,accum)
        }
        accum.push(el.id)
    })
    return Math.max(...accum)
}

function createReplyComment(commentElement,dataForm,dataComments){
    if(dataForm.get('add-comment').trim()!==''){
        commentElement.nextElementSibling.remove()
        const el = {
            "id":maxIdComments(dataComments.comments)+1,
            "content": dataForm.get('add-comment'),
            "createdAt": "recently",
            "score": 0,
            "user": {
                "image": { 
                    "png": dataComments.currentUser.image.png,
                    "webp": dataComments.currentUser.image.webp
                },
                "username": dataComments.currentUser.username
            }
        }
        const comment = createCommentComponent(el,dataComments.currentUser)
        if(commentElement.parentElement.querySelector('.replies-section')){
            commentElement.nextElementSibling.querySelector('.list-replies').appendChild(comment)
        }else{
            const sectionReplies = document.createElement("div")
            sectionReplies.classList.add("replies-section")
            const verticalElement = document.createElement("div")
            verticalElement.classList.add("vertical-line")
            const ripliesElement = document.createElement("div")
            ripliesElement.classList.add("list-replies")
            ripliesElement.appendChild(comment)
            sectionReplies.appendChild(verticalElement)
            sectionReplies.appendChild(ripliesElement)
            commentElement.parentElement.appendChild(sectionReplies)
        }
    }
}
export function createfirstLevelComment(dataForm,dataComments){
    if(dataForm.get('add-comment').trim()!==''){
        const form = document.querySelector('.commentForm')
        console.log(form)
        const el = {
            "id":maxIdComments(dataComments.comments)+1,
            "content": dataForm.get('add-comment'),
            "createdAt": "recently",
            "score": 0,
            "user": {
                "image": { 
                    "png": dataComments.currentUser.image.png,
                    "webp": dataComments.currentUser.image.webp
                },
                "username": dataComments.currentUser.username
            }
        }
        const comment = createCommentComponent(el,dataComments.currentUser)
        form.insertAdjacentElement('beforebegin',comment)
    }
}

function hasReplies(comment){
    return (comment.replies && comment.replies.length>0) ? true :false
}

export function addFormCommentInFragment(fragment,currentUser){
    const replyHtml = `
    <form action="" method="POST" class="write-comment" id="firstLevelForm">
        <img src="${currentUser.image.png}" alt="" class="photo-user">
        <textarea class="textarea-form" name="add-comment" id="add-comment" placeholder="Add a comment..."></textarea>
        <button class="btn" type="submit">SEND</button>
    </form>
    `
    const commentFormElement = document.createElement("div")
    commentFormElement.classList.add("commentForm")
    commentFormElement.innerHTML = replyHtml
    fragment.appendChild(commentFormElement)
}

export function setCommentsInFragment(commentsData,currentUser,fragment,parentElement=false){
    commentsData.forEach(commentData=>{
        let commentElement=createCommentComponent(commentData,currentUser)
        if(!parentElement){
            fragment.appendChild(commentElement)
            if(hasReplies(commentData)){
                setCommentsInFragment(commentData.replies,currentUser,fragment,commentElement)
            }
        }else{
            insertReplyElementCommentElement(parentElement,commentElement)
            if(hasReplies(commentData)){
                setCommentsInFragment(commentData.replies,currentUser,fragment,commentElement)
            }
        }
    })
}

export function replyListenerFunction(dataComments){
    const btnsReply = document.querySelectorAll(".reply-btn")
    const replyHtml = `
    <form action="" method="POST" class="write-comment reply-comment">
        <img src="${dataComments.currentUser.image.png}" alt="" class="photo-user">
        <textarea class="textarea-form" name="add-comment" id="add-comment" placeholder="Add a comment..."></textarea>
        <button class="btn" type="submit">REPLY</button>
    </form>
    `
    btnsReply.forEach(el=>{
        el.addEventListener('click',e=>{
            e.preventDefault()
            if(!document.querySelector('.reply-comment')){
                const comment = e.target.closest('.comment')
                comment.insertAdjacentHTML('afterend',replyHtml)
                comment.nextElementSibling.addEventListener('submit',e=>{
                    e.preventDefault()
                    const dataForm =new FormData(comment.nextElementSibling)
                    createReplyComment(comment,dataForm,dataComments)
                })
                
            }
        })
    })
}