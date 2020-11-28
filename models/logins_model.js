const Pool = require('pg').Pool


const pool = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: ,
  multipleStatements: true,
})




//находим usera для bycript
const findUser = (body) => {
  return new Promise(function(resolve, reject) {
    // console.log("models ", body)
    const { login } = body
    let sql = `SELECT * FROM logins WHERE login = '${login}'`
    pool.query(sql, (error, results) => {
      if (error) {
        console.log("Ошибка")
        reject(error)
      }
      resolve(results.rows);          
    })
  }) 
}

//passportJWT
const confirmUser = (date) => {
  return new Promise(function(resolve, reject) {
    // console.log("models ", body)
    let sql = `SELECT * FROM logins WHERE login = '${date}'`
    // let sql = `SELECT * FROM logins WHERE login = 'atlgp'`
    pool.query(sql, (error, results) => {
      if (error) {
        console.log("Ошибка")
        reject(error)
      }
      resolve(results.rows);          
    })
  }) 
}



const getLogins = () => {
    return new Promise(function(resolve, reject) {
      let sql ='SELECT * FROM logins ORDER BY id ASC'; 
      pool.query(sql, (error, results) => {
        if (error) {
          console.log("Ошибка")
          reject(error)
        }
        resolve(results.rows);
        
      })
    }) 
  }



  
module.exports = {
    getLogins,
    findUser,
    confirmUser

  }