//---------------------------------------------//
//          HandleBars Session Helper          //
//---------------------------------------------//

Handlebars.registerHelper('session',function(input){
    return Session.get(input);
});

Session.setDefault("isAdmin", false);
Session.setDefault("users_current_page", 0);
Session.setDefault("users_pagination", {});
Session.setDefault("visitors_current_page", 0);
Session.setDefault("visitors_pagination", {sort: {createdAt: "desc", appName: "desc"}, skip: 0, limit : 10});

