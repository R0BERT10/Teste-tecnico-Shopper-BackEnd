import * as fs from 'fs'

function convertImageToBase64(imagePath: string) {
    const imageBuffer = fs.readFileSync(imagePath)
    const base64Image = imageBuffer.toString('base64')
    return {
        base64Image,
        imagePath
    }
}

const base64ImageExamples = [
    convertImageToBase64('OIP.jpeg')
]

export default base64ImageExamples