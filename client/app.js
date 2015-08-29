Template.body.helpers({
	topics: function(){
		return Topics.find({}, {sort: [["createdAt", "desc"]]});
	}	
});

// adds index to each item
UI.registerHelper('indexedArray', function(context, options) {
	if(context)	{
		return context.map(function(item, index) {
			item._index = index;
			return item;
		});
	}
})

UI.registerHelper('checkTopicOwner', function(topicID){
	if(!Meteor.user()){
		return false;
	}
	var topic = Topics.findOne({_id:topicID}, {fields: {username:1}});
	if(!topic){
		return false;
	}
	if(typeof topic.username === "undefined"){
		return false;
	}
	return topic.username === Meteor.user().username;
})

UI.registerHelper('checkResponseOwner', function(responseID){
	if(!Meteor.user()){
		return false;
	}
	var response = Responses.findOne({_id:responseID}, {fields: {username:1}});
	if(!response){
		return false;
	}
	if(typeof response.username === "undefined"){
		return false;
	}
	return response.username === Meteor.user().username;
})

UI.registerHelper('checkResponseWinner', function(winningID, responseID){
	if (typeof(winningID) === "undefined"){
		return false;
	}
	return winningID === responseID;
})

UI.registerHelper('userHasVoted', function(responseID){
	var userID = Meteor.userId();
	var voteFound = UserVotes.findOne({_responseID: responseID, _userID: userID});
	if(!voteFound){
		return false;
	}
	return true;
})

Meteor.subscribe("topics");
Meteor.subscribe("responses");
Meteor.subscribe("uservotes");

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});