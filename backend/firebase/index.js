import { initializeApp, cert }  from "firebase-admin/app";
import { getStorage } from 'firebase-admin/storage';
import { readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const serviceAccount = JSON.parse(
    await readFile(
        new URL('./firebaseServiceAccountKey.json', import.meta.url)
    )
);

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'gs://pharmacy-248f0.appspot.com'
});

const bucket = getStorage().bucket();

export const uploadFile=async(filepath, destFileName)=>{
    await bucket.upload(filepath, {
        destination:destFileName,
        gzip:true,
        metadata: {
            metadata :{
              cacheControl: "public, max-age=315360000",
              firebaseStorageDownloadTokens: uuidv4(),
           }
        },
    })
}