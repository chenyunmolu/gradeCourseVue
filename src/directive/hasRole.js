import userAuthStore from "../store/auth.store";
export default{
    inserted(el,binding){
        const {value} =binding;
        const authStore =userAuthStore();
        const roles=authStore.$state.user.roles.map((r)=>r.name);
        if(value && value.length>0){
            const hasRole=roles.includes(value);
            if(!hasRole){
                el.parentNode && el.parentNode.removeChild(el);
            }
        }else{
            throw new Error(`请设置角色权限标签值`);
        }
    }
}