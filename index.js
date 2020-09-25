const { GoogleSpreadsheet } = require('google-spreadsheet');
 
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1-gZqyVEMTo97Vv0QCkavO8m_UjxI41XICieNq-fmgMQ');
 
(async function() {
    // OR load directly from json file if not in secure environment
    await doc.useServiceAccountAuth(require('./creds.json'));
    
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    await doc.updateProperties({ title: 'renamed doc' });
    
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    const signatureRow = await sheet.addRow({title: "Business Analyst", location: "Woodmead"})
    const rows = await sheet.getRows()

    console.log(rows)


})()

 
