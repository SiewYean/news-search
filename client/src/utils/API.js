import axios from "axios";

export default {
    getArticles: function() {
        return axios.get("/api/article");
    },
    searchAPI: function(query) {
        return axios.get("/api/article/" + query.title );
    },
    deleteArticle: function(id) {
        console.log("Delete " + id);
        return axios.delete("/api/article/" + id);
    },
    deleteAllArticle: function() {
        console.log("Delete all articles from database");
        return axios.delete("/api/article/");
    },
    saveArticle: function(articleData) {
        return axios.post("/api/article", articleData);
    },
};
