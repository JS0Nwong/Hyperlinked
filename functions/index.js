const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { log } = require("firebase-functions/logger");
const {
  onDocumentCreate,
  onDocumentDelete,
  onDocumentUpdated,
} = require("firebase-functions/v2/firestore");
const { onRequest, onCall } = require("firebase-functions/v2/https");

const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { ServerValue } = require("firebase-admin/database");
const { onValueCreated } = require("firebase-functions/v2/database");
const cryto = require("crypto");

initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName } = user;
  const userRef = admin.firestore().collection("users").doc(uid);
  const folderRef = userRef.collection("folders").doc();

  try {
    await userRef.set({
      email,
      displayName,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    await folderRef.set({
      name: "Bookmarks",
      color: "White",
      bookmarks: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
});

exports.createLinkBookmark = onCall(
  {
    cors: {
      origin: true,
    },
  },
  async (request) => {
    const url = request.data.url;
    if (!url) {
      return new functions.https.HttpsError(
        "invalid-argument",
        "URL parameter is required"
      );
    }
    if (!request.data.folderName) {
      return new functions.https.HttpsError(
        "invalid-argument",
        "Folder name is required"
      );
    }
    try {
      const urlRes = await fetch(url);
      if(!urlRes.ok) { 
        return new functions.https.HttpsError(
          "invalid-argument",
          "URL is not valid"
        );
      }
      const html = await urlRes.text();
      const favIcon = await fetch(
        `http://www.google.com/s2/favicons?domain=${url}`, {
          cache: 'only-if-cached'
          
        }
      );
      if(!favIcon.ok) {
        return new functions.https.HttpsError(
          "invalid-argument",
          "FavIcon is not valid"
        );
      }
  
      // const favIconArrayBuffer = await favIcon.arrayBuffer();
      // const favIconBuffer = Buffer.from(favIconArrayBuffer);
      // const favIconName = `favicons/${cryto.randomUUID()}.png`;
  
      // const bucket = admin.storage().bucket();
      // const file = bucket.file(favIconName);
      // await file.save(favIconBuffer, {
      //   contentType: "image/x-icon",
      //   metadata: {
      //     contentType: "image/x-icon",
      //   },
      // });
  
      // const favIconUrl = `https://storage.googleapis.com/${bucket.name}/${favIconName}`;
  
      const metaData = {
        favIcon: favIcon.url,
        link: url,
        dateAdded: new Date().toDateString().slice(4, 10),
        isCode: false,
      };
  
      const metaTagRegex = /<meta[^>]+>/gi;
      const matches = html.match(metaTagRegex) || [];
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      metaData["title"] = titleMatch ? titleMatch[1] : "No title found";
  
      matches.forEach((tag) => {
        const nameMatch = tag.match(/name=["']([^"']+)["']/i);
        const contentMatch = tag.match(/content=["']([^"']+)["']/i);
  
        if (contentMatch && nameMatch) {
          const name = nameMatch[1];
          const content = contentMatch[1];
  
          if (name.toLowerCase() === "description") {
            metaData["description"] = content;
          }
        }
      });
  
      const userRef = admin.firestore().collection("user").doc(request.data.uid);
      const foldersSnapshot = await userRef
        .collection("folders")
        .where("name", "==", request.data.folderName)
        .get();
  
      foldersSnapshot.forEach((doc) => {
        const folderRef = doc.ref;
        folderRef.update({
          bookmarks: admin.firestore.FieldValue.arrayUnion(metaData),
        });
      });
      return metaData;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
);
