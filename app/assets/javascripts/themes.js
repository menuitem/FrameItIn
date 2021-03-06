
//function to change the Bootswatch theme and store in local storage
var ChangeTheme = (function(){
var themes = {
    "default": "//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css",
    "amelia" : "//bootswatch.com/amelia/bootstrap.min.css",
    "cerulean" : "//bootswatch.com/cerulean/bootstrap.min.css",
    "cosmo" : "//bootswatch.com/cosmo/bootstrap.min.css",
    "cyborg" : "//bootswatch.com/cyborg/bootstrap.min.css",
    "flatly" : "//bootswatch.com/flatly/bootstrap.min.css",
    "journal" : "//bootswatch.com/journal/bootstrap.min.css",
    "readable" : "//bootswatch.com/readable/bootstrap.min.css",
    "simplex" : "//bootswatch.com/simplex/bootstrap.min.css",
    "slate" : "//bootswatch.com/slate/bootstrap.min.css",
    "spacelab" : "//bootswatch.com/spacelab/bootstrap.min.css",
    "united" : "//bootswatch.com/united/bootstrap.min.css",
    "superhero" : "//bootswatch.com/superhero/bootstrap.min.css"
}
  var changeTheme = function(){
        //get theme from local storage for initial loading, or use a default if none exists
         var themeurl = localStorage.getItem("themeurl") || themes['superhero'];
         var themesheet = $('<link href="'+(themeurl)+'" rel="stylesheet" />');
          themesheet.appendTo('head');
          
        //apply click event listener for changing themes
        $('.theme-link').on("click",function(){
             var themeurl = themes[$(this).attr('data-theme')];
             themesheet.attr('href',themeurl);
             //add the changed theme to local storage
             localStorage.setItem("themeurl", themeurl)
          });
        }
        
  return {
    changeTheme: changeTheme
  }
})();