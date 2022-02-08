//Arguments : id_createur, titre, description, groupe de destination, types, questions
//Stocke un create_questionnaire
//Stocke x questionnaires en fonction du nombres de personnes présent dans le groupe

const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
var scanf = require('scanf');

async function run(s1) {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

    console.log('id_createur ?');
    var id_createur = scanf('%d');

    console.log('Titre ?');
    var titre = scanf('%s');

    console.log('Description ?');
    var description = scanf('%s');

    console.log('Groupe destinataire ?');
    var groupe_destinataire = scanf('%d');

    console.log('Type de question (1 ouverte, 2 QCM) ?');
    var type_question = scanf('%s');

    console.log('Question ?');
    var question = scanf('%s');

    //Récupère le nombre de feedback pour incrémenter l'id 
    console.log('Récupère le nombre de create_questionnaire');
    result = await connection.execute(
      `SELECT COUNT(*) from creation_quest`
    );
    console.log('Nombre de creation_quest : ', result.rows[0][0]); 
    id_questionnaire = result.rows[0][0] + 1;

    console.log('Stocke un questionnaire création');
    const data1 = { "id_createur": id_createur, "titre": titre, "description": description, "groupe_destinataire" : groupe_destinataire, "question": {
        "type_question" : type_question, "question": question } 
    };   

    const s1 = JSON.stringify(data1);
    await connection.execute(
      `INSERT INTO creation_quest VALUES (:id, :bv)`,
      {id : id_questionnaire, bv : s1}, 
      { autoCommit: true }
    );

    //Récupère le nombre de feedback pour incrémenter l'id 
    console.log('Récupère le nombre de questionnaire');
    result = await connection.execute(
      `SELECT COUNT(*) from QUESTIONNAIRE`
    );
    console.log('Nombre de questionnaires : ', result.rows[0][0]); 
    id_questionnaire = result.rows[0][0] + 1;

    //Récupérer les users de ce groupe pour créer un questionnaire pour chacun
    console.log('\nAffichage des users qui sont dans ce groupe : ', groupe_destinataire);
    result = await connection.execute(
      `SELECT JSON_VALUE(json, '$.id_user')
      FROM profile
      WHERE JSON_VALUE(json, '$.groupe') = (:bv)`,
       [groupe_destinataire]
    );
    var number_users = result.rows.length;
    console.log('Number of users : ', number_users); 

    for ( var i = 0; i < number_users; i++) {
        var id_user = result.rows[i][0];
        console.log('Id_users : ', id_user); 

        console.log('Stocke un questionnaire');
        const data2 = { "id_questionnaire": id_questionnaire, "id_user": id_user, "titre": titre, "description": description, "repondu" : false, "question": {
            "type_question" : type_question, "question": question } 
        };

        const s2 = JSON.stringify(data2);
        await connection.execute(
        `INSERT INTO questionnaire VALUES (:id, :bv)`,
        {id : id_questionnaire, bv : s2}, 
        { autoCommit: true }
        );
        id_questionnaire += 1;
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
}

run();