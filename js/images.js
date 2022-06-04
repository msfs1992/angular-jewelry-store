var data = new FormData();
var filesCollection = new Array();
var fileCover = new Array();
var fileTypes = ['jpg'];
var ind;

$("#uploadCover").change(function(e){
    readURL(e);
});
$("#uploadImage").change(function(e){
    readURL(e);
});
function readURL(eve) {
    var input = eve.target;
            if(input.id == "uploadCover" && fileCover.length == 1){
                alert("Ya has seleccionado una imagen principal");
                return;
            }
                var files = input.files;
                    console.log(file);
               for (var i = 0, file; file = files[i]; i++) {
                    var reader = new FileReader();

                    if(input.id == "uploadCover"){
                        fileCover.push(file);
                    }else{
                        filesCollection.push(file);
                    }
                    reader.onload = function (e) {
                        var image = e.target.result;
                        var s = image.split("base64");
                        //console.log("image: "+ s[1]);
                        var imageData = "data:image/jpeg;base64" + s[1];

                        if(input.id == "uploadCover"){
                            $("#thumbnailsCover").prepend('<div thumbnailAspectCover" style="width:100px;height:100px;"><div style="background: url('+imageData+'); background-size: cover; background-position: 50% 50%; border: 3px solid white;" class="thumbnail"></div></div>');
                        }else{
                            $("#thumbnails").prepend('<div class="thumbnailAspect" style="width:100px;height:100px;"><div style="background: url('+imageData+'); background-size: cover; background-position: 50% 50%;" class="thumbnail"></div></div>');
                        }


                    }
                    reader.readAsDataURL(file);
                }//each
            

}//function

