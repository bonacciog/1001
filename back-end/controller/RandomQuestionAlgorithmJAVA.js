const pm = require('../persistence/PersistenceManager');
const c = require('./Controller');
const challengeResultClass = require('../model/ChallengeResult');

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
const getSaveAndSendProgrammingToolsRandomQuestions = function (req, res) {
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
                            // This if because the first is for random event, specific user for the second
                            /* if (req.UserID === undefined) { */
                                challenge.Questions.forEach((question) => {
                                    pm.saveChallengeResult(new challengeResultClass.ChallengeResult(req.SenderProposal_ID, question.getID, req.challengeID, 0, 0, challengeResultClass.ChallengeResultStatus.NotAnswered), (err, result) => {
                                        if (err) throw err;
                                    });
                                    pm.saveChallengeResult(new challengeResultClass.ChallengeResult(req.ReceiverProposal_ID, question.getID, req.challengeID, 0, 0, challengeResultClass.ChallengeResultStatus.NotAnswered), (err, result) => {
                                        if (err) throw err;
                                    });
                                })
                                c.sendIfPossibleOrSaveNotification(req.SenderProposal_ID, JSON.stringify(challenge));
                                c.sendIfPossibleOrSaveNotification(req.ReceiverProposal_ID, JSON.stringify(challenge));
                            /* } */
                           /*  else{
                                challenge.Questions.forEach((question) => {
                                    pm.saveChallengeResult(new challengeResultClass.ChallengeResult(req.UserID, question.getID, req.challengeID, 0, 0, challengeResultClass.ChallengeResultStatus.NotAnswered), (err, result) => {
                                        if (err) throw err;
                                    });
                                })
                                c.sendIfPossibleOrSaveNotification(req.UserID, JSON.stringify(challenge));
                            } */
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

exports.saveAndSendRandomQuestions = getSaveAndSendProgrammingToolsRandomQuestions;
