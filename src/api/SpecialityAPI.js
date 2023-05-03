import axios from "../http/index";

const SPEC_LIST_API="/api/gradeCourse/spec"
const SPEC_SAVE_API="/api/gradeCourse/spec/saveSpec"
const SPEC_UPDATE_API="/api/gradeCourse/spec/updateSpec"
const SPEC_DELETE_API="/api/gradeCourse/spec/deleteSpec"
const SPEC_SEARCH_API="/api/gradeCourse/spec/searchSpec"

function getAllSpec(){
    return axios.get(SPEC_LIST_API);
}

function saveSpec(spec){
    return axios.post(SPEC_SAVE_API,spec);
}

function updateSpec(spec,specid){
    return axios.post(SPEC_UPDATE_API+"?specid="+specid,spec);
}
function deleteSpec(spec){
    return axios.post(SPEC_DELETE_API,spec);
}
function searchSpec(keyword){
    return axios.get(SPEC_SEARCH_API+"?keyword="+keyword)
}


export{ getAllSpec,saveSpec,updateSpec,deleteSpec,searchSpec}