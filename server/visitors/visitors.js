// server: publish the current size of users visiting the site
Visitors = new Meteor.Collection("visitors");

Meteor.publish("visitors", function(){
	if( Meteor.users.findOne({_id:this.userId, "profile.roles":"admin"})){
		return Visitors.find();
	}
});