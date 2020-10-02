const Sheet = require('./sheet');
const fetch = require('node-fetch');

async function scrapePage(i) {
    const result = await fetch(`https://jobs.github.com/positions.json?page=${i}&search=remote`);
    const json = await result.json();

    const rows = json.map(job => {
        
        return {
            company: job.company,
            title: job.title,
            location: job.location,
            date: job.created_at,
            url: job.url
        }
    })

    return rows;

    
}
 
(async function() {

    let i = 1;
    let rows = [];
    while(true) {
        const newRows = await scrapePage(i);
        console.log('row had ',newRows.length );
        if (newRows.length === 0 ) break;
        rows = [...rows,...newRows];
        
        i++;
    }

    const sheet = new Sheet();
    await sheet.load();
    
    await sheet.addRows(rows)
})()

 
