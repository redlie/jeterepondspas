Constant = function(){
	this.pagination =  {
		options : [{option:1,label:"1"},{option:5,label:"5"},{option:10,label:"10"},{option:15,label:"15"},{option:25,label:"25"},{option:50,label:"50"},{option:-1,label:"ALL"}]
	};
	this.rooturl = "http://localhost:3000/";
	this.facebookurl = "https://www.facebook.com/jeterepondspas";
	this.mp3url = "e1a086_3ce51f1f273a4fa6b285e37ef61b3e77";
};

//-------------------------------------//
//          HandleBars Helper          //
//-------------------------------------//
Handlebars.registerHelper('const', function() {
	!this.const ? this.const = new Constant():null;
	return this.const;
});


Handlebars.registerHelper("formatDate", function(date) {
	if(date instanceof Date || !isNaN(date)){
		var _date = new Date(date);
	    return _date.toDateString() + " " +  _date.toLocaleTimeString();
	} 
});