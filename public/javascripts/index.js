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


$('.topicSelect').click(function(e){
	e.preventDefault();
	$('#TopicPanel').removeClass('visible').addClass('hidden'); 
	$('#GraphPanel').removeClass('hidden').addClass('visible'); 
	$('#T').html('');
	var data = {};
	data.topicValue = this.value;
	var tValue = data.topicValue;
	$('#PanelHeading').html('<h3 class="panel-title">Topic-'+this.value+'</h3>' + '<span class="pull-right panel-collapsed clickable "><i class="glyphicon glyphicon-minus"></i></span>');
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/getSpecTopic',						
		success: function(data) {
			//console.log(data.Topic);
			var htmlString = new String();
			for(var i=0; i< data.Topic.length;i++){
				htmlString = htmlString + '<div class="table-responsive"><table class="table table-hover" width="100%">';
				
				if(i%5 === 0){
					htmlString = i === 0 ?  htmlString + '<tr>' : '</tr>' + htmlString + '<tr>';
					htmlString = htmlString + '<td width="20%"> <font color="green">'+data.Topic[i]+'</font></td>';
				}
				else{
					htmlString = htmlString + '<td width="20%"> <font color="green">'+data.Topic[i]+'</font></td>';
				}

			}
			
			htmlString = htmlString + '</tr></table></div>';
			
			$('#T').html(htmlString);
			
		},
		error: function (error) {
			
			alert('error');
		}
		
	});	
	
		
	
});


$('.back').click(function(e){
	e.preventDefault();
	$('#GraphPanel').removeClass('visible').addClass('hidden'); 
	$('#TopicPanel').removeClass('hidden').addClass('visible'); 
	
});


$('#SubmitButton').click(function(e){
	e.preventDefault();
	
	var data = {};
	data.keyword = $('#keyword').val();
	var cat = [];
	cat.push($('#keyword').val());
	
	var ser = [{
					name: 'Topic-1',
					data: [5]
				}, {
					name: 'Topic-2',
					data: [2]
				}, {
					name: 'Topic-3',
					data: [3]
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
				title: {
					text: ''
				},
				xAxis: {
					categories: cat
				},
				yAxis: {
					min: 0,
					title: {
						text: ''
					},
					stackLabels: {
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
						}
					}
				},
				legend: {
					align: 'right',
					x: -70,
					verticalAlign: 'top',
					y: 20,
					floating: true,
					backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
					borderColor: '#CCC',
					borderWidth: 1,
					shadow: false
				},
				tooltip: {
					
					positioner: function () {
						return { x: 500, y: 80 };
					},
					shadow: false,
					borderWidth: 0,
					backgroundColor: 'rgba(255,255,255,0.8)'
				},
				plotOptions: {
					column: {
						stacking: 'normal',
						dataLabels: {
							enabled: true,
							color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
							style: {
								textShadow: '0 0 3px black, 0 0 3px black'
							}
						}
					}
				},
				series: ser
			});
			$('#myModal').modal('show');
			
			
		},
		error: function (error) {

			alert('error');
		}
		
	});	
	
	
});


$('#Run').click(function(e){
	e.preventDefault();
	$('#Start').removeClass('visible').addClass('hidden'); 
	$('#TopicPanel').removeClass('hidden').addClass('visible'); 
	
	var data = {};
	
	
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: '/getTopic',						
		success: function(data) {
			var htmlString = new String();
			for(var i=0; i< data.Topic.length;i++){
				htmlString = htmlString + '<div class="table-responsive"><table class="table table-hover" width="100%">';
				for(var j=0 ; j < data.Topic[i].length ; j++)
				{	if(j%5 === 0){
						htmlString = j === 0 ?  htmlString + '<tr>' : '</tr>' + htmlString + '<tr>';
						htmlString = htmlString + '<td width="20%"> <font color="green">'+data.Topic[i][j]+'</font></td>';
					}
					else{
						htmlString = htmlString + '<td width="20%"> <font color="green">'+data.Topic[i][j]+'</font></td>';
					}
				}
				
				htmlString = htmlString + '</tr></table></div>';
				var id = '#Topic-' + (i+1); console.log(id);
				$(id).html(htmlString);
				htmlString = '';
			}
			//console.log(data.Topic);
			//console.log(data.Trend);
			
			
		},
		error: function (error) {
			
			alert('error');
		}
		
	});	
	
});


$(function () { 
    $('#container').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Time Trend of Topic'
            },
            
            xAxis: {
                type: 'datetime',
                minRange: 14 * 24 * 3600000 // fourteen days
            },
            yAxis: {
                title: {
                    text: 'P(x)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
    
            series: [{
                type: 'area',
                name: 'Time Trend',
                pointInterval: 24 * 3600 * 1000,
                pointStart: Date.UTC(2014, 1, 01),
                data: [
                    0.8446, 0.8445, 0.8444, 0.8451,    0.8418, 0.8264,    0.8258, 0.8232,    0.8233, 0.8258,
                    0.8283, 0.8278, 0.8256, 0.8292,    0.8239, 0.8239,    0.8245, 0.8265,    0.8261, 0.8269,
                    0.8273, 0.8244, 0.8244, 0.8172,    0.8139, 0.8146,    0.8164, 0.82,    0.8269, 0.8269,
                    0.8269, 0.8258, 0.8247, 0.8286,    0.8289, 0.8316,    0.832, 0.8333,    0.8352, 0.8357,
                    0.8355, 0.8354, 0.8403, 0.8403,    0.8406, 0.8403,    0.8396, 0.8418,    0.8409, 0.8384,
                    0.8386, 0.8372, 0.839, 0.84, 0.8389, 0.84, 0.8423, 0.8423, 0.8435, 0.8422,
                    0.838, 0.8373, 0.8316, 0.8303,    0.8303, 0.8302,    0.8369, 0.84, 0.8385, 0.84,
                    0.8401, 0.8402, 0.8381, 0.8351,    0.8314, 0.8273,    0.8213, 0.8207,    0.8207, 0.8215,
                    0.8242, 0.8273, 0.8301, 0.8346,    0.8312, 0.8312,    0.8312, 0.8306,    0.8327, 0.8282,
                    0.824, 0.8255, 0.8256, 0.8273, 0.8209, 0.8151, 0.8149, 0.8213, 0.8273, 0.8273
                    
                ]
            }]
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
	
	 $('#containerFrontPage').highcharts({
         title: {
                text: 'Time Trend Analysis of Topic',
                x: -20
				
            },
           
            xAxis: {
                categories: cat
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
	
jQuery(function($){

	

});