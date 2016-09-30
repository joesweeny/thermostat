'use strict';

describe('Thermostat', function(){

var thermostat;

beforeEach(function(){
  thermostat = new Thermostat();
});

  it('starts at a temperature of 20 degrees', function(){
    expect(thermostat._temperature).toEqual(20);
  });

  describe('increase temperature', function(){
    it('increases temperature by using the up button', function(){
      thermostat.up();
      expect(thermostat.currentTemperature()).toEqual(21);
    });
  });

  describe('decrease temperature', function() {

    it('decreases temperature by using the down button', function() {
      thermostat.down();
      expect(thermostat.currentTemperature()).toEqual(19);
    });

    it('has a minimum temperature of 10 degrees', function() {
      for (var i = 0; i < 11; i++) {
        thermostat.down();
      }
      expect(thermostat.currentTemperature()).toEqual(10);
    });
  });

  describe('Power saving mode', function(){
    it('power save mode on by default', function(){
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it('can switch PSM off', function(){
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
    });

    it('can switch PSM back on', function(){
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
      thermostat.switchPowerSavingModeOn();
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    describe('when power saving mode is on', function(){
      it('has a maximum temperature of 25 degress', function(){
        for (var i = 0; i < 6; i++) {
          thermostat.up();
        }
        expect(thermostat.currentTemperature()).toEqual(25);
      });
    });

    describe('when power saving mode is off', function(){
      it('has a maximum temperature of 32 degrees', function(){
        thermostat.switchPowerSavingModeOff();
        for (var i = 0; i < 13; i++) {
          thermostat.up();
        }
        expect(thermostat.currentTemperature()).toEqual(32);
      });
    });

  });

  describe('resetting the temeprature', function() {
    it('sets the temperature back to 20', function() {
      thermostat.reset();
      expect(thermostat.currentTemperature()).toEqual(20);
    });
  });

  describe('displaying usage levels', function() {
    describe('when the temperature is below 18 degrees', function() {
      it('has a status of "low-energy"', function(){
        for (var i = 0; i < 3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual("low-usage");
      });
    });
    describe('when the temperature is between 18 and 25', function() {
      it('has the status of "medium-usage', function() {
        expect(thermostat.energyUsage()).toEqual("medium-usage");
      });
    });
    describe('when the temperature is 25 or above', function() {
      it('has the status of "high-usage"', function() {
        for (var i = 0; i < 6; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual("high-usage");
      });
    });


  });

});
