/*
    Stoopid Social - v1.1
    ===========================
    Bob Scott
    http://robertscott.co
*/

(function ($, window, document, undefined) {

    // Defaults values
    var pluginName = 'stoopidSocial',
        defaults = {
            networks       : [],                                             // The social networks to create share buttons
            shareData      : { title: '', copy: '', image: '', url: '' },    // The data to share
            facebookSDK    : false,                                          // Loads the Facebook JavaScript SDK
            facebookAppID  : '',                                             // The Facebook App ID to use for the JavaScript SDK
            twitterSDK     : false,                                          // Loads the Twitter SDK
            injectStyles   : false,                                          // Inject styles for the share buttons
            customNetwork  : function (network, shareData) {}                // Callback function for custom share buttons
        };

    // The plugin constructor
    function Plugin (element, options) {
        this.options = $.extend({}, defaults, options);     // Plugin options
        this.wrapper = element;                             // Reference to the root element
        this.dataURIs = {
            facebook : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMzMxQUJGNEUwMjcxMUUzQkZGRkQ2Q0JBRTVBREM0NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMzMxQUJGNUUwMjcxMUUzQkZGRkQ2Q0JBRTVBREM0NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQzMzFBQkYyRTAyNzExRTNCRkZGRDZDQkFFNUFEQzQ0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQzMzFBQkYzRTAyNzExRTNCRkZGRDZDQkFFNUFEQzQ0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WTpDpAAAAp1JREFUeNrEWG9EXWEYP+d0jYhLRIxm9GFiNF3RxLLtUjbGxNi+7MOMUouxSLNP9SlNKctGn/rSrG2KGbtfYrMpTSmuIourGJEiUnacfk+ew9vbOfc8713uefh5T53zPs/v+fO+7/Ne2xKK53klGNJAM9AIlAI1/HoD2AGywGcgY9v2vkTvrWdTIuPlwAiw68nlEJgEqiUknHyeA714/AN0AElLLheAB8AqdLwhR/J97IR5j+Eb0GdoXBdKYRswly8qTgCByzQJuGmdnxCBBehOB71MaAQuYpgFqgwM/Nb+ruGi1YUiOg0bTSja+UASXP2TQgJU+e3Aeyg80hxZxnA1ZB6R+4RvrmHedlA6XvDSk8gTKJnQCQiFoj10pibArAJDr1AJeTD1nzXyEDYb9HQ8B8qECjYQAVdLQT0G+h85Uy7U8wpoOYkE18JjAy+CUkCraQH4yuGWSBq2q/x0UFgqreILOd/qp6NZMIFCvcTPaxHLVD1TouQG8DqRZzmdWpKog1TYS/UdQkzefRCSqPMnLQoOpE2D03bQM5MSR1jNJvtBg2FtJBPCD10wrlNSsxYSBTo9aw1JuNJ0qPJdM5z0Cpd/fjpyVnySu9310XWUpReHrPibVSZGEhmfxC9gKwYCLjfFlsOH0VgMJGZge0vtJ4aLHA1yvOdUP8F3hP4iknin7jWOsv9TSmaKQCCrRuFMowt5BPyMONSqscG81e4YUqGu7B4c3gslQWmBgRZuTsKIUO/xtIAIEIH7sLEeee/gir0OfDnnTSkF3T/ENzCKCHAXj5180S1UDoABcgr6ckbXQIXMKIZLvHL+Ghin1TYOXIGO7qgbeuRRzgpeErhNv8MdUQVflEq55dvnNi/DPw24UsY2FFtxy7EAAwBf8cgDLyR0rgAAAABJRU5ErkJggg==',
            twitter  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MTlDQzg3MUUwMjYxMUUzQkZGRkQ2Q0JBRTVBREM0NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MTlDQzg3MkUwMjYxMUUzQkZGRkQ2Q0JBRTVBREM0NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk4NzE5NzkyREZGMjExRTNCRkZGRDZDQkFFNUFEQzQ0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYxOUNDODcwRTAyNjExRTNCRkZGRDZDQkFFNUFEQzQ0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+xwzRTAAAAuVJREFUeNq0mHFkVVEcx+97r8YjRoz99RiPsVzGIx7LiFLGMh4Rsbz+WUos/RsRo5RR1D/pj4yX/phSYo9IaZbNxjSjpylFmk2Rpae5fX/zO8/Z6Zxzz7333R8f5777fvd3fvd3z+/3O/dmvJgSBEE/hhzoAE2wnMlkmlHt7L035+2JMOkRDMdABRQMOusYnoNpUIdTv712CAyPgPdBdPkOxkBHWCRskxfB6yC5fACHbU5kDQ5Q2BfBQBuCWQQzsDluUshqHBjG8Azs89ontIBvwvbVUCeg5GOo8UVpyBXMcdLoBP7czxHIe+nKA8xVkk/IKXrblHqO8gvcB0v8KEdBSaNHNzkJDqnrwE+YAX+4eJGtbjDpcM3IrhTFiSmN0iIog5qDwYuaBd4DXliuWW05gR+dYMugKO6uwHf3Q6NDhSxnqTePLY4cFE5ULEpfQK9kkBweB58knVMhFTev6MsyIYrVoMXGO9AtfqAX/AS3cHgAPAXfwCObE9w/7hj+Lovs8C02etkR1TBlwgkKJ463HTLnIRgCXwE5VeXzvgjXasiie8sdNGkjpKyp8iOWJZ91KE5d7H1SIRsr4JVaN+hxhIWzkLSM091imAD9Yh1Isk0K844F6SP3ljhOnDYVOZEdDUdbm1iEyzGDMWY43xAN7E0rLHYpwXNqPsWIURjVPAK5BOw48VLq+XWwZllYa4hGI4IDPjcrk9R36gSMrkB5gTsepeIl8JkXUYEL0hJvXNcjOjADOi1dd3pXyNRyyis6bjZULf2oNYfaRXO8IVU3qEMRJx8Ecw6ZtkF96L/dNk4OgL+GJnaddsxyM+NrushRcM3SpHRy3rjlx5+Xg/SlZt3yY+Hd4GaTllBKngnd8kPOgrspOEA947ju1TCradNNcA6HFxwKmKvQfuIo7G7GSbU+8CTB85+3vQKGvosqzpS5ZG84TLzFjlfa+mkAYZzFMCt9IugBfcpeZIGra+RPAv8EGABJ3gZJQDCbwgAAAABJRU5ErkJggg==',
            pintrest : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MTlDQzg3NUUwMjYxMUUzQkZGRkQ2Q0JBRTVBREM0NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MTlDQzg3NkUwMjYxMUUzQkZGRkQ2Q0JBRTVBREM0NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYxOUNDODczRTAyNjExRTNCRkZGRDZDQkFFNUFEQzQ0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYxOUNDODc0RTAyNjExRTNCRkZGRDZDQkFFNUFEQzQ0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Hx/kigAAAwpJREFUeNq0WFFkXFEQzdslhLDkKyxLWMJSUqmSWlKhlP0q+cpX2I8qoZR+9KeUJf1sLSWkUiX0o0opDVFSomsrZTWUSjQajVSqlUhlNazXMzU3vaYz773dbIfjvrsz795z75s7M3eDnoQShmEazSVGEaD+CKsbQAtYBZYJQRC0Eo6byGgQmAP2w+Syz+8MnooElH1ABTgMO5dDHqOvbRK8+nrYPalbu6KSwI8jwOew+/KFxtZIBHIH0KwB2YjP2GQH3AI2gQPPSQvstJbsAOfgtF/VnUCnN+YT0O5MA/0xjjYQ40s0R69FohJB4Lb/YsKjl4tYVOUfEnjIGsx/AZPKSmeAl8AaY5GJ5oUt7e4r49RkJYmqwbgsBr0Rc2SJ9B2x3Rngk2JbPSFB3xg4UowWBYEHbZyEx+LdScXmiOf+YzBlrCjvDVIW+g1gIeYoFwWRDcVmypGYU5QvROTc9XQLnEec7o1BYl6QmFVsaO6eFPRnFOde8p4nABfttoGrLjmhpZjx0DggctyGZUMk8oryoyDh5CkmPha2aYOEzBffFJu8I5FRlD+855z3vJVgxU5+ir42T8aRaFlKZTAtWo4bJLZFf8AKbCmxam11NWvVFBUjduJdgh07cCR2FKUfJR9xotIGKkVE7iXRH1NsNh2Jt4qyiFVO8AkgR7zPv0vbywaBGt5b93ZsCM2oYrfuSKwaA1E+GObnArfSVkv55GO3xG9l4xS9diz7I/IBhdZ7wHfuywR1U3nnurAZMsb/G7bZcD5BPtg1UvY1irAcSceULLpijFeVWTTP+SJKnignI65Qfh5RAGe1omY2hsSMqCkoeY0bBK4Y6VstagJ/69DUvQuNlLPw+IabBM0zLx4QjjlUl7xco8kHrjObarXNTrRnXGbSHdYWvuwpzq1uZUGkbpIVYfO+w5J/tJ3LT55rx5MawtMNd/vyk9IU+F4UTi8Ad/lbN0XgSSpNHuOif9doW7h0L8VU5ae6EAdtEqKTMw2c55CdE38N1DhxLSvFj00i0f8D/1l+CzAAbGTdl3UwmBcAAAAASUVORK5CYII=',
            google   : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MTlDQzg3OUUwMjYxMUUzQkZGRkQ2Q0JBRTVBREM0NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MTlDQzg3QUUwMjYxMUUzQkZGRkQ2Q0JBRTVBREM0NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYxOUNDODc3RTAyNjExRTNCRkZGRDZDQkFFNUFEQzQ0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYxOUNDODc4RTAyNjExRTNCRkZGRDZDQkFFNUFEQzQ0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+UbMGkgAAAxxJREFUeNq0WN9LVEEU9u6GIAQL20shLAQLgiAY7BqGsCFsCIXRf+BDLNRLUBSE4IMvQtFDLwW+KEFQ9BCGoiRFQRRGUhQuib60FMVGkRSJ0XL7jn1XxvHOzty764GPGXbmzj33/PjOmfVaIojv+wUMA0Af0AZ0clzklhfAPDDned4flzNzuZzTi1PAGFD13eUnMAFkGlICBySBc8A3P75sANeAvZGVkIeAWb958hY4aFIiEaKAmHCBvm+WdAGvcHZf2GJCtwCGaQZcsyUNTOEdWaMSEgMYblPr3ZJAkZT64x5lXgIGLYf8AmaAT8ByyHo3z0nWOUOsPAac3WYJumHYosB14DDwnV9UBheMCzCX54vAGVUBrHmGs0p4Z4cejCOW6B4GWoEPWvr18/n2MB7hmkmmtlKUfPDRkl6ypxCytqR8yEX15SFZp8tfUT5I0V6gvY4b7sKqNdLzDv/ioB7OX+ov1OeaiNtOBTFh44OvHMt1OECkFiNbioEStpTMMsgq6tcqElhoMMwFDiS2ufG1JSh/iO+4t5++VIMzy99/x6T0ZIsW8SZ5HnA/xgHgETDN+fEGFBBJe6IEzs44+C8gqnfsFxbxrLiiSp6IK/tc3BEmQ0q1rTZYYZMSmJUY2vcyWMU6R2idOFLJ5/O1RIQDpF27D4xKOycMSkVWMRxVWrwo8iZI0TnLxi/AaeAA93aySG2w7UtCEaknx1jYoshTtY37bPCXZM5+9plLhj2zQfvGGuMqkuqZTdomJY8bNL2AdbHE+TqNjjDuDc5XI1hhhgS41dRcpdnDzfW/dFvp1zHVA4q/vK2fYJSPGjohkQeWQ5fJGUOOSkzinWVTi/9E89sdZb1k4IT3QBdwzzEWJM7SxpafQbiiPTSh1I42oEiFSpxL3ViIcCnq0Vt+L8QiUiMeBtVT4YjHJDYxYyvX5VrY4egCSeOTcMMz18tPqsmXn5WwVt94+WGgrmE4AVwC1hooTmLBm8AhMms8oVWuRLyTSmm/Zfp6a0xYFCqSEwrsEbs5Spyss35IuZ/Hl6+7/jXg2Tuw3Zd/AgwAwNeUAzhHWbcAAAAASUVORK5CYII=',
            linkedin : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMzMxQUJGMEUwMjcxMUUzQkZGRkQ2Q0JBRTVBREM0NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMzMxQUJGMUUwMjcxMUUzQkZGRkQ2Q0JBRTVBREM0NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQzMzFBQkVFRTAyNzExRTNCRkZGRDZDQkFFNUFEQzQ0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQzMzFBQkVGRTAyNzExRTNCRkZGRDZDQkFFNUFEQzQ0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+J6ptEAAAAjVJREFUeNrEl0EoBFEYx3ftpkgppbbUKLkqWm2ty7ooRaTUnshJOchBzlKutCKlXB3EhZTDlmi1IspJidKKbIlMicg2/k/v6RkzO+/tm8e/fs3O7JuZ/3zvve99L2hZVqAEVYNGUAMqwC3I06O0woLtQqADdIF+EHFpZ4I0WKVHU+jpJBIeJMGFJa8HMAbKvd5R7M9GkLXUlQOJUkwk6Jf4pTcwImOChP/D0qNpERMx8GLp1YDdRJCbomTEH4O6gF69gzZwwi6UcX/OOBjYBONgx0cT5WDRaYpGHcKWsoVty+duSbJns0hMODg+tZ0f+dwtU3wkalwG4zEwuAGb0zBI4ywSnTT/2xUFOXADDoEh8HXXktHoYQMz7tKAdEcr6KXHPL3eTc8J62APtIMgqAeVYJBrX0wJ1h27LqHK2AYm6w6Du2YUSce1AmvOA+uOiMLguqZTLgmG6fLOdA9mPe7/KgXCLuNBZs5nQIxLRC3gTGJGVZBIFBRM9HEGmKkeW3b0UoGYeFQw0eRSdcmkcJOYOFfsjl/hlbj/kk3RfQUTVYLG3HTATOwE/k9pZuJcw7ogIpOu0t8L2Nw/mFgAr+QHK2pCtKBp/iMDJJE1gGc+EiRXjCrmDBlNMgNO+44xS782RKrtZY0GDkGViIkQmNdgYBtUy+7AhuimxQ+l6MdJbwPZVnBF4eVZWhqWvBflIdX4ErgTePETWAOdgs/+sfkRVZyunhFun0JW4ita5KRlp/qnAAMAah/Ocz8LOvwAAAAASUVORK5CYII=',
            email    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODA4Mzk2N0REOEU3NjU2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBOTg3QjhDOEUwMkQxMUUzQkZGRkQ2Q0JBRTVBREM0NCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMzMxQUJGOEUwMjcxMUUzQkZGRkQ2Q0JBRTVBREM0NCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyODAxMTc0MDcyMDY4MTE4MDgzOTY3REQ4RTc2NTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE4MDgzOTY3REQ4RTc2NTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+JG0VaAAAAj9JREFUeNq8mDFPwkAUxw8TEk0kdXEmxrKKcdOFuJlo4sDA2I/g6oajuLAjCV9Ao4PO3Qwb4kzSuEEY0AQwsJzvknfmclyv74D6kl8o1+t7f3rvPa7NcM4Z0baBc+AUOAT2AA/PfQMR8A6EwCswpjpmQkQCPnAPjDndxniNT/BvFbEJ3AIzvryJa2voy1nEPtDh67OO7a6YBo+APl+/9dH3QsyMlpg+8AbssnRsCJwAPXVwQzneAh5SFMDQ9yPGMoq4AYosfTvAWAslKhJxHpNQeUqZxZCPSfC5mqjyTlwDWYNq0Xw+V/jV4tpnw3gWY/7diVxCI2qtcCdaCQ0tJ0u0YpkY4GcIeA7BPUVAYPFfkSIalkkMnYxwbT2igI4igFn8N6SIdoIIQRGFRHiclIgjbV6ctaWIIUGEFBIZAuhCTefjbChFzIgi5C/lGChQxks4xvGYEUXMlhHxhMFCZc0DpafIc84iqMtxiWNVQ/nJMr7SEpK8HJTE9JQKUZ1XFVGSEOd6LonZIIio4/cisVVzXDpGLdFKgoiStgwUqlqSJjYrW9v2sCwjx47JcOnkdSabqG1b0IyZWLeUXRIlJWlN1tS3d37MX3laf2AiVsG0x6zx/7O7uD2m2HK1ceeTpn0Ax8DUtL37Acq4GWUpbnTLqgBdBMNd8BkwSEHAAH33qI+BIlG7a8yBruvDj/oYWLNUDcXmqzwGqhTw4XbiEHyKfaBAKeWM46uBC+3VwA6e+9JeDby4vBpwEZGa/QowAKSJoBzzY/YQAAAAAElFTkSuQmCC'
        }
        this.styles = '<style>.stoopid-icon{width:33px;height:33px;display:inline-block;vertical-align:top;cursor:pointer;margin:0 1px;}.stoopid-icon a{display:block;width:100%;height:100%;text-decoration:none;}</style>';
        this.init();                                        // Initialize stoopidSocial
    }

    // Plugin methods
    Plugin.prototype = {

        // Loads the Facebook JavaScript SDK with the given Facebook App ID
        loadFacebookSDK: function () {
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
        loadTwitterSDK: function () {
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
        facebook: function (shareData) {
            var $markup = $('<div class="stoopid-icon stoopid-facebook" data-network="facebook">&nbsp;</div>');
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

            if (this.options.injectStyles) {
                $markup.css('background-image', 'url(' + this.dataURIs.facebook + ')');
            }
            $(this.wrapper).append($markup);
        },

        // Builds the Twitter share button
        twitter: function (shareData) {
            var link = '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareData.copy) + ' ' + encodeURIComponent(shareData.url) + '" target="_blank">&nbsp;</a>',
                $markup = $('<div class="stoopid-icon stoopid-twitter" data-network="twitter">' + link + '</div>');
            $(this.wrapper).append($markup);
        },

        // Builds the LinkedIn share button
        linkedIn: function (shareData) {
            var link = '<a href="http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareData.url) + '&title=' + encodeURIComponent(shareData.title) + '&summary=' + encodeURIComponent(shareData.copy) + '&source=' + encodeURIComponent(shareData.url) + '" target="_blank">&nbsp;</a>',
                $markup = $('<div class="stoopid-icon stoopid-linkedIn" data-network="linkedin">' + link + '</div>');
            $(this.wrapper).append($markup);
        },

        // Builds the Pintrest share button
        pintrest: function (shareData) {
            var link = '<a href="http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareData.url) + '&media=' + encodeURIComponent(shareData.image) + '&description=' + encodeURIComponent(shareData.copy) + '" target="_blank">&nbsp;</a>',
                $markup = $('<div class="stoopid-icon stoopid-pintrest" data-network="pintrest">' + link + '</div>');
            $(this.wrapper).append($markup);
        },

        // Builds the Google Plus share button
        google: function (shareData) {
            var link = '<a href="https://plus.google.com/share?url=' + encodeURIComponent(shareData.url) + '" target="_blank">&nbsp;</a>',
                $markup = $('<div class="stoopid-icon stoopid-google" data-network="google">' + link + '</div>');
            $(this.wrapper).append($markup);
        },

        // Creates a custom share button.
        customShare: function (network) {
            var that = this,
                $markup = $('<div class="stoopid-icon stoopid-' + network + '" data-network="' + network + '"></div>');
            $markup.bind('click touchend', function(){
                that.options.customNetwork(network, that.options.shareData);
            });
            $(this.wrapper).append($markup);
        },

        // Initialization function
        init: function () {
            var networks = this.options.networks,
                shareData = this.options.shareData,
                numNetworks = networks.length,
                that = this;

            // Create the share buttons
            for (var a = 0; a < numNetworks; a += 1) {
                switch (networks[a].toLowerCase()) {
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
                    case 'linkedin':
                        this.linkedIn(shareData);
                    break;
                    default:
                        this.customShare(networks[a]);
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

            // Inject styles
            if (this.options.injectStyles) {
                $(this.wrapper).append(this.styles);
                $('.stoopid-icon', $(this.wrapper)).each(function(){
                    var network = $(this).attr('data-network');
                    if (that.dataURIs[network] !== undefined) {
                        $(this).css('background-image', 'url(' + that.dataURIs[network] + ')');
                    }
                });
            }
        }
    };

    // jQuery plugin setup
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
        });
    };

})(jQuery, window, document);