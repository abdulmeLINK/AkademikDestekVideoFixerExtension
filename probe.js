

setTimeout(job,3000);


var videos;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    var command = message.startJob
    if(command == 'ok'){
        
    }
    else{console.log(message)}
  });


function job(){
    
    videos = document.getElementsByTagName('video'); 
    console.log('videos:');
    console.log(videos);
    if(videos.length >0){
        
        for(let video of videos){
           deployObserver(video);
        }
    }
    setTimeout(deployOnLoadObserver,3000);
}

function immadiatefix(string){
    fixedUrl = "";
        for(var i = 0; i < string.length; i++){ 
                if(string.charAt(i) != '?'){
                    fixedUrl+=string.charAt(i);
                }
                else
                    return fixedUrl;   
        }
}

function deployObserver(target){var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName == "src") {
        console.log('a')
        console.log(target);
        src = mutation.target.src
        mutation.target.src = immadiatefix(src);
        observer.disconnect();
      }
    });
  });
  
  observer.observe(target, {
    attributes: true //configure it to listen to attribute changes
  });
}

function deployOnLoadObserver(){
    target = document.getElementById('main-container');
    var observer = new MutationObserver(function(mutations) {
        setTimeout(job,3000)
        observer.disconnect();
  });
  if(target!=null)
  observer.observe(target, {childList: true, subtree: true});
  console.log(target);
}

