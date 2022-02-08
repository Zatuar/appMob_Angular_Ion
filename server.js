

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

app.post('/create_questionnaire', function(req, res) {

    console.log("posts create quest!")
    //console.log(req.body)
    var input = JSON.stringify(req.body)
    //console.log(input)
    //var fs = require('fs')
    //var vm = require('vm')
    //var extfile = fs.readFileSync('./src/app/script/create_questionnaire.js')
    //vm.runInThisContext(extfile)
   // run(input)
   
   //create_quest(input)
   create_questionnaire(input)

});



app.post('/create_feedback', function(req, res) {

  console.log("posts create feed!")
  var input = JSON.stringify(req.body)
  console.log(input)
  //var fs = require('fs')
  // var vm = require('vm')
   //var extfile = fs.readFileSync('create_feedback.js')
  //vm.runInThisContext(extfile)
  //run(input)
  create_feedback(input)
  

});

// pas encore implementer dans le front
app.post('/create_profile', function(req, res) {

  console.log("posts create profile!")
  var input = JSON.stringify(req.body)
  console.log(input)
  //var fs = require('fs')
  // var vm = require('vm')
   //var extfile = fs.readFileSync('create_feedback.js')
  //vm.runInThisContext(extfile)
  //run(input)
  create_profile(input)
  

});



app.post('/get_questionnaire', function(req, res) {

  console.log("post get_quest")
  //var input = JSON.stringify(req.body)
  var input = req.body
  console.log(input)
  result = get_questionnaire(input)
  res.json(
    [
      {
        id:1,
        idcreateur: 1,
        title: 'App\'s Satisfac',
        description: 'Hello everyone, we are the creator of the app, can you give us 30s of your time for answering to this questionnaire?',
        questions: [
          {
            question:'What is your name?',
            qcm: false,
            QCManswer: [],
            constraints: [true,false]
          },
          {
            question:'Are you satisfy of the app?',
            qcm: true,
            QCManswer: ['Definitely, no','Can be better','Don\'t mind','Yes','Impress'],
            constraints: [true,false]
          },
          {
            question:'What do you think we can upgrate?',
            qcm: false,
            QCManswer: [],
            constraints: [false,false]
          }
        ],
        read: false
      }, {id:2,
        idcreateur: 2,
        title: 'App\'s test',
        description: 'yes',
        questions:  [
          {
            question:'What is your name?',
            qcm: false,
            QCManswer: [],
            constraints: [true,false]
          },
          {
            question:'Are you satisfy of the app?',
            qcm: true,
            QCManswer: ['Definitely, no','Can be better','Don\'t mind','Yes','Impress'],
            constraints: [true,false]
          },
          {
            question:'What do you think we can upgrate?',
            qcm: false,
            QCManswer: [],
            constraints: [false,false]
          }
        ],
        read: false
  
      }
    ]
  ) 

});

app.post('/get_feedback', function(req, res) {

  console.log("post get_feedback")
  //var input = JSON.stringify(req.body)
  var input = req.body
  console.log(input)
  result = get_feedback(input)
  console.log(result)
  res.json(
    [
      {
        id: 1,
        idsender: 0,
        anonymous: true,
        date: new Date(),
        title: "Acknoledgement",
        tags:["Thanks","Appreciated"],
        message: "Thanks to S&H for trusting us all along the project",
        read: false
      }
    ]
  ) 

});

// pas encore implementer dans le front
app.post('/feedback_lu', function(req, res) {

  console.log("post feedback_lu")
  var input = JSON.stringify(req.body)
  console.log(input)
  feedback_lu(input)

});


// pas encore implementer dans le front
app.post('/get_profile', function(req, res) {

  console.log("post get_profile")
  var input = JSON.stringify(req.body)
  console.log(input)
  result = get_profile(input)
  res.json(
    {
      id: 0,
      firstName: 'Cap Projet',
      lastName: 'ESIEA',
      email: 'test@esiea.fr',
      role: 4,
      groups: [
          'Fondateur',
          'Creator'
      ]
  }
  ) 

});

//contient le changement de valeur du read questionnaire
app.post('/create_repquest', function(req, res) {

  console.log("post create_repquest")
  var inputJSON = JSON.stringify(req.body.answerq)
  var inputIDq=req.body.idquestionnaire
  var inputIDu=req.body.iduser

  console.log(inputJSON)
  console.log(inputIDq)
  questionnaire_rep(inputIDq, inputIDu)
  create_repquest(inputJSON, inputIDq)

});



app.listen(process.env.PORT || 5000);




// fonction script bdd


//Arguments : id_createur, titre, description, groupe de destination, types, questions
//Stocke un create_questionnaire
//Stocke x questionnaires en fonction du nombres de personnes présent dans le groupe
async function create_questionnaire(s1) {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

        

    //const s1 = JSON.stringify(data1);
    await connection.execute(
      `INSERT INTO CREAT_QUESTION (po_document) VALUES (:bv)`,
      [s1], 
      { autoCommit: true }
    );

    //Récupère le nombre de feedback pour incrémenter l'id 
    console.log('Récupère le nombre de feedback');
    result = await connection.execute(
      `SELECT COUNT(*) from QUESTIONNAIRE`
    );
    console.log('Nombre de questionnaires : ', result.rows[0][0]); 
    id_questionnaire = result.rows[0][0] + 1;

    //Récupérer les users de ce groupe pour créer un questionnaire pour chacun
    console.log('\nAffichage des users qui sont dans ce groupe : ', groupe_destinataire);
    result = await connection.execute(
      `SELECT JSON_VALUE(po_document, '$.id_user')
      FROM profile
      WHERE JSON_VALUE(po_document, '$.groupe') = (:bv)`,
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
        `INSERT INTO questionnaire (po_document) VALUES (:bv)`,
        [s2], 
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



//Arguments : id_user, id_destinataire, titre, texte
//Stocke un creation_feedback et un feedback
async function create_feedback(s1) {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;

   
    await connection.execute(
      `INSERT INTO creation_feedback VALUES (:bv, :id)`,
      {id : id_feedback, bv : s1},
      { autoCommit: true }
    );

    console.log('Stocke un feedback');
    const data2 = { "id_sender": id_user, "id_destinataire": id_destinataire, "titre": titre, "texte" : texte, "lu" : false };
    const s2 = JSON.stringify(data2);
    await connection.execute(
      `INSERT INTO feedback VALUES (:bv, :id)`,
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


//Arguments : id_questionnaire pour récupérer le JSON questionnaire concerné
//Récupère les réponses pour chaque question (provenance du front)
//Stocke un JSON rep_quest 


async function create_repquest(s1, id_questionnaire) {

let connection;

try {
  connection = await oracledb.getConnection(dbConfig);

  let result;

 
  await connection.execute(
    `INSERT INTO rep_quest VALUES (:bv, :id)`,
    {id : id_questionnaire, bv : s1}, 
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


//Arguments : nom, prenom, role, groupe, mail (id généré automatiquement)
//Stocke le profile

async function create_profile(s1) {

let connection;

try {
  connection = await oracledb.getConnection(dbConfig);

  let result;


  //Récupère le nombre de profile pour incrémenter l'id 
  console.log('Récupère le nombre de users');
  result = await connection.execute(
    `SELECT COUNT(*) from profile`
  );
  console.log('Nombre de users : ', result.rows[0][0]); 
  id_user = result.rows[0][0] + 1;

 // console.log('Stocke un profile');
 // const data1 = { "nom": nom, "prenom": prenom, "role": role, "groupe" : groupe, "mail" : mail};
  //const s1 = JSON.stringify(data1);
  await connection.execute(
    `INSERT INTO profile VALUES (:bv, :id)`,
    {id : id_user, bv : s1},
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


//Arguments : id questionnaire et id user
//A appeler quand l'utilisateur a repondu un nouveau questionnaire
//Change la valeur repondu de false à true 


async function questionnaire_rep(id_questionnaire, id_user) {

let connection;

try {
  connection = await oracledb.getConnection(dbConfig);

  let result;

 // console.log('id_questionnaire ?');
 // var id_questionnaire = scanf('%d');

 // console.log('id_user ?');
 // var id_user = scanf('%d');

  console.log('Change la valeur de lu d\'un questionnaire à true');
  await connection.execute(
    //`INSERT INTO feedback (po_document) VALUES (:bv)`,
    `UPDATE questionnaire 
    SET json = json_mergepatch(json,'{ "repondu" : true }')
    WHERE id = (:bv) and id_user = (:id)`,
    {id : id_user, bv : id_questionnaire},
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






//Argument : id_user
//Affiche les questionnaires associés à cet utilisateur

async function get_questionnaire(id_user) {

let connection;

try {
  connection = await oracledb.getConnection(dbConfig);

  let result;
  let ids;

 // console.log('id_user ?');
 // var id_user = scanf('%d');

  //console.log('\nAffichage des JSON questionnaire que possède id user :  %d', id_user);
  result = await connection.execute(
    `SELECT json
     FROM questionnaire
     WHERE id_user = (:bv)`,
     //WHERE JSON_VALUE(json, '$.id_user') = (:bv)`,
     [id_user]
  );

  ids = await connection.execute(
    `SELECT id
     FROM questionnaire
     WHERE id_user = (:bv)`,
     //WHERE JSON_VALUE(json, '$.id_user') = (:bv)`,
     [id_user]
  );

  var number_questionnaire = result.rows.length;
  console.log('Number of questionnaires : ', number_questionnaire); 

  console.log('Questionnaire : ', result.rows); //Liste questionnaire : [ [ '{"titre":"aze","description":"aze","repondu":true,"question":{"type_question":"1","question":"1"}}' ],[ '{"titre":"zae","description":"azd","repondu":false,"question":{"type_question":"d1","question":"1"}}' ] ]
  console.log('Ids : ', ids.rows); // Liste ids : [ [ 9 ], [ 5 ] ]

  const datafinal = []
for (var i = 0; i < number_questionnaire; i++) {
  //console.log(essai[i][0])
  var questparse = JSON.parse(result.rows[i][0])
  const data1 = { 'id': ids.rows[i][0], 'idcreateur': questparse.id_createur, 'title': questparse.title, "description": questparse.description, "questions": questparse.questions, "read": questparse.read }
  datafinal.push(data1)
}
 /* for ( var i = 0; i < number_questionnaire; i++) {
      var questionnaire = result.rows[i][0];
      console.log('Questionnaire : ' + (i+1), questionnaire); //{"titre":"aze","description":"aze","repondu":true,"question":{"type_question":"1","question":"1"}}
      console.log('Id :', ids.rows[i][0]);//9
  } */

} catch (err) {
  console.error(err);
} finally {
  if (connection) {
    try {
      await connection.close();
      return (JSON.stringify(datafinal))
    } catch (err) {
      console.error(err);
    }
  }
}
}

//Argument : id_destinataire
//Récupère les feedbacks envoyés par ce user


async function get_feedbacksend(id_sender) {

let connection;

try {
  connection = await oracledb.getConnection(dbConfig);

  let result;
  let id_feedback;

//  console.log('id_sender ?');
  //var id_sender = scanf('%d');

  console.log('\nAffichage des JSON feedback qui possède id destinataire %d', id_sender);
  result = await connection.execute(
    `SELECT json
     FROM creation_feedback
     WHERE JSON_VALUE(json, '$.id_user') = (:bv)`,
     [id_sender]
  );
  
  
  var number_questionnaire = result.rows.length;
  console.log('Number of feedbacks : ', number_questionnaire); 

  console.log('Feedback : ', result.rows); //Liste feedbacks : [ [ '{"id_feedback":1,"id_user":1,"id_destinataire":2,"titre":"feedback","texte":"feedback"}' ],
  /*[ '{"id_feedback":2,"id_user":1,"id_destinataire":2,"titre":"sdgds","texte":"sdgdsgg"}' ],
  [ '{"id_feedback":3,"id_user":1,"id_destinataire":2,"titre":"fkg","texte":"fdlgn"}' ],
  [ '{"id_user":1,"id_destinataire":2,"titre":"aze","texte":"zae"}' ],
  [ '{"id_user":1,"id_destinataire":8,"titre":"aze","texte":"aze"}' ],
  [ '{"id_user":1,"id_destinataire":8,"titre":"aze","texte":"dsfdsf"}' ] ]*/
  const datafinal = []
  for (var i = 0; i < number_questionnaire; i++) {
    //console.log(essai[i][0])
    var questparse = JSON.parse(result.rows[i][0])
    const data1 = { 'id': ids.rows[i][0], 'idcreateur': questparse.id_createur, 'title': questparse.title, "description": questparse.description, "questions": questparse.questions, "read": questparse.read }
    datafinal.push(data1)
  }

  for ( var i = 0; i < number_questionnaire; i++) {
      var feedback = result.rows[i][0];
      console.log('Feedback : ' + (i+1), feedback); //{"id_user":1,"id_destinataire":8,"titre":"aze","texte":"dsfdsf"}
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

//Argument : id_destinataire
//Récupère les feedbacks envoyés à ce user

async function get_feedback(id_destinataire) {

let connection;

try {
  connection = await oracledb.getConnection(dbConfig);

  let result;
  let id_feedback;

//  console.log('id_destinataire ?');
 // var id_destinataire = scanf('%d');

  console.log('\nAffichage des JSON feedback qui possède id destinataire %d', id_destinataire);
  result = await connection.execute(
    `SELECT json
     FROM feedback
     WHERE JSON_VALUE(json, '$.id_destinataire') = (:bv)`,
     [id_destinataire]
  );
  //console.log('Resultats: ', result.rows);

  id_feedback = await connection.execute(
    `SELECT id
     FROM feedback
     WHERE JSON_VALUE(json, '$.id_destinataire') = (:bv)`,
     [id_destinataire]
  );
  
  
  var number_feedback = result.rows.length;
  console.log('Number of feedbacks : ', number_feedback); 
  console.log('Feedback : ', result.rows); //Liste feedbacks : [ [ '{"id_sender":1,"id_destinataire":8,"titre":"aze","texte":"aze","lu":true}' ], [ '{"id_sender":1,"id_destinataire":8,"titre":"aze","texte":"dsfdsf","lu":false}' ] ]
  console.log('Ids : ', id_feedback.rows); // Liste ids : [ [ 5 ], [ 6 ] ]

  const datafinal = []
  for (var i = 0; i < number_feedback; i++) {
    //console.log(essai[i][0])
    var feedparse = JSON.parse(result.rows[i][0])
    const data1 = { 'id': id_feedback.rows[i][0], 'idsender': feedparse.idsender, 'anonymous': feedparse.anonymous, "date": feedparse.date, "title": feedparse.title, "tags": feedparse.tags, "message": feedparse.message, "read": feedparse.read }
    datafinal.push(data1)
  }

/*  for ( var i = 0; i < number_questionnaire; i++) {
      var feedback = result.rows[i][0];
      console.log('Feedback : ' + (i+1), feedback); //Feedback : {"id_sender":1,"id_destinataire":8,"titre":"aze","texte":"aze","lu":true}
      console.log('Id :', id_feedback.rows[i][0]); //Id du feedback : 5
  } */

} catch (err) {
  console.error(err);
} finally {
  if (connection) {
    try {
      await connection.close();
      return(JSON.stringify(datafinal))
    } catch (err) {
      console.error(err);
    }
  }
}
}


//Argument : adresse mail de connexion
//Récupère le profile du user


async function get_profile(mail) {

let connection;

try {
  connection = await oracledb.getConnection(dbConfig);

  let result;

//   console.log('mail ?');
//  var mail = scanf('%s');

  console.log('\nAffichage du profile qui possède adresse mail %s', mail);
  result = await connection.execute(
    `SELECT json
     FROM profile
     WHERE JSON_VALUE(json, '$.mail') = (:bv)`,
     [mail]
  );
  console.log('Profile : ', result.rows[0][0]); //JSON Profile

  result_ID = await connection.execute(
    `SELECT id
     FROM profile
     WHERE JSON_VALUE(json, '$.mail') = (:bv)`,
     [mail]
  );
  console.log('ID : ', result_ID.rows[0][0]); //ID

    //console.log(essai[i][0])
    var profileparse = JSON.parse(result.rows[0][0])
    const data1 = { 'id': result_ID.rows[0][0], 'firstName': profileparse.firstName, 'lastName': profileparse.lastName, "email": profileparse.email, "role": profileparse.role, "groups": profileparse.groups }
  

} catch (err) {
  console.error(err);
} finally {
  if (connection) {
    try {
      await connection.close();
      return(JSON.stringify(data1))
    } catch (err) {
      console.error(err);
    }
  }
}
}


//Arguments : id feedback
//A appeler quand l'utilisateur a lu un nouveau feedback
//Change la valeur lu de false à true 


async function feedback_lu(id_feedback) {

let connection;

try {
  connection = await oracledb.getConnection(dbConfig);

  let result;

//   console.log('id_feedback ?');
//  var id_feedback = scanf('%d');

  console.log('Change la valeur de lu d\'un feedback à true');
  await connection.execute(
    //`INSERT INTO feedback (po_document) VALUES (:bv)`,
    `UPDATE feedback 
    SET json = json_mergepatch(json,'{ "lu" : true }')
    WHERE id = (:bv)`,
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