const express = require('express');
const News = require('../models/news');

module.exports = function (app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            const newsData = req.body;
            const createdNews = await News.createNews(newsData);
            res.status(201).json({message: 'News created successfully', news: createdNews});
        } catch (error) {
            return next(error);
        }
    });

    app.route('/news/match/:matchId').get(async (req, res, next) => {
        try {
            const matchId = req.params.matchId;
            const newsByMatchId = await News.getNewsByMatchId(matchId);
            res.json({message: `News for Match ID ${matchId}`, data: newsByMatchId});
        } catch (error) {
            return next(error);
        }
    });

    app.route('/news/tour/:tourId').get(async (req, res, next) => {
        try {
            const tourId = req.params.tourId;
            const newsByTourId = await News.getNewsByTourId(tourId);
            res.json({message: `News for Tour ID ${tourId}`, data: newsByTourId});
        } catch (error) {
            return next(error);
        }
    });

    app.route('/news/sport/:sportId').get(async (req, res, next) => {
        try {
            const sportId = req.params.sportId;
            const newsBySportId = await News.getNewsBySportId(sportId);
            res.json({message: `News for Sport ID ${sportId}`, data: newsBySportId});
        } catch (error) {
            return next(error);
        }
    });

};
