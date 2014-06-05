# Stoopid Social

#### Stoopid Social is a jQuery plugin that dynamically creates share buttons for various social networks.  

The current version supports Facebook, Twitter, Pintrest, and Google+. Other networks can be added by using the custom callback function.

```JS
$('.share-container').stoopidSocial({ 
    networks: ['facebook', 'twitter', 'pintrest', 'google', 'custom-network'], 
    shareData: { 
        title : 'This is the title',
        copy  : 'This is the share copy',
        image : 'https://www.google.com/images/srpr/logo11w.png',
        url   : 'http://www.google.com'
    },
    facebookSDK: true,
    facebookAppID: '1',
    twitterSDK: true,
    customCallback: customShareHandle
});

// Your callback function for custom share networks
function customShareHandle(network, shareData) {
    console.log('You actived the share button for ' + network);
    console.log('This is the data to share: ');
    console.log(shareData);
}
```