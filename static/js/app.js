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
    console.log("test");

    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");

    console.log(inputValue);
    console.log(tableData);

    var filteredData = tableData.filter(rowData => rowData.datetime === inputValue);
    console.log(filteredData.length);
   

    const tbody = d3.select("tbody");
    tbody.html("");

    if(filteredData.length === 0 ){
        var row = tbody.append("tr");
        var cell = row.append("td");
        cell.text("NO DATA FOUND");

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
