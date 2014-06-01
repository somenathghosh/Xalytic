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

/*
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
*/	
	var dataInv = [{
			name: 'Topic-1',
			data: [9, 6, 8,7,9,12,3]
		}];

$(function () { 

	
	
	$('#containerFrontPage').html('<h4> Click on Topics to gen Chart</h4>');
	/*
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
	*/
	var dataCat = [];
	var dataTrend = [];
	$('#TopicHeading a').click(function(e) {
	
		e.preventDefault();
		
		
		
		var data = {};
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/getTopic',						
			success: function(data) {
				
				console.log(data.Topic);
				console.log(data.Trend);
				console.log(data.cat);
				dataCat = data.cat;
				dataTrend = data.Trend;
				
				$('#containerFrontPage').html('');
				$('#containerFrontPage').highcharts({
					 title: {
							text: 'Time Trend Analysis of Topic',
							x: -20
							
						},
					   
						xAxis: {
							categories: data.cat,
							tickInterval: 2
						},
						yAxis: {
							title: {
								text: ''
							},
							plotLines: [{
								value: 10,
								width: 5
							   
							}]
						},
						plotOptions: {
							series: {
								marker: {
									enabled: false
								}
							}
						},
						legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle',
							borderWidth: 0
						},
						series: data.Trend
				});
				
				
			},
			error: function (error) {
				
				alert('error');
			}
			
		});	
		
		
	});


	
	
	$('#Topic a').click(function(e) {
		var $this = $(this);
		$('#containerFrontPage').html('');
		console.log(dataTrend[$('#Topic a').index($this)]);
		var dataInv = [];
		dataInv.push(dataTrend[$('#Topic a').index($this)]);
		
		$('#containerFrontPage').highcharts({
			  title: {
                text: 'Time Trend Analysis of Topic-' + ($('#Topic a').index($this)+1) ,
                x: -20 //center
            },
            
            xAxis: {
                categories: dataCat,
				tickInterval: 2
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
			plotOptions: {
				series: {
					marker: {
						enabled: false
					}
				}
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
		
		if($('#keyword').val() === '' || $('#keyword').val() === undefined ){
		
			alert('enter keyword to search');
			return false;
		}
		
		var data = {};
		data.keyword = $('#keyword').val();
		var cat = ['T-1','T-2','T-3','T-4','T-5','T-6','T-7','T-8','T-9','T-10','T-11','T-12','T-13','T-14','T-15','T-16','T-17','T-18','T-19','T-20'];
		cat.push($('#keyword').val());
		console.log(cat);
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
				console.log(data.data);
				$('#keyWordSearch').highcharts({
					
					chart: {
						type: 'column'
					},
					
					title: {
						text: 'Weightage of <strong>' + $('#keyword').val() + '</strong> in Topics'
					},
					
					xAxis: {
						categories: cat
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Weightage'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
							'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
					series: data.data
        
				});
				$('#ModalHeader').html('<h4> The Searched term : <strong>'+$('#keyword').val()+'</strong></h4>');
				$('#myModal').modal({show:true,backdrop:false});
				$("#myModal").draggable({
					handle: ".modal-header"
				}); 

			},
			error: function (error) {

				alert('error');
			}
			
		});	
		
		
	});
	
	$('#genHeatMap').click(function(e){
		e.preventDefault();
		var data = {};
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/getCorrelationTwitter',						
			success: function(data) {
				console.log(data.data[0][0]);
				$('#containerHeatMap').html('');
				$('#containerHeatMap').highcharts({
        
					chart: {
						type: 'heatmap',
						marginTop: 40,
						marginBottom: 40
					},


					title: {
						text: 'Correlation Matrix'
					},

					xAxis: {
						categories: ['T-20', 'T-19', 'T-18', 'T-17', 'T-16', 'T-15', 'T-14', 'T-13', 'T-12', 'T-11','T-10', 'T-9', 'T-8', 'T-7', 'T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1']
					},

					yAxis: {
						categories: ['T-1', 'T-2', 'T-3', 'T-4', 'T-5', 'T-6', 'T-7', 'T-8', 'T-9', 'T-10','T-11', 'T-12', 'T-13', 'T-14', 'T-15', 'T-16', 'T-17', 'T-18', 'T-19', 'T-20'],
						title: null
					},

					colorAxis: {
						min: -1,
						minColor: '#FF0000',
						maxColor: '#00FF00'
					},

					legend: {
						align: 'right',
						layout: 'vertical',
						margin: 0,
						verticalAlign: 'top',
						y: 25,
						symbolHeight: 320
					},

					tooltip: {
						formatter: function () {
							return '<b>' + this.series.yAxis.categories[this.point.y] + '</b> /<br><b>' +
								this.series.xAxis.categories[this.point.x] + '</b> =  <br><b>' + this.point.value ;
						}
					},

					series: [{
						name: 'Sales per employee',
						borderWidth: 1,
						//data: [[0,0,10],[0,1,19],[0,2,8],[0,3,24],[0,4,67],[1,0,92],[1,1,58],[1,2,78],[1,3,117],[1,4,48],[2,0,35],[2,1,15],[2,2,123],[2,3,64],[2,4,52],[3,0,72],[3,1,132],[3,2,114],[3,3,19],[3,4,16],[4,0,38],[4,1,5],[4,2,8],[4,3,117],[4,4,115],[5,0,88],[5,1,32],[5,2,12],[5,3,6],[5,4,120],[6,0,13],[6,1,44],[6,2,88],[6,3,98],[6,4,96],[7,0,31],[7,1,1],[7,2,82],[7,3,32],[7,4,30],[8,0,85],[8,1,97],[8,2,123],[8,3,64],[8,4,84],[9,0,47],[9,1,114],[9,2,31],[9,3,48],[9,4,91]],
						data: data.data,
						dataLabels: {
							enabled: false,
							color: 'black',
							style: {
								textShadow: 'none',
								HcTextStroke: null
							}
						}
					}]

				});
			},
			error: function (error) {

				alert('error');
			}
			
		});	
		
		
		
	
	
	});
	
	

});

/*
$(function () {

    $('#containerHeatMap').highcharts({
        
        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40
        },


        title: {
            text: 'Sales per employee per weekday'
        },

        xAxis: {
            categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
        },

        yAxis: {
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            title: null
        },

        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 320
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                    this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },

        series: [{
            name: 'Sales per employee',
            borderWidth: 1,
            data: [[0,0,10],[0,1,19],[0,2,8],[0,3,24],[0,4,67],[1,0,92],[1,1,58],[1,2,78],[1,3,117],[1,4,48],[2,0,35],[2,1,15],[2,2,123],[2,3,64],[2,4,52],[3,0,72],[3,1,132],[3,2,114],[3,3,19],[3,4,16],[4,0,38],[4,1,5],[4,2,8],[4,3,117],[4,4,115],[5,0,88],[5,1,32],[5,2,12],[5,3,6],[5,4,120],[6,0,13],[6,1,44],[6,2,88],[6,3,98],[6,4,96],[7,0,31],[7,1,1],[7,2,82],[7,3,32],[7,4,30],[8,0,85],[8,1,97],[8,2,123],[8,3,64],[8,4,84],[9,0,47],[9,1,114],[9,2,31],[9,3,48],[9,4,91]],
            dataLabels: {
                enabled: true,
                color: 'black',
                style: {
                    textShadow: 'none',
                    HcTextStroke: null
                }
            }
        }]

    });
});

*/