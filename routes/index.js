
/*
 * GET home page.
 */
var Topics = {};
var cat = [];

var firstTimeFlagFile = true;
var firstTimeFlagTwitter = true;
//var data = [];

//http://tm-server.herokuapp.com/?q=explore&term=credit
//http://tm-server.herokuapp.com/?q=topic&dsinit=twitter&thandle=BofA_help
//var Trend = {"trend":{"2013-05-05":[0.08928571428571429,0.08928571428571429,0.08928571428571429,0.10714285714285714,0.125,0.10714285714285714,0.08928571428571429,0.08928571428571429,0.10714285714285714,0.10714285714285714],"2013-05-07":[0.07692307692307693,0.1076923076923077,0.07692307692307693,0.09230769230769231,0.07692307692307693,0.16923076923076924,0.07692307692307693,0.07692307692307693,0.1076923076923077,0.13846153846153847]}};

var dataObj = [];

var unirest = require('unirest');

 
exports.index = function(req, res){
	
	res.render('index');
};

exports.PageFile = function(req, res){
	if(firstTimeFlagFile === true){
	
		unirest.get("http://tm-server.herokuapp.com/?q=topic&dsinit=survey")
		.headers({ 
			"X-tm-Authorization": "MToQ3BiYcWw9TN73TNofXogwkzvnJbf4"
		 })
		.end(function (response) {
			if(response !== undefined) {
				//console.log(response.raw_body);
				Topics = JSON.parse(response.raw_body);
				console.log(Topics);
				unirest.get("http://tm-server.herokuapp.com/?q=datetrends&data=survey&start=2013-05-01&end=2013-05-31")
				.headers({ 
					"X-tm-Authorization": "MToQ3BiYcWw9TN73TNofXogwkzvnJbf4"
				})
				.end(function (response) {
					
					Trend = JSON.parse(response.raw_body);
					//console.log(Trend);
					cat = [];
					for(var i=1 ; i <=31 ; i++){
						cat.push('2013-05-'+(i <10 ? '0'+i : i));
					}
					//console.log(cat[30]);
					//console.log(Trend.trend[cat[30]]);
					
					//t = 0;
					dataObj = [];
					for(var t = 0 ; t < 10 ; t++){
						var obj = {};
						obj.name = 'Topic-'+ (t+1);
						var array = [];
						for ( var i =0 ; i < 31 ; i ++){
							array.push(Trend.trend[cat[i]][t]);
							
						}
						obj.data = array;
						dataObj.push(obj);
						console.log(dataObj);
					}
					//Trend = dataObj;
					console.log(dataObj);
					res.render('PageFile',{Topic:Topics.topic,Trend: dataObj});
					firstTimeFlagFile = false;
				});
				
				
				
			}
			else{
				console.log('Error in getting services');
				res.send('err');
			}
		});

	}
	
	else {
	
		res.render('PageFile',{Topic:Topics.topic,Trend: dataObj});
	
	}
	
};

exports.PageTwitter = function(req, res){

	if(firstTimeFlagTwitter === true){
	
		//unirest.get("http://tm-server.herokuapp.com/?q=topic&dsinit=twitter&thandle=BofA_help")
		unirest.get("http://tm-server.herokuapp.com/?q=topic")
		.headers({ 
			"X-tm-Authorization": "MToQ3BiYcWw9TN73TNofXogwkzvnJbf4"
		 })
		.end(function (response) {
			if(response !== undefined) {
				//console.log(response.raw_body);
				Topics = JSON.parse(response.raw_body);
				console.log(Topics);
				unirest.get("http://tm-server.herokuapp.com/?q=datetrends&start=2014-05-25&end=2014-05-31")
				.headers({ 
					"X-tm-Authorization": "MToQ3BiYcWw9TN73TNofXogwkzvnJbf4"
				})
				.end(function (response) {
					
					Trend = JSON.parse(response.raw_body);
					console.log(Trend);
					cat = [];
					for(var i=25 ; i <=31 ; i++){
						cat.push('2014-05-'+(i <10 ? '0'+i : i));
					}
					//console.log(cat[30]);
					//console.log(Trend.trend[cat[30]]);
					
					//t = 0;
					dataObj = [];
					for(var t = 0 ; t < 20 ; t++){
						var obj = {};
						obj.name = 'Topic-'+ (t+1);
						var array = [];
						for ( var i =0 ; i < 7 ; i ++){
							if(Trend.trend[cat[i]] !== undefined){
								array.push(Trend.trend[cat[i]][t]);
							}
							else{
								array.push(0);
							}
							
						}
						obj.data = array;
						dataObj.push(obj);
						console.log(dataObj);
					}
					//Trend = dataObj;
					console.log(dataObj);
					res.render('PageTwitter',{Topic:Topics.topic,Trend: dataObj});
					firstTimeFlagTwitter = false;
				});

			}
			else{
				console.log('Error in getting services');
				res.send('err');
			}

		});
	
	}
	
	else{
	
		res.render('PageTwitter',{Topic:Topics.topic,Trend: dataObj});
	
	}
	
	
};



exports.getTopic = function(req, res){	  

	res.send({Topic:Topics.topic,Trend: dataObj,cat:cat});
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
	
	var term = req.body.keyword;
	unirest.get("http://tm-server.herokuapp.com/?q=explore&term="+term)
	.headers({ 
		"X-tm-Authorization": "MToQ3BiYcWw9TN73TNofXogwkzvnJbf4"
	 })
	.end(function (response) {
		console.log(response.raw_body);
		var ser = [];
		var data = {};
		data.name = term;
		data.data = (JSON.parse(response.raw_body)).weights;
		ser.push(data);
		res.send({data:ser});
	});
	
};


exports.getCorrelation = function(req, res){	  
	
	unirest.get("http://tm-server.herokuapp.com/?q=corr")
	.headers({ 
		"X-tm-Authorization": "MToQ3BiYcWw9TN73TNofXogwkzvnJbf4"
	 })
	.end(function (response) {
		//console.log(JSON.parse(response.raw_body).correlation);
		var corr = (JSON.parse(response.raw_body)).correlation;
		console.log(corr);
		//var a = [];
		var data = [];
		//var x=0;
		for (var x = 9 ; x >= 0 ; x --){
			for(var y=0 ; y < 10 ; y++){
				var a = [];
				a.push(x);
				a.push(y);
				a.push(corr[x][9-y]);
				data.push(a);
				
			
			}
			//console.log(data);
			//data.push(a);
		}
		console.log(data);
		res.send({data:data});
		//console.log(data);
	});
	
	
	
	
};



exports.getCorrelationTwitter = function(req, res){	  
	
	unirest.get("http://tm-server.herokuapp.com/?q=corr")
	.headers({ 
		"X-tm-Authorization": "MToQ3BiYcWw9TN73TNofXogwkzvnJbf4"
	 })
	.end(function (response) {
		//console.log(JSON.parse(response.raw_body).correlation);
		var corr = (JSON.parse(response.raw_body)).correlation;
		console.log(corr);
		//var a = [];
		var data = [];
		//var x=0;
		for (var x = 19 ; x >= 0 ; x --){
			for(var y=0 ; y < 20 ; y++){
				var a = [];
				a.push(x);
				a.push(y);
				a.push(corr[x][19-y]);
				data.push(a);
				
			
			}
			//console.log(data);
			//data.push(a);
		}
		console.log(data);
		res.send({data:data});
		//console.log(data);
	});
	
	
	
	
};



