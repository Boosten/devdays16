http://ionicframework.com/getting-started/

This should do it:
```npm install -g cordova ionic```

```
   npm install
   bower install
   ionic platform add ios
   ionic build ios
   ionic emulate ios
```



When you're running in a browser via ```ionic serve```, requests will be proxied to the Dev Days API by the ionic.config.json proxy settings. 
In case you're running on a device, the $httpProvider requestinterceptor in the app.js should prepend the base url to the request to make the request url absolute. 
