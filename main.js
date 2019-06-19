/// <reference path="database.ts" />
/// <reference path="filter.ts" />
/// <reference path="inputform.ts" />
var months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var team;
var year;
var tableLength = 0;
var tableDoneCheck = 0;
var popupPostionLeft = 30;
var popupPostionTop = 10;
//Function for getting the objectstore with the basic information and building the dropdown option for team
function CreatCheckList() {
    var divCheck = document.getElementById("checkTeam");
    var request = readAllDB("teamStore"); //reading the object store with basic information
    var divHeight = 20;
    request.onsuccess = function (e) {
        var cursor = request.result;
        //Going throught all the teams in the object store to make the dropdown list
        for (var i = 0; i < cursor.length; i++) {
            var checkElement = document.getElementById("team" + cursor[i].id); //checking if a dropdown list exist
            if (checkElement == null) {
                //Creating the text inside the checkox list in label
                var teamLabel = document.createElement("label");
                teamLabel.setAttribute("for", "team" + cursor[i].id);
                teamLabel.setAttribute("id", "label" + cursor[i].id);
                teamLabel.setAttribute("class", "nohide");
                teamLabel.innerHTML = cursor[i].teamName;
                //Creating the checkbox fields
                var createCheck = document.createElement("input");
                createCheck.setAttribute("type", "checkbox");
                createCheck.setAttribute("id", "team" + cursor[i].id);
                createCheck.setAttribute("value", cursor[i].teamName);
                createCheck.setAttribute("class", "checkBox");
                //Spacing
                var nextLine = document.createElement("BR");
                nextLine.setAttribute("clear", "both");
                divCheck.appendChild(teamLabel);
                teamLabel.appendChild(createCheck);
                teamLabel.appendChild(nextLine);
            }
        }
        divHeight = divHeight * cursor.length;
        divCheck.style.height = divHeight + "px";
        expendCheck(); //fucntion for expanding and closing dropdown
    };
}
//Finding out which team was checked when the button "Show" is clicked
function checkedTeam() {
    var j = 0;
    var filterTeam;
    var request = readAllDB("teamStore");
    request.onsuccess = function (e) {
        var teamChck = request.result;
        //Going throught the list of all teams and getting the DOM to check if its checked
        for (var i = 0; i < teamChck.length; i++) {
            var k = i + 1;
            var checkedInput = document.getElementById("team" + k);
            if (checkedInput != null) {
                var checked = checkedInput.checked;
                if (checked == true) {
                    filterTeam = k;
                    j++;
                }
            }
        }
        for (var i = 0; i < teamChck.length; i++) {
            if (teamChck[i].id == filterTeam) {
                team = teamChck[i].teamName;
            }
        }
        //Checking if only one team is checked
        if (j > 1) {
            alert("Please select only one team!");
        }
        else if (j == 0) {
            alert("Please select a team!");
        }
        else {
            filterDB();
        }
    };
}
//Checking what year is chosen in Select and calling the function to build sekelton of the tabel
function filterDB() {
    var yearSelected = document.getElementById("yearSelect");
    var yearChosen = yearSelected.options[yearSelected.selectedIndex].value;
    year = yearChosen;
    creatName();
    createTable();
}
//Creating the name on top of the table
function creatName() {
    var tableDiv = document.getElementById("nameNode");
    var checkDOM = document.getElementById("hNode");
    //Checking if name exists and if so removing it
    if (checkDOM != undefined) {
        tableDiv.removeChild(checkDOM);
    }
    var teamName = document.createElement("h3");
    teamName.setAttribute("class", "filterName");
    teamName.setAttribute("id", "hNode");
    teamName.innerHTML = team;
    tableDiv.appendChild(teamName);
}
//Creating the table, first the header and then the body
function createTable() {
    var teamName = document.getElementById("tableNode");
    var tableParent = document.getElementById("tableParent");
    if (tableParent != undefined) {
        teamName.removeChild(tableParent);
        tableLength = 0;
        tableDoneCheck = 0;
    }
    var table = document.createElement("div");
    table.setAttribute("id", "tableParent");
    var tableTh = '<div> <table class="tableMain" id="tableID"> <colgroup > <col style="width: 150px">' +
        '<col span="12" style="width: 50px"> </colgroup> <tbody id="tbNode">' +
        '<tr > <th> Name </th> <th> Jan </th> <th> Feb </th> <th> Mar </th> <th> Apr </th>' +
        '<th> Mai </th> <th> Jun </th> <th> Jul </th> <th> Aug </th> <th> Sep </th>' +
        '<th> Okt </th> <th> Nov </th> <th> Dec </th> <tbody></div>';
    table.innerHTML = tableTh;
    teamName.appendChild(table);
    //Checking if filtered team has any data in the database and if not giving back alert 
    var request = readIndex("coreStore" + year, "Team", team);
    request.onsuccess = function (e) {
        var teamFilter = request.result;
        if (teamFilter != undefined) {
            if (teamFilter.length != 0) {
                var checkLength = [0];
                for (var i = 1; i <= teamFilter.length; i++) {
                    //Checking the length that the table will be 
                    if (!include(checkLength, teamFilter[i - 1].WorkerId)) {
                        checkLength.push(teamFilter[i - 1].WorkerId);
                    }
                    //Creating the table
                    creatTr("tbNode", teamFilter[i - 1].WorkerId);
                }
                tableLength = checkLength.length - 1; //Variable that stores how many data fields the table will have
            }
            else {
                alert("No data matching the filter settings");
            }
        }
    };
}
//Creating the body of the tabel
function creatTr(parentNode, key) {
    var parent = document.getElementById(parentNode);
    var checkTr = document.getElementById("worker" + key);
    if (checkTr != null) {
        return;
    }
    var newTr = document.createElement("tr");
    newTr.setAttribute("id", "worker" + key);
    var trNode = '<td id="' + team + '_worker' + key + '_name" class="tableTd" > </td> <td id="' + team + '_worker' + key + '_Jan/' + year + '" class="tableTd" > </td> <td id="' + team + '_worker' + key + '_Feb/' + year + '" class="tableTd"> </td>' +
        '<td id="' + team + '_worker' + key + '_Mar/' + year + '" class="tableTd"> </td> <td id="' + team + '_worker' + key + '_Apr/' + year + '" class="tableTd"> </td><td id="' + team + '_worker' + key + '_Mai/' + year + '" class="tableTd"> </td>' +
        '<td id="' + team + '_worker' + key + '_Jun/' + year + '" class="tableTd"> </td> <td id="' + team + '_worker' + key + '_Jul/' + year + '" class="tableTd"> </td> <td id="' + team + '_worker' + key + '_Aug/' + year + '" class="tableTd"> </td>' +
        '<td id="' + team + '_worker' + key + '_Sep/' + year + '" class="tableTd"> </td> <td id="' + team + '_worker' + key + '_Oct/' + year + '" class="tableTd"> </td><td id="' + team + '_worker' + key + '_Nov/' + year + '" class="tableTd"> </td> <td id="' + team + '_worker' + key + '_Dec/' + year + '" class="tableTd"> </td>';
    newTr.innerHTML = trNode;
    parent.appendChild(newTr);
    fillTable(key);
}
//Fucntion for filling table
function fillTable(key) {
    var request = readIndex("coreStore" + year, "WorkerId", key);
    request.onsuccess = function (e) {
        var workerObsj = request.result;
        var workerObjsTeam = [];
        for (var i = 0; i < workerObsj.length; i++) {
            if (workerObsj[i].Team == team) {
                workerObjsTeam.push(workerObsj[i]);
            }
        }
        calculateMonth(workerObjsTeam);
    };
}
//Function for calculating the fileds inside the table
function calculateMonth(project) {
    var janSum = [0, 0, 0, 0, 0];
    var febSum = [0, 0, 0, 0, 0];
    var marSum = [0, 0, 0, 0, 0];
    var aprSum = [0, 0, 0, 0, 0];
    var maiSum = [0, 0, 0, 0, 0];
    var junSum = [0, 0, 0, 0, 0];
    var julSum = [0, 0, 0, 0, 0];
    var augSum = [0, 0, 0, 0, 0];
    var sepSum = [0, 0, 0, 0, 0];
    var octSum = [0, 0, 0, 0, 0];
    var novSum = [0, 0, 0, 0, 0];
    var decSum = [0, 0, 0, 0, 0];
    var totalSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < project.length; i++) {
        //Getting sum of all the work on projects inside the data of each month
        janSum = workWeekMonth(janSum, project[i].Jan);
        febSum = workWeekMonth(febSum, project[i].Feb);
        marSum = workWeekMonth(marSum, project[i].Mar);
        aprSum = workWeekMonth(aprSum, project[i].Apr);
        maiSum = workWeekMonth(maiSum, project[i].Mai);
        junSum = workWeekMonth(junSum, project[i].Jun);
        julSum = workWeekMonth(julSum, project[i].Jul);
        augSum = workWeekMonth(augSum, project[i].Aug);
        sepSum = workWeekMonth(sepSum, project[i].Sep);
        octSum = workWeekMonth(octSum, project[i].Oct);
        novSum = workWeekMonth(novSum, project[i].Nov);
        decSum = workWeekMonth(decSum, project[i].Dec);
    }
    var worker = project[0].WorkerId;
    //Opening database with available fields for the final calculation
    var request = readOneDB("year" + year + "Store", worker);
    request.onsuccess = function (e) {
        var workerId = request.result;
        var workerName = document.getElementById(team + "_worker" + workerId.WorkerId + "_name");
        workerName.innerHTML = workerId.Name;
        //Final calculation for each month 
        totalSum[0] = procWeekMonth(janSum, workerId.Jan);
        totalSum[1] = procWeekMonth(febSum, workerId.Feb);
        totalSum[2] = procWeekMonth(marSum, workerId.Mar);
        totalSum[3] = procWeekMonth(aprSum, workerId.Apr);
        totalSum[4] = procWeekMonth(maiSum, workerId.Mai);
        totalSum[5] = procWeekMonth(junSum, workerId.Jun);
        totalSum[6] = procWeekMonth(julSum, workerId.Jul);
        totalSum[7] = procWeekMonth(augSum, workerId.Aug);
        totalSum[8] = procWeekMonth(sepSum, workerId.Sep);
        totalSum[9] = procWeekMonth(octSum, workerId.Oct);
        totalSum[10] = procWeekMonth(novSum, workerId.Nov);
        totalSum[11] = procWeekMonth(decSum, workerId.Dec);
        tableData(totalSum, workerId.WorkerId);
    };
}
//Filing the table with the calucalted data and adding onlick event for each field in the table to open popup table
function tableData(sumMonth, key) {
    var _loop_1 = function (i) {
        var monthEvent = document.getElementById(team + "_worker" + key + "_" + months[i] + "/" + year);
        monthEvent.addEventListener("click", function () { openNewTable(months[i], key); });
        if (sumMonth[i] != -1) {
            monthEvent.innerHTML = sumMonth[i].toFixed(1) + "%";
        }
        else {
            monthEvent.innerHTML = "-";
        }
    };
    for (var i = 0; i < months.length; i++) {
        _loop_1(i);
    }
    tableDoneCheck++; //Variable that indicates that a row has been made
    if (tableLength == tableDoneCheck) { //checking if the row that was made is the last row of the data
        createTotal();
    }
}
//Creating total row in the main table
function createTotal() {
    var request = readIndex("coreStore" + year, "Team", team);
    request.onsuccess = function (e) {
        var data = request.result;
        var total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Variable for calculating total 
        var checkNaN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var checkInclude = [0]; //Variable for checking that we don't do same worker more than once
        for (var i = 0; i < data.length; i++) {
            if (!include(checkInclude, data[i].WorkerId)) {
                checkInclude.push(data[i].WorkerId);
                for (var j = 0; j < months.length; j++) {
                    var monthData = document.getElementById(team + "_worker" + data[i].WorkerId + "_" + months[j] + "/" + year).innerHTML;
                    if (monthData != null) {
                        if (!isNaN(parseFloat(monthData))) {
                            total[j] += parseFloat(monthData);
                        }
                        else {
                            checkNaN[j]++;
                        }
                    }
                }
            }
        }
        //Calculating the total for each month
        for (var i = 0; i < months.length; i++) {
            if (checkInclude.length != (checkNaN[i] + 1)) {
                total[i] = total[i] / (checkInclude.length - 1 - checkNaN[i]);
            }
            else {
                total[i] = NaN;
            }
        }
        //Creating total row in the table
        var totalTr = document.createElement("tfoot");
        totalTr.setAttribute("id", "Total_" + year + "_" + team);
        var parentNode = document.getElementById("tableID");
        var totalData = '<tr> <td class="tableTotal">Total:</td>';
        for (var i = 0; i < months.length; i++) {
            if (isNaN(total[i])) {
                totalData += '<td id="' + team + '_Total_' + year + '/' + months[i] + '" class="tableTotalData">-</td>';
            }
            else {
                totalData += '<td id="' + team + '_Total_' + year + '/' + months[i] + '" class="tableTotalData">' + total[i].toFixed(1) + "%" + '</td>';
            }
        }
        totalData += '</tr>';
        totalTr.innerHTML = totalData;
        parentNode.appendChild(totalTr);
    };
}
//Opening popup div
function openNewTable(month, key) {
    var popupDiv = document.createElement("div");
    var parentNode = document.getElementById("nameNode");
    var checkDiv = document.getElementById(year + "popUp" + key + "_" + month);
    //Check if the unqiue div is aldready open
    if (checkDiv == null) {
        popupDiv.setAttribute("id", year + "popUp" + key + "_" + month);
        popupDiv.setAttribute("class", "popupDiv");
        popupPostionTop += 1;
        var postionTop = popupPostionTop.toString() + "%";
        popupDiv.style.top = postionTop;
        popupPostionLeft += 1;
        var postionLeft = popupPostionLeft.toString() + "%";
        popupDiv.style.left = postionLeft;
        parentNode.appendChild(popupDiv);
        //Makign the close button
        var close_1 = document.createElement("span");
        close_1.setAttribute("class", "close");
        close_1.setAttribute("id", "close" + key + "_" + year + "/" + month);
        close_1.innerHTML = "&times;";
        var saveYear_1 = year; //Saving the current year so that we can have divs from different years open and close
        close_1.addEventListener("click", function () { closeDiv(month, key, saveYear_1); });
        popupDiv.appendChild(close_1);
        monthTable(month, key);
    }
}
//Writing out the data about the table cell and making a table in the new div and filling the available field
function monthTable(month, key) {
    var parentNode = document.getElementById(year + "popUp" + key + "_" + month);
    var header = document.createElement("h3");
    header.setAttribute("id", year + "Header" + key + "_" + month);
    header.setAttribute("class", "popupHeader");
    dragDiv(header, parentNode); //Fucntion for draging the div
    var request = readOneDB("year" + year + "Store", key); //Opening store with available data
    request.onsuccess = function (e) {
        var worker = request.result;
        //Writing out basic infomation of the block
        header.innerHTML = month + " " + year + " (" + worker.Name + ")";
        parentNode.appendChild(header);
        //Horizontal line
        var hrelement = document.createElement("hr");
        hrelement.setAttribute("class", "popuphrstyle");
        parentNode.appendChild(hrelement);
        //Writing out the fild with first mondays
        var date = getMondays(month); //Getting mondays in a month
        var tableDiv = document.createElement("div");
        tableDiv.setAttribute("id", "popupTableDiv" + key + "_" + year + "/" + month);
        var currentMonth = date[0].getMonth() + 1; //The date in Date for months goes from 0 to 11 so to match our calendar 1 was added
        var available = findMonth(month, worker); //Returns the month chosen with "month" of the interface
        //Makign table header with months
        var tableNode = '<div> <table id="popUpTable' + key + '_' + year + "/" + month + '"  class="popuptable"> <colgroup> <col style="width:40px"> <col span="5" style="width:20px"> </colgroup>' +
            '<tbody id="popUpTableBody' + key + '_' + year + "/" + month + '"> <tr> <th> Project(s) </th>';
        for (var i = 0; i < date.length; i++) {
            if (currentMonth < 10) { //Check if we need to add a "0" in front the month or not
                if (date[i].getDate() < 10) { //Check if we need to add a zero in front of the day or not
                    tableNode += '<th> ' + '0' + date[i].getDate() + '.' + '0' + currentMonth + '</th>';
                }
                else {
                    tableNode += '<th> ' + date[i].getDate() + '.' + '0' + currentMonth + '</th>';
                }
            }
            else {
                if (date[i].getDate() < 10) {
                    tableNode += '<th> ' + '0' + date[i].getDate() + '.' + currentMonth + '</th>';
                }
                else {
                    tableNode += '<th> ' + date[i].getDate() + '.' + currentMonth + '</th>';
                }
            }
        }
        //Filling the first row of the table with the available data
        tableNode += '</tr><tr><td> Available</td>';
        for (var i = 0; i < date.length; i++) {
            if (available[i] < 0) {
                tableNode += '<td id = "' + team + year + 'Available' + key + '_' + month + i + '" contenteditable = "true"> - </td>';
            }
            else {
                tableNode += '<td id = "' + team + year + 'Available' + key + '_' + month + i + '" contenteditable = "true">' + available[i].toFixed(1) + '</td>';
            }
        }
        tableNode += '</tr></tbody></div>';
        tableDiv.innerHTML = tableNode;
        parentNode.appendChild(tableDiv);
        fillPopUpTable(month, key, worker); //Worker is sent because it has the available data stored for each month
    };
}
function fillPopUpTable(month, key, workerAvailable) {
    var parentNode = document.getElementById("popUpTableBody" + key + "_" + year + "/" + month);
    //Opening the core database to get work on projects
    var request = readIndex("coreStore" + year, "WorkerId", key); //Request array with projects of filtered year and worker 
    request.onsuccess = function (e) {
        var worker = request.result;
        var available = findMonth(month, workerAvailable); //get the availabe of the month we need
        var sum = [0, 0, 0, 0, 0];
        //Going throught the array of projects
        for (var i = 0; i < worker.length; i++) {
            if (worker[i].Team == team) {
                var workMonth = findMonth(month, worker[i]);
                var newTr = document.createElement("tr");
                var row = '<td id = "' + team + year + 'Project' + i + '_worker' + key + '_' + month + '" contenteditable = "true">' + worker[i].Project + '</td>';
                for (var j = 0; j < workMonth.length; j++) { ///Going through all the weeks in the month 
                    row += '<td id= "' + team + year + 'Week' + j + '_worker' + key + '_' + month + '_project' + i + '" contenteditable = "true">' + workMonth[j].toFixed(1) + '</td>';
                    sum[j] += workMonth[j];
                }
                newTr.innerHTML = row;
                parentNode.appendChild(newTr);
            }
        }
        //Calculating the utulization row
        var newFoot = document.createElement("tfoot");
        var tfooter = '<tr><td class = "tablefooter"> Utilization</td>';
        for (var i = 0; i < available.length; i++) {
            if (available[i] == 0) {
                sum[i] = 0;
            }
            else {
                sum[i] = (sum[i] / available[i]) * 100;
            }
            if (sum[i] < 0 || available[i] < 0) { //-1 is used as control for unavailable so if the sum is negative or it we will get "-" on the output
                tfooter += '<td class = "tablefooter"> - </td>';
            }
            else if (sum[i] > 0) {
                tfooter += '<td class = "tablefooter">' + sum[i].toFixed(1) + '%' + '</td>';
            }
            else if (sum[i] == 0 && available[i] != 0) { //this happens when we have a worker that did 0 work in one week but was available
                tfooter += '<td class = "tablefooter"> 0% </td>';
            }
            else {
                tfooter += '<td class = "tablefooter"> 100% </td>'; //When worker wasn't available and did 0 we write it as 100%
            }
        }
        tfooter += '</tr>';
        newFoot.innerHTML = tfooter;
        var parentTable = document.getElementById("popUpTable" + key + "_" + year + "/" + month);
        parentTable.appendChild(newFoot);
        //Implementing the save button with onclick event
        var save = document.createElement("button");
        save.setAttribute("class", "save");
        save.innerHTML = "Save";
        var saveYear = year;
        var saveTeam = team;
        save.addEventListener("click", function () {
            getTableData(month, key, saveYear, saveTeam);
        });
        var divPopUp = document.getElementById("popupTableDiv" + key + "_" + year + "/" + month);
        divPopUp.appendChild(save);
    };
}
//Updating table when pressign save button
function getTableData(month, key, saveYear, saveTeam) {
    var request = readOneDB("year" + saveYear + "Store", key);
    //Updating available field
    request.onsuccess = function (e) {
        var availableYear = request.result;
        //Getting the data from the table
        var available = findMonth(month, availableYear);
        for (var i = 0; i < available.length; i++) {
            var getDateStr = document.getElementById(saveTeam + saveYear + "Available" + key + "_" + month + i).innerHTML;
            var getDate = parseInt(getDateStr, 10);
            if (isNaN(getDate)) {
                available[i] = -1; //If incorrect data type was put the data is treated as worker wasn't available
            }
            else if (getDate < 0 || getDate > 5) {
                alert("Inputd data must be between 0 and 5");
                return;
            }
            else {
                available[i] = getDate;
            }
        }
        availableYear = changeMonth(month, available, availableYear); //Updating the cell with the data for the chosen month in the structure
        var updated = updateData("year" + saveYear + "Store", availableYear);
        updated.onsuccess = function (e) {
            updateProjects(month, key, saveYear, saveTeam);
        };
    };
}
//Updating the project fields
function updateProjects(month, key, saveYear, saveTeam) {
    var requestProjects = readIndex("coreStore" + saveYear, "WorkerId", key);
    //Getting input data from project rows, checking the data 
    requestProjects.onsuccess = function (e) {
        var projects = requestProjects.result;
        var sum = [0, 0, 0, 0, 0];
        var _loop_2 = function (i) {
            var project = findMonth(month, projects[i]);
            for (var j = 0; j < project.length; j++) {
                var getDataStr = document.getElementById(saveTeam + saveYear + "Week" + j + "_worker" + key + "_" + month + "_project" + i).innerHTML;
                var getData = parseFloat(getDataStr);
                if (isNaN(getData) || getData < 0 || getData > 5) {
                    alert("Wrong input data for work on projects!");
                    return { value: void 0 };
                }
                else {
                    project[j] = getData;
                }
            }
            projects[i] = changeMonth(month, project, projects[i]); //Updating the month with the current month
            var getProject = document.getElementById(saveTeam + saveYear + "Project" + i + "_worker" + key + "_" + month).innerHTML;
            if (getProject.length < 1 || getProject == "<br>") {
                alert("Wrong input data for project name!");
                return { value: void 0 };
            }
            else {
                projects[i].Project = getProject;
            }
            //Updating the object store with the new data
            var updated = updateData("coreStore" + saveYear, projects[i]);
            updated.onsuccess = function (e) {
                sum = workWeekMonth(sum, project);
                if (i == projects.length - 1) { //Check if are in last iteration of the loop
                    updateMainTableCell(month, key, saveYear, saveTeam, sum); //Updating main table, saveYear is used so if we open the another table in the mean the old will still be affected by the change
                }
            };
        };
        for (var i = 0; i < projects.length; i++) {
            var state_1 = _loop_2(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
}
//Updating the filed of the main table
function updateMainTableCell(month, key, saveYear, saveTeam, sum) {
    var request = readOneDB("year" + saveYear + "Store", key); //Getting available data from the object store
    request.onsuccess = function (e) {
        var available = request.result;
        var totalSum;
        var monthAvailable = findMonth(month, available);
        totalSum = procWeekMonth(sum, monthAvailable);
        var monthEvent = document.getElementById(saveTeam + "_worker" + key + "_" + month + "/" + saveYear);
        if (monthEvent != null) { //Checking if the right table is loaded
            if (totalSum != -1) {
                monthEvent.innerHTML = totalSum.toFixed(1) + "%";
            }
            else {
                monthEvent.innerHTML = "-";
            }
        }
        var checkTotal = document.getElementById("Total_" + saveYear + "_" + saveTeam);
        if (checkTotal != null) {
            var parentNode = document.getElementById("tableID");
            parentNode.removeChild(checkTotal);
            createTotal();
        }
    };
}
