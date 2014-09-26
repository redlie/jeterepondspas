Tracker.autorun(function() {
  // TO REMOVE IF YOU USE AUTOPUBLISH
  Meteor.subscribe("usersData");
  Meteor.subscribe("visitors");
    Meteor.call('isAdmin', Meteor.user(), function(error, result) {
    Session.set('isAdmin', result);
  });

});

// Main pane //
Template.main.helpers({
  isAdmin: function() {
    console.log("Client : isAdmin : " + Session.get("isAdmin"));
    return Session.get("isAdmin");
  }
});

if(Meteor.isClient) {
  Accounts.config({ sendVerificationEmail : true });
  Accounts.ui.config({ passwordSignupFields: 'USERNAME_AND_EMAIL' });
}