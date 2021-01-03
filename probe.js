
var timeoutflow = 0
var timeout = setTimeout(checker,250);
var videos;
function checker(){
  var videos = document.getElementsByTagName('video');
  if(videos.length==0 && timeoutflow < 60){
    setTimeout(checker,250);
    timeoutflow++;
  }
  else  {
    job();
    deployOnLoadObserver();
  }
}


chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    var command = message.startJob
    if(command == 'ok'){
        
    }
    else{}
  });

function job(){
    videos = document.getElementsByTagName('video'); 
    
    if(videos.length >0){
        for(let video of videos){
          if(video.getAttribute('src') < 10){
            deployObserver(video);
          }
           
        }   
    }
}

function immadiatefix(string){
    fixedUrl = "";
        for(var i = 0; i < string.length; i++){ 
                if(string.charAt(i) != '?'){
                    fixedUrl+=string.charAt(i);
                }
                else
                    return fixedUrl;
                if(i>300){ return fixedUrl;}
        }
}

function deployObserver(target){

var observer = new MutationObserver(function(mutations) {

    mutations.forEach(function(mutation) {
      if (mutation.attributeName == "src" && mutation.target.getAttribute('src').includes('?')) {
        mutation.target.pause();
        observer.disconnect();
        src = mutation.target.src;
        mutation.target.src =  immadiatefix(src);        
        mutation.target.currentTime = 0;
        mutation.target.play();
      }
    });

  });
  
  observer.observe(target, {
    attributes: true //configure it to listen to attribute changes
  });

  
}
var container = document.body;
function deployOnLoadObserver(){
    var onloadObserver = new MutationObserver(function(mutations) {
        job();
  });
  if(container)
  onloadObserver.observe(container, {childList: true});

}

