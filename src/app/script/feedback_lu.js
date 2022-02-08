//Arguments : id feedback
//A appeler quand l'utilisateur a lu un nouveau feedback
//Change la valeur lu de false à true 

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var scanf = require('scanf');

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

    console.log('id_feedback ?');
    var id_feedback = scanf('%d');

    console.log('Change la valeur de lu d\'un feedback à true');
    await connection.execute(
      //`INSERT INTO feedback (po_document) VALUES (:bv)`,
      `UPDATE feedback 
      SET po_document = json_mergepatch(po_document,'{ "lu" : true }')
      WHERE JSON_VALUE(po_document, '$.id_feedback') = (:bv)`,
      [id_feedback],
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