const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const logins_model = require('../models/logins_model')



module.exports.login = (req, res) => {

   logins_model.findUser(req.body)
   .then(response => {
        if(response == ""){
            res.status(401).send({messsge:"Пользователь не найден"});
        }
        else {

        // const isPasswordCorrect = bcrypt.compareSync(req.body.password, response[0].password)
        // const isPasswordCorrect = ("Пароль присланный " + req.body.password + " Пароль из БД " + response[0].password)
        
            if (req.body.password == response[0].password) {
                const token = jwt.sign({
                login: response[0].login,
                userId: response[0].password
                }, keys.JWT, {expiresIn: 60 * 60})       
                res.status(200).send(token)
                } 
                    
            else {
                res.status(401).send({message: 'Пароль неверен'})
            }

        }
    })
    .catch(error => {
        res.status(500).send(error);
    }) 

}



module.exports.showLogins = (req, res) => {

    logins_model.getLogins()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
 
 }