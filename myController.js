app.controller("controller",function($scope){
    
        //получение количества введенных e-mail-ов
        $scope.getEmailsCount = function(arr){
            alert("e-mails count is: " + arr.length);
        };
    
        //добавление e-mail-а
        $scope.addEmail = function(arr){
            arr.push($scope.genEmail());   
        };
    
        //генерация случайного e-mail-а
        $scope.genEmail = function(){    
            var charSet="qwertyuiopasdfghjklzxcvbnm";
            var sample="";
            var len=Math.floor(Math.random()*8+3);

            for(i=0; i<len; i++)
                {
                    sample+=charSet[Math.floor(Math.random()*charSet.length)];
                }

            sample+="@";

            len=Math.floor(Math.random()*8+3);    
            for(i=0; i<len; i++)
                {
                    sample+=charSet[Math.floor(Math.random()*charSet.length)];
                }

            sample+=".";

            len=Math.floor(Math.random()*2+2);
            for(i=0; i<len; i++)
                {
                    sample+=charSet[Math.floor(Math.random()*charSet.length)].toLowerCase();
                }

            return sample;
        };
    });