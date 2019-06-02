//Function for the filter button to show/hide the filter option div
function ShowHideFilter() {
    var ShowHide = document.getElementById("FilterButton");
    if (ShowHide.value == "+ Filter") {
        ShowHide.value = "- Filter";
        document.getElementById("FilterField").className = "showFilter";
    }
    else {
        ShowHide.value = "+ Filter";
        document.getElementById("FilterField").className = "hideFilter";
    }
}
//Show hide the team dropdown div
var expanded = false;
function expendCheck() {
    var checkboxes = document.getElementById("checkTeam");
    var teamSelect = document.getElementById("teamSelect");
    window.addEventListener("mousedown", function (e) {
        var lableClass = document.getElementsByClassName("nohide");
        var checkClass = document.getElementsByClassName("checkBox");
        var checkClick = true;
        for (var i = 0; i < lableClass.length; i++) { //Check if the click that occured was in any of the dropdown div elements
            if (e.target == lableClass[i] || e.target == checkClass[i] || e.target == checkboxes || e.target == teamSelect) {
                checkClick = false;
            }
        }
        if (checkClick) { //If click wasn't in the div elements hide the div
            checkboxes.style.display = "none";
            expanded = false;
        }
    });
    if (!expanded) { //Hide/show the div with the select box
        checkboxes.style.display = "block";
        expanded = true;
    }
    else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
//Math functions for calcuating for each workers work % in each month
//Sum of two arrays 
function workWeekMonth(sum, month) {
    for (var i = 0; i < month.length; i++) {
        sum[i] += month[i];
    }
    return sum;
}
//Array of the sum for each montsh divided by the available of each month
function procWeekMonth(sum, month) {
    var weeks = 0;
    var flagNaN = true; //Check if any month has all available fields not defined
    for (var i = 0; i < month.length; i++) {
        if (month[i] > 0) {
            sum[i] = sum[i] / month[i];
            weeks++;
            flagNaN = false;
        }
        else if (month[i] == 0) {
            sum[i] = 0;
            flagNaN = false;
        }
        else {
            sum[i] = 0;
        }
    }
    sum.push(weeks);
    var result = totalMonthWork(sum, flagNaN);
    return result;
}
//Calculating the total sum divided by total number of elements
function totalMonthWork(sum, flagNaN) {
    var i = sum.length;
    var days = sum[i - 1]; //Last element in the array is used to show the number of sums in the array
    if (days != 0) {
        sum[i - 1] = 0;
        var total = sum.reduce(getSum);
        total = (total / days) * 100;
        return total;
    }
    else if (flagNaN) {
        return -1;
    }
    else {
        return 100.0;
    }
}
//Sum of all elements in an array
function getSum(sum, num) {
    return sum + num;
}
//Close div function
function closeDiv(month, key, saveYear) {
    var parentNode = document.getElementById("nameNode");
    var div = document.getElementById(saveYear + "popUp" + key + "_" + month);
    parentNode.removeChild(div);
}
//Function to get which id is of the month 
function getMonthId(month) {
    var monthId;
    for (var i = 0; i < months.length; i++) {
        if (months[i] == month) {
            monthId = i;
            break;
        }
    }
    return monthId;
}
//Function to get the mondays in a month
function getMondays(month) {
    var monthId = getMonthId(month);
    var yearId = parseInt(year, 10);
    var date = new Date(yearId, monthId + 1, 0); //Gets the last day of the month 
    var mondays = [];
    var daysInMonth = date.getDate();
    for (var i = 1; i <= daysInMonth; i++) {
        var day = new Date(yearId, monthId, i);
        if (day.getDay() == 1) {
            mondays.push(day);
        }
    }
    return mondays;
}
//Find which month in the interface the "month" is
function findMonth(month, worker) {
    if (month == "Jan") {
        return worker.Jan;
    }
    if (month == "Feb") {
        return worker.Feb;
    }
    if (month == "Mar") {
        return worker.Mar;
    }
    if (month == "Apr") {
        return worker.Apr;
    }
    if (month == "Mai") {
        return worker.Mai;
    }
    if (month == "Jun") {
        return worker.Jun;
    }
    if (month == "Jul") {
        return worker.Jul;
    }
    if (month == "Aug") {
        return worker.Aug;
    }
    if (month == "Sep") {
        return worker.Sep;
    }
    if (month == "Oct") {
        return worker.Oct;
    }
    if (month == "Nov") {
        return worker.Nov;
    }
    if (month == "Dec") {
        return worker.Dec;
    }
}
//Checnges the month in the strucutre of chose with "month"
function changeMonth(month, available, availableYear) {
    if (month == "Jan") {
        availableYear.Jan = available;
        return availableYear;
    }
    if (month == "Feb") {
        availableYear.Feb = available;
        return availableYear;
    }
    if (month == "Mar") {
        availableYear.Mar = available;
        return availableYear;
    }
    if (month == "Apr") {
        availableYear.Apr = available;
        return availableYear;
    }
    if (month == "Mai") {
        availableYear.Mai = available;
        return availableYear;
    }
    if (month == "Jun") {
        availableYear.Jun = available;
        return availableYear;
    }
    if (month == "Jul") {
        availableYear.Jul = available;
        return availableYear;
    }
    if (month == "Aug") {
        availableYear.Aug = available;
        return availableYear;
    }
    if (month == "Sep") {
        availableYear.Sep = available;
        return availableYear;
    }
    if (month == "Oct") {
        availableYear.Oct = available;
        return availableYear;
    }
    if (month == "Nov") {
        availableYear.Nov = available;
        return availableYear;
    }
    if (month == "Dec") {
        availableYear.Dec = available;
        return availableYear;
    }
}
//Function to enable dragging divs
function dragDiv(header, div) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    header.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        div.style.top = (div.offsetTop - pos2) + "px";
        div.style.left = (div.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
//Includes mehtod 
function include(inputArray, checkString) {
    var isInlcuded = false;
    for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i] == checkString) {
            isInlcuded = true;
        }
    }
    return isInlcuded;
}
