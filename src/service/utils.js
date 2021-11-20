import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export async function findByKey(collection, key) {
    const docRef = doc(db, collection, key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        data.id = docSnap.id;
        return data;
    }
    return null;
}