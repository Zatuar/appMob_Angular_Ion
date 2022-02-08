//Argument : adresse mail de connexion
//Récupère le profile du user

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var scanf = require('scanf');

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

    console.log('mail ?');
    var mail = scanf('%s');

    console.log('\nAffichage du profile qui possède adresse mail %s', mail);
    result = await connection.execute(
      `SELECT po_document
       FROM profile
       WHERE JSON_VALUE(po_document, '$.mail') = (:bv)`,
       [mail]
    );
    console.log('Profile : ', result.rows[0][0]); 

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();