$(document).ready(function () {
    var userIdField = document.getElementById("check");
    var savePassField = document.getElementById("checkfuture");
    var target = document.getElementById("id_target");
    var page_option = document.getElementById("id_page");
    chrome.storage.sync.get(["saveUserId"], function (get) {
        if (get.saveUserId == true) {
            userIdField.checked = true;
            chrome.storage.sync.get(["userId"], function (get) {
                $("#textbtn").val(get.userId);
            });
        } else if (get.saveUserId == false) {
            userIdField.checked = false;
        }
    });

    chrome.storage.sync.get(["savePassword"], function (get) {
        if (get.savePassword == true) {
            savePassField.checked = true;
            chrome.storage.sync.get(["pass"], function (get) {
                $("#passbtn").val(get.pass);
            });
        } else if (get.saveUserId == false) {
            savePassField.checked = false;
        }
    });
    function changeTarget() {
        page_option.disabled = false;
        if (target.value !== 'ums') {
            page_option.disabled = true;
        }
    }
    target.onchange = changeTarget;
    changeTarget();
    chrome.storage.sync.get(["target", "page_option"], function (get) {
        target.value = get.target;
        page_option.disabled = false;
        if (target.value !== 'ums') {
            page_option.disabled = true;
        }
        page_option.value = get.page_option;
    });
});

$(function () {
    var userIdField = document.getElementById("check");
    var savePassField = document.getElementById("checkfuture");
    var page_option = document.getElementById("id_page");
    var target = document.getElementById("id_target");
    $("#loginbtn").click(function () {
        var name = $("#textbtn").val();
        var pass = $("#passbtn").val();
        if (pass.length === 0 || name.length === 0 || page_option.value.length === 0) {
            alert("ENTER YOUR PASSWORD OR USER ID or Select the Dashboard page");
        } else {
            chrome.storage.sync.set({ userId: name });
            chrome.storage.sync.set({ pass: pass });
            chrome.storage.sync.set({ saveUserId: userIdField.checked });
            chrome.storage.sync.set({ savePassword: savePassField.checked });
            chrome.storage.sync.set({ page_option: page_option.value });
            chrome.storage.sync.set({ target: target.value });
            chrome.storage.sync.set({ autoLogin: true });
            chrome.storage.sync.set({ loginStarted: false });
            if (target.value === 'ums') {
                chrome.tabs.create({
                    url: "https://ums.lpu.in/lpuums/LoginNew.aspx",
                    active: true,
                });
            }else if(target.value === 'class'){
                chrome.tabs.create({
                    url: "https://myclass.lpu.in/",
                    active: true,
                });
            }
            // else if(target.value === 'live'){
            //     chrome.tabs.create({
            //         url: "https://lpulive.lpu.in/login",
            //         active: true,
            //     });
            // }
            window.close();
        }
    });
});