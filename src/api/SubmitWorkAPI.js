import axios from "../http/index"
const SUBMITWORK_UPDATE_API="/api/gradeCourse/submitWork/updateSubmitWork"

function updateSubmitWork(submitWork){
    return axios.post(SUBMITWORK_UPDATE_API,submitWork)
}

export{
    updateSubmitWork
}