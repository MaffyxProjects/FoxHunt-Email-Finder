if (document.readyState === 'complete' && window.location.href.indexOf("https://www.linkedin.com/talent") !== -1) {
    emailResponseFunction()
}

//pulls verified emails from storage saved by the background script
function emailResponseFunction(){
    var emailResults=[]
    chrome.storage.local.get({
        emailResults:[],
        websites:[],
        remainingBalance:[]
    }, function(data) {
        emailResults = data.emailResults;
        websites = data.websites;
        remainingBalance = data.remainingBalance;
        score = data.emailResults[1];
    addInfoToPage(emailResults,websites,score);
    });
  }
  
 //Adds verified emails to the page 
function addInfoToPage(data,websites,score){
    var data 
    var websites
    var score
    if(data!=undefined){
        var websiteHTMLBuilder = '<p>Websites:</p>';
        if(websites!=undefined){
            var websiteCount = websites.length
            for(i=0;i<websiteCount;i++){
                websiteHTMLBuilder += '<li><a href="' + websites[i] + '"target="_blank">' + websites[i] + '</a></li>';
            }
        }
        
        var dataLength = data.length
   
        var scrapedHTMLBuilder = '<p>Scraped Emails:</p>';
        var githubHTMLBuilder = '<p>Github Emails:</p>';
        var permutationHTMLBuilder = '<p>Permutations:</p>';
        var guessHTMLBuilder = '<p>Guessing Emails:</p>';
      
        for (var i = 0; i < dataLength; i++) {
            if (data[i][1] == 'Scraped Emails') {
              scrapedHTMLBuilder += '<li>'+'Score: '+score+' - '+'<a href="mailto:' + data[i][0] + '">' + data[i][0] + '</a></li>'
            }
          
            if (data[i][1] == 'Github') {
              githubHTMLBuilder += '<li>'+'Score: '+score+' - '+'<a href="mailto:' + data[i][0] + '">' + data[i][0] + '</a></li>'
            }
          
            if (data[i][1] == 'Emails') {
              guessHTMLBuilder += '<li>'+'Score: '+score+' - '+'<a href="mailto:' + data[i][0] + '">' + data[i][0] + '</a></li>'
            }
    
            if (data[i][1] == 'Permutation') {
              permutationHTMLBuilder += '<li>'+'Score: '+score+' - '+'<a href="mailto:' + data[i][0] + '">' + data[i][0] + '</a></li>'
            }
          }

        if(scrapedHTMLBuilder==undefined){
            scrapedHTMLBuilder=''
        }else if(scrapedHTMLBuilder == '<p>Scraped Emails:</p>'){
            scrapedHTMLBuilder=''
        } 
        if(githubHTMLBuilder==undefined){
            githubHTMLBuilder=''
        }else if(githubHTMLBuilder == '<p>Github Emails:</p>'){
            githubHTMLBuilder=''
        } 

        if(guessHTMLBuilder==undefined){
            guessHTMLBuilder=''
        }else if(guessHTMLBuilder == '<p>Guessing Emails:</p>'){
            guessHTMLBuilder=''
        } 

        if(permutationHTMLBuilder==undefined){
            permutationHTMLBuilder=''
        }else if(permutationHTMLBuilder == '<p>Permutations:</p>'){
            permutationHTMLBuilder=''
        } 
        if(websiteHTMLBuilder==undefined){
            websiteHTMLBuilder=''
        }else if(websiteHTMLBuilder == '<p>Websites:</p>'){
            websiteHTMLBuilder=''
        } 
        //combines all the html 
        var totalBuilder = scrapedHTMLBuilder + githubHTMLBuilder + guessHTMLBuilder + permutationHTMLBuilder + websiteHTMLBuilder
        
      //adds results to the page 
      var bigBox = document.getElementsByClassName("component-card recent-recruiting-activities")
      var newChild= document.createElement('div')
      newChild.innerHTML='<section class="component-card background-card "><h4>FoxHunt Info Finder Results</h4></br>'+totalBuilder+'</section>'
      bigBox[0].prepend(newChild)
        
      //resets github emails so we don't test old emails
      githubEmails=[]
      chrome.storage.local.set({
        githubEmails
      });
    }
}