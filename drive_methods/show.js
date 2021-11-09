const {google} = require('googleapis');

function listFiles(auth) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
    });
  }

module.exports = { listFiles }