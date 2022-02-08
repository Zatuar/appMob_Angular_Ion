//Argument : id_destinataire
//Récupère les feedbacks envoyés à ce user

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var scanf = require('scanf');

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

    console.log('id_destinataire ?');
    var id_destinataire = scanf('%d');

    console.log('\nAffichage des JSON feedback qui possède id destinataire %d', id_destinataire);
    result = await connection.execute(
      `SELECT po_document
       FROM feedback
       WHERE JSON_VALUE(po_document, '$.id_destinataire') = (:bv)`,
       [id_destinataire]
    );
    console.log('Resultats: ', result.rows);

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