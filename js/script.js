//DON'T FORGET YOUR FUCKING COMMAS, THEY WILL MURDER YOUR PROGRAM!!!!!!!!!!!
//DONT FUCK UP THE SPELLING OF *INITIALIZE* IT WILL MURDER YOUR MIND (AND YOUR PROGRAM)!!!

var rootUrl = 'https://openapi.etsy.com/v2/listings/active.js?api_key='
var token = 'ls49cw4bk576jhmk3kyeljdf'

//SHORTHAND QUERY SELECTOR FUNCTION

var query = function(elementInput) {
    return document.querySelector('elementInput')
}

//COLLECTION/MODEL

var MultiCollection = Backbone.Collection.extend({
    url: 'https://openapi.etsy.com/v2/listings/active.js',
    _token: 'ls49cw4bk576jhmk3kyeljdf',

    parse: function(apiResponse) {
        return apiResponse.results //returns an object that has an array of objects on the results key
    }

})

var SingleModel = Backbone.Model.extend({
    url: function () {
        return 'https://openapi.etsy.com/v2/listings/' + this.id + '.js'
    },
    _token: 'ls49cw4bk576jhmk3kyeljdf',

    parse: function(apiResponse) {
        return apiResponse
    },

    initialize: function(id) {
        this.id = id
    }
})


//VIEWS

var MultiView = Backbone.View.extend ({
    el:'#container',


    initialize: function(multiColl) { //the input is the same as when we created a new instance in the router
        this.coll = multiColl //sets multiColl as property of the view
        console.log(this.coll)
        var thisView = this
        var boundRender = this._render.bind(thisView) //
        this.coll.on('sync',boundRender) //says that when the collection is synced to run the boundRender function
    },

    events: {
        'click .itemContainer': '_goToSingle'
    },

    _goToSingle: function(evt) {
    var itemId = evt.currentTarget.getAttribute('data-id')
    window.location.hash = 'details/' + itemId
    },

    _render: function(){
    var itemsArray = this.coll.models
    var htmlString =''
    for(var i = 0; i < itemsArray.length; i++) {
        var array = itemsArray[i]
        htmlString += '<div class = "itemContainer" data-id = "' + array.get('listing_id') + '">'
        htmlString +=       '<div class = "title">' + array.get('title') + '</div>'
        htmlString +=       '<img src = "' + array.get('Images')['0'].url_170x135 + '">'
        htmlString +=       '<div class = "price">' + array.get('price') + '</div>'
        htmlString += '</div>'
        console.log(array.get('Images')['0'].url_170x135)
    }
        this.el.innerHTML = htmlString
    }

})

var SingleView = Backbone.View.extend ({
    el: '#container',

    initialize: function(model){
        this.model = model
        var thisView = this
        var boundRender = this._render.bind(thisView)
        this.model.on('sync', boundRender)
    },

    _render: function() {
        var item = this.model
        var resultsObj = item.get('results')
        var listObj = resultsObj[0]
        var htmlString = ''
        htmlString += '<div class = "singleItemContainer">'
        htmlString += '<div class = "singleTitle">' + listObj.title + '</div>'
        htmlString +=       '<img src = "' + listObj.Images[0].url_570xN + '">'
        htmlString +=       '<div class = "singleDescription">' + listObj.description + '</div>'
        htmlString +=       '<div class = "singlePrice">' + listObj.price + '</div>'
        htmlString += '</div>'
        this.el.innerHTML = htmlString
    },

})

//ROUTER

var AppRouter = Backbone.Router.extend({
    routes: {
        'home': 'showMultiView',
        'search/:query': 'doSearch',
        'details/:id': 'showSingleView',
        '*default': 'backToHome'
    },

    doSearch: function(keywords) {
        var searchCollection = new MultiCollection()
        console.log(searchCollection)
        searchCollection.fetch({
            dataType: 'jsonp',
            data: {
                keywords: keywords,
                inludes: 'Images, Shops',
                api_key: searchCollection._token
            }
        })
        var searchView = new MultiView(searchCollection)
    },

    showSingleView: function(id) {
        var singleModel = new SingleModel(id)

        singleModel.fetch({
            dataType: 'jsonp',
            data: {
                includes: 'Images, Shops',
                api_key: 'ls49cw4bk576jhmk3kyeljdf'
            }
        })
        var singleView = new SingleView(singleModel)
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

    backToHome: function() {
        location.hash = 'home'
    },

    initialize: function () {
        Backbone.history.start() //starts keeping track of hash changes so that rendering new views is easier
    }
})

var myApp = new AppRouter //creates new instance of the router

document.querySelector('input').addEventListener('keydown',function(evt) {
    console.log(evt.target)
    var searchTerm = evt.target.value
    if (evt.keyCode === 13) {
        location.hash = 'search/' + searchTerm
    }
})

//Big Problems
//1. Click only works outside of image, but still in div
//2. I can't get the single view image to work

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