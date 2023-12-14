const express = require('express');
const News = require('../controllers/news');
const {body, validationResult} = require('express-validator');

const validateCreateNews = [body('title').notEmpty().withMessage('News title is required'),
    body('description').notEmpty().withMessage('News description is required'),
    body('matchId').optional().isInt({min: 1}).withMessage('Invalid matchId'),
    body('tourId').optional().isInt({min: 1}).withMessage('Invalid tourId'),
    body('sportId').optional().isInt({min: 1}).withMessage('Invalid sportId')];


module.exports = function (app) {
    app.route('/news').post(validateCreateNews, async (req, res, next) => {
        try {
            const newsData = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
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
