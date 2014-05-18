# Stoopid Social

#### Stoopid Social is a jQuery plugin that dynamically creates share buttons for various social networks.  The current version only supports Facebook, Twitter, Pintrest, and Google+.

Actual documentation coming soon!

```JS
$('.share-container').stoopidSocial({ 
    networks: ['facebook', 'twitter', 'pintrest', 'google'], 
    shareData: { 
        title : 'This is the title',
        copy  : 'This is the share copy',
        image : 'https://www.google.com/images/srpr/logo11w.png',
        url   : 'http://www.google.com'
    },
    facebookSDK: true,
    facebookAppID: '1',
    twitterSDK: true
});
```