const News = require('../../src/models/news')
const createNews = async (newsData) => {
    return News.createNews(newsData)
};

const getNewsByMatchId = async (matchId) => {
   return News.getNewsByMatchId(matchId);
};

const getNewsByTourId = async (tourId) => {
    return News.getNewsByTourId(tourId);
};

const getNewsBySportId = async (sportId) => {
    return News.getNewsBySportId(sportId);
};

module.exports = {
    createNews,
    getNewsByMatchId,
    getNewsByTourId,
    getNewsBySportId,
};
