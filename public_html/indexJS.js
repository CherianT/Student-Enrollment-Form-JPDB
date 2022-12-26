var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var DBName = 'SCHOOL-DB';
var RelName = 'STUDENT-TABLE';
var connToken = '90938296|-31949273668787706|90952273';

$("#RollNo").focus();

function saveRec(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getstuRollNo() {
    var RollNo = $("#RollNo").val();
    var jsonStr = {
        RollNo: RollNo
    };
    return JSON.stringify(jsonStr);
}

function filldata(jsonObj) {
    var data = JSON.parse(jsonObj.data).record;
    $("#FullName").val(data.FullName);
    $("#Class").val(data.Class);
    $("#BirthDate").val(data.BirthDate);
    $("#Address").val(data.Address);
    $("#EnrollmentDate").val(data.EnrollmentDate);
}

function resetForm() {
    $("#RollNo").val("");
    $("#FullName").val("");
    $("#Class").val("");
    $("#BirthDate").val("");
    $("#Address").val("");
    $("#EnrollmentDate").val("");
    $("#RollNo").prop("disabled", false);
    $("#FullName").prop("disabled", true);
    $("#Class").prop("disabled", true);
    $("#BirthDate").prop("disabled", true);
    $("#Address").prop("disabled", true);
    $("#EnrollmentDate").prop("disabled", true);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#RollNo").focus();
}

function validateData() {
    var RollNo = $("#RollNo").val();
    if (RollNo === "") {
        alert("Roll No Required");
        $("#RollNo").focus();
        return "";
    }
    var FullName = $("#FullName").val();
    if (FullName === "") {
        alert("Full Name is Required");
        $("#FullName").focus();
        return "";
    }
    var Classvar = $("#Class").val();
    if (Classvar === "") {
        alert("Class is Required");
        $("#Class").focus();
        return "";
    }
    var BirthDate = $("#BirthDate").val();
    if (BirthDate === "") {
        alert("Birth Date is Required");
        $("#BirthDate").focus();
        return "";
    }
    var Address = $("#Address").val();
    if (Address === "") {
        alert("Address is Required");
        $("#Address").focus();
        return "";
    }
    var EnrollmentDate = $("#EnrollmentDate").val();
    if (EnrollmentDate === "") {
        alert("Enrollment Date is Required");
        $("#EnrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        RollNo: RollNo,
        FullName: FullName,
        Class: Classvar,
        BirthDate: BirthDate,
        Address: Address,
        EnrollmentDate: EnrollmentDate
    };
    return JSON.stringify(jsonStrObj);
}

function getRoll() {
    var RollNoJsonObj = getstuRollNo();
    var getRequest = createGET_BY_KEYRequest(connToken, DBName, RelName, RollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#FullName").prop("disabled", false);
        $("#Class").prop("disabled", false);
        $("#BirthDate").prop("disabled", false);
        $("#Address").prop("disabled", false);
        $("#EnrollmentDate").prop("disabled", false);
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
    } else if (resJsonObj.status === 200) {
        $("#RollNo").prop("disabled", true);
        filldata(resJsonObj);
        $("#FullName").prop("disabled", false);
        $("#Class").prop("disabled", false);
        $("#BirthDate").prop("disabled", false);
        $("#Address").prop("disabled", false);
        $("#EnrollmentDate").prop("disabled", false);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, DBName, RelName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#RollNo").focus();
}

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, DBName, RelName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#RollNo").focus();
}