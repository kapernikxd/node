const { remove } = require('js-cookie')

const Pool = require('pg').Pool


const pool = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: ,
  multipleStatements: true,
})



//выводим данные по транзакциям (страница reports)
const reports = (data) => {
    return new Promise(function(resolve, reject) {
      const { dataStart, dataEnd, login } = data
      let sql = 
      //вместо * сделать получаемые столбцы
      `
        select * from clientstranzactions
        where login = '${login}'
        and transactiondate BETWEEN '${dataStart}' AND '${dataEnd}'
      `
      
      //получаем total значения
      let sql2 = 
      `
        SELECT SUM (quantity) AS totalquantity, SUM (amount) AS totalamount, SUM (amountnodiscount) AS amountnodiscount
        FROM clientstranzactions
        WHERE login = '${login}'
        AND transactiondate BETWEEN '${dataStart}' AND '${dataEnd}' 
      ` 

      pool.query(sql ,(error, results) => {
        if (error) {
          console.log("Ошибка")
          reject(error)
        }
        pool.query(sql2 ,(error, results2) => {
          if (error) {
            console.log("Ошибка")
            reject(error)
          }
          
          resolve({dataTable: results.rows, totalData: results2.rows });          
        })
        // resolve(results.rows);          
      })



    }) 
  }



//allow-azs get list
const azsList = (data) => {
    return new Promise(function(resolve, reject) {
      const { login } = data
      let sql = 
      `
        SELECT 
          azslist_copy.azsname as azs,
          CASE 
            WHEN B.show_azs is null
            THEN '0'
            ELSE B.show_azs
            END as enabled
        FROM azslist_copy
        LEFT JOIN (
          SELECT * FROM azsnsi_copy
          WHERE login = '${login}'
        ) AS B
        ON azslist_copy.azsname = B.azs
        ORDER BY azslist_copy.azsname ASC
      `

      pool.query(sql ,(error, results) => {
        if (error) {
          console.log("Ошибка")
          reject(error)
        }
        resolve({azsList: results.rows});          
      })



    }) 
  }



//allow-azs get nsi with azs
const azsNsi = (data) => {
  return new Promise(function(resolve, reject) {
    const { login, azs } = data
    let sql = 
    `
      SELECT 
        upper(nsi.name) AS name,
        upper(nsi.isparent) as isParent,
        nsi.parentname,
        CASE 
          WHEN B.nsi is null
          THEN 'false'
          ELSE 'true'
          END as enabled
      FROM nsi
      LEFT JOIN (
        SELECT 
          nsi
        FROM azsnsi
        WHERE login ='${login}'
        AND azs = '${azs}'
      ) AS B
      ON nsi.name = B.nsi
      WHERE nsi.inactive = '0'
      ORDER BY orderrow
    `

    pool.query(sql ,(error, results) => {
      if (error) {
        console.log("Ошибка")
        reject(error)
      }
      resolve({azsNsiList: results.rows});          
    })



  }) 
}



const getGosNumbers = (data) => {
  return new Promise(function(resolve, reject) {
    const { login } = data
    let sql = 
    `
    SELECT
      DISTINCT(upper(identificator)) as Госномер,
      '' as PinCode,
      '' as Держатель,
      '' as Моб,
      '' as НомерТелефона	
    FROM identificators
    WHERE login = '${login}'
    `

    pool.query(sql ,(error, results) => {
      if (error) {
        console.log("Ошибка")
        reject(error)
      }
      resolve({Идентификаторы: results.rows});          
    })



  }) 
}


const getGosNumbersLimits = (data) => {
  return new Promise(function(resolve, reject) {
    const { login, gosNumber } = data
    let sql = 
    `
    SELECT 
      typelimit as ВидЛимита,
      upper(identificator) as Госномер,
      edate as ДатаОкончания,
      limitvalue as ЗначениеЛимита,
      upper(nsi) as НоменклатураГруппа,
      CASE 
        WHEN isparent = '1'
        THEN 'Да'
        ELSE 'Нет'
        END as ЭтоГруппа
    FROM actualreg
    WHERE login = '${login}'
    AND limitvalue != '0'
    AND upper(identificator) = '${gosNumber}'
    `

    pool.query(sql ,(error, results) => {
      if (error) {
        console.log("Ошибка")
        reject(error)
      }
      resolve({Лимиты: results.rows});          
    })



  }) 
}




const getNumbersWithSettings = (data) => {
  return new Promise(function(resolve, reject) {
    const { login } = data
    let sql = 
    `
    SELECT
      DISTINCT(upper(identificator)) as gn
    FROM identificators
    WHERE login = '${login}'
    `

    pool.query(sql ,(error, results) => {
      if (error) {
        console.log("Ошибка")
        reject(error)
      }
      resolve({gosNumbers: results.rows});          
    })



  }) 
}




//massedit полкчение номенклатуры
const getNsiList = () => {
  return new Promise(function(resolve, reject) {
    let sql = 
    `
      SELECT 
        upper(nsi.name) AS name,
        upper(nsi.parentname) as parentname,
        CASE 
          WHEN nsi.isparent = '0'
          THEN 'false'
          ELSE 'true'
        END as isParent
      FROM nsi
      ORDER BY orderrow
    `

    pool.query(sql ,(error, results) => {
      if (error) {
        console.log("Ошибка")
        reject(error)
      }
      resolve({СписокПозиций: results.rows});          
    })



  }) 
}

  module.exports = {
    reports,
    azsList,
    azsNsi,
    getGosNumbers,
    getGosNumbersLimits,
    getNumbersWithSettings,
    getNsiList
  }