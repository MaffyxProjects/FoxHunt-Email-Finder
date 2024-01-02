//script to search the page for various types of emails and usernames to test for verifiable email addresses.
if (document.readyState === 'complete') {

    usernames=[]
    emails=[]
    scrapedEmails=[]
    websites=[]
    githubEmails=[]
    chrome.storage.local.set({
        usernames
      });

      chrome.storage.local.set({
        emails
      });

      chrome.storage.local.set({
        scrapedEmails
      });

      chrome.storage.local.set({
        websites
      });
      chrome.storage.local.set({
        githubEmails
      });


    //Checking to see what page we're on so we can properly direct where we need to go
    //Profile Page
    var profilePageType;
    if(window.location.href.indexOf("https://www.linkedin.com/talent/search/profile/") != -1){
      profilePageType='searchResult';
    }else if(window.location.href.indexOf("https://www.linkedin.com/talent/hire/") != -1){
      profilePageType='projectResult';
    }
  
    if (profilePageType==('searchResult')||('projectResult')) {
    setTimeout(unfurl, 1000)
    }
  }
  
  function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  
  function findUrls(text) {
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;

    var regexToken = /(((ftps|ftp|http|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;
    var secondRun = /([^\S]|^)((www\.)(\S+))/gi;
    var thirdRun = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    var fourthRun = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

    while ((matchArray = regexToken.exec(source)) !== null) {
        var token = matchArray[0].trim();
        urlArray.push(token);
    }
    while ((matchArray = secondRun.exec(source)) !== null) {
        var token = matchArray[0].trim();
        urlArray.push(token);
    }
    while ((matchArray = thirdRun.exec(source)) !== null) {
        var token = matchArray[0].trim();
        token = token.replace(/\r?\n|\r/g, '');
        if (urlArray.indexOf(token) === -1) {
            urlArray.push(token);
        }
    }
    while ((matchArray = fourthRun.exec(source)) !== null) {
        var token = matchArray[0].trim();
        token = token.replace(/\r?\n|\r/g, '');
        if (urlArray.indexOf(token) === -1) {
            urlArray.push(token);
        }
    }

    removeItemAll(urlArray, 'lynda.com');
    removeItemAll(urlArray, 'Lynda.com');
    removeItemAll(urlArray, 'LinkedIn.com');
    removeItemAll(urlArray, 'Node.js');
    removeItemAll(urlArray, 'Node.js ');
    removeItemAll(urlArray, 'React.js');
    removeItemAll(urlArray, 'React.js ');
    removeItemAll(urlArray, 'Redux.js');
    removeItemAll(urlArray, 'node.js');
    removeItemAll(urlArray, 'react.js');
    removeItemAll(urlArray, 'redux.js');
    removeItemAll(urlArray, '365.com');
    removeItemAll(urlArray, 'years.She');
    removeItemAll(urlArray, 'AnitaB.org');
    removeItemAll(urlArray, 'Colloquy360.com-');
    removeItemAll(urlArray, 'IvyExec.com');
    removeItemAll(urlArray, 'Tiegether.com');
    removeItemAll(urlArray, 'Vue.js');
    removeItemAll(urlArray, 'Diamond.com');
    removeItemAll(urlArray, 'Connect365.io');
    removeItemAll(urlArray, '.js');
    removeItemAll(urlArray, 'B.A');
    removeItemAll(urlArray, 'Vue.js');
    removeItemAll(urlArray, 'vue.js');
    removeItemAll(urlArray, 'Express.js');
    removeItemAll(urlArray, 'Socket.io');
    removeItemAll(urlArray, 'ASP.NET');
    removeItemAll(urlArray, 'ASP.NET ');
    removeItemAll(urlArray, 'ASP.net');
    removeItemAll(urlArray, 'gmail.com');
    removeItemAll(urlArray, 'gmail.com ');
    removeItemAll(urlArray, 'live.com');
    removeItemAll(urlArray, 'Next.js');

    removeDuplicates(urlArray);

    return urlArray;
}

function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            i++;
        }
    }
}

function removeDuplicates(arr) {
    return Array.from(new Set(arr));
}

function deDupe(data){
    let incData = [...new Set(data)]
    return incData;
  }

  //Clicks all the show more buttons to reveal the data
  var unfurled
  function unfurl(){
    //summary section
    try {
      unfurled=false
      var summaryBox = document.getElementsByClassName("component-card summary-card");
      if(summaryBox[0]!=undefined){
        var summarySeeMoreButton = summaryBox[0].getElementsByClassName('lt-line-clamp__more');
        if(summarySeeMoreButton.length>0){
            summarySeeMoreButton[0].click()
        }
        var summaryBox = document.getElementsByClassName("component-card summary-card");
        var openToWorkButton = summaryBox[0].getElementsByClassName('accordion-header__button ')
        if(openToWorkButton.length>0){
          if(openToWorkButton[0].getElementsByClassName('accordion-header__icon')[0].getAttribute('type').indexOf('chevron-down-icon')!=-1){
            openToWorkButton[0].click()
         }
        }
      }
      unfurled=true
    } catch (error) {
    }
  
    //skills
    try {
      unfurled=false
      var skillsOnPage = document.getElementsByClassName("expandable-list expandable-stepper expandable-list-profile-core component-card skills-card-expandable");
      if(skillsOnPage.length>0){
        var skillsbutton = skillsOnPage[0].getElementsByClassName('expandable-list__button');
        for(i=0;i<15;i++){
          if(skillsbutton.length!=0){
            if(skillsbutton[0]!=undefined){
              if(skillsbutton[0].innerText.indexOf('more')!=-1){
                  skillsbutton[0].click()
              }
            }
          }
        }
      }
  unfurled=true
    } catch (error) {
    }
    // accomplishments
    try{
      unfurled=false
      var accomplishmentsBoxTest = document.getElementsByClassName('accomplishments-expandable-list')
      var accomplishmentListCount = accomplishmentsBoxTest.length
      for(i=0;i<accomplishmentListCount;i++){
        var accompShowMoreButtons = accomplishmentsBoxTest[i].getElementsByClassName('expandable-list__button')
          for(j=0;j<15;j++){
            if(accompShowMoreButtons.length!=0){
              if(accompShowMoreButtons[0]!=undefined){
               if(accompShowMoreButtons[0].innerText.indexOf('Show more')!=-1){
                   if(accompShowMoreButtons[0]!=undefined){
                     accompShowMoreButtons[0].click()
                   }
               }
             }
            }
          }
      }
  unfurled=true
    } catch (error){
    }
    //languages
    try {
      unfurled=false
      var languageBox = document.getElementsByClassName("expandable-list expandable-stepper accomplishments-expandable-list__list-container");
      if(languageBox.length>0){
        if(languageBox[1]!=undefined){
          var langbutton = languageBox[1].getElementsByClassName('expandable-list__button');
          for(i=0;i<3;i++){
            if(langbutton.length!=0){
              if(langbutton[0]!=undefined){
                if(langbutton[0].innerText.indexOf('Show more')!=-1){
                      langbutton[0].click()
                }
              }
            }
          }
        }
      }
      unfurled=true
    } catch (error) {
    }
    //experience
    try{
      unfurled=false
      var experienceBoxTest = document.getElementsByClassName('background-section experience-card')
      var experienceShowMoreButtons = experienceBoxTest[0].getElementsByClassName('expandable-list__button')
      if(experienceShowMoreButtons.length>0){
        for(i=0;i<15;i++){
          if(experienceShowMoreButtons.length!=0){
            if(experienceShowMoreButtons[0]!=undefined){
              if(experienceShowMoreButtons[0].innerText.indexOf('Show more')!=-1){
                    experienceShowMoreButtons[0].click()
              }
            }
          }
        }
      }
      unfurled=true
    } catch (error){
    }
    //education
    try{
      unfurled=false
      var eduBoxTest = document.getElementsByClassName('background-section education-card')
      if(eduBoxTest.length>0){
        var eduShowMoreButtons = eduBoxTest[0].getElementsByClassName('expandable-list__button')
        for(i=0;i<15;i++){
          if(eduShowMoreButtons.length!=0){
            if(eduShowMoreButtons[0]!=undefined){
              if(eduShowMoreButtons[0].innerText.indexOf('Show more')!=-1){
                    eduShowMoreButtons[0].click()
              }
            }
          }
        }
      }
      unfurled=true
    } catch (error){
    }
    //interests
    try {
      unfurled=false
      var interestBox = document.getElementsByClassName("following");
      if(interestBox.length>0){
        var interestButton = interestBox[0].getElementsByClassName('expandable-list__button');
            for(i=0;i<10;i++){
              if(interestButton.length!=0){
                if(interestButton[0]!=undefined){
                  if(interestButton[0].innerText.indexOf('Show more')!=-1){
                    interestButton[0].click()
                  }
                }
              }
            }
      }
      unfurled=true
    } catch (error) {
    }
  
    //recommendations
    try {
      // unfurled=false
      var recoBox = document.getElementsByClassName("expandable-list expandable-stepper component-card component-card--with-list recommendations-card expandable-list-profile-core");
      if(recoBox[0]!=undefined){
        var recoShowMoreButton = recoBox[0].getElementsByClassName('expandable-list__button')
  
        for(k=0;k<5;k++){
          if(recoShowMoreButton.length!=0){
            if(recoShowMoreButton[0]!=undefined){
              if(recoShowMoreButton[0].innerText.indexOf('Show more')!=-1){
                     recoShowMoreButton[0].click()
              }
            }
          }
        }
  
     function subListClick(){
       unfurled=false
       var recommendationsBox = document.getElementsByClassName("expandable-list expandable-stepper component-card component-card--with-list recommendations-card expandable-list-profile-core");
       var recommendationsList = recommendationsBox[0].getElementsByClassName("component-card__list");
       var recommendationItems = recommendationsList[0].getElementsByClassName('recommendation recommendations-card__list-item')
       var recListCount = recommendationItems.length
  
       for(k=0;k<5;k++){
         if(recommendationItems.length!=0){
           if(recommendationItems[k]!=undefined){
             var recoLink = recommendationItems[k].getElementsByTagName('a')
             if(recoLink[0].innerText.indexOf('See more')!=-1){
                  recoLink[0].click()
             }
           }
         }
       }
     }
       subListClick()
       unfurled=true
    }
  } catch (error) {
  }
  
    if(unfurled==true){
      function scrollTop(){
        var profileBox = document.getElementsByClassName('profile__main-container')
        if(profileBox[0]!=undefined){
          profileBox[0].scrollTo({ top: 0, behavior: 'smooth'  });
          setTimeout(getInfo, 1000)
        }else{
          // window.scrollTo(0, 0)
          window.scrollTo({ top: 0, behavior: 'smooth'  });
          setTimeout(getInfo, 1000)
        }
      }
        setTimeout(scrollTop, 1500)
    }else{
      unfurl()
    }
  }
  
//global variables
var fullName;
var linkedIn;
var summary;
var emails=[];
var scrapedEmails=[];
var permutationEmails=[];
var customLinkedInName;
var websites=[];
var emailsFromGitHub=[];
var sendingURL;
var validatedEmails=[]
var emailApiBalance;
var combinedSites=[];
var websites=[];
var usernames=[];


  function getInfo(){
   summaryCheck()
  }
  
  //Checks the summary box for any vital information
  function summaryCheck(){
    //email address regex
    var emailRegEx = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
  
    try {
      var summaryBox = document.getElementsByClassName("component-card summary-card");
      summary = summaryBox[0].getElementsByClassName("summary-card__summary")[0].innerText
  
      //Add any emails found in the summary field
      if(summary.match(emailRegEx)!=null){
          var emailHolder = summary.match(emailRegEx)
          if(emailHolder.length>1){
            for(i=0;i<emailHolder.length;i++){
                emailHolder[i]=emailHolder[i].toString()
              if(scrapedEmails.indexOf(emailHolder[i])==-1){
                scrapedEmails.push(emailHolder[i]);
              }
            }
          }else{
            emailHolder=emailHolder.toString()
            if(scrapedEmails.indexOf(emailHolder)==-1){
                scrapedEmails.push(emailHolder);
            }
          }
          chrome.storage.local.set({
            scrapedEmails
          });
      }else{
        // No email found in the summary
      }
    } catch (error) {
      //no summary to try
    }
    linkedInURLExtractor()
}

function linkedInURLExtractor() {
    // This code is supposed to extract a potential username from the LinkedIn public URL.
    // It will try to guess from a custom URL or if it isn't custom, it will try to parse out a potential first and last name to use for a permutator.
  
    var publicUrlElement = document.getElementsByClassName("personal-info__link")[0];
    if (!publicUrlElement) {
    //   No LinkedIn public URL found
      return;
    }
  
    var publicUrl = publicUrlElement.href;
  
    // Separate LinkedIn URL into pieces to determine if it's a custom URL or not
 
    var urlPieces = publicUrl.substring(publicUrl.lastIndexOf("/") + 1);
    
    var hyphenJoin = urlPieces.split('-').join('');
    var hyphenSplit = urlPieces.split('-');
    var splitCount = hyphenSplit.length;
    var hyphenCheck = urlPieces.includes('-');
  
    // Custom profile w/out any hyphens
    if (!hyphenCheck) {
      var newEmail = hyphenJoin + "@gmail.com";
      customLinkedInName = hyphenJoin
      if (!emails.includes(newEmail)) {
        emails.push(newEmail.toLowerCase());
      }
    } else {
      // Check to see if we have a custom profile or if it's LinkedIn's generated ID placeholder
      if (splitCount === 3) {
        var thirdLength = hyphenSplit[2].length;
        if (thirdLength < 7 || thirdLength > 9) {
          var newEmail = hyphenJoin + "@gmail.com";
          customLinkedInName = hyphenJoin
          if (!emails.includes(newEmail)) {
            emails.push(newEmail.toLowerCase());
          }
        } else {
        customLinkedInName = ''
        }
      } else if (splitCount >= 4) {
        var fourthLength = hyphenSplit[3].length;
        if (!(fourthLength === 8 || fourthLength === 9)) {
          var newEmail = hyphenJoin + "@gmail.com";
          customLinkedInName = hyphenJoin

          if (!emails.includes(newEmail)) {
            emails.push(newEmail.toLowerCase());
          }
        }
      }
    }
    chrome.storage.local.set({
        emails
      });
    namePermutator() 
  }


//Generates first and last name options for emails, these generally don't pan out but are a decent last option
function namePermutator() {
    var nameBox = document.getElementsByClassName('artdeco-entity-lockup artdeco-entity-lockup--size-7 ember-view');
    var nameText = nameBox[0].getElementsByClassName('artdeco-entity-lockup__title ember-view');
    var fullName = nameText[0].innerText;
    var cleanedName = fullName.split(",")[0].trim();
    cleanedName = toTitleCase(cleanedName);
    
    var n = {
      "first_name": "",
      "first_initial": "",
      "last_name": "",
      "last_initial": ""
    };
    
    var possibilities = [
      "{fn}{ln}",
      "{ln}{fn}"
    ];
    
    if (cleanedName.includes('-')) {
        cleanedName = cleanedName.replace('-', '');
        cleanedName = cleanedName.replace("'", '');
    }
    
    var namePieces = cleanedName.split(" ");    
    n.first_name = namePieces[0];
    n.first_initial = namePieces[0][0]; 
    n.last_name = namePieces[1];
    n.last_initial = namePieces[1][0];
    
    if (namePieces.length > 1) {
      n.last_name = namePieces[namePieces.length - 1].replace(".", "");
      n.last_initial = namePieces[namePieces.length - 1][0];
    }
    
    var permutationEmails = [];
    
    for (var i = 0; i < possibilities.length; i++) {
      var newEmail = possibilities[i];
      newEmail = newEmail.replace("{fn}", n.first_name);
      newEmail = newEmail.replace("{ln}", n.last_name);
      newEmail = newEmail + "@gmail.com";
      if(permutationEmails.indexOf(newEmail)==-1){
        permutationEmails.push(newEmail.toLowerCase());
      }
      
    }
    
    //save permutated emails to storage
    chrome.storage.local.set({
        permutationEmails
      });
    gitHubCheck()
  }

//Check the websites field for any github profiles
function gitHubCheck(){
  
    //check custom linkedinurl
    if(customLinkedInName!=''){
      if(usernames.indexOf(customLinkedInName)==-1){
        usernames.push(customLinkedInName);
      }
    }else{
      // No custom LinkedIn Url to parse
    }
    
    //check Websites
    
    try {
      var listedSite;
      var scrapedSite;
    
      var websiteBox = document.getElementsByClassName("personal-info__subsection");
      var siteCount = websiteBox.length;
    
      if (siteCount > 0) {
        for (i = 0; i < siteCount; i++) {
          var foundWebsite = websiteBox[i].getElementsByTagName('a')[0];
          if (foundWebsite != undefined || null || "") {
            if(foundWebsite.length!=-1){
              foundWebsite = foundWebsite.getAttribute('href').trim()
              if(foundWebsite.indexOf('twitter')!=-1){
                var twitterExtract = foundWebsite.replace('https://twitter.com/','')
                if(usernames.indexOf(twitterExtract)==-1){
                    usernames.push(twitterExtract);
                  }
              }
            }
            if (websites.indexOf(foundWebsite) == -1) {
              websites.push(foundWebsite);
            }
    
          }
        }
      }
      var summaryBox = document.getElementsByClassName("component-card summary-card");
      
      //Checks to see if a summary box exists and then checks for websites that might be listed.
      if(summaryBox!=undefined){
        summary = summaryBox[0].getElementsByClassName("summary-card__summary")[0].innerText
        var summarySites = findUrls(summary)
        if(summarySites.length>0){
          scrapedSite=true;
          
          if(combinedSites.indexOf(summarySites)==-1){
            combinedSites.push(summarySites)
          }
        }else{
          scrapedSite=false;
        }
      }
    
      if(siteCount > 0){
        listedSite=true;
        if(combinedSites.indexOf(websites)==-1){
          combinedSites=combinedSites.concat(websites)
        }
      }
    
      if(listedSite==true&&scrapedSite==false){
        websites = combinedSites
      }
      if(combinedSites.length>0){
         combinedSites = removeDuplicates(combinedSites.flat())

        websites = combinedSites
        chrome.storage.local.set({
            websites
          });
      }
     
    } catch (error) {
    // No websites to search through
    }   
    

    if(websites.length>0){
        for(l=0;l<websites.length;l++){
          
            if(websites[l].indexOf('github')!=-1){
                
                  var githubComIndex = websites[l].indexOf('github.com')
                  var githubIOIndex = websites[l].indexOf('github.io')
                  if(githubComIndex!=-1){
                    var nameHolder=websites[l].replace('https://github.com/','')
                    var nameHolder2=nameHolder.replace('http://github.com/','')
                    var nameHolder3=nameHolder2.replace('github.com/','')
                    var nameHolder4=nameHolder3.replace('/','')
                    nameHolder4=nameHolder4.trim()
                    if(usernames.indexOf(nameHolder4)==-1){
                      usernames.push(nameHolder4);
                    }
                  }
                  if(githubIOIndex!=-1){
                    var nameHolder=websites[l].replace('https://','')
                    var nameHolder2=nameHolder.replace('http://','')
                    var nameHolder3=nameHolder2.replace('.github.io','')
                    var nameHolder4=nameHolder3.replace('/','')
                    nameHolder4=nameHolder4.trim()
                    if(usernames.indexOf(nameHolder4)==-1){
                      usernames.push(nameHolder4);
                    }
                  }
              }else{
                //No github profiles present in websites field
              }
        }
      
        
    }
    if(usernames.length>0){
        usernames=usernames.filter(Boolean);
        chrome.storage.local.set({
            usernames
          });
    }
    chrome.runtime.sendMessage({directive: "callEmails"}, function(response) {});
    }

 
