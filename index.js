import {setCommentsInFragment,
    addFormCommentInFragment,
    addCommentListeners,
    addEditRemoveListeners} from './commentComponentFunctions.js'

const getComments = async ()=>{
    try {

        // Get data of Comments from file data.json by fetch
        const dataFetch = await fetch('./data.json')
        const dataComments = await dataFetch.json()
        const currentUser = dataComments.currentUser
        const comments = dataComments.comments

        // Creating a fragment in order to optimize code and insert comments to it by bucles
        const $fragment =document.createDocumentFragment()
        setCommentsInFragment(comments,currentUser,$fragment)

        // Adding the form comment after insert comments, this form is showed below of all comments
        addFormCommentInFragment($fragment,currentUser)

        // Inserting fragment in the comments-section
        document.getElementById("comments-section").appendChild($fragment)

        // Adding Listeners of Forms of new comments
        addCommentListeners(dataComments)

        // Adding Listeners of edit and delete form of current user
        addEditRemoveListeners(dataComments)    

    } catch (error) {
        console.error(error)
    }
}

getComments()
    