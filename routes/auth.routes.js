const {Router} = require('express')
const router = Router()
const {login, showLogins} = require('../controllers/auth.controller')
const controllers = require('../controllers/index')

const passport = require('passport')

// /api/logins
router.post('/logins', login)



// Тестовый запрос вывод логинов
router.get(
    '/getlogins', 
    passport.authenticate('jwt', {session: false}),
    showLogins)


//Страница транзакций
router.get(
    '/reports', 
    passport.authenticate('jwt', {session: false}),
    controllers.reports)



//Для станицы allow-azs
router.get(
    '/azslist', 
    passport.authenticate('jwt', {session: false}),
    controllers.azsList)



//Для станицы controls
router.get(
    '/GetRegByNumbers', 
    passport.authenticate('jwt', {session: false}),
    controllers.getGosNumbers)


//Для станицы controls - лимиты
router.get(
    '/GetLimitsByNumber', 
    passport.authenticate('jwt', {session: false}),
    controllers.getGosNumbersLimits)



//Для станицы массовое управление - госномера
router.get(
    '/getNumbersWithSettings', 
    passport.authenticate('jwt', {session: false}),
    controllers.getNumbersWithSettings)


//Для станицы массовое управление - список номенклатуры
router.get(
    '/getNsiList', 
    passport.authenticate('jwt', {session: false}),
    controllers.getNsiList)



module.exports = router
