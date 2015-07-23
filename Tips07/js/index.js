(function() {
  var MyChartController;

  MyChartController = (function() {
    var myChart;

    function MyChartController() {}

    MyChartController.prototype.addPoint = function() {
      var chart, data, xVal, yVal;
      if ($('form').parsley().validate()) {
        chart = $('#container').highcharts();
        xVal = parseFloat($('#x-input').val());
        yVal = parseFloat($('#y-input').val());
        if (!isNaN(xVal) && !isNaN(yVal)) {
          data = [xVal, yVal];
        }
        if (chart.series[0] != null) {
          chart.series[0].addPoint(data);
        } else {
          chart.addSeries({
            name: 'Data',
            data: [data]
          });
        }
        $('#container').show();
      }
      return $('form')[0].reset();
    };

    MyChartController.prototype.clearData = function() {
      var chart;
      chart = $('#container').highcharts();
      return chart.series[0].remove();
    };

    MyChartController.prototype.renderGraph = function() {
      var chart_config;
      chart_config = {
        chart: {
          renderTo: 'container',
          type: 'line'
        },
        title: {
          text: 'Add Data'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          backgroundColor: '#FFFFFF',
          verticalAlign: 'top',
          borderWidth: 0
        },
        series: [
          {
            name: 'Data',
            data: [[0, 1.5], [10, -5.0], [20, -5.65], [30, -4.65], [40, -2.21]]
          }
        ]
      };
      return new Highcharts.Chart(chart_config);
    };

    myChart = new MyChartController;

    myChart.renderGraph();

    $('input').attr('data-parsley-required', 'true').attr('data-parsley-trigger', 'change').attr('data-parsley-type', 'number');

    $('form').parsley();

    $('form').on('click', '#add-button', function() {
      return myChart.addPoint();
    });

    $('form').on('click', '#clear-button', function() {
      myChart.clearData();
      return $('#container').hide();
    });

    return MyChartController;

  })();

}).call(this);