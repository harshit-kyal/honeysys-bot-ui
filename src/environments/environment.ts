// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  token: "Bearer qP0qsYX9_Ho.I8jcNeh6zIUNDQWENCo5-aVddv0cWE_aOI0iep3Dm9Q",

  botType: "U2FsdGVkX18N0PyYXHvIp8GlINfAd89LfNzqpWTm4dg=",

  // directlineURL: "https://lenskits.polynomial.ai",
  // directlineURL: 'https://cca3-2405-201-200b-5087-9803-24e3-3b6b-274.ngrok-free.app',
  directlineURL: `${process.env.REACT_APP_DIRECTLINE_URL}`,
  // directlineURL: "http://localhost:8000",
  // directlineURL: "https://polynomial-directline.herokuapp.com",
  apiURLAzure:
    "https://colive-dev-colive-bot-management-apis.azurewebsites.net",
  // apiURLAzure_new: "https://polynomial-coco-solution.azurewebsites.net",
  apiURLAzure_new: "https://intelligence.polynomial.ai/interaction_studio",
  // apiURLAzure_new: "http://20.244.8.172:30042",
  AESSecret: "Interaction-Studio-By-Polynomial.AI",
  paymentSecretKey: "paymentkey",
  uploadToken: "Bearer qP0qsYX9_Ho.PGotiqdrD_L2wPddgXe7Ym1lgW6y0XZZTdMN7PGZwxM",
  avatarURL:
    "https://coliveshona.blob.core.windows.net/coliveshonabot/Shona.png",
};

// api: "https://colive-dev.azurewebsites.net/shonaIntelligenceServiceDev",
// directlineURL: "https://directline.botframework.com/v3/directline",

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
