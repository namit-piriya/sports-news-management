const newsService = require('../../src/controllers/news');
const News = require('../../src/models/news');

jest.mock('../../src/models/news');

describe('News Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createNews', () => {
        it('should create news and return the newsData if affectedRows > 0', async () => {
            const newsData = {
                title: 'Test News',
                description: 'This is a test news article.',
                matchId: 123,
                tourId: 456,
                sportId: 789,
            };
            const mockNews = {
                affectedRows: 1,
            };
            News.createNews.mockResolvedValueOnce(mockNews);
            const result = await newsService.createNews(newsData);

            expect(News.createNews).toHaveBeenCalledWith(newsData);
            expect(result).toEqual(newsData);
        });

        it('should return null if affectedRows is not greater than 0', async () => {
            const newsData = {
                title: 'Test News',
                description: 'This is a test news article.',
                matchId: 123,
                tourId: 456,
                sportId: 789,
            };

            const mockNews = {
                affectedRows: 0,
            };

            News.createNews.mockResolvedValueOnce(mockNews);

            const result = await newsService.createNews(newsData);

            expect(News.createNews).toHaveBeenCalledWith(newsData);
            expect(result).toBeNull();
        });
    });

    describe('getNewsByMatchId', () => {
        it('should get news by matchId', async () => {
            const matchId = 123;
            const mockNews = [
                {
                    id: 1,
                    title: 'Test News 1',
                    description: 'This is a test news article 1.',
                },
                {
                    id: 2,
                    title: 'Test News 2',
                    description: 'This is a test news article 2.',
                },
            ];

            News.getNewsByMatchId.mockResolvedValueOnce(mockNews);
            const result = await newsService.getNewsByMatchId(matchId);
            expect(News.getNewsByMatchId).toHaveBeenCalledWith(matchId);
            expect(result).toEqual(mockNews);
        });
    });

    describe('getNewsByTourId', () => {
        it('should get news by tourId', async () => {
            const tourId = 456;
            const mockNews = [
                {
                    id: 3,
                    title: 'Test News 3',
                    description: 'This is a test news article 3.',
                },
                {
                    id: 4,
                    title: 'Test News 4',
                    description: 'This is a test news article 4.',
                },
            ];

            News.getNewsByTourId.mockResolvedValueOnce(mockNews);

            const result = await newsService.getNewsByTourId(tourId);

            expect(News.getNewsByTourId).toHaveBeenCalledWith(tourId);
            expect(result).toEqual(mockNews);
        });

        it('should return null if getNewsByTourId fails', async () => {
            const tourId = 456;
            let result;
            const createError = new Error('Database error');
            News.getNewsByTourId.mockRejectedValueOnce(createError);
            result = await newsService.getNewsByTourId(tourId);
            expect(News.getNewsByTourId).toHaveBeenCalledWith(tourId);
            expect(result).toBeNull();
        });
    });

    describe('getNewsBySportId', () => {
        it('should get news by sportId', async () => {
            const sportId = 789;
            const mockNews = [
                {
                    id: 5,
                    title: 'Test News 5',
                    description: 'This is a test news article 5.',
                },
                {
                    id: 6,
                    title: 'Test News 6',
                    description: 'This is a test news article 6.',
                },
            ];

            News.getNewsBySportId.mockResolvedValueOnce(mockNews);
            const result = await newsService.getNewsBySportId(sportId);
            expect(News.getNewsBySportId).toHaveBeenCalledWith(sportId);
            expect(result).toEqual(mockNews);
        });
    });



});
