// ADMIN : Users pane //
Template.usersPane.helpers({
	users : function() {
		var intReg = /^-?[0-9]+$/, limit = 5, currentPage = 0;
		if(intReg.test(Session.get("users_pagination").limit)) {
		   limit = Session.get("users_pagination").limit;
		}
		if(intReg.test(Session.get("users_current_page"))) {
		   currentPage = Session.get("users_current_page");
		}
		var pagination = Session.get("users_pagination");
		if (limit==-1){
			delete pagination.skip;
			delete pagination.limit;
		} else{
			pagination.skip = currentPage*limit;
			pagination.limit = limit;
			Session.set("users_pagination", pagination);
		}
		return Meteor.users.find({}, pagination);
	},
	usersCount: function() {
		return Meteor.users.find().count();
	},
	current_page : function () {
		return Session.get("users_current_page")+1;
	},
	canPaginate : function() {
		var limit = Session.get("users_pagination").limit;
		return limit>=0 ? true : false;
	},
	isSelected: function(limitChoice) {
		return Session.get("users_pagination").limit == parseInt(limitChoice) ? {selected:'selected'} : '';
	},
	isCustomer : function() {
		if(this.profile.roles[0]==="customer"){
			return true;
		}
		return false;
	},
	getEmail: function() {
		return this.emails[0].address;
	}
});

Template.usersPane.events({
	'change select.uLimit': function () {
		Session.set("users_current_page", 0);
		var pagination = Session.get("users_pagination");
		pagination.limit = parseInt($(".uLimit").val());
		Session.set("users_pagination", pagination);
	},
	'click span.back': function () {
		if( Session.get("users_current_page")>0) {
			Session.set("users_current_page", Session.get("users_current_page")-1);
		}
	},
	'click span.next': function () {
		var total = Meteor.users.find().count();
		var restoc = total - (Session.get("users_current_page")+1)*Session.get("users_pagination").limit;
		if (restoc > 0) {
			Session.set("users_current_page", Session.get("users_current_page")+1);
		}
	},
	'click a.deleteuser': function(){
		Meteor.call('user_delete', Meteor.user()._id, this._id);
	}
});


// CUSTOMER:  User pane //
Template.userPane.helpers({
	canDownload: function() {
		var user = Meteor.user();
		if(user && (user.contact1 && user.contact1.isVerified) && (user.contact2 && user.contact2.isVerified) && (user.contact3 && user.contact3.isVerified)){
			return true;
		}else{
			return false;
		}
	}
});

Template.userPane.events({
	'click input.send' : function () {
		var rg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var user = Meteor.user();
		var email1 = $('.welcome .email1').val();
		var email2 = $('.welcome .email2').val();
		var email3 = $('.welcome .email3').val();
		
		if(rg.test(email1)) {
			user.contact1.email = email1;
		} else {
			alert("L'email 1 n'est pas valide");
			return false;
		}
		if(rg.test(email2)){
			user.contact2.email = email2;
		} else {
			alert("L'email 2 n'est pas valide");
			return false;
		}
		if(rg.test(email3)){
			user.contact3.email = email3;
		} else {
			alert("L'email 3 n'est pas valide");
			return false;
		}
		if(email1===email2 || email1===email3 || email2===email3){
			alert("Les 3 emails doivent être différent.");
			return false;
		}
		
		Meteor.call("user_update", user, function(err1, res1){
			Meteor.call('send_email', null, function(err2, res2){
				alert("L'invitation a bien été envoyé à tes ami(e)s.");
			});
		});
	
	}
	
});







