var celcius = 1;
var test = 60;
setInterval(function() {
    var data = {};
    $.ajax({
        url: '/_getdata',
        type: 'GET',
        data: data,
        success: function(result){
            if(celcius)
            {
                $('#Temperature').text(result.temperature + " \u2103");
            }
            else
            {
                var F = (result.temperature *9/5) + 32;
                $('#Temperature').text(F + " \u2109");
            }
            $('#Humidity').text(result.humidity + "%");
            $('#notify').remove();
            if (result.humidity < 40)
            {
              $('#current-humidity-body').append('<div class="alert alert-warning" role="alert" id="notify">It\'s too dry!</div>');
            }
            else if (result.humidity > 60)
            {
              $('#current-humidity-body').append('<div class="alert alert-warning" role="alert" id="notify">It\'s too wet!</div>');
            }
            else
            {
              $('#current-humidity-body').append('<div class="alert alert-success" role="alert" id="notify">It\'s comfortable.</div>');
            }
        },
        error: function(){
            //alert("ERROR OCCUR WHEN GET SENSOR DATA");
        }
    });


    

}, 5000);

$("#scale").click(
    function(){
        celcius = celcius ^ 1;
    }
);

setInterval(function() {
  var data = {};
  $.ajax({
    url: '/_getStatisticData',
    type: 'GET',
    data: data,
    success: function(result){
      // temperature chart
      gradientChartOptionsConfiguration =  {
        maintainAspectRatio: false,
        legend: {
              display: false
         },
      
         tooltips: {
           backgroundColor: '#fff',
           titleFontColor: '#333',
           bodyFontColor: '#666',
           bodySpacing: 4,
           xPadding: 12,
           mode: "nearest",
           intersect: 0,
           position: "nearest"
         },
         responsive: true,
         scales:{
           yAxes: [{
             barPercentage: 1.6,
                 gridLines: {
                   drawBorder: false,
                     color: 'rgba(29,140,248,0.0)',
                     zeroLineColor: "transparent",
                 },
                 ticks: {
                   suggestedMin:10,
                   suggestedMax: 35,
                     padding: 20,
                     fontColor: "#9a9a9a"
                 }
               }],
      
           xAxes: [{
             barPercentage: 1.6,
                 gridLines: {
                   drawBorder: false,
                     color: 'rgba(220,53,69,0.1)',
                     zeroLineColor: "transparent",
                 },
                 ticks: {
                     padding: 20,
                     fontColor: "#9a9a9a"
                 }
               }]
           }
      };
      $("#lineChartExample").remove();
      $('#tempbox').append('<canvas id="lineChartExample"></canvas>');
      var ctx = document.getElementById("lineChartExample").getContext("2d");
      
      var gradientStroke = ctx.createLinearGradient(0,230,0,50);
      
      gradientStroke.addColorStop(1, 'rgba(72,72,176,0.2)');
      gradientStroke.addColorStop(0.2, 'rgba(72,72,176,0.0)');
      gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
      
      var data = {
        labels: result.Time,
        datasets: [{
          label: "Data",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#FAAC37',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#FAAC37',
          pointBorderColor:'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#FAAC37',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: result.Temperature,
        }]
      };
      
      
      var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: gradientChartOptionsConfiguration
      });

      //humidity chart
      gradientChartOptionsConfiguration2 =  {
        maintainAspectRatio: false,
        legend: {
              display: false
         },
      
         tooltips: {
           backgroundColor: '#fff',
           titleFontColor: '#333',
           bodyFontColor: '#666',
           bodySpacing: 4,
           xPadding: 12,
           mode: "nearest",
           intersect: 0,
           position: "nearest"
         },
         responsive: true,
         scales:{
           yAxes: [{
             barPercentage: 1.6,
                 gridLines: {
                   drawBorder: false,
                     color: 'rgba(29,140,248,0.0)',
                     zeroLineColor: "transparent",
                 },
                 ticks: {
                     suggesteMin:0,
                     suggestedMax: 100,
                     padding: 20,
                     fontColor: "#9a9a9a"
                 }
               }],
      
           xAxes: [{
             barPercentage: 1.6,
                 gridLines: {
                   drawBorder: false,
                     color: 'rgba(220,53,69,0.1)',
                     zeroLineColor: "transparent",
                 },
                 ticks: {
                     padding: 20,
                     fontColor: "#9a9a9a"
                 }
               }]
           }
      };
      $("#HumidityChart").remove();
      $('#humidbox').append('<canvas id="HumidityChart"></canvas>');
      var ctx2 = document.getElementById("HumidityChart").getContext("2d");
      
      var gradientStroke2 = ctx2.createLinearGradient(0,230,0,50);
      
      gradientStroke2.addColorStop(1, 'rgba(10,187,179,0.2)');
      gradientStroke2.addColorStop(0.2, 'rgba(10,187,179,0.0)');
      gradientStroke2.addColorStop(0, 'rgba(49,243,246,0)'); //purple colors

      var data2 = {
        labels: result.Time,
        datasets: [{
          label: "Data",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#31F3F6',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#31F3F6',
          pointBorderColor:'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#31F3F6',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: result.Humidity,
        }]
      };

      var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: data2,
        options: gradientChartOptionsConfiguration2
      });
    }
  });
}, 10000);






// General configuration for the charts with Line gradientStroke
