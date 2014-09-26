Meteor.startup(function () {
  if(Meteor.users.find().count()<=0){
    var date = new Date();
    Accounts.createUser({
      email: "jeterepondspas.redlie@gmail.com",
      username: "Redlie",
      password: "Redlie2014",
      profile: { roles:["admin"] },
      roles: ["admin"]
    });
  }
  process.env.MAIL_URL = 'smtp://jeterepondspas.redlie:Redlie2014@smtp.gmail.com:587';
});

Meteor.methods({
  isAdmin: function(){
    if(this.userId){
      var user = Meteor.users.findOne(this.userId);
      if(user && user.profile.roles[0]=="admin") {
        console.log("Server: User profile : " + user.profile.roles[0]);
        return true;
      }
    }
    return false;
  },
  user_create: function(adminId, user) {
    var admin = Meteor.users.findOne(user._id);
    if(admin && admin.profile.roles[0]=="admin") {
      Meteor.users.insert(user);
    }
  },
  user_read: function(id) {
    return Meteor.users.findOne(id);
  },
  user_update: function(pUser) {
    if (pUser) {
      var user = Meteor.users.findOne(pUser._id);
      user.contact1.email = pUser.contact1.email;
      user.contact2.email = pUser.contact2.email;
      user.contact3.email = pUser.contact3.email;
      return Meteor.users.update(user._id, user);
    }
  },
  user_delete : function(adminId, id) {
    var admin = Meteor.users.findOne(adminId);
    if(admin && admin.profile.roles[0]=="admin" && adminId!==id) {
      Meteor.users.remove(id);
    }
  },
  send_email: function (user) {
    var user = Meteor.users.findOne(this.userId);
    if(user){
      // Let other method calls from the same client start running, without waiting for the email sending to complete.
      this.unblock();
      var subject = "Un ami t'as envoyé une invitation.";
      var mail = "Un ami t'as invité a télécharger gratuitement la sonnerie jeterepondspas ! Vite, inscris toi sur le site http://www.jeterepondspas.com et télécharges gratuitement la sonnerie."
      Email.send({to: user.contact1.email, from: user.email, subject: subject,text: mail});
      user.contact1.sent = true;
      Email.send({to: user.contact2.email, from: user.email, subject: subject,text: mail});
      user.contact2.sent = true;
      Email.send({to: user.contact3.email, from: user.email, subject: subject,text: mail});
      user.contact3.sent = true;
      Meteor.users.update(user._id, user);
    }
  }

});