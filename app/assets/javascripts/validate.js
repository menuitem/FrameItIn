var Validate = (function(name){
            return {
                fileName : function(name){
                    var reg = /^[a-z\s_0-9]+$/i;
                    // var matches = name.match(reg);
                    if (name.length<3) {
                        throw new Error ("Filename should have more than 3 letters.");
                    }
                    if (!reg.test(name)) {
                        throw new Error ("Only letters, numbers, spaces.");
                    }
                },
                currentUser: function(){
                    var cU = document.getElementById("user");
                    if (cU==null) {
                        throw new Error ("You must be logged in!");
                    }
                }
            }
}())