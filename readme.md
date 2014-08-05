# Stoopid Social

#### Stoopid Social is a jQuery plugin that dynamically creates share buttons for various social networks.  

The current version supports Facebook, Twitter, LinkedIn, Pintrest, and Google+. Other social networks can be added manually by using the customNetwork function.

## Properties

### networks

An array of strings that signify which social networks to create share buttons for.  Supported networks are 'facebook', 'twitter', 'linkedIn', 'pintrest', and 'google'.  Any other string will create a blank share button that can be controlled with the customNetwork callback function.

Default Value: []

### shareData

An object containing the text, image, and URL to be shared.  This object is made up of the 'title', 'copy', 'image', and 'url' attributes.  These attributes will be applied to all networks specified in the networks property.  If you need different shareData to be applied to different networks you will simply have to initalize Stoopid Social again with the different networks and shareData.

Default Value: { title: '', copy: '', image: '', url: '' }

### facebookSDK

A boolean value indicating whether to inject the Facebook JavaScript SDK.  Use this if you don't already load the Facebook SDK on your page.  Having the Facebook JavaScript SDK on your page is required.

Default Value: false

### facebookAppID

The App ID to use with the Facebook SDK  This is required if you are injecting the Facebook SDK from this plugin.

Default Value: ''

### twitterSDK

A boolean value indicating whether to inject the Twitter JavaScript SDK.  Use this if you don't already load the Twitter SDK on your page, but it is not required.

Default Value: false

### injectStyles

A boolean value indicating whether to apply the pre-made styles to the share buttons.  There is a pre-made icon for networks 'facebook', 'twitter', 'linkedIn', 'pintrest', 'google', and 'email'.

Default Value: false

### customNetwork

A function that gets called when a share button created for a custom network is clicked.  This function gets passed two arguments – the first is the name of the custom network set in the networks property and the second is the shareData object.

Default Value: function (network, shareData) {}

## Working Example
```JS
$('.share-container').stoopidSocial({ 
    networks: ['facebook', 'twitter', 'linkedIn', 'pintrest', 'google', 'custom-network'], 
    shareData: { 
        title : 'This is the title',
        copy  : 'This is the share copy',
        image : 'https://www.google.com/images/srpr/logo11w.png',
        url   : 'http://www.google.com'
    },
    facebookSDK: true,
    facebookAppID: '1',
    twitterSDK: true,
    injectStyles: true,
    customNetwork: customShareHandle
});

// Your callback function for custom social networks
function customShareHandle(network, shareData) {
    console.log('You actived the share button for ' + network);
    console.log('This is the data to share: ');
    console.log(shareData);
}
```