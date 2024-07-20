const fs = require('fs');
const path = require('path');


const dbDir = path.join(__dirname, 'db');


const readJSONFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const votes = readJSONFile(path.join(dbDir, 'vote.json'));



const db = {
  votes
};


fs.writeFileSync(path.join(dbDir, 'db.json'), JSON.stringify(db, null, 2), 'utf8');

console.log('db.json foi criado com sucesso!');
