const {google} = require('googleapis');
/**
 * Create new folder and return his ID
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {string} folderName Folder Name
 */
async function createFolder(auth, folderName){
	const drive = google.drive({version: 'v3', auth});
  var fileMetadata = {
		'name': folderName,
		'mimeType': 'application/vnd.google-apps.folder'
	};
	return await drive.files.create({
		resource: fileMetadata,
    fields: 'id'
	})
  .then((response) => response.data.id);
}

/**
 * Create new folder inside another and return his ID
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {string} folderName Folder Name
 * @param {string[]} locations Folders ID where the new folder will be created
 */
async function createFolderAt(auth, folderName, locations){
	const drive = google.drive({version: 'v3', auth});
	var fileMetadata = {
		'name': folderName,
    'parents': locations,
		'mimeType': 'application/vnd.google-apps.folder'
	};
	return await drive.files.create({
		resource: fileMetadata,
    fields: 'id'
	}).then((response) => response.data.id);
}

/**
 * Create new folder inside another and return his ID
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {string} fileId ID of the file that will be copied
 * @param {string} fileNewName Name of the new file copied
 */
async function copyFileAt(auth, fileId, fileNewName, locations){
    const drive = google.drive({version: 'v3', auth});
    let request = {
      name: fileNewName,
      parents: locations
    }
    drive.files.copy({
      fileId: fileId,
      resource: request,
    }).then((response) => response.data.id);
  }

module.exports = { createFolder, createFolderAt, copyFileAt }