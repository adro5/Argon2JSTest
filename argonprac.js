var argon2 = require('argon2');
var fs = require('fs');

/*READING FROM TEXT IS ONLY FOR TESTING PURPOSES*/
fs.writeFile('passwordTest.txt', 'password123',(err) => {
    if (err) throw err; console.log("saved");
});

async function hashPassword(pword) {
    let hash;
    let password;
        
    try {
        hash = await argon2.hash(pword);
        
    }catch (err) {
        console.log(err);
    }
    return hash;
}

async function verifyPassword(hashToVerify,pass) {
    try {
        if (await argon2.verify(hashToVerify,pass)) {
            console.log("Success verify");
        }
        else {
            console.log("failure");
        }
    }catch(err) {
        console.log(err);
    }
}

fs.readFile('./passwordTest.txt', async (err,data) => {
        if (err) throw err;
        const hash = await hashPassword(data);
        verifyPassword(hash, 'password123');
        console.log(hash);
        }); 



