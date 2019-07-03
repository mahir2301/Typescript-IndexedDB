//Function for the filter button to show/hide the filter option div
function ShowHideFilter(){
    let ShowHide = document.getElementById("FilterButton") as HTMLInputElement;

    if (ShowHide.value=="+ Filter"){
        ShowHide.value="- Filter";
        document.getElementById("FilterField").className = "showFilter";
    }
    else{
        ShowHide.value="+ Filter";
        document.getElementById("FilterField").className = "hideFilter";
    }
}

//Show hide the team dropdown div
let expanded=false;
function expendCheck(){
let checkboxes = document.getElementById("checkTeam") as HTMLDivElement;
const teamSelect = document.getElementById("teamSelect");
    window.addEventListener("mousedown",  e =>{
        const lableClass = document.getElementsByClassName("nohide");
        const checkClass = document.getElementsByClassName("checkBox");
        let checkClick:boolean = true;
        for (let i = 0; i < lableClass.length; i++){        //Check if the click that occured was in any of the dropdown div elements
            if (e.target == lableClass[i] || e.target == checkClass[i]||e.target == checkboxes || e.target==teamSelect){
                checkClick = false; 
            }
        }
        if (checkClick){        //If click wasn't in the div elements hide the div
            checkboxes.style.display = "none";
            expanded = false;  
        } 
    })

    if (!expanded) {        //Hide/show the div with the select box
        checkboxes.style.display = "block";
         expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}





//Math functions for calcuating for each workers work % in each month

//Sum of two arrays 
function workWeekMonth(sum:number[],month:number[]){
    for (let i = 0; i < month.length; i++){
        sum[i] += month[i];
    }
    return sum;
}

//Array of the sum for each montsh divided by the available of each month
function procWeekMonth (sum:number[],month:number[]){
    let weeks:number =0;
    let flagNaN:boolean = true; //Check if any month has all available fields not defined
    for (let i = 0; i < month.length; i++){
        if (month[i] > 0){
        sum[i] = sum[i]/month[i];
        weeks++;
        flagNaN = false;
        }else if (month[i] == 0){
            sum[i] = 0;
            flagNaN = false;
        }else{
            sum[i] = 0;
        }
    }
    sum.push(weeks);
    const result = totalMonthWork(sum,flagNaN);
    return result;
}
//Calculating the total sum divided by total number of elements
function totalMonthWork(sum:number[],flagNaN : boolean){
    const i = sum.length;      
    const days :number =sum[i-1];    //Last element in the array is used to show the number of sums in the array
    if (days != 0){
        sum[i-1] = 0;
        let total: number = sum.reduce(getSum);
        total = (total/days)*100;
        return total;
    }else if (flagNaN){
        return -1;
    }else{
        return 100.0;
    }
}
//Sum of all elements in an array
function getSum (sum: number, num : number){
    return sum+num;
}
//Close div function
function closeDiv(month:string,key:number,saveYear:string){
    popupPostionTop -=1;
    popupPostionLeft -=1;
    const parentNode = document.getElementById("nameNode") as HTMLParagraphElement;
    const div = document.getElementById(saveYear+"popUp"+key+"_"+month);
    parentNode.removeChild(div);
}

//Function to get which id is of the month 
function getMonthId(month:string){
    let monthId:number;
    for (let i = 0; i < months.length;i++){
        if (months[i] == month){
            monthId = i;
            break;
        }
    }
    return monthId;
}

//Function to get the mondays in a month
function getMondays(month:string){
    const monthId: number = getMonthId(month);
    const yearId: number = parseInt(year,10);
    let date = new Date(yearId,monthId+1,0);        //Gets the last day of the month 
    let mondays= [];

    const daysInMonth = date.getDate();           
    for (let i = 1; i <= daysInMonth; i++){
        const day: Date = new Date(yearId,monthId,i)
        if (day.getDay()==1){
            mondays.push(day);
        }
    }
    return mondays;
}


//Find which month in the interface the "month" is
function findMonth(month:string, worker:yearAvailable){
    switch (month){
        case "Jan" :{
            return worker.Jan;
        }
        case "Feb" :{
            return worker.Feb;
        }
        case "Mar" :{
            return worker.Mar;
        }
        case "Apr" :{
            return worker.Apr;
        }
        case "Mai" :{
            return worker.Mai;
        }
        case "Jun" :{
            return worker.Jun;
        }
        case "Jul" :{
            return worker.Jul;
        }
        case "Aug" :{
            return worker.Aug;
        }
        case "Sep" :{
            return worker.Sep;
        }
        case "Oct" :{
            return worker.Oct;
        }
        case "Nov" :{
            return worker.Nov;
        }
        case "Dec" :{
            return worker.Dec;
        }
    }
}

//Checnges the month in the strucutre of chose with "month"
function changeMonth(month:string, available:number[],availableYear:yearAvailable|coreData){
    switch (month){
        case "Jan":{
            availableYear.Jan=available;
            return availableYear;
        }
        case "Feb" :{
            availableYear.Feb=available;
            return availableYear;
        }
    
        case "Mar" :{
            availableYear.Mar=available;
            return availableYear;
        }
        case "Apr" :{
            availableYear.Apr=available;
            return availableYear;
        }
        case "Mai" :{
            availableYear.Mai=available;
            return availableYear;
        }
        case "Jun" :{
            availableYear.Jun=available;
            return availableYear;
        }
        case "Jul" :{
            availableYear.Jul=available;
            return availableYear;
        }
        case "Aug" :{
            availableYear.Aug=available;
            return availableYear;
        }
        case "Sep" :{
            availableYear.Sep=available;
            return availableYear;
        }
        case "Oct" :{
            availableYear.Oct=available;
            return availableYear;
        }
        case "Nov" :{
            availableYear.Nov=available;
            return availableYear;
        }
        case "Dec" :{
            availableYear.Dec=available;
            return availableYear;
        }
    }
}



//Function to enable dragging divs
function dragDiv(header,div){
    let pos1 = 0, pos2 =0, pos3 =0, pos4= 0;
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e){
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

//Includes function 
function include(inputArray,checkString){
    let isInlcuded = false;
    for (let i = 0; i < inputArray.length; i++){
        if (inputArray[i] == checkString){
            isInlcuded = true;
        }
    }
    return isInlcuded;
}

//Fucntion for closing the form
function closeForm(){
    const parentNode = document.getElementById("nameNode") as HTMLParagraphElement;
    const div = document.getElementById("inputFormDiv");
    parentNode.removeChild(div);
    teamupdated = false;
}



//Function for select team in input form
function selectTeam(){

    if (!teamupdated){
        const nodeParent = document.getElementById("formTeamSelect") as HTMLSelectElement;

        const request = readAllDB("teamStore");

        request.onsuccess = e => {
            const cursor = request.result;

            for (let i = 0; i < cursor.length; i++){
                let newOption = document.createElement("Option");
                newOption.setAttribute("id","team"+i+1);
                newOption.setAttribute("value",cursor[i].teamName);
                newOption.innerHTML = cursor[i].teamName;

                nodeParent.appendChild(newOption);

            }
            teamupdated = true;
        }
    }
        
}

function expendDiv(){
    const dropdownDiv = document.getElementById("dorpdownDiv") as HTMLDivElement;
    const dropdownBtn = document.getElementById("dropdownBtn") as HTMLButtonElement;

    if (dropdownDiv.style.display == "block"){
        dropdownDiv.style.display = "none";
        dropdownBtn.style.background ="rgb(197, 197, 197)";
    }else{
        dropdownDiv.style.display = "block";
        dropdownBtn.style.background ="#979797";
    }
}


function closeTeamForm(){
    const parentNode = document.getElementById("nameNode") as HTMLParagraphElement;
    const div = document.getElementById("inputTeamDiv");
    parentNode.removeChild(div);
}