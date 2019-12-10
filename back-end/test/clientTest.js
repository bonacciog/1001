var http = require('http');

/* var postData = JSON.stringify({
    request: "saveCompany",
    Company: { Name:'Prova', WebSiteURL:'Prova', LinkedinProfileURL:'Prova', Industries_ID:1, CompanyTypeID:1, CompanySizeID:1 }
}); */

/*  var postData = JSON.stringify({ 
    request : "getAllChallengesResults", 
    UserID: 2
}); */ 
/*  var postData = JSON.stringify({ 
    request : "getWaitingChallengeByID", 
    UserID: 1
});  */

/* var postData = JSON.stringify({ 
    request : "closeConnection", 
    UserID: 2
}); */
/* var postData = JSON.stringify({
    request: 'answerToChallengeQuestion',
    UserID : 1,
    QuestionID :44,
    ChallengeID : 1,
    OpponentID : 2,
    XP : 10,
    TopicID : 1,
    TimeInSec : 3,
    RoundNumber: 1
}); */
/* var postData = JSON.stringify({
    request: 'getResultByChallengeID',
    challengeID: 1
}) */
/* var postData = JSON.stringify({
    request:'endChallenge',
    ReceiverProposal_ID : 2,
    SenderProposal_ID : 1,
    challengeID: 1
}) */
/* var postData = JSON.stringify({
    request : "challengeAccepted",
    ReceiverProposal_ID : 2,
    SenderProposal_ID : 1,
    TopicID : 2,
    challengeID : 3
}); */

/* var postData = JSON.stringify({ 
    request : "challengeSpecificUser", 
    ReceiverProposal_ID :2,
    SenderProposal_ID : 1,
    TopicID : 2
}); */
/* var postData = JSON.stringify({ 
    request : "chooseRandomOpponent", 
    UserID: 2,
    TopicID : 1
}); */
/* var postData = JSON.stringify({
    request: 'getAllRivals',
    UserID: 1
}); */ 

/* var postData = JSON.stringify({ 
    request : "getAllTopics"
}); */

/* var postData = JSON.stringify({
    request: "getLeaderBoard"
}); */

/* var postData = JSON.stringify({
    request: "saveUser",
    User: { Firstname: 'Lautaro', Lastname: "Martinez", University: "UnInter" },
    key: "chiave"
}); */

/* var postData = JSON.stringify({
    request : "challengeRejected",
    ReceiverProposal_ID : 2,
    SenderProposal_ID : 1,
    challengeID : 2
}) */

var options = {
    hostname: 'localhost',
    port: 3000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};
var req = http.request(options, function (res) {
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', JSON.stringify(res.headers));

    res.setEncoding('utf8');

    res.on('data', function (chunk) {
        console.log('BODY: \n', JSON.parse(chunk));
    });

    res.on('end', function () {
        console.log('No more data in response.');
    });
});

req.on('error', function (e) {
    console.log('Problem with request:', e.message);
});

req.write(postData);
req.end();

/*
var readline = require('readline');



var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Qui dentro per problema callback (in questo caso prendo la richiesta da stdin)
rl.on('line', function (line) {

});


*/