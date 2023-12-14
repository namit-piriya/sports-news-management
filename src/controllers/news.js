const News = require('../../src/models/news')
const createNews = async (newsData) => {
    try {
        const news = await News.createNews(newsData)
        console.log('news', news)
        if (news && news.affectedRows > 0) {
            return newsData
        }
        return null;
    } catch (err) {
        return null;
    }

};

const getNewsByMatchId = async (matchId) => {
    try {
        return News.getNewsByMatchId(matchId);
    } catch (err) {
        return null;
    }

};

const getNewsByTourId = async (tourId) => {
    try {
        const news =  await News.getNewsByTourId(tourId);
        return news;
    } catch (err) {
        console.log("err", err);
        return null;
    }

};

const getNewsBySportId = async (sportId) => {
    try {
        return News.getNewsBySportId(sportId);
    } catch (err) {
        return null;
    }

};

module.exports = {
    createNews,
    getNewsByMatchId,
    getNewsByTourId,
    getNewsBySportId,
};
