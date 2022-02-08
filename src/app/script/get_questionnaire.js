//Argument : id_user
//Affiche les questionnaires associés à cet utilisateur

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var scanf = require('scanf');

async function run(id_user) {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

    //console.log('id_user ?');
    //var id_user = scanf('%d');

  //  console.log('\nAffichage des JSON questionnaire que possède id user :  %d', id_user);
    result = await connection.execute(
      `SELECT po_document
       FROM questionnaire
       WHERE JSON_VALUE(po_document, '$.id_user') = (:bv)`,
       [id_user]
    );

    var number_questionnaire = result.rows.length;
    console.log('Number of questionnaires : ', number_questionnaire); 

    for ( var i = 0; i < number_questionnaire; i++) {
        var questionnaire = result.rows[i][0];
        console.log('Questionnaire : ' + (i+1), questionnaire); 
    }

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
  return result;
}

run();