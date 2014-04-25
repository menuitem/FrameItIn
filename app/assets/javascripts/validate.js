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
                notZero: function(num){
                    if ((isNaN(num) == false ) && (num == 0)) {
                        throw new Error ("Can not divide by zero!");
                    }
                }
            }
}())