// Set up a collection to contain visitor information. On the server, it is backed by a MongoDB collection named "visitors".
Visitors = new Meteor.Collection("visitors");

// TO REMOVE IF YOU USE AUTOPUBLISH
Meteor.subscribe("visitors", Meteor.userId());

Visitors.insert({
	uuid:Meteor.uuid(), 
	appCodeName: navigator.appCodeName,
	appName: navigator.appName,
	appVersion: navigator.appVersion, 
	product: navigator.product,
	platform: navigator.platform,
	userAgent: navigator.userAgent,
	language: navigator.language,
	systemLanguage: navigator.systemLanguage,
	cookieEnabled: navigator.cookieEnabled,
	createdAt: new Date()
});

Template.visitorsPane.helpers({
	visitors : function() {
		var intReg = /^-?[0-9]+$/, limit = 10, currentPage = 0;
		if(intReg.test(Session.get("visitors_pagination").limit)) {
		   limit = Session.get("visitors_pagination").limit;
		}
		if(intReg.test(Session.get("visitors_current_page"))) {
		   currentPage = Session.get("visitors_current_page");
		}
		var pagination = Session.get("visitors_pagination");
		if (limit==-1){
			delete pagination.skip;
			delete pagination.limit;
		} else{
			pagination.skip = currentPage*limit;
			pagination.limit = limit;
			Session.set("visitors_pagination", pagination);
		}
		return Visitors.find({}, pagination);
	},
	visits: function() {
		return Visitors.find().count();
	},
	current_page : function () {
		return Session.get("visitors_current_page")+1;
	},
	canPaginate : function() {
		var limit = Session.get("visitors_pagination").limit;
		return limit>=0 ? true : false;
	},
	isSelected: function(limitChoice) {
		return Session.get("visitors_pagination").limit == parseInt(limitChoice) ? {selected:'selected'} : '';
	}
});

Template.visitorsPane.events({
	'change select.vLimit': function () {
		Session.set("visitors_current_page", 0);
		var pagination = Session.get("visitors_pagination");
		pagination.limit = parseInt($(".vLimit").val());
		Session.set("visitors_pagination", pagination);
	},
	'click span.back': function () {
		if( Session.get("visitors_current_page")>0) {
			Session.set("visitors_current_page", Session.get("visitors_current_page")-1);
		}
	},
	'click span.next': function () {
		var total = Visitors.find().count();
		var restoc = total - (Session.get("visitors_current_page")+1)*Session.get("visitors_pagination").limit;
		if (restoc > 0) {
			Session.set("visitors_current_page", Session.get("visitors_current_page")+1);
		}
	}
});