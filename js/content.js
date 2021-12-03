$(function () {
    chrome.storage.sync.get(
        ["userId", "pass", "autoLogin", 'target', "page_option", "loginStarted"],
        function (get) {
            if (get.target === 'ums') {
                $("#txtU").val(get.userId);
                $("#TxtpwdAutoId_8767").val(get.pass);
                if (get.autoLogin) {
                    if (get.loginStarted) {
                        chrome.storage.sync.set({ loginStarted: false });
                        chrome.storage.sync.set({ autoLogin: false });
                    } else {
                        chrome.storage.sync.set({ loginStarted: true });
                        $("#iBtnLogins").click();
                    }
                }
                if (get.page_option === "landing") {
                    chrome.storage.sync.set({ autoLogin: false });
                }
            } else if (get.target === 'class') {
                $("#txtUserName").val(get.userId);
                $("#txtPassword").val(get.pass);
                $('.pb-lg-0, .pb-5').append("<b>Enter Captcha and click Sign In</b>");
            } 
            // else if (get.target === 'live') {
            //     $("#inputEmail").val(get.userId);
            //     $("#inputPassword").val(get.pass);
            //     $(".btn-next").removeAttr("disabled");;
            //     $(".btn-next").click();
            // }
        }
    );
});