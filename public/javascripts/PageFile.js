$(document).on('click', '.panel-heading span.clickable', function (e) {
	var $this = $(this);
	if (!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
	}
});

var cat = ['2013-05-05', '2013-05-06', '2013-05-07','2013-05-08','2013-05-09','2013-05-10','2013-05-11'];
var data = [{
			name: 'Topic-1',
			data: [9, 6, 8,7,9,12,3]
		}, {
			name: 'Topic-2',
			data: [9, 7, 10,9,8,5,12]
		}, {
			name: 'Topic-3',
			data: [9, 3, 8,16,3,9,8]
			}, {
			name: 'Topic-4',
			data: [11, 17,9,8,6,5,2]

	}];
	
	var dataInv = [{
			name: 'Topic-1',
			data: [9, 6, 8,7,9,12,3]
		}];


$(function () { 

	
	
	
	$('#containerFrontPage').highcharts({
		title: {
			text: 'Time Trend Analysis of Topic',
			x: -20
			
		},
	   
		xAxis: {
			categories: cat,
			tickInterval: 2
		},
		yAxis: {
			title: {
				text: 'P(x)'
			},
			plotLines: [{
				value: 10,
				width: 5
			   
			}]
		},
		tooltip: {
			valueSuffix: '%'
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			borderWidth: 0
		},
		series: data
	});
		
		
	$('#TopicHeading a').click(function(e) {
		$('#containerFrontPage').html('');
		$('#containerFrontPage').highcharts({
			 title: {
					text: 'Time Trend Analysis of Topic',
					x: -20
					
				},
			   
				xAxis: {
					categories: cat,
					tickInterval: 2
				},
				yAxis: {
					title: {
						text: 'P(x)'
					},
					plotLines: [{
						value: 10,
						width: 5
					   
					}]
				},
				tooltip: {
					valueSuffix: '%'
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series: data
		});
	});

	
});



jQuery(function($){
	console.log(Topic.length);
	var data = {};
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/getTopic',						
		success: function(data) {
			
			console.log(data.Topic);
			console.log(data.Trend);
			
			
		},
		error: function (error) {
			
			alert('error');
		}
		
	});	
	
	
	
	
	
	
	
	
	$('#Topic a').click(function(e) {
		var $this = $(this);
		$('#containerFrontPage').html('');
		
		$('#containerFrontPage').highcharts({
			title: {
				text: 'Time Trend Analysis of Topic-' + ($('#Topic a').index($this)+1),
				x: -20
				
			},
		   
			xAxis: {
				categories: cat,
				tickInterval: 2
			},
			yAxis: {
				title: {
					text: 'P(x)'
				},
				plotLines: [{
					value: 10,
					width: 5
				   
				}]
			},
			tooltip: {
				valueSuffix: '%'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: dataInv
		});
		
	});
	
	
	
	
	
	$('#SubmitButton').click(function(e){
		e.preventDefault();
		
		var data = {};
		data.keyword = $('#keyword').val();
		var cat = ['Topic-1','Topic-2','Topic-3','Topic-4','Topic-5','Topic-6','Topic-7','Topic-8','Topic-9','Topic-10'];
		cat.push($('#keyword').val());
		
		var ser = [{
						name: $('#keyword').val() ,
						data: [20,30,10, 50,60,20, 70,50,10, 30]
			
				}];
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/getKeyword',						
			success: function(data) {
				
				$('#keyWordSearch').highcharts({
					
					chart: {
						type: 'column'
					},
					colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', 
								'#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
					title: {
						text: 'Probability of Relation'
					},
					
					xAxis: {
						categories: cat
					},
					yAxis: {
						min: 0,
						title: {
							text: 'P(x)'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
							'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: ser
        
				});
				$('#ModalHeader').html('<h4>'+$('#keyword').val()+'</h4>');
				$('#myModal').modal('show');
				
				
			},
			error: function (error) {

				alert('error');
			}
			
		});	
		
		
	});

	

});