const fs = require('node:fs/promises');
const path = require('path')

console.log(path.join(__dirname, 'file.txt'))

setTimeout(() => {
    console.log("5 sec")
}, 5000)


setTimeout(() => {
    console.log("3 sec")
}, 3000)

async function readFile() {
    try {
        const data = await fs.readFile('file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

readFile()


console.log("Next Line")

