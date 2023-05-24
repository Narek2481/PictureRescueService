import $api from "."

const logout = async () =>{
    const respons = await $api.get("/logout");
    if(respons.status === 200){
        localStorage.removeItem("token");
    }else{
        console.log(respons.data);
    }
    return respons;
} 

export default logout;