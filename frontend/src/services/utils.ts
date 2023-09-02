import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FIREBASE_STORAGE } from "../../firebaseConfig";

export const saveMediaToStorage = async (media: string, path: string) => {
  const fileRef = ref(FIREBASE_STORAGE, path);

  const blob = await uriToBlob(media);
  await uploadBytesResumable(fileRef, blob);

  const downloadUrl = await getDownloadURL(fileRef);
  return downloadUrl;
};

export function uriToBlob(uri: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
}
