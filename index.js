import {setCommentsInFragment,
    addFormCommentInFragment,
    replyListenerFunction,
    createfirstLevelComment} from './commentComponentFunctions.js'

const getComments = async ()=>{
    try {
        const dataFetch = await fetch('./data2.json')
        const dataComments = await dataFetch.json()
        const currentUser = dataComments.currentUser
        const comments = dataComments.comments

        const $fragment =document.createDocumentFragment()
        setCommentsInFragment(comments,currentUser,$fragment)
        addFormCommentInFragment($fragment,currentUser)

        document.getElementById("comments-section").appendChild($fragment)

        replyListenerFunction(dataComments)

        document.getElementById('firstLevelForm').addEventListener('submit',e=>{
            e.preventDefault()
            const dataForm =new FormData(e.target)
            createfirstLevelComment(dataForm,dataComments)
            e.target.reset()
        })
        
    } catch (error) {
        console.error(error)
    }
}

getComments()
    