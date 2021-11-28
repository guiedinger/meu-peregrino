import { db } from "./firebase";
import { doc, getDoc, collection, getDocs, addDoc, setDoc, deleteDoc, query, where } from "firebase/firestore";

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

export async function findAll(path) {
    const snapshot = await getDocs(collection(db, path));
    if (snapshot) {
        const list = [];
        snapshot.docs.forEach((data) => {
            const value = data.data();
            value.id = data.id;
            list.push(value);
        });
        return list;
    }
    return [];
}

export async function findLike(path, attribute, valueStr) {
    const snapshot = await getDocs(collection(db, path));
    if (snapshot) {
        const list = [];
        snapshot.docs.forEach((data) => {
            const value = data.data();
            if (value[attribute].includes(valueStr)) {
                value.id = data.id;
                list.push(value);
            }
        });
        return list;
    }
    return [];
}

export async function persist(path, item) {
    if (item.id != null) {
        const id = item.id;
        delete item.id;
        await setDoc(doc(db, path, id), item);
    } else {
        delete item.id;
        await addDoc(collection(db, path), item);
    }
}

export async function deleteByKey(path, key) {
    await deleteDoc(doc(db, path, key));
}

export async function findByAttribute(path, attribute, operation, value) {
    const ref = collection(db, path);
    const q = query(ref, where(attribute, operation, value));
    const snapshot = await getDocs(q);
    if (snapshot) {
        const list = [];
        snapshot.docs.forEach((data) => {
            const value = data.data();
            value.id = data.id;
            list.push(value);
        });
        return list;
    }
    return [];
}