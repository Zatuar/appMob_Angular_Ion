//Arguments : nom, prenom, role, groupe, mail (id généré automatiquement)
//Stocke le profile

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var scanf = require('scanf');

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

    console.log('Nom ?');
    var nom = scanf('%s');

    console.log('Prénom ?');
    var prenom = scanf('%s');

    console.log('Role ?');
    var role = scanf('%s');

    console.log('Groupe ?');
    var groupe = scanf('%s');

    console.log('Mail ?');
    var mail = scanf('%s');

    //Récupère le nombre de feedback pour incrémenter l'id 
    console.log('Récupère le nombre de users');
    result = await connection.execute(
      `SELECT COUNT(*) from profile`
    );
    console.log('Nombre de users : ', result.rows[0][0]); 
    id_user = result.rows[0][0] + 1;

    console.log('Stocke un profile');
    const data1 = { "nom": nom, "prenom": prenom, "role": role, "groupe" : groupe, "mail" : mail, "id_user" : id_user };
    const s1 = JSON.stringify(data1);
    await connection.execute(
      `INSERT INTO profile (json) VALUES (:bv)`,
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