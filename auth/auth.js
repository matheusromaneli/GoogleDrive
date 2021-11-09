const fs = require('fs');
const {google} = require('googleapis');
const readline = require('readline');
// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/drive', 
  'https://www.googleapis.com/auth/drive.file', 
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.photos.readonly'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'auth/token.json';

// Check if we have previously stored a token.
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
async function authorize() {
    const content = require("./credentials.json").installed;
    if (content === null) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    const client_secret = content.client_secret; 
    const client_id = content.client_id; 
    const redirect_uris = content.redirect_uris;
    const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);
  // Check if we have previously stored a token.
  if (fs. existsSync(TOKEN_PATH)){
    const token = fs.readFileSync(TOKEN_PATH, 'utf-8');
    oAuth2Client.setCredentials(JSON.parse(token))
    return oAuth2Client;
  }
  else{
    return await getAccessToken(oAuth2Client);
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
async function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      return oAuth2Client;
    });
  });
}

module.exports = { authorize }