Accounts.onCreateUser(function(options, user) {
  if(options.profile) {
    user.profile = options.profile;
  } else {
    user.profile = { roles:["customer"] };
    user.contact1={email:'', sent:false, verified:false};
    user.contact2={email:'', sent:false, verified:false};
    user.contact3={email:'', sent:false, verified:false};
  }
  user.createdAt = new Date();
  
  // find if invitator exists
  var searchEmail = user.emails[0].address;
  var result = Meteor.users.find({$and:[{$or: [{'contact1.email': searchEmail},{'contact2.email': searchEmail},{'contact3.email': searchEmail}]}, {"profile.roles": "customer"}]}).fetch()
  if(result && result.length>0) {
    for(var i=0; i<result.length; i++){
      var usr = Meteor.users.findOne(result[i]._id);
      //console.log("User found to update with the verified mail : " + searchEmail);
      //console.log(usr);
      if(usr.contact1.email===searchEmail){usr.contact1.verified = true;}
      if(usr.contact2.email===searchEmail){usr.contact2.verified = true;}
      if(usr.contact3.email===searchEmail){usr.contact3.verified = true;}
      if(usr.contact1.verified && usr.contact2.verified && usr.contact3.verified && !usr.senttrackmail){
        var subject = "Télécharges le morceau jeterepondspas";
        var mail = "Bonjour, tous tes ami(e)s se sont inscris, tu peux maintenant télécharger gratuitement la morceau jeterepondspas, connecte toi vite sur ton compte pour le récupérer."
        Email.send({to: usr.emails[0].address, from: "jeterepondspas.redlie@gmail.com", subject: subject, text: mail});
        usr.senttrackmail = true;
      }
      //console.log("User will be updated : ");
      //console.log(usr);
      Meteor.users.update(usr._id, usr);
    }
  }
  return user;
});


Meteor.publish("usersData", function () {
  if( Meteor.users.findOne({_id:this.userId, "profile.roles":"admin"})){
    return Meteor.users.find();
  } else {
    return Meteor.users.find({_id: this.userId}, {fields: {'contact1': 1, 'contact2': 1, 'contact3': 1, 'senttrackmail' : 1}});
  }
});