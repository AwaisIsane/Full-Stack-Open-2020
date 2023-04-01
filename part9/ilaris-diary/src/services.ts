import axios from "axios"
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types"

const BACKEND_URL_DIARIES = 'http://localhost:3000/api/diaries'
export const getDiary = async () => {
        const response = await axios.get<NonSensitiveDiaryEntry []>(BACKEND_URL_DIARIES)
        return response.data
}

export const createDiaryEntry = async (entry:NewDiaryEntry) => {
                const response = await axios.post<DiaryEntry>(BACKEND_URL_DIARIES,entry)
                return response.data
}