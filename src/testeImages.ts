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
    convertImageToBase64('assestsTest/OIP (2).jpeg'),
    convertImageToBase64('assestsTest/OIP (3).jpeg'),
    convertImageToBase64('assestsTest/OIP (4).jpeg'),
    convertImageToBase64('assestsTest/OIP (5).jpeg'),
    convertImageToBase64('assestsTest/OIP.jpeg')
]

export default base64ImageExamples