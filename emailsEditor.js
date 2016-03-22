var app = angular.module("editEmailsApp", []);

app.directive("emailsEditor", function() {
    return {
        restrict: 'E'
        ,
        link: function($scope, $elem, $attrs){
            console.log("Hello, i'm emails-edit directive");
            $scope.emailsString="";
            $scope.eMails = [];
            $scope.getEmailsCount = function(){
                alert("e-mails count is: " + $scope.eMails.length);
            };
            $scope.addEmail = function(){
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
                $scope.emailsString=sample;
                addEmails($scope);        
            };
            $scope.change = function(){
                if($scope.emailsString.indexOf(",")>=0 )
                {
                    addEmails($scope);
                }
            };
            $scope.keyUp = function($event){
                if($event.keyCode==13)
                {
                    addEmails($scope);
                }
            };
            $scope.blur = function(){
                    addEmails($scope);
            };
            $scope.remove = function($index){
                $scope.eMails.splice($index,1);
            };
            $scope.focus = function(){
                ($elem)[0].getElementsByTagName("input")[0].focus();
            };
        }
        ,
        templateUrl : "emailsEditor.html"
        ,
        scope: {
            addEmail: "=addEmail",
            getEmailsCount: "=getEmailsCount"
        }
    };
});

function addEmails($scope){
    var tmpEmails = $scope.emailsString.split(",");
    var i=0;
    while(i<tmpEmails.length)
        {
            tmpEmails[i]=tmpEmails[i].trim();
            if(tmpEmails[i]==""||
               findIndexByName($scope.eMails,tmpEmails[i])>=0
              )
                tmpEmails.splice(i,1);
            else
                i++;
        }
    
    var emailRegExp = /^[a-z]+[a-z0-9._-]+@([a-z0-9]+\.)+[a-z.]{2,3}$/;
    for(i=0;i<tmpEmails.length;i++)
        {
            if(emailRegExp.test(tmpEmails[i]))
                $scope.eMails.push({name: tmpEmails[i], correct:"correct"});
            else
                $scope.eMails.push({name: tmpEmails[i], correct:"wrong"});
        }
    //$scope.eMails = $scope.eMails.concat(tmpEmails);
    $scope.emailsString="";
}

function findIndexByName(source, name){
    for(i=0;i<source.length;i++){
        if(source[i].name === name)
            {
                return i;
            }
    }
    return -1;
}