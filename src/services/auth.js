// const {firebaseConfig} = require('../config/firebase-config');
// const { initializeApp } = require('firebase/app')
// const {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification} = require('firebase/auth');

// const app = initializeApp(firebaseConfig);

// const auth = getAuth();

// module.exports.login = async (email, password) => {
//   await signInWithEmailAndPassword(auth, email, password);
// }

// module.exports.signUp = async (email, password) => {
//   await createUserWithEmailAndPassword(auth, email, password)
// }

// module.exports.verifiEmail = (email) => {
//   var user = {
//     url: 'https://www.example.com/?email=' + email,
//     iOS: {
//       bundleId: 'com.example.ios'
//     },
//     android: {
//       packageName: 'com.example.android',
//       installApp: true,
//       minimumVersion: '12'
//     },
//     handleCodeInApp: true,
//     // When multiple custom dynamic link domains are defined, specify which
//     // one to use.
//     dynamicLinkDomain: "example.page.link"
//   };

//   sendEmailVerification()

//   // sendEmailVerification(user).then(res => {
//   //   console.log(res)
//   // }).catch(err => {
//   //   console.log(err)
//   // });
// }

const admin = require('firebase-admin')
const serviceAccount = require('../config/mascall-8eba9-firebase-adminsdk-ptg3e-93fb7c61f3.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.verifyToken = async (token) => {
  return await admin.auth().verifyIdToken(token, true);
}

module.exports.sendNoti = async (fcmToken, message, roomId) => {
  let contentImage = '';
  if (message.type !== "text") {
    const countImage = message.contents?.length > 0 ? message.contents.length : 1
    contentImage = message.name.split(" ")[0] +  " đã gửi " + countImage + " ảnh.";
  }

  var payload = {
    notification: {
      title: message.name,
      body: message.type !== "text" ? contentImage : message.content,
    },
    data: {
      roomId: roomId
    }
  };

  var options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
  };
  if (fcmToken.length > 0) {
    await admin.messaging().sendToDevice(fcmToken,payload, options);
  }
}
