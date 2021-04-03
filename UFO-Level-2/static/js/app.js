// from data.js
var tableData = data;

// Select the button
var button = d3.select(".btn-default");

// Select the form
var form = d3.select("form");


// Create event handlers 
button.on("click", runEnter);
form.on("submit", runEnter);
//button.on("submit", runEnter);


function runEnter() {
    // Prevent Farm fron refreshing
    d3.event.preventDefault();
    

    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");

    var inputElement1 = d3.select("#statename");
    var inputState = inputElement1.property("value");
    // Check for valid date input
    function isValidDate(str) {
        var getvalue = str.split('/');
        var day = getvalue[0];
        var month = getvalue[1];
        var year = getvalue[2];
        console.log(day);
        console.log(month);
        console.log(year);
        
        if(year < 1901 || year > 2021){
        return false;
        }
        if (month < 1 && month > 12) { 
          return false;
         }
         if (day < 1 && day > 31) {
          return false;
         }
         if ((month==4 && month==6 && month==9 && month==11) && day==31) {
          return false;
         }
         if (month === 2) { // check for february 29th
          var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
          
          if (day>29 || (day==29 && !isleap)) {
           return false;
         }
         }
         else{
         return true;

         }
        }
    // end date validity check

    if (isValidDate(inputValue)){
        //alert("valid date")
    }else{
        console.log(inputValue);
        alert("invalid date");
    }
    
    if (inputState.length === 0){
        var filteredData = tableData.filter(rowData => rowData.datetime === inputValue);
    } else {

    var filteredData = tableData.filter(rowData => (rowData.datetime === inputValue  && rowData.state === inputState));
    }

    const tbody = d3.select("tbody");
    tbody.html("");

    if(filteredData.length === 0 ){
        var row = tbody.append("tr");
        var cell = row.append("td");
        //cell.text("NO DATA FOUND");
        alert("Data Not Found")

    }else{

        filteredData.forEach((dataRow) => {
            var row = tbody.append("tr");
            Object.entries(dataRow).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
            });
        });
    }


}
