import fs from 'fs'
import path from "path"
import os from 'os'

export class CustomTempFile {
    private tempFilePath: string
    constructor(prefix: string, extension: string) {
        const tempDir = os.tmpdir()
        this.tempFilePath = path.join(tempDir, `${prefix}-${Date.now()}.${extension}`)
    }

    getFilePath(): string {
        return this.tempFilePath
    }
    uploadTempImage(imageBuffer: Buffer) {
        fs.writeFileSync(this.tempFilePath, imageBuffer)
    }

    uploadTempImageForBase64(base64Image: string) {
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        this.uploadTempImage(imageBuffer)
    }

    deleteTempFile(): void {
        fs.unlinkSync(this.tempFilePath)
    }
}
