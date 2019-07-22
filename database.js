var teamDB = [
    { id: 1, teamName: "Web" },
    { id: 2, teamName: "Backend" },
];
//Database of the work of each month on different projects for each worker in 2016
var coreDB2016 = [
    { Id: 1, WorkerId: 1, Project: "Javascript", Jan: [2.5, 2, 0, 3], Feb: [2.5, 2, 0, 3, 5], Mar: [2.5, 2, 0, 3], Apr: [0, 0, 0, 0], Mai: [2.5, 2, 4, 0, 3], Jun: [2.5, 2, 0, 3], Jul: [2.5, 2, 0, 3], Aug: [2.5, 2, 0, 4.5, 3], Sep: [2.5, 2, 0, 3], Oct: [4, 2.5, 2, 4, 3], Nov: [2.5, 2, 0, 3], Dec: [2.5, 2, 0, 3], Team: "Web" },
    { Id: 2, WorkerId: 2, Project: "Javascript", Jan: [2.5, 2, 0, 3], Feb: [2.5, 2, 5, 0, 3], Mar: [4, 5, 2, 3], Apr: [4, 5, 2, 3], Mai: [2.5, 5, 2, 4, 3], Jun: [4, 5, 2, 3], Jul: [4, 5, 2, 3], Aug: [4, 5, 2, 3, 2], Sep: [4, 5, 2, 3], Oct: [4, 5, 2, 4.5, 3], Nov: [4, 5, 2, 3], Dec: [4, 5, 2, 3], Team: "Web" },
    { Id: 3, WorkerId: 3, Project: "Typescript", Jan: [5, 5, 5, 5], Feb: [5, 5, 4, 5, 5], Mar: [5, 5, 5, 5], Apr: [5, 5, 5, 5], Mai: [5, 5, 5, 5, 4], Jun: [5, 5, 5, 5], Jul: [5, 5, 5, 5], Aug: [0, 0, 0, 0, 0], Sep: [5, 5, 5, 5], Oct: [5, 5, 5, 5, 4.5], Nov: [5, 5, 5, 5], Dec: [5, 5, 5, 5], Team: "Web" },
];
//Database of the work of each month on different projects for each worker in 2017
var coreDB2017 = [
    { Id: 1, WorkerId: 1, Project: "Typescript", Jan: [4, 5, 2, 3, 4], Feb: [4, 4, 2, 3], Mar: [0, 5, 0, 0.5], Apr: [4, 5, 4.5, 3], Mai: [4, 2, 5, 2, 3], Jun: [0, 0, 0, 1], Jul: [4, 4, 2, 3, 1], Aug: [4, 5, 0, 3], Sep: [4, 5, 2, 3], Oct: [4, 2.5, 2, 4, 3], Nov: [4, 5, 2, 3], Dec: [4, 5, 2, 3], Team: "Web" },
    { Id: 2, WorkerId: 1, Project: "Css", Jan: [0, 0, 0.5, 2, 0.5], Feb: [0, 0, 0.5, 2], Mar: [0, 0, 0, 2], Apr: [0, 0, 0.5, 2], Mai: [0, 0, 0.5, 2, 2], Jun: [0, 0, 0.5, 2], Jul: [0, 0, 0.5, 2, 4], Aug: [0, 0, 0.5, 2], Sep: [0, 0, 0.5, 2], Oct: [0, 0, 0.5, 1, 2], Nov: [0, 0, 0.5, 2], Dec: [0, 0, 0.5, 2], Team: "Web" },
    { Id: 3, WorkerId: 2, Project: "Typescript", Jan: [0, 0, 0.5, 2, 1], Feb: [0, 0, 0.5, 2], Mar: [0, 0, 0.5, 2], Apr: [0, 0, 0.5, 2], Mai: [0, 0, 0.5, 2, 2], Jun: [0, 0, 0.5, 2], Jul: [2, 1, 0.5, 2, 0], Aug: [0, 0, 0.5, 2], Sep: [0, 0, 0.5, 2], Oct: [0, 0, 0.5, 1, 2], Nov: [0, 0, 0.5, 2], Dec: [0, 0, 0.5, 2], Team: "Web" },
    { Id: 4, WorkerId: 2, Project: "Css", Jan: [4, 5, 4, 2, 2.5], Feb: [4, 5, 2, 3], Mar: [2.5, 2, 0, 3], Apr: [2.5, 2, 0, 3], Mai: [2.5, 5, 2, 4, 3], Jun: [2.5, 2, 0, 3], Jul: [2.5, 2, 0, 3, 5], Aug: [2.5, 2, 0, 3], Sep: [2.5, 2, 0, 3], Oct: [0, 0, 0.5, 1, 2], Nov: [2.5, 2, 0, 3], Dec: [2.5, 2, 0, 3], Team: "Web" },
    { Id: 5, WorkerId: 3, Project: "Java", Jan: [0, 1.5, 0.5, 2, 0], Feb: [0, 0, 0.5, 2], Mar: [0, 0, 0.5, 2], Apr: [0, 0, 0.5, 2], Mai: [2.5, 2, 0, 3, 1], Jun: [0, 0, 0.5, 1], Jul: [0, 0, 0.5, 2, 4], Aug: [0, 0, 0.5, 2], Sep: [0, 0, 0.5, 2], Oct: [4, 5, 2, 4.5, 3], Nov: [0, 0, 0.5, 2], Dec: [0, 0, 0.5, 2], Team: "Backend" },
    { Id: 6, WorkerId: 3, Project: "Android Studio", Jan: [2.5, 2, 0, 3, 4.5], Feb: [2.5, 2, 0, 3], Mar: [2.5, 2, 0, 3], Apr: [2.5, 2, 0, 3], Mai: [2.5, 2, 0, 2, 1], Jun: [0, 0, 0, 4], Jul: [2.5, 2, 0, 3, 1], Aug: [2.5, 2, 0, 3], Sep: [2.5, 2, 0, 3], Oct: [0, 0, 0.5, 1, 2], Nov: [2.5, 2, 0, 3], Dec: [2.5, 2, 0, 3], Team: "Backend" },
    { Id: 7, WorkerId: 4, Project: "Android Studio", Jan: [4, 5, 2, 4.5, 3], Feb: [4, 5, 2, 3], Mar: [4, 5, 2, 3], Apr: [4, 5, 2, 3], Mai: [4, 5, 2, 4.5, 3], Jun: [0, 0, 0, 3], Jul: [5, 5, 5, 5, 4.5], Aug: [4, 5, 2, 3], Sep: [4, 5, 2, 3], Oct: [4, 5, 2, 4.5, 3], Nov: [4, 5, 2, 3], Dec: [4, 5, 2, 3], Team: "Backend" },
];
//Availablity of each worker in 2017
var yearAvailable2017DB = [
    { WorkerId: 1, Name: "John Smith", Jan: [-1, -1, 5, 5, 5], Feb: [5, 5, 5, 5], Mar: [0, 5, 0, 5], Apr: [5, 5, 5, 5], Mai: [5, 5, 5, 5, 5], Jun: [0, 0, 0, 5], Jul: [5, 5, 5, 5, 5], Aug: [5, 5, 5, 5], Sep: [0, 0, 0, 0], Oct: [5, 5, 5, 5, 5], Nov: [5, 5, 5, 5], Dec: [5, 5, 5, 5], Team: "Web" },
    { WorkerId: 2, Name: "Robert Joel", Jan: [5, 5, 5, 5, 5], Feb: [5, 5, 5, 5], Mar: [5, 5, 5, 5], Apr: [5, 5, 5, 5], Mai: [5, 5, 5, 5, 5], Jun: [5, 5, 5, 5], Jul: [5, 5, 5, 5, 5], Aug: [5, 5, 5, 5], Sep: [5, 5, 5, 5], Oct: [5, 5, 5, 5, 5], Nov: [5, 5, 5, 5], Dec: [5, 5, 5, 5], Team: "Web" },
    { WorkerId: 3, Name: "Johannes Schmith", Jan: [-1, -1, -1, -1, -1], Feb: [-1, -1, -1, -1], Mar: [-1, -1, -1, -1], Apr: [0, 0, 0, 0], Mai: [5, 5, 5, 5, 5], Jun: [0, 0, 5, 5], Jul: [5, 5, 5, 5, 5], Aug: [5, 5, 5, 5], Sep: [5, 5, 5, 5], Oct: [5, 5, 5, 5, 5], Nov: [5, 5, 5, 5], Dec: [5, 5, 5, 5], Team: "Backend" },
    { WorkerId: 4, Name: "Johnny Kurl", Jan: [5, 5, 5, 5, 5], Feb: [5, 5, 5, 5], Mar: [5, 5, 5, 5], Apr: [5, 5, 5, 5], Mai: [5, 5, 5, 5, 5], Jun: [0, 0, 0, 5], Jul: [5, 5, 5, 5, 5], Aug: [5, 5, 5, 5], Sep: [5, 5, 5, 5], Oct: [5, 5, 5, 5, 5], Nov: [5, 5, 5, 5], Dec: [5, 5, 5, 5], Team: "Backend" },
];
//Availablity of each worker in 2016
var yearAvailable2016DB = [
    { WorkerId: 1, Name: "John Smith", Jan: [5, 5, 5, 5], Feb: [5, 5, 5, 5, 5], Mar: [5, 5, 5, 5], Apr: [0, 0, 0, 0], Mai: [5, 5, 5, 5, 5], Jun: [5, 5, 5, 5], Jul: [5, 5, 5, 5], Aug: [5, 5, 5, 5, 5], Sep: [5, 5, 5, 5], Oct: [5, 5, 5, 5, 5], Nov: [5, 5, 5, 5], Dec: [5, 5, 5, 5], Team: "Web" },
    { WorkerId: 2, Name: "Robert Joel", Jan: [5, 5, 5, 5], Feb: [5, 5, 5, 5, 5], Mar: [5, 5, 5, 5], Apr: [5, 5, 5, 5], Mai: [5, 5, 5, 5, 5], Jun: [5, 5, 5, 5], Jul: [5, 5, 5, 5], Aug: [5, 5, 5, 5, 5], Sep: [5, 5, 5, 5], Oct: [5, 5, 5, 5, 5], Nov: [5, 5, 5, 5], Dec: [5, 5, 5, 5], Team: "Web" },
    { WorkerId: 3, Name: "Anross Rossi", Jan: [5, 5, 5, 5], Feb: [5, 5, 4, 5, 5], Mar: [5, 5, 5, 5], Apr: [5, 5, 5, 5], Mai: [5, 5, 5, 5, 5], Jun: [5, 5, 5, 5], Jul: [5, 5, 5, 5], Aug: [0, 0, 0, 0, 0], Sep: [5, 5, 5, 5], Oct: [5, 5, 5, 5, 5], Nov: [5, 5, 5, 5], Dec: [-1, -1, -1, -1], Team: "Web" },
];
//Templates for the input data
var templateCore2017 = {};
templateCore2017.Jan = [0, 0, 0, 0, 0];
templateCore2017.Feb = [0, 0, 0, 0];
templateCore2017.Mar = [0, 0, 0, 0];
templateCore2017.Apr = [0, 0, 0, 0];
templateCore2017.Mai = [0, 0, 0, 0, 0];
templateCore2017.Jun = [0, 0, 0, 0];
templateCore2017.Jul = [0, 0, 0, 0, 0];
templateCore2017.Aug = [0, 0, 0, 0];
templateCore2017.Sep = [0, 0, 0, 0];
templateCore2017.Oct = [0, 0, 0, 0, 0];
templateCore2017.Nov = [0, 0, 0, 0];
templateCore2017.Dec = [0, 0, 0, 0];
var templateCore2016 = {};
templateCore2016.Jan = [0, 0, 0, 0];
templateCore2016.Feb = [0, 0, 0, 0, 0];
templateCore2016.Mar = [0, 0, 0, 0];
templateCore2016.Apr = [0, 0, 0, 0];
templateCore2016.Mai = [0, 0, 0, 0, 0];
templateCore2016.Jun = [0, 0, 0, 0];
templateCore2016.Jul = [0, 0, 0, 0];
templateCore2016.Aug = [0, 0, 0, 0, 0];
templateCore2016.Sep = [0, 0, 0, 0];
templateCore2016.Oct = [0, 0, 0, 0, 0];
templateCore2016.Nov = [0, 0, 0, 0];
templateCore2016.Dec = [0, 0, 0, 0];
var templateAvailable2017 = {};
templateAvailable2017.Jan = [-1, -1, -1, -1, -1];
templateAvailable2017.Feb = [-1, -1, -1, -1];
templateAvailable2017.Mar = [-1, -1, -1, -1];
templateAvailable2017.Apr = [-1, -1, -1, -1];
templateAvailable2017.Mai = [-1, -1, -1, -1, -1];
templateAvailable2017.Jun = [-1, -1, -1, -1];
templateAvailable2017.Jul = [-1, -1, -1, -1, -1];
templateAvailable2017.Aug = [-1, -1, -1, -1];
templateAvailable2017.Sep = [-1, -1, -1, -1];
templateAvailable2017.Oct = [-1, -1, -1, -1, -1];
templateAvailable2017.Nov = [-1, -1, -1, -1];
templateAvailable2017.Dec = [-1, -1, -1, -1];
var templateAvailable2016 = {};
templateAvailable2016.Jan = [-1, -1, -1, -1];
templateAvailable2016.Feb = [-1, -1, -1, -1, -1];
templateAvailable2016.Mar = [-1, -1, -1, -1];
templateAvailable2016.Apr = [-1, -1, -1, -1];
templateAvailable2016.Mai = [-1, -1, -1, -1, -1];
templateAvailable2016.Jun = [-1, -1, -1, -1];
templateAvailable2016.Jul = [-1, -1, -1, -1];
templateAvailable2016.Aug = [-1, -1, -1, -1, -1];
templateAvailable2016.Sep = [-1, -1, -1, -1];
templateAvailable2016.Oct = [-1, -1, -1, -1, -1];
templateAvailable2016.Nov = [-1, -1, -1, -1];
templateAvailable2016.Dec = [-1, -1, -1, -1];
//Templets end
//Database and objectstores
var workersDB;
var teamStore;
var coreStore2016;
var coreStore2017;
var year2017Store;
var year2016Store;
var version = 1;
//Creatign the database with the objectstores onload
function creatDB() {
    var request = indexedDB.open("workersDB", version);
    //Making indexes for easier access to the data in object stores
    request.onupgradeneeded = function (e) {
        workersDB = request.result;
        if (!workersDB.objectStoreNames.contains("teamStore")) {
            var teamsObjs = workersDB.createObjectStore("teamStore", { keyPath: "teamName" });
        }
        if (!workersDB.objectStoreNames.contains("coreStore2016")) {
            var coreObjs = workersDB.createObjectStore("coreStore2016", { keyPath: "Id" });
            coreObjs.createIndex("Team", "Team", { unique: false });
            coreObjs.createIndex("WorkerId", "WorkerId", { unique: false });
        }
        if (!workersDB.objectStoreNames.contains("coreStore2017")) {
            var coreObjs = workersDB.createObjectStore("coreStore2017", { keyPath: "Id" });
            coreObjs.createIndex("Team", "Team", { unique: false });
            coreObjs.createIndex("WorkerId", "WorkerId", { unique: false });
        }
        if (!workersDB.objectStoreNames.contains("year2017Store")) {
            var yearStore07 = workersDB.createObjectStore("year2017Store", { keyPath: "WorkerId" });
            yearStore07.createIndex("Name", "Name", { unique: false });
            yearStore07.createIndex("Team", "Team", { unique: false });
        }
        if (!workersDB.objectStoreNames.contains("year2016Store")) {
            var yearStore06 = workersDB.createObjectStore("year2016Store", { keyPath: "WorkerId" });
            yearStore06.createIndex("Name", "Name", { unique: false });
            yearStore06.createIndex("Team", "Team", { unique: false });
        }
        alert("upgrade is called database name: " + workersDB.name + " version : " + workersDB.version);
    };
    request.onsuccess = function (e) {
        workersDB = request.result;
        alert("success is called database name: " + workersDB.name + " version : " + workersDB.version);
        createObjs("teamStore", teamDB);
        createObjs("coreStore2016", coreDB2016);
        createObjs("coreStore2017", coreDB2017);
        createObjs("year2017Store", yearAvailable2017DB);
        createObjs("year2016Store", yearAvailable2016DB);
    };
    //on error
    request.onerror = function (e) {
        if (request.error.name == "VersionError") {
            version++;
            creatDB();
        }
        else {
            alert("error: " + request.error + " was found ");
        }
    };
}
//Writing data in object store
function createObjs(objsName, data) {
    var checkObjs = readAllDB(objsName);
    checkObjs.onsuccess = function (e) {
        if (checkObjs.result.length == 0) {
            var writeDB = workersDB.transaction(objsName, "readwrite");
            writeDB.onerror = function (e) { return alert("error! ${writeDB.error}"); };
            var objsData = writeDB.objectStore(objsName);
            for (var i = 0; i < data.length; i++) {
                objsData.add(data[i]);
            }
        }
    };
}
//Reading all objects in an objectstore
function readAllDB(objs) {
    var transaction = workersDB.transaction(objs, "readonly");
    var objsDB = transaction.objectStore(objs);
    var request = objsDB.getAll();
    request.onerror = function (e) {
        alert("Could not get value of objectStore!");
    };
    return request;
}
//Reading one data in an object store decided by the key
function readOneDB(objs, key) {
    var transaction = workersDB.transaction(objs, "readonly");
    var objsDB = transaction.objectStore(objs);
    var request = objsDB.get(key);
    request.onerror = function (e) {
        alert("Could not get value of key in objectStore!");
    };
    return request;
}
//Reading all data decided by the index and key
function readIndex(objs, index, key) {
    var transaction = workersDB.transaction(objs, "readonly");
    var objsDB = transaction.objectStore(objs);
    var myIndex = objsDB.index(index);
    var request = myIndex.getAll(key);
    return request;
}
//Updating the database with the input object
function updateData(objs, input) {
    var transaction = workersDB.transaction(objs, "readwrite");
    var objsDB = transaction.objectStore(objs);
    var request = objsDB.put(input);
    return request;
}
