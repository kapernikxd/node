const model = require('../models/index')


//страница транзакции
module.exports.reports = (req, res) => {

    let dataStart = req.query.dataStart;
    let dataEnd = req.query.dataEnd;
    let login = req.query.login;  

   model.reports({dataStart: dataStart, dataEnd: dataEnd, login: login})
   .then(response => {
        if(response != ""){
            res.status(200).send(response);
        }
        else {
            res.status(200).send({message: 'Нет данных за выбранный период'})
        }
    })
    .catch(error => {
        res.status(500).send(error);
    }) 

}


//страница разрешенные АЗС 
module.exports.azsList = (req, res) => {

   let login = req.query.login;  

   model.azsList({login: login})
   .then(response => {
        if(response != ""){
            res.status(200).send(response);
        }
        else {
            res.status(200).send({message: 'Нет данных'})
        }
    })
    .catch(error => {
        res.status(500).send(error);
    }) 

}

//страница разрешенные АЗС 
module.exports.azsNsi = (req, res) => {

    let login = req.query.login;
    let azs = req.query.azs; 
 
    model.azsNsi({login: login, azs: azs})
    .then(response => {
         if(response != ""){
             res.status(200).send(response);
         }
         else {
             res.status(200).send({message: 'Нет данных'})
         }
     })
     .catch(error => {
         res.status(500).send(error);
     }) 
 
 }




 //страница controls
module.exports.getGosNumbers = (req, res) => {

    let login = req.query.login;
 
    model.getGosNumbers({login: login})
    .then(response => {
         if(response != ""){
             res.status(200).send(response);
         }
         else {
             res.status(200).send({message: 'Нет данных'})
         }
     })
     .catch(error => {
         res.status(500).send(error);
     }) 
 
 }



//страница controls - лимиты
module.exports.getGosNumbersLimits = (req, res) => {

    let login = req.query.login;
    let gosNumber = req.query.gosNumber
 
    model.getGosNumbersLimits({login: login, gosNumber: gosNumber})
    .then(response => {
         if(response != ""){
             res.status(200).send(response);
         }
         else {
             res.status(200).send({message: 'Нет данных'})
         }
     })
     .catch(error => {
         res.status(500).send(error);
     }) 
 
 }




 //страница массовое управления
module.exports.getNumbersWithSettings = (req, res) => {

    let login = req.query.login;
 
    model.getNumbersWithSettings({login: login})
    .then(response => {
         if(response != ""){
             res.status(200).send(response);
         }
         else {
             res.status(200).send({message: 'Нет данных'})
         }
     })
     .catch(error => {
         res.status(500).send(error);
     }) 
 
 }



  //страница массовое управления
module.exports.getNsiList = (req, res) => {

 
    model.getNsiList()
    .then(response => {
         if(response != ""){
             res.status(200).send(response);
         }
         else {
             res.status(200).send({message: 'Нет данных'})
         }
     })
     .catch(error => {
         res.status(500).send(error);
     }) 
 
 }



