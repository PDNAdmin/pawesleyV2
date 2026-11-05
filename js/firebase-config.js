/*
  Online tributes and candles.

  Until FIREBASE_CONFIG is filled in, the site runs in DEMO MODE: a tribute or
  candle is kept only on the phone or computer that wrote it.

  To go live (free):
   1. Go to https://console.firebase.google.com and create a project
      (or reuse the one made for curo.events: both sites share the same data).
   2. Build > Firestore Database > Create database (production mode).
   3. Project settings > General > Your apps > Web app (</>) > copy the
      firebaseConfig object and paste it below in place of null.
   4. Firestore > Rules: paste in the contents of firestore.rules.
   To remove an unsuitable tribute: Firestore > Data > memorials >
   wesley-olajide-ojo-aiyegboka > tributes > pick the message > Delete.
*/
window.FIREBASE_CONFIG = null;

window.MEMORIAL_ID = "wesley-olajide-ojo-aiyegboka";
