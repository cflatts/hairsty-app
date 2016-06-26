//DON'T FORGET YOUR FUCKING COMMAS, THEY WILL MURDER YOUR PROGRAM!!!!!!!!!!!
//DONT FUCK UP THE SPELLING OF *INITIALIZE* IT WILL MURDER YOUR MIND (AND YOUR PROGRAM)!!!
// console.log('hi')
// console.log($)
// console.log(_)
// console.log(Backbone)

var rootUrl = 'https://openapi.etsy.com/v2/listings/active.js?api_key='
var token = 'ls49cw4bk576jhmk3kyeljdf'

//SHORTHAND QUERY SELECTOR FUNCTION

var query = function(elementInput) {
    return document.querySelector('elementInput')
}

//SNIPPIT COLLECTION

var SnippitCollection = Backbone.Collection.extend({
    url: 'https://openapi.etsy.com/v2/listings/active.js?api_key=',
    _token: 's49cw4bk576jhmk3kyeljdf',

    parse: function(apiResponse) {
        console.log(typeof apiResponse)
        console.log('this is the data >>>',apiResponse)
    }


})

//SNIPPIT VIEW

var SnippitView = Backbone.View.extend ({
    el: query('#container'),

})

//ROUTER

var AppRouter = Backbone.Router.extend({
    routes: {

        '*default': 'showSnippitView'
    },


    showSnippitView: function() {
        var snippitColl = new SnippitCollection()
        // console.log(snippitColl)
        snippitColl.fetch({
            dataType: 'jsonp',
            data: {
                includes: 'Images,Shop',
                api_key: 'ls49cw4bk576jhmk3kyeljdf'
            }
        })
    },
    initialize: function () {
        Backbone.history.start()
    }
})

var myApp = new AppRouter

//WORKFLOW
//
//prework: double check your scripts
//
//1. create the HTML skeleton with focus on your container
//
//2. JS
//      define key elements
//      test our your control (innerHTML)
//      create BB router
//      create new instance of router (so it can work)
//      create model and collection
//
//3. [multiview] control your model and data
//      represent small data (title, description)
//
//4. create a link between views
//      hash change, event