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

var MultiCollection = Backbone.Collection.extend({
    url: 'https://openapi.etsy.com/v2/listings/active.js?api_key=',
    _token: 's49cw4bk576jhmk3kyeljdf',

    parse: function(apiResponse) {
        return apiResponse.results //returns an object that has an array of objects on the results key
    }


})

//SNIPPIT VIEW

var MultiView = Backbone.View.extend ({
    el:'#container',


    initialize: function(multiColl) { //the input is the same as when we created a new instance in the router
        this.coll = multiColl //sets multiColl as property of the view
        var thisView = this
        var boundRender = this._render.bind(thisView) //
        this.coll.on('sync',boundRender) //says that when the collection is synced to run the boundRender function
    },

    _render: function(){
    var itemsArray = this.coll.models
    // console.log(itemsArray)
    var htmlString =''
    for(var i = 0; i < itemsArray.length; i++) {
        var array = itemsArray[i]
        // console.log(array.get('category_id'))
        htmlString += '<div class = "itemContainer">'
        htmlString +=       '<div class = "title" data-id = "' + array.get('category_id') + '">' + array.get('title') + '</div>'
        htmlString += '</div>'
    }
        this.el.innerHTML = htmlString
    }

})

//ROUTER

var AppRouter = Backbone.Router.extend({
    routes: {
        'home': 'showMultiView',
        'search/:query': 'doSearch',
        'details/:id': 'showSingleView',
        '*default': 'showMultiView'
    },

    showSingleView: function(id) {

    },

    doSearch: function(query) {

    },

    showMultiView: function() {
        var multiColl = new MultiCollection() //creates new instance of MultiCollection and models key filled with an array of modelsd
        multiColl.fetch({
            dataType: 'jsonp',
            data: {
                includes: 'Images,Shop', //parameters set on data
                api_key: 'ls49cw4bk576jhmk3kyeljdf'
            }
        })
        var multiView = new MultiView(multiColl) //creates new instance of the view we want, taking the collection we want to render as input

    },

    initialize: function () {
        Backbone.history.start() //starts keeping track of hash changes so that rendering new views is easier
    }
})

var myApp = new AppRouter //creates new instance of the router

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