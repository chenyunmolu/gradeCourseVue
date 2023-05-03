import axios from "../http/index.js";

const WORK_LISTBYTID_API="/api/gradeCourse/releasework/getWorkByTid"
const WORK_SAVE_API="/api/gradeCourse/releasework/saveWork"
const WORK_UPDATE_API="/api/gradeCourse/releasework/updateWork"
const WORK_DELETE_API="/api/gradeCourse/releasework/deleteWork"
const WORK_SEARCH_API="/api/gradeCourse/releasework/searchWork"

function getWorkByTid(tid){
    return axios.get(WORK_LISTBYTID_API+"?tid="+tid);
}

function saveWork(work){
    return axios.post(WORK_SAVE_API,work);
}

function updateWork(work){
    return axios.post(WORK_UPDATE_API,work);
}

function deleteWork(work){
    return axios.post(WORK_DELETE_API,work);
}

function searchWork(keyword,tid){
    return axios.get(WORK_SEARCH_API,{
        params:{
            "keyword":keyword,
            "tid":tid
        }
    })
}

export{getWorkByTid,saveWork,updateWork,deleteWork,searchWork}