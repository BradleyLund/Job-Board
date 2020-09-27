const Sheet = require('./sheet');
const fetch = require('node-fetch');
 
(async function() {

    const result = await fetch('https://jobs.github.com/positions.json?description=python&location=new+york');
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

    const sheet = new Sheet();
    await sheet.load();

    await sheet.addRows(rows)
    
    
})()

 
