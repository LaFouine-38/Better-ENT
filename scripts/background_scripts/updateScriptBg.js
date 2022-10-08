chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.sender == 'updatePage' && request.action == 'executeUpdateScript'){
        function updateOnBg(){
            //code en cas d'update
            return
        }
        updateOnBg()

    }
    if (request.sender == 'updatePage' && request.action == 'close'){
        chrome.tabs.query({ active: true }, function(tabs) {  
            chrome.tabs.remove(tabs[0].id);   
        });
    }
})