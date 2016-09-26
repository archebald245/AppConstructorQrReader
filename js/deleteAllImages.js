function clearAllImages(){
  $(resources).each(function(i, img){
    deleteImage(img);
  });

}
function DeleteResorcesAll(){
  $("#clearJsStorage").click(function(){
    clearAllImages();
      $.jStorage.deleteKey("appData");
  });

}
