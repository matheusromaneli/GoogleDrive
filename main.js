const { createFolder } = require('./drive_methods/create.js');
const { authorize } = require('./auth/auth.js');
const { listFiles } = require('./drive_methods/show.js');

async function main(){
  try{
    const OAUTH2 = await authorize();
    if (OAUTH2 != null) {
      // console.log(await createFolder(OAUTH2, 'Essa é uma pasta'));
      listFiles(OAUTH2);
    }
    else{
      console.log("login falhou");
    }
  }
  catch(e){
    console.log(e);
  }
  return;
}

main();