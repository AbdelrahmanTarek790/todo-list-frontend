import pic1 from "../assets/avatars/1.png"
import pic2 from "../assets/avatars/2.png"
import pic3 from "../assets/avatars/3.png"
import pic4 from "../assets/avatars/4.png"

import pics1 from "../assets/project/1.png"
import pics2 from "../assets/project/2.png"
import pics3 from "../assets/project/3.png"
import pics4 from "../assets/project/4.png"

export const primary = "#f8f9fc"
export const secondry = "#f8f9fc"
export const fontColor = "#a69db7"

let apiUrl
const mode = "dev"
if (mode === "dev") {
    apiUrl = "http://127.0.0.1:8080/api/v2"
}

export default apiUrl

export const pics = [
    {
        1: pic1,
        2: pic2,
        3: pic3,
        4: pic4,
    },
    {
        1: pics1,
        2: pics2,
        3: pics3,
        4: pics4,
    },
]
