//Arguments : id questionnaire
//A appeler quand l'utilisateur a repondu un nouveau questionnaire
//Change la valeur repondu de false à true 

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var scanf = require('scanf');

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

    console.log('id_questionnaire ?');
    var id_questionnaire = scanf('%d');

    console.log('Change la valeur de lu d\'un questionnaire à true');
    await connection.execute(
      //`INSERT INTO feedback (po_document) VALUES (:bv)`,
      `UPDATE questionnaire 
      SET po_document = json_mergepatch(po_document,'{ "repondu" : true }')
      WHERE JSON_VALUE(po_document, '$.id_questionnaire') = (:bv)`,
      [id_questionnaire],
      { autoCommit: true }
    );

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