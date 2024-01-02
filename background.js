//Runs the script to search the page for potential email addresses, and to create usernames to test emails.
function collectInfo() {
  async function injectScript() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['collectEmails.js']
    });
  }
  injectScript()
}


//Sends potential emails to the LinkedIn Recruiter Page
function emailResponseToExtension(){
  async function injectScript() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['emailResponse.js']
    });
  }
    injectScript()
    //resets github emails so we don't retry old ones.
    githubEmails=[]
    chrome.storage.local.set({
      githubEmails
    });
}


//Loads potential github usernames to check Github API for email addresses, if none skips to verifying the other emails.
var githubEmails=[]
function checkGitHub(){
       usernames=[]
        chrome.storage.local.get({
          usernames:[]
        }, function(data) {
        usernames = data.usernames;
        if(usernames.length>0){
          githubChecker(usernames)
        }else{
          verifyEmails()
        }
      });
}

//Checks github API for potential email addresses, need to be logged into a Github account for this to work properly.
var usernameArray
function githubChecker(usernameArray){
  if(usernameArray!=undefined){
    var arrayCount=usernameArray.length
    async function getResults() {
      var results = [];
      for (var i = 0; i <= arrayCount - 1; i++) {
        var url = 'https://api.github.com/users/'+usernameArray[i]+'/events'

        var data = await fetch(url, {
          method: 'GET'
        }).then(function (res) {
          return res.json();
        });
        results.push(data)
 
      }
      return results;
    } 
    async function getUserResults() {
      var results = [];
      for (var i = 0; i <= arrayCount - 1; i++) {
        var url = 'https://api.github.com/users/'+usernameArray[i]

        var data = await fetch(url, {
          method: 'GET'
        }).then(function (res) {
          return res.json();
        });
        results.push(data)
 
      }
      return results;
    }

    async function run2() {
      var userResults = await getUserResults();
      parseGHUserData(userResults)
      function parseGHUserData(data){
        var incLength = data.length
        for (u=0;u<incLength;u++){
          var message = data[u]
          
          if(message.email!=null){
            var userEmail=message.email
            if(userEmail.indexOf('@users.noreply.github.com')==-1){
              if(githubEmails.indexOf(userEmail)==-1){
                githubEmails.push(userEmail)
              }
            }
          }
          
        }
   
      }    
    }
    run2()

    async function run() {
      var emailResults = await getResults();
      parseGHData(emailResults)
      function parseGHData(data){
        var incLength = data.length
        for (g=0;g<incLength;g++){
          var message = data[g]
          if(message!='Not Found'){
            var eventCount = message.length
            if(eventCount>0){
              for(t=0;t<eventCount;t++){
                if(message[t].type=='PushEvent'){
                  var commits = message[t].payload.commits
                  var commitsLength = commits.length
                  if(commitsLength>0){
                    for(v=0;v<commitsLength;v++){
                      if(commits[v].author.email!=null){
                        var email = commits[v].author.email
                        if(email.indexOf('@users.noreply.github.com')==-1){
                          if(githubEmails.indexOf(email)==-1){
                            githubEmails.push(email)
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        
          if(g==incLength-1){
            if(githubEmails.length>0){
              chrome.storage.local.set({
                githubEmails
              });
              verifyEmails()
            }else{
              githubEmails=[]
              chrome.storage.local.set({
                githubEmails
              });
              verifyEmails()
            }
          }
        }
   
      }
    }

    run();
  }
}


var validatedEmails = [];
var combinedEmails = [];

function verifyEmails() {
  // Load emails to be checked
  var gitHubEmailCount;
  var permutationEmailsCount;
  var otherEmailCount;

  function loadEmailStorage() {
    chrome.storage.local.get({
      permutationEmails: []
    }, function (data) {
      var permutationEmails = data.permutationEmails;
      permutationEmailsCount = permutationEmails.length;
      if (permutationEmailsCount > 0) {
        for (var g = 0; g < permutationEmailsCount; g++) {
          addtoCombinedEmails([permutationEmails[g], 'Permutation']);
          if (g === permutationEmailsCount - 1) {
            emailCounter(['Finished', 'Permutation']);
          }
        }
      } else {
        emailCounter(['No Permutation Emails Found', 'Permutation']);
      }
    });

    chrome.storage.local.get({
      githubEmails: []
    }, function (data) {
      var githubEmails = data.githubEmails;
      gitHubEmailCount = githubEmails.length;
      if (gitHubEmailCount > 0) {
        for (var u = 0; u < gitHubEmailCount; u++) {
          addtoCombinedEmails([githubEmails[u], 'Github']);
          if (u === gitHubEmailCount - 1) {
            emailCounter(['Finished', 'Github']);
            githubEmails=[]
            chrome.storage.local.set({
              githubEmails
            });
          }
        }
      } else {
        emailCounter(['No GitHub Emails Found', 'Github']);
        githubEmails=[]
        chrome.storage.local.set({
          githubEmails
        });
      }
    });

    chrome.storage.local.get({
      emails: []
    }, function (data) {
      var emails = data.emails;
      otherEmailCount = emails.length;
      if (otherEmailCount > 0) {
        for (var p = 0; p < otherEmailCount; p++) {
          addtoCombinedEmails([emails[p], 'Emails']);
          if (p === otherEmailCount - 1) {
            emailCounter(['Finished', 'Emails']);
          }
        }
      } else {
        emailCounter(['No Emails Found', 'Emails']);
      }
    });

    chrome.storage.local.get({
      scrapedEmails: []
    }, function (data) {
      var scrapedEmails = data.scrapedEmails;
      var scrapedEmailCount = scrapedEmails.length;
      if (scrapedEmailCount > 0) {
        for (var k = 0; k < scrapedEmailCount; k++) {
          addtoCombinedEmails([scrapedEmails[k], 'Scraped Emails']);
          if (k === scrapedEmailCount - 1) {
            emailCounter(['Finished', 'Scraped Emails']);
          }
        }
      } else {
        emailCounter(['No Scraped Emails Found', 'Scraped Emails']);
      }
    });

    combinedEmails = [];

    function addtoCombinedEmails(email) {
      var incomingEmail = email;
      if (combinedEmails.indexOf(incomingEmail) === -1) {
        combinedEmails.push(incomingEmail);
      }
    }

    var incomingCounter = [];

    function emailCounter(statusSource) {
      if (incomingCounter.indexOf(statusSource) === -1) {
        incomingCounter.push(statusSource);
      }


      // Check for completion of scraped, regular, and GitHub emails
      if (incomingCounter.length === 4) {
        apiBalanceCheck();
      }
    }
  }

  loadEmailStorage();

  // Check API for limits
  var emailApiBalance;

  function apiBalanceCheck() {
       var apiKey = 'Insert Emailable API Key here'
       var apiBalanceURL =
      'https://api.emailable.com/v1/account?api_key='+apiKey

 
    fetch(apiBalanceURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        emailApiBalance = data.available_credits;
        mailAPICheck();
      })
      .catch(function (error) {
        console.error(error);
        emailApiBalance = 0;
      });
  }

  // Run emails through verifier
  // Save returned verified emails
  // Call response script to load data onto page

  function deDupe(data) {
    var incData = [...new Set(data)];
    return incData;
  }
  function mailAPICheck() {
   
    if (combinedEmails.length > 0) {
      combinedEmails = deDupe(combinedEmails);

      //Confirms we can run the email verifier based on available credits.
      if (emailApiBalance > combinedEmails.length) {
        console.log('We have ' + emailApiBalance + ' total credit(s) left to use!');
        console.log('We are using ' + combinedEmails.length + ' credit(s) to verify these emails.');
        console.log('We will have ' + (emailApiBalance - combinedEmails.length) + ' credits remaining.');
        var combinedEmailCount = combinedEmails.length;
        var remainingBalance = emailApiBalance - combinedEmails.length
        chrome.storage.local.set({
          remainingBalance
        });

        async function getResults() {
          var results = [];
          for (var i = 0; i <= combinedEmailCount - 1; i++) {
              var apiKey = 'Insert Emailable API Key here'
              var url =
              'https://api.emailable.com/v1/verify?email='+ combinedEmails[i][0]+'&'+apiKey

            var data = await fetch(url, {
              method: 'GET'
            }).then(function (res) {
              
              return res.json();
            });

            var score = data.score
            if (data.state === 'deliverable') {
              results.push(combinedEmails[i],score);
            }    
          }
          sleep(100)
          return results;
        }

        async function run() {
          var emailResults = await getResults();
          chrome.storage.local.set({
            emailResults
          });
          emailResponseToExtension();
          
        }

        run();
      } else {
        console.log('We are out of email checking credits.');
      }
    } else {
      console.log('We did not test any emails!');
    }
  }
}




chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.directive) {

      case "collectInfo":
        collectInfo()

        sendResponse({}); // sending back empty response to sender
        break;

        case "callEmails":
         checkGitHub()
        sendResponse({}); // sending back empty response to sender
        break;
        

        case "emailResponse":
          emailResponseToExtension()

        sendResponse({}); // sending back empty response to sender
        break;

      default:
    }
  }
);
