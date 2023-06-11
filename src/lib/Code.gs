function outputData() {
  const id = '1Ou1be0f7Qii0ck3Y1IUXquno_dqzBC_urgaiIMUb7YM';
  const sheetName = 'questions';
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getSheetByName(sheetName);
  const range = sheet.getDataRange();
  const data = range.getValues();
  const headings = data[0].map((val) => {
    return val.toString().toLowerCase();
  });
  const rows = data.slice(1);
  return covObjects(rows, headings);
}

function outputSettings() {
  const id = '1Ou1be0f7Qii0ck3Y1IUXquno_dqzBC_urgaiIMUb7YM';
  const sheetName = 'settings';
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getSheetByName(sheetName);
  const range = sheet.getDataRange();
  const data = range.getValues();
  const headings = data[0].map((val) => {
    return val.toString().toLowerCase();
  });
  const rows = data.slice(1);
  return covObjects(rows, headings);
}

function covObjects(rows, headings) {
  const temp = rows.map((row) => {
    const myObj = {};
    headings.forEach((heading, index) => {
      if (row[index].toString().indexOf(' | ') > -1) {
        const answers = row[index].split(' | ');
        myObj[heading] = answers;
      } else {
        myObj[heading] = row[index];
      }
    })
    return myObj;
  });
  return temp;
}

function doGet(e) {
  const output = JSON.stringify({
    status: 'success',
    data: outputData(),
    settings: outputSettings()
  });
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {

   const id = '1Ou1be0f7Qii0ck3Y1IUXquno_dqzBC_urgaiIMUb7YM';
  const sheetName = 'answered';
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getSheetByName(sheetName);

  const data = e.parameter;

  sheet.appendRow([
    data.questionId,
    data.question,
    data.answerId,
    data.answer
  ]);

   const output = JSON.stringify({
    status: 'success'
  });

  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);

}

// function doGet() {
//   const html = HtmlService.createTemplateFromFile('questions');

//   return html.evaluate();
// }
