
//Function for select team in input form

//Functions for adding new data

//Function for making the popup div for the form
function makeForm(){
    expendDiv();

    const formDiv = document.createElement("div") as HTMLDivElement;
    const parentNode = document.getElementById("nameNode") as HTMLParagraphElement;
    const checkFormDiv = document.getElementById("inputFormDiv") as HTMLDivElement;     //Checking if div is already made
    if (checkFormDiv == null){
        formDiv.setAttribute("id","inputFormDiv");
        formDiv.setAttribute("class","popUpForm");
        parentNode.appendChild(formDiv);

        const close = document.createElement("span")  as HTMLSpanElement;
        close.setAttribute("class","close");
        close.setAttribute("id","closeForm");
        close.innerHTML = "&times;";
        
        close.addEventListener("click",function(){ closeForm()});
        formDiv.appendChild(close);

        const headerForm = document.createElement("h3") as HTMLHeadElement;
        headerForm.setAttribute("class","formHeader");

        dragDiv(headerForm,formDiv);        //Making the div dragable

        headerForm.innerHTML="New entry";

        formDiv.appendChild(headerForm);
        const hrelement = document.createElement("hr") as HTMLHRElement;
        hrelement.setAttribute("class","popuphrstyle");  
        formDiv.appendChild(hrelement);

        formFields(formDiv);
    }
}

//Fucntion for making the skeleton of the form
function formFields(formDiv){
    const newForm = document.createElement("div") as HTMLDivElement;
    newForm.setAttribute("class","formDiv");
    
    const innerForm = 'Worker name: <br> <input type="text" id="workerForm" placeholder="Worker Name" class="inputField"> <br>'+
                    'Project: <br> <input type="text" id="projectForm" placeholder="Project" class="inputField"> <br>'+
                    'Select team: <br> <div class="formSelect"><select id="formTeamSelect"> <option disabled selected hidden value="-1">Select team</option></select> </div> '+
                    'Select year: <br> <div class="formSelect"><select id="formYearSelect"> <option id="formYear" value="2017">2017</option> <option id="formYear" value="2016">2016</option> </select> </div> <br>'+
                    '<button id="formBtn" onclick="addToDatabase()" class="btnForm"> Submit </button><br>'+
                    '<div><p id="infoForm" class="dataAdded" > </p></div>' ; 
    newForm.innerHTML=innerForm;

    formDiv.appendChild(newForm);
    selectTeam();
}


//Fucntion for reading from the input fields
function addToDatabase(){
    const workerForm = document.getElementById("workerForm") as HTMLInputElement;
    const newWorker = workerForm.value;
    

    if (!newWorker){
        workerForm.style.borderColor = "red";
        workerForm.placeholder = "Name required"
        return;
    }else{
        workerForm.style.borderColor = "#EBE9ED";
    }
  

    const projectForm = document.getElementById("projectForm") as HTMLInputElement;
    const newProject = projectForm.value;

    if (!newProject){
        projectForm.style.borderColor = "red";
        projectForm.placeholder = "Project required"
        return;
    }else{
        projectForm.style.borderColor = "#EBE9ED";
    }
  
    const teamSelected = document.getElementById("formTeamSelect") as HTMLSelectElement;
    const teamChosen = teamSelected.options[teamSelected.selectedIndex].value;

    if (teamChosen == "-1"){
        const infoForm = document.getElementById("infoForm") as HTMLParagraphElement;
        infoForm.style.color = "red";
        infoForm.innerHTML = "Please slect team";
        return;
    }else{
        const infoForm = document.getElementById("infoForm") as HTMLParagraphElement;
        infoForm.style.color = "black";
        infoForm.innerHTML = " ";
    }
  

    const yearSelected = document.getElementById("formYearSelect") as HTMLSelectElement;
    const yearChosen = yearSelected.options[yearSelected.selectedIndex].value;


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
function addWorker(name:string, project:string, teamChosen:string, yearChosen:string){
    const request = readAllDB("year"+yearChosen+"Store");

    request.onsuccess = e => {
        const availableArray = request.result;
        let newData;
        //Chosing what template to use
        if (yearChosen=="2017"){
            newData = templateAvailable2017;
        }else{
            newData = templateAvailable2016;
        }
        newData.WorkerId = availableArray.length + 1;
        newData.Name = name;
        newData.Team = teamChosen;
        updateData("year"+yearChosen+"Store",newData);

        //Writing out infomation that the data was added
        const infoForm = document.getElementById("infoForm") as HTMLParagraphElement;
        //Disableing the submit button 
        const subBtn = document.getElementById("formBtn") as HTMLButtonElement;
        addCoreData(newData.WorkerId, project, teamChosen, yearChosen, infoForm, subBtn)
    }
}

//Adding data to core objectstore
function addCoreData(newWorkerId:number, project:string, teamChosen:string, yearChosen:string, infoForm, subBtn){
    const request = readAllDB("coreStore"+yearChosen)
    request.onsuccess = e =>{
        const lenghtObjs = request.result.length;

        let newData;

        if (yearChosen=="2017"){
            newData = templateCore2017;
        }else{
            newData = templateCore2016;
        }

        newData.Project = project;
        newData.Id = lenghtObjs + 1;
        newData.WorkerId = newWorkerId;
        newData.Team = teamChosen;

        updateData("coreStore"+yearChosen,newData);
   
        infoForm.innerHTML = "Data has been added";
              
        subBtn.setAttribute("disabled","true");                 
    }
}




//Creating form for adding new teams
function teamForm(){
    expendDiv();

    const formTeamDiv = document.createElement("div") as HTMLDivElement;
    const parentNode = document.getElementById("nameNode") as HTMLParagraphElement;
    const checkFormTeamDiv = document.getElementById("inputTeamDiv") as HTMLDivElement;     //Checking if div is already made
    if (checkFormTeamDiv == null){
        formTeamDiv.setAttribute("id","inputTeamDiv");
        formTeamDiv.setAttribute("class","popUpForm");
        parentNode.appendChild(formTeamDiv);

        const close = document.createElement("span")  as HTMLSpanElement;
        close.setAttribute("class","close");
        close.setAttribute("id","closeTeamForm");
        close.innerHTML = "&times;";
        
        close.addEventListener("click",function(){ closeTeamForm()});
        formTeamDiv.appendChild(close);

        const headerForm = document.createElement("h3") as HTMLHeadElement;
        headerForm.setAttribute("class","formHeader");

        dragDiv(headerForm,formTeamDiv);        //Making the div dragable

        headerForm.innerHTML="New Team";

        formTeamDiv.appendChild(headerForm);
        const hrelement = document.createElement("hr") as HTMLHRElement;
        hrelement.setAttribute("class","popuphrstyle");  
        formTeamDiv.appendChild(hrelement);

        fillTeamForm(formTeamDiv)
    }
}

//Creating the elements of the form
function fillTeamForm(formTeamDiv){
    const newForm = document.createElement("div") as HTMLDivElement;
    newForm.setAttribute("class","formDiv");

    const innerForm = 'Team name: <br> <input type="text" id="newTeamForm" placeholder="Team Name" class="inputField"> <br><br>'+
                    '<button id="formTeamBtn" onclick="addTeamToDatabase()" class="btnForm"> Submit </button><br>'+
                    '<div><p id="infoTeamForm" class="dataAdded" > </p></div>' ; 
    newForm.innerHTML=innerForm;

    formTeamDiv.appendChild(newForm);
}

//Adding the new team to the database
function addTeamToDatabase(){

    const teamField = document.getElementById("newTeamForm") as HTMLInputElement;
    const newTeam = teamField.value;
    
    if (!newTeam){
        teamField.style.borderColor = "red";
        teamField.placeholder = "Name required"
        return;
    }else{
        teamField.style.borderColor = "#EBE9ED";
    }
  
    updateTeam(newTeam);
}


//Updating team objectstore
function updateTeam(newTeam:string){
    const request = readAllDB ("teamStore");

    request.onsuccess = e =>{
        const teamArray = request.result;
        let isIncluded:boolean = false;
        //Checkign if the new team exsists in the objectstore
        for ( let i=0; i<teamArray.length;i++){
            if (teamArray[i].teamName == newTeam){
                isIncluded = true;
            }
        }
        
        //Writing out infomation that the data was added
        const infoForm = document.getElementById("infoTeamForm") as HTMLParagraphElement;
        //If new team doesn't exists we add it to the object store
        if(!isIncluded){
            let newEntry: teamsInterfacs = {} as any;
            newEntry.id = teamArray.length + 1;
            newEntry.teamName = newTeam;
            updateData("teamStore",newEntry);
            //Writing out infomation that the data was added
            infoForm.innerHTML = "Data has been added";
            //Disableing the submit button 
            const subBtn = document.getElementById("formTeamBtn") as HTMLButtonElement;
            subBtn.setAttribute("disabled","true");
        }else{
            infoForm.innerHTML = "Team already exists in the database";
        }
    }

}


//Function for adding new project
function makeProject(){
    expendDiv();

    const formProjectDiv = document.createElement("div") as HTMLDivElement;
    const parentNode = document.getElementById("nameNode") as HTMLParagraphElement;
    const checkFormProjectDiv = document.getElementById("inputProjectDiv") as HTMLDivElement;     //Checking if div is already made

    //Making the sekelton of the div and adding the header
    if (checkFormProjectDiv == null){
        formProjectDiv.setAttribute("id","inputProjectDiv");
        formProjectDiv.setAttribute("class","popUpForm");
        parentNode.appendChild(formProjectDiv);

        const close = document.createElement("span")  as HTMLSpanElement;
        close.setAttribute("class","close");
        close.setAttribute("id","closeProjectForm");
        close.innerHTML = "&times;";
        
        close.addEventListener("click",function(){ closeProjectForm()});
        formProjectDiv.appendChild(close);

        const headerForm = document.createElement("h3") as HTMLHeadElement;
        headerForm.setAttribute("class","formHeader");

        dragDiv(headerForm,formProjectDiv);        //Making the div dragable

        headerForm.innerHTML="New Project";

        formProjectDiv.appendChild(headerForm);
        const hrelement = document.createElement("hr") as HTMLHRElement;
        hrelement.setAttribute("class","popuphrstyle");  
        formProjectDiv.appendChild(hrelement);

        fillProjectForm(formProjectDiv)
    }

}


//Creating the elements of the project form
function fillProjectForm(formProjectDiv){
    const newForm = document.createElement("div") as HTMLDivElement;
    newForm.setAttribute("class","formDiv");

    const innerForm = 'Select year: <br> <div class="formSelect"><select id="projectYearSelect"> <option id="formYear" value="2017">2017</option> <option id="formYear" value="2016">2016</option> </select> </div> '+
                    'Select team: <br> <div class="formSelect"><select id="projectTeamSelect"> <option disabled selected hidden value="-1">Select team</option></select> </div> '+
                    'Select worker: <br> <div class="formSelect"><select id="projectWorkerSelect"  onclick = "selectWorker()"> <option disabled selected hidden value="-1">Select worker</option></select> </div> '+
                    'Project: <br> <input type="text" id="projectInputForm" placeholder="Project" class="inputField"> <br> <br>'+
                    '<button id="projectBtn" onclick="addProjectToDatabase()" class="btnForm"> Submit </button><br> '+
                    '<div><p id="infoProject" class="dataAdded" > </p></div>' ; 
    newForm.innerHTML=innerForm;

    formProjectDiv.appendChild(newForm);
    selectProjectTeam();
}

//Checking if new worker select needs to be made
let teamChanged : boolean = false;


//Creating team select options
function selectProjectTeam(){
    const nodeParent = document.getElementById("projectTeamSelect") as HTMLSelectElement;

    const nodeYear = document.getElementById("projectYearSelect") as HTMLSelectElement;

    nodeParent.addEventListener("change", function(){createSelectWorker()});
    nodeYear.addEventListener("change", function(){createSelectWorker()});
    const request = readAllDB("teamStore");

    //Creating team select options
    request.onsuccess = e => {
        const cursor = request.result;

        for (let i = 0; i < cursor.length; i++){
            let newOption = document.createElement("Option");
            newOption.setAttribute("id","teamProject"+i+1);
            newOption.setAttribute("value",cursor[i].teamName);
            newOption.innerHTML = cursor[i].teamName;
            nodeParent.appendChild(newOption);    
        }
    }
    teamChanged = true;        
}

//Creating worker select options
function createSelectWorker(){
    if (teamChanged){
        //Geting data from year and team select
        const yearSelected = document.getElementById("projectYearSelect") as HTMLSelectElement;
        const yearChosen = yearSelected.options[yearSelected.selectedIndex].value;
        const teamSelected = document.getElementById("projectTeamSelect") as HTMLSelectElement;
        const teamName = teamSelected.options[teamSelected.selectedIndex].value;

        const workerSelect = document.getElementById("projectWorkerSelect") as HTMLSelectElement;

        //Deliting old options from the worker select
        for ( let i = 0; i < workerSelect.length; i++){
            workerSelect.remove(i);   
        }
        const firstOption = '<option disabled selected hidden value="-1">Select worker</option>';
        workerSelect.innerHTML = firstOption;
        const request = readIndex("year"+yearChosen+"Store","Team",teamName);

        //Creating new options for selected team/year
        request.onsuccess = e => {
            const cursor = request.result;
           
            for (let i = 0; i < cursor.length; i++){
                let newOption = document.createElement("Option");
                newOption.setAttribute("id","workerProject"+i+1);
                newOption.setAttribute("value",cursor[i].WorkerId);
                newOption.innerHTML = cursor[i].Name;
                workerSelect.appendChild(newOption);
            }
            
        }
    }

}


//Adding new data to database
function addProjectToDatabase(){
    //getting data from fields 
    const yearSelect = document.getElementById("projectYearSelect") as HTMLSelectElement;
    const yearChosen = yearSelect.options[yearSelect.selectedIndex].value;
    const teamSelect = document.getElementById("projectTeamSelect") as HTMLSelectElement;
    const teamChosen = teamSelect.options[teamSelect.selectedIndex].value;
    const workerSelect = document.getElementById("projectWorkerSelect") as HTMLSelectElement;
    const workerId = workerSelect.options[workerSelect.selectedIndex].value;
    
    const projectInput = document.getElementById("projectInputForm") as HTMLInputElement;
    const newProject = projectInput.value;

    const info = document.getElementById("infoProject") as HTMLParagraphElement;
    const subBtn = document.getElementById("projectBtn") as HTMLButtonElement;

    //Checking if team is selected
    if (teamChosen == "-1"){
        teamSelect.style.borderColor = "red";
        info.innerHTML = "Select team";
        return;
    }else{
        teamSelect.style.borderColor = "#EBE9ED";
        info.innerHTML = "";
    }

    //Checking if worker is selected
    if (workerId == "-1"){
        workerSelect.style.borderColor = "red";
        info.innerHTML = "Select worker";
        return;
    }else{
        workerSelect.style.borderColor = "#EBE9ED";
        info.innerHTML = "";
    }

    //Checking if project data was given
    if (newProject){
        projectInput.style.borderColor = "#EBE9ED";
        addCoreData(+workerId, newProject, teamChosen, yearChosen, info, subBtn)
    }else{
        projectInput.style.borderColor = "red";
        projectInput.placeholder = "Project required"
        return;
    }
         
}


