// Form 0

const FOLDERNAME = "chula";
const SHEETID = "1WWH240paa2RFUAgr_d_dfljRs7vVeDwf3pOlyPGs9gc";

function ListFilesInFolder(folderName=FOLDERNAME) {
  var folder = DriveApp.getFoldersByName(folderName).next();

  var files = folder.getFiles();

  var fileDetailsArray = [];

  while (files.hasNext()) {
    var file = files.next();
    var fileName = file.getName();
    var fileId = file.getId();
    var fileDetails = { name: fileName, id: fileId };
    fileDetailsArray.push(fileDetails);
  }

  Logger.log('Files in ' + folderName + ':\n' + JSON.stringify(fileDetailsArray));
}

function accessFormGoogleSheet(sheetID=SHEETID) {
  var sheetActive = SpreadsheetApp.openById(sheetID);
  var sheet = sheetActive.getSheetByName("Summation of Year");

  if (!sheet) {
    Logger.log('Sheet not found: ' + sheetID);
    return sheet;
  }

  Logger.log("Sheet found: " + sheetID);
  return sheet;
}


const DEL = ["D10:O10", "D11:O11"]

function deleteStuffMan() {

  var sheet = accessFormGoogleSheet();
  var data = sheet.getDataRange().getValues();
  var numRows = data.length;
  
  // Define the row and column numbers you want to delete
  for (let i = 0; i < DEL.length; i++) {
    var rangeToClear = sheet.getRange(DEL[i]);
      rangeToClear.clearContent();

  }

  // Clear the contents of the specified range
}

function main() {
  console.log("hello");
  ListFilesInFolder();
  /*
  [{"name":"Breast Surgery","id":"1U-5ZjZ9iRSCkML6dsp7NkWvpN5omfEi4KSguQKwTKtI"},{"name":"Untitled form (Responses)","id":"1dQAa_SVkIubFMoVBlTEGz1862RH8Y67ronUsPfdrUpU"},{"name":"Organizing","id":"1IDoXZrUuMfdtwVZEngfPcQ2BnWgeI64TPT0LKWGAs6w"},{"name":"Untitled form","id":"1S2ANtkPSWQXNYBae5Tj-_jKGGmuzvXCkw8fD_wf7L-g"},{"name":"ตัวชี้วัดฝ่ายการพยาบาล updateสค2566   ฉบับรวมแก้ไ.xlsx","id":"1xUC45EVMEB1R4ZheLlDvE0BcnkDJFss1"}]
  */

  deleteStuffMan();
}
