const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet('1-gZqyVEMTo97Vv0QCkavO8m_UjxI41XICieNq-fmgMQ');
    }

    async load() {
        // OR load directly from json file if not in secure environment
        await this.doc.useServiceAccountAuth(require('./creds.json'));
        await this.doc.loadInfo(); // loads document properties and worksheets
    }

    async addRows(rows) {
        const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
        await sheet.addRows(rows)
    }
}

//used this to test the class was working 

//first time really using a class with functions and stuff I think, and it makes sense.

//

// (async function() {
//     const sheet = new Sheet();
//     await sheet.load()
//     await sheet.addRows([{title: 'windowCleaner',location: 'Fourways'}])
// })()
