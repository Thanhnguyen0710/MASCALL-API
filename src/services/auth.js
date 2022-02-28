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
const {sendPasswordResetEmail} = require('firebase/auth')
const serviceAccount = require('../config/mascall-8eba9-firebase-adminsdk-ptg3e-93fb7c61f3.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.getUser = () => {
//   admin.auth().getUserByEmail("thanhnguyen2031@gmail.com").then(function(user) {
//     return user.sendPasswordResetEmail();
//   }).then(function (emailSent) {
//     console.log('emailSent ', emailSent);

//  }).catch(function (error) {
//     console.log('emailSent error ', error);
//  });

  // admin.auth().verifyIdToken()

  // admin.auth().generateEmailVerificationLink("thanhnguyen2031@gmail.com").then(res => {
  //   console.log(res);
  // }).then(error => {
  //   console.log(error)
  // })
  admin.auth().verifyIdToken('eyJhbGciOiJSUzI1NiIsImtpZCI6ImNmNWQ4ZTc0ZjNjNDg2ZWU1MDNkNWVlYzkzYTEwMWM2NGJhY2Y3ZGEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVGhhYmhzIMSQZGhzaHMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWFzY2FsbC04ZWJhOSIsImF1ZCI6Im1hc2NhbGwtOGViYTkiLCJhdXRoX3RpbWUiOjE2NDU3NjIxMzcsInVzZXJfaWQiOiJJSE9ocVJYVkJUT0pMWGQwb2pqS2kyM05oSWwyIiwic3ViIjoiSUhPaHFSWFZCVE9KTFhkMG9qaktpMjNOaElsMiIsImlhdCI6MTY0NTc2MjEzNywiZXhwIjoxNjQ1NzY1NzM3LCJlbWFpbCI6InRoYW5obmd1eWVuMjAzMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0aGFuaG5ndXllbjIwMzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.MRACEODVE21duLQ3ytfTiT-Am5PgeYr7BzYuLDK2RbRLdWOj29gQK3xmzFqPYUycW1JUta4jKw35bHSUnrIa4FJmqqh_CQ7q2l3GZ3MaW_qvb2yLwURH-7-1kbFoRyiXlOa0gPQQjQrZpn_lCrWZgrogdM4ma6NXrs9-LkSfRqdxD7p78IWpzejd1HFQHDz8FxGZv40PggganD-xkjuXXq2CH4Jh6LH2u-kZoh1xB4Ww9_ScDxz3TtMM674U6ZAGqIb4n8uhTmyFD_BDHT3nQJyonl2GWJOOq2lsusFvjIdDBn2DxT-D0UNcL8li0vJFCrdkrcsmOfVzdudzvN8R5w', true).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
