const router = require('express').Router();
const userController = require('../controllers/user.controller.js');
const { body} = require('express-validator');
const { authenticate } = require('../middlewares/middleware.js');

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long')
],userController.register);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long')
],userController.login);

router.get('/profile',authenticate, userController.getProfile);
router.get('/questions',authenticate, userController.getQuestions);
router.get('/myscores',authenticate, userController.getMyScoreboard);

router.post('/score', [
    body('score').notEmpty().withMessage('Score is required')
        .isInt({ min: 0, max: 20 }).withMessage('Score must be between 0 and 20'),
    body('minutes').notEmpty().withMessage('Minutes is required')
        .isInt({ min: 0, max: 9 }).withMessage('Minutes must be between 0 and 9'),
    body('seconds').notEmpty().withMessage('Seconds is required')
        .isInt({ min: 0, max: 59 }).withMessage('Seconds must be between 0 and 59')
], authenticate, userController.saveScore);

router.get('/myscores',authenticate, userController.getMyScoreboard);
router.get('/leaderboard',authenticate, userController.getLeaderboard);

router.get('/logout',authenticate, userController.logout);


module.exports = router;

