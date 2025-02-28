const axios = require("axios")
const FormData = require("form-data")
 
const ttSearch = async (query) => {
    try {
        let d = new FormData();
        d.append("keywords", query);
        d.append("count", 15);
        d.append("cursor", 0);
        d.append("web", 1);
        d.append("hd", 1);
 
        let h = {
            headers: {
                ...d.getHeaders()
            }
        }
 
        let { data } = await axios.post("https://tikwm.com/api/feed/search", d, h);
 
        const baseURL = "https://tikwm.com";
 
        const videos = data.data.videos.map(video => {
            return {
                ...video,
                play: baseURL + video.play,
                wmplay: baseURL + video.wmplay,
                music: baseURL + video.music,
                cover: baseURL + video.cover,
                avatar: baseURL + video.avatar
            };
        });
 
        return videos;
    } catch (e) {
        return e
    }
}
 
module.exports = { ttSearch }