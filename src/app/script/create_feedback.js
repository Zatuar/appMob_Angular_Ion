//Arguments : id_user, id_destinataire, titre, texte
//Stocke un creation_feedback et un feedback

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

    console.log('id_destinataire ?');
    var id_destinataire = scanf('%d');

    console.log('Titre ?');
    var titre = scanf('%s');

    console.log('Texte ?');
    var texte = scanf('%s');

    //Récupère le nombre de feedback pour incrémenter l'id 
    console.log('Récupère le nombre de feedback');
    result = await connection.execute(
      `SELECT COUNT(*) from creation_feedback`
    );
    console.log('Nombre de feedback : ', result.rows[0][0]); 
    id_feedback = result.rows[0][0] + 1;

    console.log('Stocke un feedback création');
    const data1 = { "id_feedback" : id_feedback, "id_user": id_user, "id_destinataire": id_destinataire, "titre": titre, "texte" : texte };
    const s1 = JSON.stringify(data1);
    await connection.execute(
      `INSERT INTO creation_feedback VALUES (:id, :bv)`,
      {id : id_feedback, bv : s1},
      { autoCommit: true }
    );

    console.log('Stocke un feedback');
    const data2 = { "id_feedback" : id_feedback, "id_sender": id_user, "id_destinataire": id_destinataire, "titre": titre, "texte" : texte, "lu" : false };
    const s2 = JSON.stringify(data2);
    await connection.execute(
      `INSERT INTO feedback VALUES (:id, :bv)`,
      {id : id_feedback, bv : s2},
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