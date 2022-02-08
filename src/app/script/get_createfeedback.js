//Arguments : id_user
//Récupère les create_feedback du user

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var scanf = require('scanf');

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

    console.log('id_user ?');
    var id_user = scanf('%d');

    console.log('\nAffichage des JSON creation feedback qui possède id user %d', id_user);
    result = await connection.execute(
      `SELECT po_document
       FROM creation_feedback
       WHERE JSON_VALUE(po_document, '$.id_user') = (:bv)`,
       [id_user]
    );
    console.log('Resultats: \n', result.rows);

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