/*
    Stoopid Social - v1.0
    ===========================
    Bob Scott
    http://robertscott.co
*/

(function ($, window, document, undefined) {

    // Defaults values
    var pluginName = 'stoopidSocial',
        defaults = {
            networks      : [],                                             // The social networks to create share buttons
            shareData     :  { title: '', copy: '', image: '', url: '' },   // The data to share
            facebookSDK   : false,                                          // Loads the Facebook JavaScript SDK
            facebookAppID : '',                                             // The Facebook App ID to use
            twitterSDK    : false                                           // Loads the Twitter SDK
        };

    // The plugin constructor
    function Plugin(element, options) {
        this.options = $.extend({}, defaults, options);     // Plugin options
        this.wrapper = element;                             // Reference to the root element
        this.init();                                        // Initialize stoopidSocial
    }

    // Plugin methods
    Plugin.prototype = {

        // Loads the Facebook JavaScript SDK with the given Facebook App ID.
        loadFacebookSDK: function() {
            var that = this;
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=" + that.options.facebookAppID;
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        },

        // Loads the Twitter JavaScript SDK
        loadTwitterSDK: function(){
            window.twttr = (function (d,s,id) {
                var t, js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
                js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
                return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
            }(document, "script", "twitter-wjs"));
        },

        /*
            Builds the Facebook share button and adds click 
            events for opening the FB dialog box. This method 
            requires the Facebook JavaScript SDK.
        */
        facebook: function(shareData){
            var $markup = $('<div class="stoopid-icon stoopid-facebook">&nbsp;</div>');
            $markup.bind('click touchend', 
                function(){
                    FB.ui({
                        method      : 'feed',
                        name        : shareData.title,
                        description : shareData.copy,
                        link        : shareData.url,
                        picture     : shareData.image
                    }, function(){});
                }
            );
            $(this.wrapper).append($markup);
        },

        // Builds the Twitter share button.
        twitter: function(shareData){
            var link = '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareData.copy) + ' ' + encodeURIComponent(shareData.url) + '" target="_blank">&nbsp;</a>',
                $markup = $('<div class="stoopid-icon stoopid-twitter">' + link + '</div>');
            $(this.wrapper).append($markup);
        },

        // Builds the Pintrest share button.
        pintrest: function(shareData) {
            var link = '<a href="http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareData.url) + '&media=' + encodeURIComponent(shareData.image) + '&description=' + encodeURIComponent(shareData.copy) + '" target="_blank">&nbsp;</a>',
                $markup = $('<div class="stoopid-icon stoopid-pintrest">' + link + '</div>');
            $(this.wrapper).append($markup);
        },

        // Builds the Google Plus share button.
        google: function(shareData) {
            var link = '<a href="https://plus.google.com/share?url=' + encodeURIComponent(shareData.url) + '" target="_blank">&nbsp;</a>',
                $markup = $('<div class="stoopid-icon stoopid-google">' + link + '</div>');
            $(this.wrapper).append($markup);
        },

        // Initialization function
        init: function() {
            var networks = this.options.networks,
                shareData = this.options.shareData,
                numNetworks = networks.length;

            // Create the share buttons
            for (var a = 0; a < numNetworks; a += 1) {
                switch (networks[a]) {
                    case 'facebook':
                        this.facebook(shareData);
                    break;
                    case 'twitter':
                        this.twitter(shareData);
                    break;
                    case 'pintrest':
                        this.pintrest(shareData);
                    break;
                    case 'google':
                        this.google(shareData);
                    break;
                }
            }

            // Load the Facebook JavaScript SDK
            if (this.options.facebookSDK) {
                this.loadFacebookSDK();
            }

            // Load the Twitter JavaScript SDK
            if (this.options.twitterSDK) {
                this.loadTwitterSDK();
            }
        }

    };

    // jQuery plugin setup
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );