
//Functions for adding new data

//Function for making the popup div for the form
function makeForm(){
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
                    'Team: <br> <input type="text" id="teamForm"placeholder="Team" class="inputField"><br>'+
                    'Select year: <br> <div class="formSelect"><select id="formYearSelect"> <option id="formYear" value="2017">2017</option> <option id="formYear" value="2016">2016</option> </select> </div> <br>'+
                    'Worker exists:  <input type="checkbox" id="workerExists" value="true"> <br>'+
                    '<input type="text" id="workerOldForm" placeholder="Worker Old Name" class="inputField"> <br><br>'+
                    '<button id="formBtn" onclick="addToDatabase()" class="btnForm"> Submit </button><br>'+
                    '<div><p id="infoForm" class="dataAdded" > </p></div>' ; 
    newForm.innerHTML=innerForm;

    formDiv.appendChild(newForm);

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
  
    const teamForm = document.getElementById("teamForm") as HTMLInputElement;
    const newTeam = teamForm.value;

    if (!newTeam){
        teamForm.style.borderColor = "red";
        teamForm.placeholder = "Name required"
    }else{
        teamForm.style.borderColor = "#EBE9ED";
    }
  

    const yearSelected = document.getElementById("formYearSelect") as HTMLSelectElement;
    const yearChosen = yearSelected.options[yearSelected.selectedIndex].value;

    
    const checkExists = document.getElementById("workerExists") as HTMLInputElement;
    const checkedValue = checkExists.checked;

    if (checkedValue == true){      //If worker exists is checked then we don't need to add new data in the object store for year available
        const oldWorkerForm = document.getElementById("workerOldForm") as HTMLInputElement;
        const oldWorker = oldWorkerForm.value;
        //This was added so if the worker changes last name or we just want to add a new project for an existing worker
        updateWorker(newWorker, newProject, newTeam, yearChosen,oldWorker); 

    }else{
        //If worker doesn't exists in the DB then we add new entry
        addWorker(newWorker, newProject, newTeam, yearChosen);
    }

}

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
                
                updateTeam(newTeam);

            }
        } 
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
        //If new team doesn't exists we add it to the object store
        if(!isIncluded){
            let newEntry: teamsInterfacs = {} as any;
            newEntry.id = teamArray.length + 1;
            newEntry.teamName = newTeam;
            updateData("teamStore",newEntry);
        }
        //Writing out infomation that the data was added
        const infoForm = document.getElementById("infoForm") as HTMLParagraphElement;
        infoForm.innerHTML = "Data has been added";
        //Disableing the submit button 
        const subBtn = document.getElementById("formBtn") as HTMLButtonElement;
        subBtn.setAttribute("disabled","true");
    }

}

//Function adding new data
function addWorker(name:string, project:string, newTeam:string, yearChosen:string){
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
        updateData("year"+yearChosen+"Store",newData);
        addCoreData(newData.WorkerId, project, newTeam, yearChosen)
    }
}

//Adding data to core objectstore
function addCoreData(newWorkerId:number, project:string, newTeam:string, yearChosen:string){
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
        newData.Team = newTeam;

        updateData("coreStore"+yearChosen,newData);
                    
        updateTeam(newTeam);

    }
}


