//Functions for adding new data
//Function for making the popup div for the form
function makeForm() {
    expendDiv();
    var formDiv = document.createElement("div");
    var parentNode = document.getElementById("nameNode");
    var checkFormDiv = document.getElementById("inputFormDiv"); //Checking if div is already made
    if (checkFormDiv == null) {
        formDiv.setAttribute("id", "inputFormDiv");
        formDiv.setAttribute("class", "popUpForm");
        parentNode.appendChild(formDiv);
        var close_1 = document.createElement("span");
        close_1.setAttribute("class", "close");
        close_1.setAttribute("id", "closeForm");
        close_1.innerHTML = "&times;";
        close_1.addEventListener("click", function () { closeForm(); });
        formDiv.appendChild(close_1);
        var headerForm = document.createElement("h3");
        headerForm.setAttribute("class", "formHeader");
        dragDiv(headerForm, formDiv); //Making the div dragable
        headerForm.innerHTML = "New entry";
        formDiv.appendChild(headerForm);
        var hrelement = document.createElement("hr");
        hrelement.setAttribute("class", "popuphrstyle");
        formDiv.appendChild(hrelement);
        formFields(formDiv);
    }
}
//Fucntion for making the skeleton of the form
function formFields(formDiv) {
    var newForm = document.createElement("div");
    newForm.setAttribute("class", "formDiv");
    var innerForm = 'Worker name: <br> <input type="text" id="workerForm" placeholder="Worker Name" class="inputField"> <br>' +
        'Project: <br> <input type="text" id="projectForm" placeholder="Project" class="inputField"> <br>' +
        'Select Team: <br> <div class="formSelect"><select id="formTeamSelect"> <option disabled selected hidden value="-1">Select team</option></select> </div> ' +
        'Select year: <br> <div class="formSelect"><select id="formYearSelect"> <option id="formYear" value="2017">2017</option> <option id="formYear" value="2016">2016</option> </select> </div> <br>' +
        '<button id="formBtn" onclick="addToDatabase()" class="btnForm"> Submit </button><br>' +
        '<div><p id="infoForm" class="dataAdded" > </p></div>';
    newForm.innerHTML = innerForm;
    formDiv.appendChild(newForm);
    selectTeam();
}
//Fucntion for reading from the input fields
function addToDatabase() {
    var workerForm = document.getElementById("workerForm");
    var newWorker = workerForm.value;
    if (!newWorker) {
        workerForm.style.borderColor = "red";
        workerForm.placeholder = "Name required";
        return;
    }
    else {
        workerForm.style.borderColor = "#EBE9ED";
    }
    var projectForm = document.getElementById("projectForm");
    var newProject = projectForm.value;
    if (!newProject) {
        projectForm.style.borderColor = "red";
        projectForm.placeholder = "Project required";
        return;
    }
    else {
        projectForm.style.borderColor = "#EBE9ED";
    }
    var teamSelected = document.getElementById("formTeamSelect");
    var teamChosen = teamSelected.options[teamSelected.selectedIndex].value;
    if (teamChosen == "-1") {
        var infoForm = document.getElementById("infoForm");
        infoForm.style.color = "red";
        infoForm.innerHTML = "Please slect team";
        return;
    }
    else {
        var infoForm = document.getElementById("infoForm");
        infoForm.style.color = "black";
        infoForm.innerHTML = " ";
    }
    var yearSelected = document.getElementById("formYearSelect");
    var yearChosen = yearSelected.options[yearSelected.selectedIndex].value;
    addWorker(newWorker, newProject, teamChosen, yearChosen);
}
/*
function updateWorker(name:string, project:string, newTeam:string, yearChosen:string, oldName:string){
    let request;
    if (oldName){       //Checking if worker name was changed
      request = readIndex("year"+yearChosen+"Store","Name",oldName);
    }else{
      request = readIndex("year"+yearChosen+"Store","Name",name);
    }

    request.onsuccess = e =>{
            let workerAvailable = request.result ;
            if (workerAvailable.length == 0){       //Checking if old name is given that its right
                alert("Old name does not exists!")
                return;
            }

            if (oldName){   //Updating the old name with the new one
                workerAvailable[0].Name = name;
                updateData("year"+yearChosen+"Store",workerAvailable[0]);
            }

            const checkLenght = readAllDB("coreStore"+yearChosen);

            checkLenght.onsuccess = e =>{
                const lenghtObjs = checkLenght.result.length;

                let newData;

                if (yearChosen=="2017"){        //Checking what template to use
                    newData = templateCore2017;
                }else{
                    newData = templateCore2016;
                }

                newData.Project = project;
                newData.Id = lenghtObjs + 1;
                newData.WorkerId = workerAvailable[0].WorkerId;
                newData.Team = newTeam;

                updateData("coreStore"+yearChosen,newData);
      

            }
        }
}
*/
//Function adding new data
function addWorker(name, project, teamChosen, yearChosen) {
    var request = readAllDB("year" + yearChosen + "Store");
    request.onsuccess = function (e) {
        var availableArray = request.result;
        var newData;
        //Chosing what template to use
        if (yearChosen == "2017") {
            newData = templateAvailable2017;
        }
        else {
            newData = templateAvailable2016;
        }
        newData.WorkerId = availableArray.length + 1;
        newData.Name = name;
        updateData("year" + yearChosen + "Store", newData);
        addCoreData(newData.WorkerId, project, teamChosen, yearChosen);
    };
}
//Adding data to core objectstore
function addCoreData(newWorkerId, project, teamChosen, yearChosen) {
    var request = readAllDB("coreStore" + yearChosen);
    request.onsuccess = function (e) {
        var lenghtObjs = request.result.length;
        var newData;
        if (yearChosen == "2017") {
            newData = templateCore2017;
        }
        else {
            newData = templateCore2016;
        }
        newData.Project = project;
        newData.Id = lenghtObjs + 1;
        newData.WorkerId = newWorkerId;
        newData.Team = teamChosen;
        updateData("coreStore" + yearChosen, newData);
        //Writing out infomation that the data was added
        var infoForm = document.getElementById("infoForm");
        infoForm.innerHTML = "Data has been added";
        //Disableing the submit button 
        var subBtn = document.getElementById("formBtn");
        subBtn.setAttribute("disabled", "true");
    };
}
function teamForm() {
    expendDiv();
    var formTeamDiv = document.createElement("div");
    var parentNode = document.getElementById("nameNode");
    var checkFormTeamDiv = document.getElementById("inputTeamDiv"); //Checking if div is already made
    if (checkFormTeamDiv == null) {
        formTeamDiv.setAttribute("id", "inputTeamDiv");
        formTeamDiv.setAttribute("class", "popUpForm");
        parentNode.appendChild(formTeamDiv);
        var close_2 = document.createElement("span");
        close_2.setAttribute("class", "close");
        close_2.setAttribute("id", "closeTeamForm");
        close_2.innerHTML = "&times;";
        close_2.addEventListener("click", function () { closeTeamForm(); });
        formTeamDiv.appendChild(close_2);
        var headerForm = document.createElement("h3");
        headerForm.setAttribute("class", "formHeader");
        dragDiv(headerForm, formTeamDiv); //Making the div dragable
        headerForm.innerHTML = "New Team";
        formTeamDiv.appendChild(headerForm);
        var hrelement = document.createElement("hr");
        hrelement.setAttribute("class", "popuphrstyle");
        formTeamDiv.appendChild(hrelement);
        fillTeamForm(formTeamDiv);
    }
}
function fillTeamForm(formTeamDiv) {
    var newForm = document.createElement("div");
    newForm.setAttribute("class", "formDiv");
    var innerForm = 'Team name: <br> <input type="text" id="newTeamForm" placeholder="Team Name" class="inputField"> <br><br>' +
        '<button id="formTeamBtn" onclick="addTeamToDatabase()" class="btnForm"> Submit </button><br>' +
        '<div><p id="infoTeamForm" class="dataAdded" > </p></div>';
    newForm.innerHTML = innerForm;
    formTeamDiv.appendChild(newForm);
    selectTeam();
}
function addTeamToDatabase() {
    var teamField = document.getElementById("newTeamForm");
    var newTeam = teamField.value;
    if (!newTeam) {
        teamField.style.borderColor = "red";
        teamField.placeholder = "Name required";
        return;
    }
    else {
        teamField.style.borderColor = "#EBE9ED";
    }
    updateTeam(newTeam);
}
//Updating team objectstore
function updateTeam(newTeam) {
    var request = readAllDB("teamStore");
    request.onsuccess = function (e) {
        var teamArray = request.result;
        var isIncluded = false;
        //Checkign if the new team exsists in the objectstore
        for (var i = 0; i < teamArray.length; i++) {
            if (teamArray[i].teamName == newTeam) {
                isIncluded = true;
            }
        }
        //Writing out infomation that the data was added
        var infoForm = document.getElementById("infoTeamForm");
        //If new team doesn't exists we add it to the object store
        if (!isIncluded) {
            var newEntry = {};
            newEntry.id = teamArray.length + 1;
            newEntry.teamName = newTeam;
            updateData("teamStore", newEntry);
            //Writing out infomation that the data was added
            infoForm.innerHTML = "Data has been added";
            //Disableing the submit button 
            var subBtn = document.getElementById("formTeamBtn");
            subBtn.setAttribute("disabled", "true");
        }
        else {
            infoForm.innerHTML = "Team already exists in the database";
        }
    };
}
