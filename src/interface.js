//$ (document).ready(function() {

  var thermostat = new Thermostat();
  var currentTemp;

  function getTempDecimal() {
    currentTemp = thermostat.currentTemperature() / thermostat.MAX_LIMIT_PSM_OFF;
    bar.animate(currentTemp);
  };

  window.onload=function(){
    update_temp();
  }

  $('.get-city').submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    get_city_temp(city);
  });

  $( "#temperature-up" ).click(function() {
    thermostat.up();
    update_temp();
    getTempDecimal();
  });

  $( "#temperature-down" ).click(function() {
    thermostat.down();
    update_temp();
    getTempDecimal();
  });

  $( "#temperature-reset" ).click(function() {
    thermostat.reset();
    update_temp();
    getTempDecimal();
  });

  $( "#powersaving-on" ).click(function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('on');
  });

  $( "#powersaving-off" ).click(function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-status').text('off');
  });

  $( document ).ready(function(){
    getTempDecimal();
    bar.animate(currentTemp);
  });

  function get_city_temp(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city;
    var key = "&APPID=8e294e4884174ccaf295c1098548b598";
    var units = "&units=metric";
    $.get(url + key + units, function(data) {
      $('#outside-temp').text('The temperature for ' + city + ' ' + data.main.temp +String.fromCharCode(176) + 'c');
    });
  }

  function update_temp(){
    $('.page').removeClass().addClass('page ' + thermostat.energyUsage());
  };

  var bar = new ProgressBar.Circle(container, {
    color: '#fff',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#fff', width: 1 },
    to: { color: '#fff', width: 4 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
      circle.setText(thermostat.currentTemperature() + '&deg;C')
    }
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = '4rem';

//});
