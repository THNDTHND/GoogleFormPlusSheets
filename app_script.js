// Form 0

/*
each year when year, copy data into first page into col (2023 - 2019 or etc.) and delete data on variable page
*/

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

function accessFinGoogleSheet(sheetID=SHEETID) {
  var sheetActive = SpreadsheetApp.openById(sheetID);
  var sheet = sheetActive.getSheetByName(sheetID);

  if (!sheet) {
    Logger.log('Sheet not found: ' + sheetID);
    return sheet;
  }

  Logger.log("Sheet found: " + sheetID);

  return sheet;
}

function deleteStuffMan() {

  var sheet = accessFormGoogleSheet();
  var data = sheet.getDataRange().getValues();
  var numRows = data.length;
  
  // Loop through the rows in reverse order to avoid issues with shifting row indexes
  for (var i = numRows - 1; i >= 0; i--) {
    var valueInColumnA = data[i][0]; // Assuming you want to check column A for deletion
    
    if (valueInColumnA === "Delete") {
      sheet.deleteRow(i + 1); // Add 1 because row indexes are 1-based
    }
  }
  
  // Delete columns B and C
  sheet.deleteColumns(2, 2); // Delete 2 columns starting from column 2 (B)


}

function main() {
  console.log("hello");
  ListFilesInFolder();
  /*
  [{"name":"Breast Surgery","id":"1U-5ZjZ9iRSCkML6dsp7NkWvpN5omfEi4KSguQKwTKtI"},{"name":"Untitled form (Responses)","id":"1dQAa_SVkIubFMoVBlTEGz1862RH8Y67ronUsPfdrUpU"},{"name":"Organizing","id":"1IDoXZrUuMfdtwVZEngfPcQ2BnWgeI64TPT0LKWGAs6w"},{"name":"Untitled form","id":"1S2ANtkPSWQXNYBae5Tj-_jKGGmuzvXCkw8fD_wf7L-g"},{"name":"ตัวชี้วัดฝ่ายการพยาบาล updateสค2566   ฉบับรวมแก้ไ.xlsx","id":"1xUC45EVMEB1R4ZheLlDvE0BcnkDJFss1"}]
  */

  deleteStuffMan();
}
