var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/4th down$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : "4th Downs in 1st-3rd Quarter - You may go for it on 4th and 1 or less once you cross the 50 yard line up to your opponent’s 30 yard line.  From the 30 yard line and closer, kick the ball. \n\n4th Downs when taking a beating late in the 3rd Quarter - If you are down by 21 or more with less than 5 minutes in the 3rd quarter you may go for it on 4th & 1 or less beginning from your own 40 yard line. \n\n4th Downs in 4th Quarter -  On 4th & G on the 1 yard line, you can go for it if you are tied, losing, or up by 3 or less. If you are up by 4 or more in that situation you need to kick the FG since that would put you up by 7 or more. \n\nIf you are down by more than 8 points or more in the 4th quarter it is entirely up to you when you go for it on 4th.  If you are down by any score and it is less than 5 minutes left in the 4th you can go for it on 4th down. \n\n4th Downs in Overtime - There are no rules.  Do what you want. "
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
