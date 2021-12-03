chrome.tabs.onUpdated.addListener((tabId, { }, tab) => {
    if (tab.url === `https://ums.lpu.in/lpuums/StudentDashboard.aspx`) {
        chrome.storage.sync.get(["autoLogin", "page_option"], function (get) {
            chrome.storage.sync.set({ loginStarted: false });
            var page_option = get.page_option;
            var autoLogin = get.autoLogin;
            if (autoLogin) {
                chrome.storage.sync.set({ autoLogin: false });
                if (page_option === "home") {
                    var updateURL = `https://ums.lpu.in/lpuums/Default3.aspx`;
                    chrome.tabs.update(tab.id, {
                        url: updateURL,
                        active: true,
                    });
                } else if (page_option === "viewAssignments") {
                    var updateURL = `https://ums.lpu.in/lpuums/frmstudentdownloadassignment.aspx`;
                    chrome.tabs.update(tab.id, {
                        url: updateURL,
                        active: true,
                    });
                } else if (page_option === "uploadAssignments") {
                    var updateURL = `https://ums.lpu.in/lpuums/frmstudentassignmentupload.aspx`;
                    chrome.tabs.update(tab.id, {
                        url: updateURL,
                        active: true,
                    });
                }
            }
        });
    }
    // else if(tab.url === `https://myclass.lpu.in/`){
    //     chrome.storage.sync.get(["autoLogin"], function(get) {
    //         chrome.storage.sync.set({ loginStarted: false });
    //         var autoLogin = get.autoLogin;
    //         if (autoLogin) {
    //             chrome.storage.sync.set({ autoLogin: false });
    //             if (page_option === "home") {
    //                 var updateURL = `https://ums.lpu.in/lpuums/Default3.aspx`;
    //                 chrome.tabs.update(tab.id, {
    //                     url: updateURL,
    //                     active: true,
    //                 });
    //             }
    //         }
    //     });
    // }
});