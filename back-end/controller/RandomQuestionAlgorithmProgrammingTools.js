const pm = require('../persistence/PersistenceManager');
const c = require('./Controller');


const TopicID = 2;

const types = [
    {
        typeName: 'THEORY',
        questionsNumber: 10
    },
    {
        typeName:'HANDS ON',
        questionsNumber: 5
    }
];
var errorJSON = {
    error: ""
};
var allRightJSON = {
    response: "It's all right!"
}
var response;
const getProgrammingToolsRandomQuestionsAndSend = function (req, res) {
    var typesIndex = 0;
    pm.getRandomQuestions(TopicID, types[typesIndex].typeName, types[typesIndex].questionsNumber, function (err, result1) {
        typesIndex++;
        if (err == null) {
            if (result1 == null) {
                errorJSON.error = "There aren't questions in DB";
                response = JSON.stringify(errorJSON);
                res.end(response);
            }
            else {
                var challenge = {
                    notificationType: 'startChallenge',
                    Questions: result1
                }
                pm.getRandomQuestions(TopicID, types[typesIndex].typeName, types[typesIndex].questionsNumber, function (err, result2) {
                    typesIndex++;
                    if (err == null) {
                        if (result2 == null) {
                            errorJSON.error = "There aren't questions in DB";
                            response = JSON.stringify(errorJSON);
                            res.end(response);
                        }
                        else {
                            challenge.Questions = challenge.Questions.concat(result2);
                            c.sendIfPossibleOrSaveNotification(req.SenderProposal_ID, JSON.stringify(challenge));
                            c.sendIfPossibleOrSaveNotification(req.ReceiverProposal_ID, JSON.stringify(challenge));
                            res.end(JSON.stringify(allRightJSON));
                        }
                    }
                    else {
                        errorJSON.error = 'Input error or interaction with the database';
                        response = JSON.stringify(errorJSON);
                        res.end(response);
                    }
                });
            }
        }
        else {
            errorJSON.error = 'Input error or interaction with the database';
            response = JSON.stringify(errorJSON);
            res.end(response);
        }
    });
};

exports.sendRandomQuestions = getProgrammingToolsRandomQuestionsAndSend;