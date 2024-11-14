const fs = require('fs')
const path = require('path')
const { numSort } = require('./numSort')

let totalChars = 0
let totalLetters = 0
let totalNonWhitespaceChars = 0
let totalCssChars = 0
let totalCssNonWhitespaceChars = 0
let totalCssLetters = 0

// Function to check if a character is a letter
function isLetter(char) {
    return char?.toLowerCase() !== char?.toUpperCase()
}

// Function to count characters in a file
function countInFile(filePath) {
    const data = fs?.readFileSync(filePath, 'utf8')

    // General character counts (excluding spaces)
    const nonWhitespaceData = data?.replace(/\s/g, '')
    totalChars += data?.length
    totalNonWhitespaceChars += nonWhitespaceData?.length
    totalLetters += Array.from(data)?.filter(isLetter)?.length

    // CSS-specific counting
    if (path?.extname(filePath) === '.css') {
        totalCssChars += data?.length
        totalCssNonWhitespaceChars += nonWhitespaceData?.length
        totalCssLetters += Array.from(data)?.filter(isLetter)?.length
    }

    // Log general counts
    console.log(filePath, ':')
    console.log(' - totalChars: ', numSort(data?.length || 0))
    console.log(' - totalLetters: ', numSort(Array.from(data)?.filter(isLetter)?.length || 0))
    console.log(' - totalNonWhitespaceChars: ', numSort(nonWhitespaceData?.length || 0), '\n')

    // Log CSS-specific counts if applicable
    if (path?.extname(filePath) === '.css') {
        console.log(filePath, ':')
        console.log(' - CSS totalChars: ', numSort(data?.length || 0))
        console.log(' - CSS totalLetters: ', numSort(Array.from(data)?.filter(isLetter)?.length || 0))
        console.log(' - CSS totalNonWhitespaceChars: ', numSort(nonWhitespaceData?.length || 0), '\n')
    }
}

// Function to recursively traverse directories and count in each file
function countInDirectory(dirPath) {
    console.log(`Counting in directory: ${dirPath}`)
    const items = fs?.readdirSync(dirPath)

    items.forEach((item) => {
        const itemPath = path?.join(dirPath, item)
        const stats = fs?.statSync(itemPath)

        // Skip specific directories and file types
        const excludedFiles = [
            'node_modules', 'assets', 'public', '.git',
            'yarn.lock', 'package.lock.json', 'package.json'
        ]
        const excludedExtensions = [
            '.mjs', '.md', '.json', '.bson', '.csj', '.img',
            '.webp', '.png', '.jpg', '.jpeg', '.svg', 'mp3', 'mp4',
            '.log'
        ]
        const excludedDoubleExtensions = [
            '.d.ts', '.config.ts', '.config.js'
        ]

        // Check if the item is a directory or excluded file
        if (excludedFiles.includes(item) ||
            (stats?.isFile() && excludedExtensions?.includes(path?.extname(item))) || excludedDoubleExtensions?.some((i) => item?.includes(i))) {
            return
        }

        if (stats?.isDirectory()) {
            countInDirectory(itemPath) // Recurse into subdirectory
        } else if (stats?.isFile()) {
            countInFile(itemPath) // Count in file
        }
    })
}

// Set the directory path you want to start counting from
const startingDirectory = path?.join(__dirname, './FILE PATH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

// Start counting from the specified directory
countInDirectory(startingDirectory)

// Print out the results
console.log(`Total Characters (including spaces): ${numSort(totalChars || 0)}`)
console.log(`Total Letters: ${numSort(totalLetters || 0)}`)
console.log(`Total Non-Whitespace Characters: ${numSort(totalNonWhitespaceChars || 0)}`)
console.log(`Total CSS Characters (including spaces): ${numSort(totalCssChars || 0)}`)
console.log(`Total CSS Letters: ${numSort(totalCssLetters || 0)}`)
console.log(`Total CSS Non-Whitespace Characters: ${numSort(totalCssNonWhitespaceChars || 0)}`)