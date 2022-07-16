import { ValidationErrors } from "@angular/forms"

export const validateImage = (image: File): ValidationErrors | null => {
    const allowedTypes: string[] = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
    const maxSize: number = 2 * 1000 * 1000 // bytes

    if (!allowedTypes.includes(image.type)) {
        return { imageType: true }
    } else if (image.size > maxSize) {
        return { imageSize: true }
    } else {
        return null // is valid
    }
}