import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

function generateId() {
  return crypto.randomBytes(16).toString('hex').slice(0, 25)
}

function readJsonFile(filePath) {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(jsonData)
  } catch (error) {
    console.error(`Error reading the JSON file ${filePath}:`, error)
    process.exit(1)
  }
}

function writeJsonFileSync(filePath, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(filePath, jsonData)
  } catch (error) {
    console.error(`Error writing to the JSON file ${filePath}:`, error)
    process.exit(1)
  }
}

function processQuizzes(dirPath) {
  try {
    const files = fs.readdirSync(dirPath)

    files.forEach((file) => {
      const filePath = path.join(dirPath, file)

      if (path.extname(file) !== '.json') return

      let json = readJsonFile(filePath)
      json.id = generateId()
      writeJsonFileSync(filePath, json)
      console.log(`Processed ${filePath} and added IDs`)
    })
  } catch (error) {
    console.error('Error processing the directory:', error)
    process.exit(1)
  }
}

// Procesa los quizzes agregando un ID
const quizzesDir = './src/quizzes'
processQuizzes(quizzesDir)
