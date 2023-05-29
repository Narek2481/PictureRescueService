import axios from "axios";



const $api = axios.create({
    withCredentials: true
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config
})

$api.interceptors.response.use(config => {
    return config;
}, async err => {
    const originalRequest = err.config;
    if (err.response.status === 401 && err.config && !err.config.isRetry) {
        try {
            const respons = await axios.get("/refresh", { withCredentials: true })
            localStorage.setItem("token", JSON.stringify(respons.data.accessToken))
            return $api.request(originalRequest);
        } catch (e) {
            console.log("user not autorezown")
        }
    }
    throw err
})

export default $api;