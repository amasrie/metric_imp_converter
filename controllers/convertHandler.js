/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    let match = /[a-zA-Z]/.exec(input);
    //If there's no match, it means no unit, so the input is wrong. 
    //Otherwise, get the string before the unit
    let result = match ? input.substring(0, match.index) || "1" : NaN;
    //Check if the expressions is a valid number: strings like '..' are not allowed
    if(/^[0-9]*(\.[0-9]*)?(\/[0-9]*(\.[0-9]*)?)?$/.exec(result)){
      //Split by division
      let division = result.split("/");
      for(let i = 0;  i < division.length; i++){
        //Check for missing characters ('.7' or '/8') in case it's a real number
        let dot = /\./.exec(division);
        if(dot){
          if(dot.index == 0){
            division[i] = "0.";
          }
          if(dot.index == division[i].length){
            division[i] += "0";
          }
        }
      }
      //If there is '/' the division should be applied. Beware of case '/0'
      if(division.length > 1 && parseFloat(division[1]) == 0.0){
        result = NaN;
      }else if(division.length > 1){
        //make the division and round to five decimals
        result = (parseFloat(division[0]) / parseFloat(division[1])).toFixed(5);
      }else{
        result = (parseFloat(division[0])).toFixed(5);
      }
    }else{
      result = NaN;
    }
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    let match = /[a-zA-Z]/.exec(input);
    let result = match ? input.substring(match.index) : null;
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let lower = initUnit.toLowerCase();
    return (
      lower == "km" ? "mi" : (
        lower == "mi" ? "km" : (
          lower == "l" ? "gal" : (
            lower == "gal" ? "l" : (
              lower == "kg" ? "lbs" : (
                lower == "lbs" ? "kg" : null
              )
            )
          )
        )
      )
    );
  };

  this.spellOutUnit = function(unit) {
    let lower = unit.toLowerCase();
    return (
      lower == "km" ? "kilometers" : (
        lower == "mi" ? "miles" : (
          lower == "l" ? "liters" : (
            lower == "gal" ? "gallons" : (
              lower == "kg" ? "kilograms" : (
                lower == "lbs" ? "pounds" : null
              )
            )
          )
        )
      )
    );
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let lower = initUnit.toLowerCase();
    let result = (
      lower == "km" ? initNum / miToKm : (
        lower == "mi" ? initNum * miToKm : (
          lower == "l" ? initNum / galToL : (
            lower == "gal" ? initNum * galToL : (
              lower == "kg" ? initNum / lbsToKg : (
                lower == "lbs" ? initNum * lbsToKg : NaN
              )
            )
          )
        )
      )
    );
    return isNaN(result) ? null : parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return ( !isNaN(initNum) && initUnit && !isNaN(returnNum) && returnUnit ?
      {
        "initNum": initNum,
        "initUnit": initUnit,
        "returnNum": returnNum,
        "returnUnit": returnUnit,
        "string": initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit)
      } : (
        isNaN(initNum) && (!initUnit || !returnUnit) ? { error: "invalid number and unit"} : (
          isNaN(initNum) ? { error: "invalid number"} : { error: "invalid unit"}
        )
      )
    );
  };
  
}

module.exports = ConvertHandler;
