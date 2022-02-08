//Arguments : id_user et id_questionnaire pour récupérer le JSON questionnaire concerné
//Récupère les réponses pour chaque question (provenance du front)
//Stocke un JSON rep_quest 

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

    console.log('id_questionnaire ?');
    var id_questionnaire = scanf('%s');

    console.log('\nAffichage du JSON questionnaire que possède id user :  %d et id_questionnaire : %d', id_user, id_questionnaire);
    result = await connection.execute(
      `SELECT po_document
       FROM questionnaire
       WHERE JSON_VALUE(po_document, '$.id_user') = (:bv)
       AND JSON_VALUE(po_document, '$.id_questionnaire') = (:cv)`,
       [id_user, id_questionnaire]
    );

    console.log('Questionnaire : ', result.rows[0][0]);

    console.log('id_question (temporaire) ?');
    var id_question = scanf('%s');
    console.log('reponse_choisi (temporaire) ?');
    var reponse_choisi = scanf('%s');

    console.log('Stocke un questionnaire réponse');
    const data1 = { "id_questionnaire": id_questionnaire, "id_user": id_user, "reponses": {
        "id_question": id_question, "reponse_choisi": reponse_choisi
        }
    };

    const s1 = JSON.stringify(data1);
    await connection.execute(
      `INSERT INTO rep_quest (po_document) VALUES (:bv)`,
      [s1], 
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