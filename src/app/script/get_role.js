//Argument : id_user
//Récupère le role du user

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var scanf = require('scanf');

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

    console.log('id user ?');
    var id_user = scanf('%d');

    console.log('\nAffichage du role que possède id_user %d', id_user);
    result = await connection.execute(
      `SELECT JSON_VALUE(po_document, '$.role')
       FROM profile
       WHERE JSON_VALUE(po_document, '$.id_user') = (:bv)`,
       [id_user]
    );
    console.log('Role : ', result.rows[0][0]); 

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