import React, { useState, useEffect } from "react";
import { db } from "../Firebase/config";

export default function useFirestore(collection, condition) {
  const [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribed = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });

    return unsubscribed;
  }, [collection, condition]);

  return documents;
}

export function useFirestoreCollection(collectionName) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = db.collection(collectionName).orderBy("createdAt");

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });

    return unsubscribe;
  }, [collectionName]);

  const documentsRef = React.useRef(documents);
  useEffect(() => {
    if (documentsRef.current !== documents) {
      documentsRef.current = documents;
    }
  }, [documents, collectionName]);

  return documents;
}
