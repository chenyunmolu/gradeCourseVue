import axios from "../http/index.js";

const CLASS_LIST_API="/api/gradeCourse/classes";
const CLASS_SAVE_API="/api/gradeCourse/classes/saveClass";
const CLASS_UPDATE_API="/api/gradeCourse/classes/updateClass";
const CLASS_DELETE_API="/api/gradeCourse/classes/deleteClass";
const CLASS_SEARCH_API="/api/gradeCourse/classes/searchClass";

function getAllClasses(){
    return axios.get(CLASS_LIST_API);
}
function saveClass(aClass){
    return axios.post(CLASS_SAVE_API,aClass);
}
function updateClass(aClass,rawid){
    return axios.post(CLASS_UPDATE_API+"?rawid="+rawid,aClass)
}
function deleteClass(aClass){
    return axios.post(CLASS_DELETE_API,aClass)
}

function searchClass(keyword){
    return axios.get(CLASS_SEARCH_API+"?keyword="+keyword)
}
export{
    getAllClasses,saveClass,updateClass,deleteClass,searchClass
}
