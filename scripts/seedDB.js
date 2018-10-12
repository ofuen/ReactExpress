const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

/* mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1/roboSurvey", function(error) {
      console.log('Error connection to MongoDB \n' + error );
  }
); */



//user collection seeds
const userSeed = [
  {
    firstname: "Joed",
    lastname: "Machado",
    email: "joed@mail.um",
    login: "joed",
    password: "password",
    role: "user"
  },
  {
    firstname: "Oscar",
    lastname: "Fuentes",
    email: "oscar@mail.um",
    login: "oscar",
    password: "password",
    role: "user"
  },
  {
    firstname: "Jose",
    lastname: "De las Salas",
    email: "jose@mail.um",
    login: "jose",
    password: "password",
    role: "manager"
  },
  {
    firstname: "Brad",
    lastname: "Fabian",
    email: "brad@mail.um",
    login: "brad",
    password: "password",
    role: "user"
  }
  
];

//survey collection seeds
const surveySeed = [
    {
        name: "HTML",
        survey: [
            {
                question: "What does HTML stand for?",
                answers: ["Hyper Text Markup Language", 
                          "Hyperlinks and Text Markup Language", 
                          "Home Tool Markup Language"],
                correctanswer: 0
            },
            {
                question: "What is the correct sequence of HTML tags for starting a webpage?",
                answers: ["Head, Title, HTML", 
                          "Title, Head, HTML", 
                          "HTML, Head, Title"],
                correctanswer: 2
            },
            {
                question: "Choose the correct HTML tag for the largest heading.",
                answers: ["H1", "Heading", "Head", "H6"],
                correctanswer: 0
            }
        ]
    },
    {
        name: "CSS",
        survey: [
            {
                question: "CSS stand for?",
                answers: ["Case Sensitive Style", 
                          "Computers Style Sheets", 
                          "Cascade Style Sheets", 
                          "Cascade Style Systems"],
                correctanswer: 2
            },
            {
                question: "A ___________   consist of a property and a value,",
                answers: ["Tag", "Attribute", "Deceleration", "H1 {color: red;}"],
                correctanswer: 1
            },
            {
                question: "A declaration is terminated by a..",
                answers: [". - period", "! - explanation point", "} - end curly bracket", "; - semicolon"],
                correctanswer: 3
            }
        ]
    },
    {
        name: "JS",
        survey: [
            {
                question: "How can we starts Javascript ?",
                answers: ["Script tag", 
                          "Javascript tag", 
                          "Language tag", 
                          "None of above"],
                correctanswer: 0
            },
            {
                question: "Is javascript case sensitive ?",
                answers: ["True", "False"],
                correctanswer: 0
            },
            {
                question: "How can we declare variable in javascript",
                answers: ["Datatype", "Var", "Int", "Float"],
                correctanswer: 1
            }
        ]
    }

];

//Evaluation collection seeds
const evalSeed = [
    {
        userId: null,
        surveyName: "JS",
        answers: [0, 0, 1],
        points: 100
    },
    {
        userId: null,
        surveyName: "CSS",
        answers: [2, 1, 3],
        points: 100
    },
    {
        userId: null,
        surveyName: "HTML",
        answers:[0, 2, 3],
        points: 66.66
    },
    {
        userId: null,
        surveyName: "HTML",
        answers:[0, 2, 0],
        points: 100
    }
];

function populateUser() {
    console.log('Inserting users...');
    db.User
        .remove({})
        .then(() => db.User.collection.insertMany(userSeed)) 
        .then(data => {
        console.log(data.result.n + " user records inserted!");
        populateSurvey();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

}

function populateSurvey() {
    console.log('inserting surveys...')
    db.Survey  
        .remove({})
        .then(() => db.Survey.collection.insertMany(surveySeed))
        .then(data => {
            console.log(data.result.n + " survey records inserted!");
            populateEvaluation();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
    });
}

function populateEvaluation() {
    console.log('inserting evaluations...');
    db.Evaluation
        .remove({})
        //.then(() => db.Evaluation.collection.insertMany(evalSeed))
        .then( () => {
            db.User.find({}, function(err, doc) {
                evalSeed[0].userId = doc[2]._id;
                evalSeed[1].userId = doc[1]._id;
                evalSeed[2].userId = doc[0]._id;
                evalSeed[3].userId = doc[1]._id;

                db.Evaluation.collection.insertMany(evalSeed)
                    .then( data => {
                        console.log(data.result.n + " evaluation records inserted!");
                        process.exit(0);
                    })
            })
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}


    

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/roboSurvey").then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        populateUser();
    },
    err => { /** handle initial connection error */ 
        console.log('Error connection to MongoDB \n' + error );
    }
);
