/// <reference path="database.ts" />
/// <reference path="filter.ts" />


const months: string[]=["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug","Sep","Oct","Nov","Dec"];

let team:string;
let year: string;

let tableLength: number= 0;
let tableDoneCheck : number =1;

let popupPostionLeft = 30;
let popupPostionTop = 10;

//Function for getting the objectstore with the basic information and building the dropdown option for team
function CreatCheckList(){


    expendCheck();      //fucntion for expanding and closing dropdown
    let teamNum = 1;
    const divCheck = document.getElementById("checkTeam") as HTMLDivElement;
    const request = readAllDB("teamStore"); //reading the object store with basic information


    request.onsuccess = e => {

        const cursor = request.result;
        //Going throught all the teams in the object store to make the dropdown list
        for ( let i = 0; i<cursor.length; i++){
            let checkElement = document.getElementById("team" + teamNum);       //checking if a dropdown list exist
            if (checkElement == null){
            //Creating the text inside the checkox list in label
            let teamLabel = document.createElement("label");
            teamLabel.setAttribute("for","team" + teamNum);
            teamLabel.setAttribute("id","label" + teamNum);
            teamLabel.setAttribute("class","nohide");
            teamLabel.innerHTML=cursor[i].teamName;
            
            //Creating the checkbox fields
            let createCheck= document.createElement("input");
            createCheck.setAttribute("type","checkbox");
            createCheck.setAttribute("id","team" + teamNum);
            createCheck.setAttribute("value",cursor[i].teamName);
            createCheck.setAttribute("class","checkBox");
            
            //Spacing
            let nextLine = document.createElement("BR");
            nextLine.setAttribute("clear", "both");
            
            divCheck.appendChild(teamLabel);
            teamLabel.appendChild(createCheck);
            teamLabel.appendChild(nextLine);
            }
            teamNum++;
        }
    }

}


//Finding out which team was checked when the button "Show" is clicked
function checkedTeam(){

    let j = 0;
    let filterTeam: string;
    let request = readAllDB("teamStore");

    request.onsuccess = e => {
        const teamChck = request.result;
        
        //Going throught the list of all teams and getting the DOM to check if its checked
        for ( let i = 0; i<teamChck.length; i++){
            let k = i+1;
            let checkedInput = document.getElementById("team" + k) as HTMLInputElement;
            if (checkedInput!=null){
                let checked = checkedInput.checked;

                if (checked == true){
                    filterTeam = teamChck[i].teamName;
                    team = filterTeam;
                    j++
                }
            }
        }
        //Checking if only one team is checked
        if (j > 1 ){
            alert("Please select only one team!");
        }else if (j == 0) {
            alert("Please select a team!");
        }else{

            filterDB();
        }
    }
  
}

//Checking what year is chosen in Select and calling the function to build sekelton of the tabel
function filterDB(){
    const yearSelected = document.getElementById("yearSelect") as HTMLSelectElement;
    const yearChosen = yearSelected.options[yearSelected.selectedIndex].value;
    year = yearChosen;

    creatName();

    createTable();
}

//Creating the name on top of the table
function creatName(){
    const tableDiv = document.getElementById("nameNode") as HTMLDivElement;
    const checkDOM = document.getElementById("hNode");

    //Checking if name exists and if so removing it
    if (checkDOM != undefined){
        tableDiv.removeChild(checkDOM);
    }
    const teamName = document.createElement("h3");
    teamName.setAttribute("class", "filterName");
    teamName.setAttribute("id","hNode");
    teamName.innerHTML = team;
    tableDiv.appendChild(teamName);
}

//Creating the table, first the header and then the body
function createTable(){
    const teamName = document.getElementById ("tableNode");
    const tableParent= document.getElementById("tableParent");
    if (tableParent != undefined){
        teamName.removeChild(tableParent);
        tableLength = 0;
        tableDoneCheck = 1;
    }
    let table = document.createElement("div") as HTMLDivElement;
    table.setAttribute("id", "tableParent");

    const tableTh = '<div> <table class="tableMain" id="tableID"> <colgroup > <col style="width: 150px">'+
                     '<col span="12" style="width: 50px"> </colgroup> <tbody id="tbNode">' +
                     '<tr > <th> Name </th> <th> Jan </th> <th> Feb </th> <th> Mar </th> <th> Apr </th>'+
                     '<th> Mai </th> <th> Jun </th> <th> Jul </th> <th> Aug </th> <th> Sep </th>' +
                     '<th> Okt </th> <th> Nov </th> <th> Dec </th> <tbody></div>';
    
    table.innerHTML=tableTh;

    teamName.appendChild(table);

    //Checking if filtered team has any data in the database and if not giving back alert 
    const request = readIndex("coreStore" + year,"Team",team);
    request.onsuccess = e => {
        const teamFilter = request.result;
        if (teamFilter != undefined){
            if (teamFilter.length != 0){
                let checkLength:number[]=[0];
                for (let i = 1; i <= teamFilter.length ;i++){
                    //Checking the length that the table will be 
                    if(!include(checkLength,teamFilter[i-1].WorkerId)){
                        checkLength.push(teamFilter[i-1].WorkerId );
                    }
                    //Creating the table
                    creatTr("tbNode",teamFilter[i-1].WorkerId);                  
                }
                tableLength=checkLength.length-1;       //Variable that stores how many data fields the table will have
            }else{
                alert("No data matching the filter settings")
            }
        }
    }
}

//Creating the body of the tabel
function creatTr(parentNode:string, key :number){
    const parent = document.getElementById(parentNode);
    const checkTr = document.getElementById("worker" + key);
    if(checkTr != null){
        return;
    }
    let newTr = document.createElement("tr") as HTMLTableRowElement;
    newTr.setAttribute("id", "worker" + key);

    let trNode = '<td id="'+team+'_worker' + key + '_name" class="tableTd" > </td> <td id="'+team+'_worker' + key + '_Jan/'+year+'" class="tableTd" > </td> <td id="'+team+'_worker' + key + '_Feb/'+year+'" class="tableTd"> </td>'+
                 '<td id="'+team+'_worker' + key + '_Mar/'+year+'" class="tableTd"> </td> <td id="'+team+'_worker' + key + '_Apr/'+year+'" class="tableTd"> </td><td id="'+team+'_worker' + key + '_Mai/'+year+'" class="tableTd"> </td>'+
                 '<td id="'+team+'_worker' + key + '_Jun/'+year+'" class="tableTd"> </td> <td id="'+team+'_worker' + key + '_Jul/'+year+'" class="tableTd"> </td> <td id="'+team+'_worker' + key + '_Aug/'+year+'" class="tableTd"> </td>'+
                 '<td id="'+team+'_worker' + key + '_Sep/'+year+'" class="tableTd"> </td> <td id="'+team+'_worker' + key + '_Oct/'+year+'" class="tableTd"> </td><td id="'+team+'_worker' + key + '_Nov/'+year+'" class="tableTd"> </td> <td id="'+team+'_worker' + key + '_Dec/'+year+'" class="tableTd"> </td>';
        
    newTr.innerHTML=trNode;

    parent.appendChild(newTr);
    fillTable(key);
}

//Fucntion for filling table
function fillTable(key : number){
    const request = readIndex("coreStore" + year,"WorkerId",key); 

    request.onsuccess = e =>{
        const workerObsj = request.result;
        calculateMonth(workerObsj);

    }
}

//Function for calculating the fileds inside the table
function calculateMonth(project : coreData[]){
    let janSum : number[]=[0,0,0,0,0];
    let febSum : number[]=[0,0,0,0,0];
    let marSum : number[]=[0,0,0,0,0];
    let aprSum : number[]=[0,0,0,0,0];
    let maiSum : number[]=[0,0,0,0,0];
    let junSum : number[]=[0,0,0,0,0];
    let julSum : number[]=[0,0,0,0,0];
    let augSum : number[]=[0,0,0,0,0];
    let sepSum : number[]=[0,0,0,0,0];
    let octSum : number[]=[0,0,0,0,0];
    let novSum : number[]=[0,0,0,0,0];
    let decSum : number[]=[0,0,0,0,0];

    let totalSum: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
 
    for (let i = 0; i < project.length; i++){
        //Getting sum of all the work on projects inside the data of each month
        janSum = workWeekMonth(janSum,project[i].Jan);
        febSum = workWeekMonth(febSum,project[i].Feb);
        marSum = workWeekMonth(marSum,project[i].Mar);
        aprSum = workWeekMonth(aprSum,project[i].Apr);
        maiSum = workWeekMonth(maiSum,project[i].Mai);
        junSum = workWeekMonth(junSum,project[i].Jun);
        julSum = workWeekMonth(julSum,project[i].Jul);
        augSum = workWeekMonth(augSum,project[i].Aug);
        sepSum = workWeekMonth(sepSum,project[i].Sep);
        octSum = workWeekMonth(octSum,project[i].Oct);
        novSum = workWeekMonth(novSum,project[i].Nov);
        decSum = workWeekMonth(decSum,project[i].Dec);
    }
    const worker = project[0].WorkerId;

    //Opening database with available fields for the final calculation
    const request = readOneDB("year" + year +"Store", worker);
    request.onsuccess = e => {
        const workerId = request.result;

        let workerName = document.getElementById(team+"_worker" + workerId.WorkerId + "_name") as HTMLTableCellElement;
        workerName.innerHTML= workerId.Name;
       
        //Final calculation for each month 
        totalSum[0] = procWeekMonth(janSum,workerId.Jan);
        totalSum[1] = procWeekMonth(febSum,workerId.Feb);
        totalSum[2] = procWeekMonth(marSum,workerId.Mar);
        totalSum[3] = procWeekMonth(aprSum,workerId.Apr);
        totalSum[4] = procWeekMonth(maiSum,workerId.Mai);
        totalSum[5] = procWeekMonth(junSum,workerId.Jun);
        totalSum[6] = procWeekMonth(julSum,workerId.Jul);
        totalSum[7] = procWeekMonth(augSum,workerId.Aug);
        totalSum[8] = procWeekMonth(sepSum,workerId.Sep);
        totalSum[9] = procWeekMonth(octSum,workerId.Oct);
        totalSum[10] = procWeekMonth(novSum,workerId.Nov);
        totalSum[11] = procWeekMonth(decSum,workerId.Dec);

        tableData(totalSum,workerId.WorkerId);

    }       
}

//Filing the table with the calucalted data and adding onlick event for each field in the table to open popup table
function tableData(sumMonth:number[], key :number){
    for (let i = 0; i < months.length;i++){
        let monthEvent = document.getElementById(team+"_worker" + key + "_" + months[i]+"/"+year) as HTMLTableCellElement;
        monthEvent.addEventListener("click", function(){ openNewTable(months[i],key)});
        if (sumMonth[i] != -1){
            monthEvent.innerHTML = sumMonth[i].toFixed(1) + "%";
        }else{
            monthEvent.innerHTML = "-"; 
        }
    }
    tableDoneCheck++;       //Variable that indicates that a row has been made
    if (tableLength == tableDoneCheck){         //checking if the row that was made is the last row of the data
        createTotal();
    }
}

//Creating total row in the main table
function createTotal(){
    const request = readIndex("coreStore" + year,"Team",team);

    request.onsuccess = e =>{
        const data = request.result;
        let total: number [] = [0,0,0,0,0,0,0,0,0,0,0,0];           //Variable for calculating total 
        let checkNaN: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
        let checkInclude:number[]=[0];                              //Variable for checking that we don't do same worker more than once
        for (let i = 0; i < data.length; i++){
            if (!include(checkInclude,data[i].WorkerId)){
                checkInclude.push(data[i].WorkerId)
                for (let j = 0; j < months.length; j++){
                    const monthData = document.getElementById(team+"_worker"+data[i].WorkerId+"_"+months[j]+"/"+year).innerHTML;
                    if (monthData !=null){
                        if (!isNaN(parseFloat(monthData))){
                            total[j] +=parseFloat(monthData);
                        }else{
                            checkNaN[j]++;
                        }
                    }
                }
            }
        }
        //Calculating the total for each month
        for (let i = 0; i < months.length; i++){
            if (checkInclude.length!=(checkNaN[i]+1)){
                total[i] = total[i]/(checkInclude.length-1-checkNaN[i]);
            }else{
                total[i] = NaN;
            }

        }
        //Creating total row in the table
        let totalTr = document.createElement("tfoot");
        totalTr.setAttribute("id","Total_"+year+"_"+team);
        const parentNode = document.getElementById("tableID");
        let totalData = '<tr> <td class="tableTotal">Total:</td>'
        for (let i = 0; i < months.length; i++){
            if(isNaN(total[i])){
                totalData += '<td id="'+team+'_Total_'+year+'/'+months[i]+'" class="tableTotalData">-</td>';
            }else{
                totalData += '<td id="'+team+'_Total_'+year+'/'+months[i]+'" class="tableTotalData">'+total[i].toFixed(1)+"%"+'</td>';
            }
        }
        totalData += '</tr>'
        totalTr.innerHTML = totalData;
        parentNode.appendChild(totalTr);
    }
}




//Opening popup div
function openNewTable(month:string, key :number){
    const popupDiv = document.createElement("div") as HTMLDivElement;
    const parentNode = document.getElementById("nameNode") as HTMLParagraphElement;
    const checkDiv = document.getElementById(year+"popUp"+key+"_"+month);
    //Check if the unqiue div is aldready open
    if (checkDiv==null){
        popupDiv.setAttribute("id",year+"popUp"+key+"_"+month);
        popupDiv.setAttribute("class", "popupDiv");
        popupPostionTop += 1;
        const postionTop = popupPostionTop.toString()+"%";
        popupDiv.style.top = postionTop;
        popupPostionLeft += 1;
        const postionLeft = popupPostionLeft.toString()+"%";
        popupDiv.style.left = postionLeft;
        parentNode.appendChild(popupDiv);

        //Makign the close button
        const close = document.createElement("span")  as HTMLSpanElement;
        close.setAttribute("class","close");
        close.setAttribute("id","close"+key+"_"+year+"/"+month);
        close.innerHTML = "&times;";

        const saveYear = year;      //Saving the current year so that we can have divs from different years open and close
        close.addEventListener("click",function(){ closeDiv(month,key,saveYear)});
        popupDiv.appendChild(close);

        monthTable(month,key);
    }
}

//Writing out the data about the table cell and making a table in the new div and filling the available field
function monthTable(month:string,key:number){
    const parentNode = document.getElementById(year+"popUp"+key+"_"+month);
    const header = document.createElement("h3") as HTMLHeadingElement;
    header.setAttribute("id",year+"Header"+key+"_"+month);
    header.setAttribute("class","popupHeader");
   
    dragDiv(header,parentNode);     //Fucntion for draging the div
    const request = readOneDB("year" + year +"Store",key)       //Opening store with available data

    request.onsuccess = e =>{
        const worker = request.result;
        
        //Writing out basic infomation of the block
        header.innerHTML = month +" "+ year+" ("+ worker.Name + ")";
        parentNode.appendChild(header);
        //Horizontal line
        const hrelement = document.createElement("hr") as HTMLHRElement;
        hrelement.setAttribute("class","popuphrstyle");       
        parentNode.appendChild(hrelement);
        //Writing out the fild with first mondays
        const date :Date [] = getMondays(month); //Getting mondays in a month
        let tableDiv = document.createElement("div") as HTMLDivElement;
        tableDiv.setAttribute("id","popupTableDiv"+key+"_"+year+"/"+month);
        const currentMonth = date[0].getMonth() + 1;    //The date in Date for months goes from 0 to 11 so to match our calendar 1 was added
        const available = findMonth(month,worker)       //Returns the month chosen with "month" of the interface

        //Makign table header with months
        let tableNode = '<div> <table id="popUpTable'+key+'_'+year+"/"+month+'"  class="popuptable"> <colgroup> <col style="width:40px"> <col span="5" style="width:20px"> </colgroup>'+
                        '<tbody id="popUpTableBody'+key+'_'+year+"/"+month+'"> <tr> <th> Project(s) </th>';
        for (let i = 0; i < date.length; i++){
            if (currentMonth<10){       //Check if we need to add a "0" in front the month or not
                if (date[i].getDate()<10){      //Check if we need to add a zero in front of the day or not
                    tableNode += '<th> ' +'0' + date[i].getDate() + '.' + '0' + currentMonth + '</th>';
                }else{
                    tableNode += '<th> ' + date[i].getDate() + '.' + '0' + currentMonth + '</th>';
                }
            }else{
                if (date[i].getDate()<10){
                    tableNode += '<th> ' +'0' + date[i].getDate() + '.' + currentMonth + '</th>';
                }else{
                    tableNode += '<th> ' + date[i].getDate() + '.' + currentMonth + '</th>';
                }
            }
        }

        //Filling the first row of the table with the available data
        tableNode += '</tr><tr><td> Available</td>';
        for (let i = 0; i < date.length; i++){
            if (available[i] < 0){
                tableNode += '<td id = "'+team+year+ 'Available'+key+'_'+month+i+'" contenteditable = "true"> - </td>';
            }else{
                tableNode += '<td id = "'+team+year+'Available'+key+'_'+month+i+'" contenteditable = "true">'+ available[i].toFixed(1) +'</td>';
            }
        }
        tableNode += '</tr></tbody></div>';

        tableDiv.innerHTML = tableNode;
        parentNode.appendChild(tableDiv);

        fillPopUpTable(month,key,worker);       //Worker is sent because it has the available data stored for each month
    }

}

function fillPopUpTable(month:string,key:number, workerAvailable :yearAvailable ){
    const parentNode = document.getElementById("popUpTableBody"+key+"_"+year+"/"+month);
    //Opening the core database to get work on projects
    const request = readIndex("coreStore"+year,"WorkerId",key);         //Request array with projects of filtered year and worker 
    request.onsuccess = e => {
        const worker = request.result;

        const available = findMonth(month,workerAvailable);         //get the availabe of the month we need
        let sum: number[] = [0,0,0,0,0];
        //Going throught the array of projects
        for(let i = 0; i < worker.length; i++){
            const workMonth = findMonth(month,worker[i]);
            let newTr = document.createElement("tr") as HTMLTableRowElement;
            let row = '<td id = "'+team+year+'Project'+i+'_worker'+key+'_'+month+'" contenteditable = "true">'+worker[i].Project+'</td>';
            for (let j = 0; j < workMonth.length; j++){ ///Going through all the weeks in the month 
                row += '<td id= "'+team+year+'Week'+j+'_worker'+key+'_'+month+'_project'+i+'" contenteditable = "true">'+workMonth[j].toFixed(1)+'</td>';
                sum[j] += workMonth[j];
            }
            newTr.innerHTML = row;
            parentNode.appendChild(newTr);
        } 
        //Calculating the utulization row
        let newFoot = document.createElement("tfoot") ;
        let tfooter = '<tr><td class = "tablefooter"> Utilization</td>';
        for (let i = 0; i < available.length;i++){
            if (available[i]==0){
                sum[i]=0;
            }else{
                sum[i] = (sum[i]/available[i])*100;
            }

            if (sum[i]<0 || available[i]<0){        //-1 is used as control for unavailable so if the sum is negative or it we will get "-" on the output
                tfooter += '<td class = "tablefooter"> - </td>';
            }else if (sum[i]>0){
                tfooter += '<td class = "tablefooter">'+sum[i].toFixed(1)+'%'+'</td>';
            }else if (sum[i] ==0 && available[i] != 0){     //this happens when we have a worker that did 0 work in one week but was available
                tfooter += '<td class = "tablefooter"> 0% </td>';
            }else{
                tfooter += '<td class = "tablefooter"> 100% </td>';     //When worker wasn't available and did 0 we write it as 100%
            }
        }
        tfooter += '</tr>'
        newFoot.innerHTML = tfooter;
        const parentTable = document.getElementById("popUpTable"+key+"_"+year+"/"+month);
        parentTable.appendChild(newFoot);

        //Implementing the save button with onclick event
        const save = document.createElement("button") as HTMLButtonElement;
        save.setAttribute("class","save");
        save.innerHTML = "Save";
        const saveYear = year;
        const saveTeam = team;
        save.addEventListener("click",function(){
            getTableData(month,key,saveYear,saveTeam);
        });
        const divPopUp = document.getElementById("popupTableDiv"+key+"_"+year+"/"+month);
        divPopUp.appendChild(save);
    }
}

//Updating table when pressign save button
function getTableData(month:string, key:number, saveYear:string,saveTeam:string){
    const request = readOneDB("year"+saveYear+"Store",key);
    //Updating available field
    request.onsuccess = e => {
        let availableYear = request.result;
        //Getting the data from the table
        let available = findMonth(month,availableYear);
        for (let i = 0; i < available.length; i++){
            const getDateStr = document.getElementById(saveTeam+saveYear+"Available"+key+"_"+month+i).innerHTML;
            const getDate:number = parseInt(getDateStr,10);
            if (isNaN(getDate)){
                available[i] = -1;  //If incorrect data type was put the data is treated as worker wasn't available
            }else if (getDate<0 || getDate>5){
                alert("Inputd data must be between 0 and 5")
                return;
            }else{
                available[i] = getDate;
            }
        }
        availableYear = changeMonth(month,available,availableYear);     //Updating the cell with the data for the chosen month in the structure

        const updated = updateData("year"+saveYear+"Store",availableYear);

        updated.onsuccess = e =>{
            updateProjects(month,key,saveYear,saveTeam);
        }
    }
    
}
//Updating the project fields
function updateProjects(month:string,key:number,saveYear:string,saveTeam:string){

const requestProjects = readIndex("coreStore"+saveYear,"WorkerId",key);
    //Getting input data from project rows, checking the data 
    requestProjects.onsuccess = e =>{
        let projects = requestProjects.result;
        let sum:number[] = [0,0,0,0,0];
        for (let i = 0; i < projects.length; i++){
            let project = findMonth(month,projects[i]);
            for (let j=0; j < project.length; j++){
                const getDataStr = document.getElementById(saveTeam+saveYear+"Week"+j+"_worker"+key+"_"+month+"_project"+i).innerHTML;
                const getData:number = parseFloat(getDataStr);
                if (isNaN(getData) || getData<0 || getData >5){
                    alert("Wrong input data!");
                    return;
                }else{
                    project[j] = getData;
                }
            }

            projects[i] = changeMonth(month,project,projects[i]);   //Updating the month with the current month
            const getProject = document.getElementById(saveTeam+saveYear+"Project"+i+"_worker"+key+"_"+month).innerHTML;
            if (getProject.length < 1 || getProject == "<br>"){
                alert("Wrong input data!");
                return;
            }else {
                projects[i].Project = getProject;
            }
            //Updating the object store with the new data
            const updated = updateData("coreStore"+saveYear, projects[i])     
            updated.onsuccess = e =>{
                sum = workWeekMonth(sum,project);
                if (i == projects.length-1){            //Check if are in last iteration of the loop
                    updateMainTableCell(month,key,saveYear,saveTeam,sum);        //Updating main table, saveYear is used so if we open the another table in the mean the old will still be affected by the change
                }
            }
        }
    }
}

//Updating the filed of the main table
function updateMainTableCell(month:string,key:number,saveYear:string,saveTeam:string,sum:number[]){
    const request = readOneDB("year" + saveYear +"Store", key);     //Getting available data from the object store
    request.onsuccess = e => {
        const available = request.result;
        let totalSum;
        const monthAvailable = findMonth(month,available);
        totalSum = procWeekMonth(sum,monthAvailable);
        
        let monthEvent = document.getElementById(saveTeam+"_worker" + key + "_" + month+"/"+saveYear) as HTMLTableCellElement;
        if (monthEvent!=null){      //Checking if the right table is loaded
            if (totalSum != -1){
                monthEvent.innerHTML = totalSum.toFixed(1) + "%";
            }else{
                monthEvent.innerHTML = "-"; 
            }
        }

        const checkTotal = document.getElementById("Total_"+saveYear+"_"+saveTeam);
        if (checkTotal!=null){
            const parentNode = document.getElementById("tableID");
            parentNode.removeChild(checkTotal);
            createTotal();
        }
    }
}


