var routeApp = angular.module("routeApp", ["ngRoute"]);

var temp = '<div id="rank" resize notifier="notifyServiceOnChage(params)" class="clearfix" style="height:{{ mheight }}px;"><a ng-repeat="product in products | multipleWords:searchString" ng-href="{{ ptype }}/{{ product.id }}" class="rankimage" ng-style="resizeWithOffset(0)" style="width:{{ width }}px;left:{{  left($index) }}px;top:{{ top($index) }}px;" data-id="{{ product.id }}" data-type="{{ ptype }}"><div class="rankimgHolder"><img class="mainpic" ng-src="products/{{ ptype }}/{{ product.id }}/{{ product.id }}.jpg" /></div><div class="rank-info"><div class="price">$ {{ product.price }}</div><div class="relative verticalCenter"><div class="rankname clearfix">{{ product.titulo }}</div><div class="descripcion">{{ product.descripcion }}</div></div></div></a></div>';

  routeApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

    $routeProvider
    .when("/", {
        template : temp,
        controller: "queryListController",
        paramType: "anillos"
    })
    .when("/anillos", {
        template : temp,
        controller: "queryListController",
        paramType: "anillos"
    })
    .when("/anillos/:product", {
        templateUrl: '../userTemplate.html',
        controller: "queryUserController",
        paramType: "anillos"
    })
    .when("/collares", {
        template : temp,
        controller: "queryListController",
        paramType: "collares"
    })
    .when("/collares/:product", {
        templateUrl: '../userTemplate.html',
        controller: "queryUserController",
        paramType: "collares"
    })
    .when("/pendientes", {
        template : temp,
        controller: "queryListController",
        paramType: "pendientes"
    })
    .when("/pendientes/:product", {
        templateUrl: '../userTemplate.html',
        controller: "queryUserController",
        paramType: "pendientes"
    })
    .when("/brazaletes", {
        template : temp,
        controller: "queryListController",
        paramType: "brazaletes"
    })
    .when("/brazaletes/:product", {
        templateUrl: '../userTemplate.html',
        controller: "queryUserController",
        paramType: "brazaletes"
    })
    .otherwise({
      redirectTo: "/"
    });
    //check browser support
        if(window.history && window.history.pushState){
            //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

         // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

         // if you don't wish to set base URL then use this
         $locationProvider.html5Mode({
                 enabled: true,
                 requireBase: false
          });
        }
  }]);
var currentImgWidth, currentImgHeight, mWidth, calc, pheight, decimal, mRows, itemsperrow, mtop, mTop, rowCounter, itemPosition, cantidadProductos, rows;
itemsperrow = 5;

rowCounter = 1;
itemPosition = 1; 

function queryUserController($scope, $http, $route, $routeParams, customFunctions){
   customFunctions.getRequest("products/"+$route.current.$$route.paramType+"/"+$routeParams.product+"/"+$routeParams.product+".json").then(function(response, status){
      window.scrollTo(0,0);
      //console.log(response.data);
      document.getElementById("searchHolder").style.display = "none";
    
      $scope.userInfo = response.data;
      customFunctions.setMeta($scope.userInfo.descripcion, $scope.userInfo.titulo);
      $scope.ptype = $route.current.$$route.paramType;
      $scope.cover = {
        "background":"url(products/"+$scope.ptype+"/"+$scope.userInfo.id+"/"+$scope.userInfo.id+".jpg)",
        "background-size":"cover"
      };
      $scope.calcWidth = function(imgWidth, imgHeight, windowHeight){
        return (( ((windowHeight * 100) / imgHeight) * imgWidth ) / 100);
      }
      $scope.aspectRatio = function(height, width){
        return (height / width) * 100;
      }
      $scope.goBig = function(image, id){
        var gallery = document.getElementById("bigGallery");
        var imgGal = document.getElementById("imgGal");
        var imgFrame = document.getElementById("imgFrame");
        var _width;
       
        imgGal.onload = function(){
          currentImgWidth = this.naturalWidth;
          currentImgHeight = this.naturalHeight;
           _width = $scope.calcWidth(this.naturalWidth, this.naturalHeight, window.innerHeight);
          if(this.naturalWidth > window.innerWidth){
              imgFrame.style.width = "100%";
              imgGal.style.width = "100%";
            if(imgGal.clientHeight > (window.innerHeight - 42)){
              imgFrame.style.width = _width+"px";
              imgGal.style.height = "100%";
              imgFrame.style.height = window.innerHeight+"px";
            }else{
              imgGal.style.height = "100%";
              imgFrame.style.height = "auto";
            }
          }else{
            if(this.naturalHeight > (window.innerHeight - 42)){
              imgFrame.style.width = _width+"px";
              imgGal.style.width = "100%";
              imgGal.style.height = "100%";
              imgFrame.style.height = window.innerHeight+"px";
            }else{
              imgFrame.style.width = this.naturalWidth+"px";
              imgGal.style.width = this.naturalWidth+"px";
              imgGal.style.height = this.naturalHeight+"px";
              imgFrame.style.height = this.naturalHeight+"px";
            }
          }
        }
  
        imgGal.setAttribute("src", "products/"+$scope.ptype+"/"+id+"/fotos/"+image);
        //gallery.classList.remove("goNormal");
        //gallery.classList.add("goBig");
        //document.documentElement.style.overflowY = "hidden";
        gallery.style.display = "block";

      }

    });
 }


function menu($scope){
  $scope.closed = true;
  $scope.clickMenu = function(element){
    if($scope.closed){
      element.classList.add("moveMenu");
      element.children[0].classList.add("animateLine1");
      element.children[2].classList.add("animateLine3");
      document.getElementById("responsiveMenu").style.right = "0px";
      $scope.closed = false;
    }else{
      element.style.left = "-46px";
      element.classList.add("moveMenuReverse");
      element.children[0].classList.add("animateLine1Reverse");
      element.children[2].classList.add("animateLine3Reverse");
      element.children[0].classList.remove("animateLine1");
      element.children[2].classList.remove("animateLine3");
      document.getElementById("responsiveMenu").style.right = "-250px";
      $scope.closed = true;
    }
    
  };
}
routeApp.filter("multipleWords", ["$filter", "customFunctions", function($filter, customFunctions){
    function mw (input, searchString){
        if (input == undefined){
            return;
        }
        var results = document.getElementById("results");
        if (searchString == undefined){
            return input;
        }
    
        var returnArray = [];
        var searchTextSplit = searchString.toLowerCase().split(' ');
        for(var x = 0; x < input.length; x++){
            var count = 0;
            for(var y = 0; y < searchTextSplit.length; y++){
              if(count == 1){
                break;
              }

              if(input[x].titulo.toLowerCase().indexOf(searchTextSplit[y]) !== -1){
                  returnArray.push(input[x]);
                  count = 1;
                  break;
              }
              if(input[x].descripcion.toLowerCase().indexOf(searchTextSplit[y]) !== -1){
                  returnArray.push(input[x]);
                  count = 1;
                  break;
              }
              for(k in input[x].tags){
                  if(input[x].tags[k].toLowerCase().indexOf(searchTextSplit[y]) !== -1){
                      returnArray.push(input[x]);
                      count = 1;
                      break;
                  }
              }
            }

        }
        rows = Math.ceil(returnArray.length / itemsperrow);
        var rank = document.getElementById("rank");
        
        rank.style.height = customFunctions.height(rows) + "px";
        if(returnArray.length == 0){
          results.innerHTML = "No se encontraron resultados";
          results.style.display = "block";
        }else{
          results.innerHTML = "";
          results.style.display = "none";
        }
        window.scrollTo(0,0);
        return returnArray;
        
    }
    mw.$stateful = true;

    return mw;
}]);
function queryListController($scope, $route, $routeParams, $filter, customFunctions){
  customFunctions.setMeta("Joyas, Anillos, Brazaletes, Collares, Caravanas, Pendientes, Estilo Gotico, Estilo Dark.", "Jewelry");
  $scope.anillos = "anillos";
  $scope.pendientes = "pendientes";
  $scope.collares = "collares";
  $scope.brazaletes = "brazaletes";

  document.getElementById("searchHolder").style.display = "block";
  $scope.notifyServiceOnChage = function(){
      console.log("Launched");
  };


  if($routeParams.product != undefined){
    //cargar ficha de usuario

  }else{
    customFunctions.getRequest("products/"+$route.current.$$route.paramType+".json").then(function(response, status){
    //si esta seteada la region entonces filtra
    $scope.ptype = $route.current.$$route.paramType;
    if($routeParams.region != undefined){
      var region = $routeParams.region;
       region = region.split("-").join(" ");
       //checkea si esta seteado el usuario
       $scope.products = $filter("filter")(response.data, {region:region});
    }else{
       $scope.products = response.data;
   
    }

    cantidadProductos = $scope.products.length;
    mRows = Math.ceil($scope.products.length / itemsperrow);
    $scope.width = customFunctions.width();
    $scope.mheight = customFunctions.height(mRows);
    $scope.top = customFunctions.top;
    $scope.left = customFunctions.left;
    customFunctions.doResize(document.body.clientWidth);
});

//get  });    
  }

}

routeApp.controller("queryListController", ["$scope", "$route", "$routeParams", "$filter", "customFunctions", queryListController]);
routeApp.controller("queryUserController", ["$scope", "$http", "$route", "$routeParams", "customFunctions", queryUserController]);
routeApp.controller("menu", ["$scope", menu]);
routeApp.directive('resize',['$window', "customFunctions", function ($window, customFunctions) {
    return function (scope, element, attr) {
        var w = angular.element($window);
        scope.$watch(function () {
            return {
                'h': document.body.clientHeight, 
                'w': document.body.clientWidth
            };
        }, function (newValue, oldValue) {

            
            if(newValue.w != oldValue.w){
              if(document.getElementById("bigGallery").style.display == "block"){
                customFunctions.resizeGallery(newValue.w);
                return;
              }
              customFunctions.doResize(newValue.w);
            }
            mRows = Math.ceil(cantidadProductos / itemsperrow);
            var c = 1 / itemsperrow;
            decimal = (c.toString().split('.')[1] == undefined ? NaN : c.toString().split('.')[1].charAt(0));
            scope.width = customFunctions.width();
            scope.mheight = customFunctions.height(mRows);
            scope.outLeft = customFunctions.left(scope.$index);
            scope.outTop = customFunctions.top(scope.$index);

//function return styles
/*            scope.resizeWithOffset = function (offsetH) {
                scope.$eval(attr.notifier); //launch notifier function from notifier attr if setted
                return { 
                    'width': (scope.width) + 'px',
                    'left': (scope.outLeft) + 'px',
                    'top': (scope.outTop) + 'px'
                };
            };
*/
        }, true);

        w.on('resize', function () {
            scope.$apply();
        });
    }
}]);



routeApp.factory("customFunctions", ["$http", function($http) {
  return {
    resizeGallery: function(width){
      function calcWidth(imgWidth, imgHeight, windowHeight){
        return (( ((windowHeight * 100) / imgHeight) * imgWidth ) / 100);
      }
       var gallery = document.getElementById("bigGallery");
        var imgGal = document.getElementById("imgGal");
        var imgFrame = document.getElementById("imgFrame");
        var _width;
        _width = calcWidth(imgGal.clientWidth, imgGal.clientHeight, window.innerHeight);
        if(imgGal.clientWidth > (window.innerWidth + 20)){
          imgFrame.style.width = "100%";
          imgGal.style.width = "100%";
          if(imgGal.clientHeight > (window.innerHeight - 42)){
            imgFrame.style.width = _width+"px";
            imgGal.style.height = "100%";
            imgFrame.style.height = window.innerHeight+"px";
          }else{
            imgGal.style.height = "100%";
            imgFrame.style.height = "auto";
          }
        }else{
          if(imgGal.clientHeight > (window.innerHeight - 42)){
            imgFrame.style.width = _width+"px";
            imgGal.style.width = "100%";
            imgGal.style.height = "100%";
            imgFrame.style.height = window.innerHeight+"px";
          }else{
            imgFrame.style.width = imgFrame.style.width+"px";
            imgGal.style.width = imgFrame.style.width+"px";
            imgGal.style.height = imgFrame.style.height+"px";
            imgFrame.style.height = imgFrame.style.height+"px";
          }
        }
    },
    getRequest: function(url) {
      return $http.get(url);
    },
    doResize: function(w){
      if(w < 900){
        itemsperrow = 4;
      }
      if(w < 700){
        itemsperrow = 3;
        //document.getElementById("search").style.width = "0px";
        //document.querySelector(".searchHolder").style.width = "0px";
        document.getElementById("search").classList.remove("searchToggle");
        //document.querySelector(".webname").style.display = "block";
      }
      if(w < 500){
        itemsperrow = 2;
      }
      if(w > 900){
        itemsperrow = 5;
        //document.getElementById("searchHolder").style.width = "calc(100% - 768px)";
      }
      if(w > 600){
        document.querySelector(".webname").style.display = "block";
        //document.querySelector(".searchHolder").style.width = "200px";
        document.getElementById("search").style.width = "";
        document.getElementById("search").classList.remove("searchToggle");

      }
      if(w < 360){
        itemsperrow = 1;
      }
    },
    left: function(index){

      var mi = index + 1;
      
      var isFirst = mi / itemsperrow;
      var lastone = (isFirst.toString().split('.')[1] == undefined ? NaN : isFirst.toString().split('.')[1].charAt(0) );
      var res;

      if(lastone == decimal){
        this.res = 0;
      }else{
        if(isNaN(lastone)){

          if(itemsperrow == 1){
            this.res = 0;
          }else{
            this.res = mWidth * (itemsperrow - 1);
          }
        }else{
          if(itemsperrow == 5 || itemsperrow == 2){
            this.res = mWidth * ((lastone / 2) - 1); 
          }else if(itemsperrow == 3 || itemsperrow == 4){
            this.res = mWidth * Math.ceil(((lastone / 2) - 2));
          }
          
        }
      }
      return this.res;
    },
    top: function(index){
      //console.log(index);
      mtop = Math.ceil((index + 1) / itemsperrow);
      mtop = mtop - 1;
      return pheight * mtop;
    },
    width: function(){

      mWidth = document.body.clientWidth / itemsperrow;
      return mWidth;
    },
    height: function(rows){
      pheight = mWidth;
      return rows * pheight;
    },
    setMeta: function(descripcion, titulo){
      document.getElementById("metaDescripcion").setAttribute("content", descripcion);
      document.getElementById("metaTitle").setAttribute("content", titulo);
      document.getElementById("title").innerHTML = titulo;
    }
  };
}]);

var lines = document.querySelectorAll(".line");
var line1 = lines[0];
var line2 = lines[2];
var menu = document.getElementById("menu");
line1.addEventListener("animationend",function(e){

      if(e.animationName == "mymoveoneReverse"){
        line1.classList.remove("animateLine1Reverse");
        line1.classList.remove("animateLine1");
        line2.classList.remove("animateLine3Reverse");
        line2.classList.remove("animateLine3");
        menu.classList.remove("moveMenu");
        menu.classList.remove("moveMenuReverse");
      }
},true);

document.querySelector(".flaticon-magnifier").onclick = function(){
  if(window.innerWidth <= 600){
    if(document.querySelector(".webname").style.display == "none"){
      
      setTimeout(function(){
        document.querySelector(".webname").style.display = "block";
      }, 200);
     //document.querySelector(".searchHolder").style.width = "calc(100% - 100px)";
      document.getElementById("searchHolder").style.width = "";
      document.querySelector(".searchHolder").style.right = "";
      //document.getElementById("search").classList.remove("searchToggle");
      //document.getElementById("searchHolder").classList.remove("searchHolderToggle");
      //document.querySelector(".searchHolder").classList.remove("searchHToggle");
    }else{
      document.querySelector(".webname").style.display = "none";
      document.getElementById("searchHolder").style.width = "calc(100% - 91px)";
      document.querySelector(".searchHolder").style.right = "0px";
      //document.querySelector(".searchHolder").style.width = "calc(100% - 80px)";
      
      //document.getElementById("searchHolder").classList.add("searchHolderToggle");
      //document.getElementById("search").classList.add("searchToggle");
      //document.querySelector(".searchHolder").classList.add("searchHToggle");

    }
  }
};
function closeImage(){
    var gallery = document.getElementById("bigGallery");
    gallery.style.display = "none";
    //document.documentElement.style.overflowY = "scroll";
}

document.addEventListener("DOMContentLoaded", function(event){

    document.body.removeChild(document.getElementsByTagName("div")[document.getElementsByTagName("div").length-1]);

});
window.onbeforeunload = function(){
  window.scrollTo(0,0);
};