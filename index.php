<?php 
header('Access-Control-Allow-Origin: *');
include 'config.php';
?>
<!DOCTYPE html>
<html ng-app="routeApp">
<head>
<base href="/">
<meta name="copyright" content="Escorts" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="keywords" content="<?php echo $meta_keywords; ?>" />
<meta name="views" content="99999999" />
<meta name="ratings" content="5" />
<meta name="robots" content="noarchive,index,follow" />
<meta id="metaTitle" property="og:title" content="<?php echo $title; ?>" />
<meta property="fb:app_id" content="51" /> 
<meta property="og:image" content="<?php echo $meta_image; ?>" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:description" content="<?php echo $meta_descripcion; ?>" />
<meta property="og:type" content="website" />
<meta property="og:title" content="<?php echo $title; ?>" />
<meta property="og:url" content="<?php echo $url; ?>" />
<meta id="metaDescripcion" name="description" content="<?php echo $meta_descripcion; ?>" />
<meta property="og:image:width" content="256" />
<meta property="og:image:height" content="256" />
<title id="title"><?php echo $title; ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<link rel="icon" type="image/png" href="icon.png">
<link rel="stylesheet" type="text/css" href="font/flaticon.css">
<link rel="stylesheet" type="text/css" href="style.css">


</head>

<body>
  <div resize id="bigGallery" class="goBig">
    <div id="imgFrame" class="verticalCenter">
      <div onclick="closeImage()" class="closeImg">x</div>
      <img id="imgGal" src>
    </div>
  </div>
  <div id="responsiveMenu" ng-controller="menu">
  	<div ng-click="clickMenu($event.currentTarget)" id="menu" class="verticalCenter open">
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
	</div>
  	<div id="responsiveLinks">
  		<a href="collares" class="responsiveOption flaticon-necklace firstLink">Collares</a>
	    <a href="anillos" class="responsiveOption flaticon-wedding-rings secondLink">Anillos</a>
	    <a href="brazaletes" class="responsiveOption flaticon-bracelet thirdLink">Brazaletes</a>
	    <a href="pendientes" class="responsiveOption flaticon-luxury fourthLink">Pendientes</a>
  	</div>
  </div>
<header>

	<div class="innerheader clearfix">
		<a class="logohold clearfix" href="/">
			<img class="icon" src="jewelry-store-white.png" />
			<div class="webname">Jewelry</div>
		</a>
    
		<div id="publish" >Publicate Gratis</div>
		<div id="sexcats" class="clearfix">
			<a href="collares" class="sexcat flaticon-necklace firstLink">Collares</a>
			<a href="anillos" class="sexcat flaticon-wedding-rings secondLink">Anillos</a>
			<a href="brazaletes" class="sexcat flaticon-bracelet thirdLink">Brazaletes</a>
			<a href="pendientes" class="sexcat flaticon-luxury fourthLink">Pendientes</a>
		</div>
		<div id="searchHolder">
			<div class="searchHolder">
				<div class="flaticon-magnifier"></div>
				<input ng-model="searchString" type="text" id="search" placeholder="Buscar en la lista">
			</div>
		</div>
	</div>
</header>
<div id="mainHolder">
<div id="results"></div>
<div id="main" ng-view>

</div><!-- MAIN -->
</div>


<div id="branch">
  <div class="center">
    <div class="logohold clearfix">
      <img class="icon" src="jewelry-store-black.png" />
      <div class="webname">Jewelry</div>
    </div>
  </div>
</div>
<footer>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
</footer>
<script src="js/angular.min.js"></script>
<script src="js/angular-route.min.js"></script>
<script src="js/javascript.js"></script>
</body>

</html>										