<?php 
$meta_descripcion; $title; $meta_image; $meta_keywords; $jd;
$types = array("anillos", "collares", "brazaletes", "pendientes");
$type = (isset($_GET["type"]) ? $_GET["type"] : "anillos");
$pais = "Uruguay";
$default_description = "Joyas, Anillos, Brazaletes, Collares, Caravanas, Pendientes, Estilo Gotico, Dark, Punk.";
$url = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
$usuarios = [];
$productID = (isset($_GET["product"]))?$_GET["product"]:0;
if (isset($_GET["product"]) && !empty($_GET["product"])) {

  $path = "products/".$type."/".$productID."/".$productID.".json";
  //echo $path;die;
  if (file_exists($path)) {
    $string = file_get_contents($path);
    $jd = json_decode($string, false);
  	$meta_descripcion = $jd->descripcion;
  	$title = $jd->titulo;
  	$meta_image = "products/".$type."/".$productID."/".$productID.".jpg";
  	$meta_keywords = $default_description;
  
  }else{
    $meta_descripcion = $default_description;
    $title = "Jewelry";
    $meta_image = "256.jpg";
    $meta_keywords = $default_description;
    header('Location: ../../');
  }
}else{
	  $meta_descripcion = $default_description;
  	$title = "Jewelry";
  	$meta_image = "http://".$_SERVER["HTTP_HOST"]."/256.jpg";
  	$meta_keywords = "Joyas, Anillos, Brazaletes, Collares, Caravanas, Pendientes, Estilo Gotico, Estilo Dark.";
}
?>