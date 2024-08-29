import * as fs from 'fs';

function convertImageToBase64(imagePath: string): string {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    return base64Image;
}

// Uso:
const imagePath = 'testeImage.jfif'; // Substitua pelo caminho da sua imagem
const base64Image = convertImageToBase64(imagePath);
//console.log(base64Image)
export default base64Image