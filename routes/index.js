
/*
 * GET home page.
 */
var Topics = {"topic":[["problem","bank","checks","number","people"],["account","accounts","checking","savings","thing"],["bank","deposit","branch","changed","customer"],["time","charged","call","put","make"],["pay","fees","told","send","amount"],["bank","check","money","made","account"],["america","service","business","charge","charges"],["card","credit","month","lot","give"],["fee","called","atm","payment","payments"],["back","phone","online","work","due"]]};

var Trend = {"trend":{"2013-05-05":[0.08928571428571429,0.08928571428571429,0.08928571428571429,0.10714285714285714,0.125,0.10714285714285714,0.08928571428571429,0.08928571428571429,0.10714285714285714,0.10714285714285714],"2013-05-07":[0.07692307692307693,0.1076923076923077,0.07692307692307693,0.09230769230769231,0.07692307692307693,0.16923076923076924,0.07692307692307693,0.07692307692307693,0.1076923076923077,0.13846153846153847]}};
var unirest = require('unirest');

var Request = unirest.get("https://jeannie.p.mashape.com/text/?input="+'what%20is%20iphone'+"&locale=en&location=35.182716%2C-80.914640&clientFeatures=all&timeZone=EST&out=simple%2Fjson")
	.headers({ 
		"X-Mashape-Authorization": "MToQ3BiYcWw9TN73TNofXogwkzvnJbf4"
	})
	.end(function (response) {
		console.log(response.raw_body);
	});
 
 
exports.index = function(req, res){
	
	res.render('index');
};

exports.PageFile = function(req, res){
	
	res.render('PageFile',{Topic:Topics.topic,Trend: Trend.trend});
};

exports.PageTwitter = function(req, res){
	
	res.render('PageTwitter',{Topic:Topics.topic,Trend: Trend.trend});
};



exports.getTopic = function(req, res){	  

	res.send({Topic:Topics.topic,Trend: Trend.trend});
};


exports.getSpecTopic = function(req, res){	  
	
	try{
		var topicNumber = parseInt(req.body.topicValue) -1;
		var T = Topics.topic[topicNumber];
		var t = [9, 6, 8,7,9,12,3];
		console.log(req.body.topicValue);
		res.send({Topic:T,Trend: t});
		
	}
	catch(err){
		console.log(err);
		res.send({err:'err'});
	}
	
	
};

exports.getKeyWord = function(req, res){	  
	
	res.send({});
	
	
};




