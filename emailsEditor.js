angular.module("editEmailsApp", [])
    .directive("emailsEditor", function() {
        return {
            restrict: 'E'
            ,
            link: function($scope, $elem, $attrs){
                
                console.log("Hello, i'm emails-edit directive");
                
                $scope.emailsString = "";
                $scope.eMails = [];
                $scope.pasted = false;

                $scope.change = function(){
                    if($scope.emailsString.indexOf(",")>=0 || $scope.pasted)
                    {
                        $scope.addEmails();
                        $scope.pasted = false;
                    }
                };

                $scope.keyUp = function($event){
                    if($event.keyCode==13)
                    {
                        $scope.addEmails();
                    }
                };

                $scope.blur = function(){
                    $scope.addEmails();
                };
                
                $scope.addEmails = function(){
                    
                    var tmpEmails = $scope.emailsString.split(",");
                    var i=0;
                    while(i<tmpEmails.length)
                        {
                            tmpEmails[i]=tmpEmails[i].trim();
                            if( tmpEmails[i]=="" || $scope.findIndexByName($scope.eMails,tmpEmails[i])>=0 )
                                tmpEmails.splice(i,1);
                            else
                                i++;
                        }

                    var emailRegExp = /^[a-z]+[a-z0-9._-]+@([a-z0-9]+\.)+[a-z]{2,3}$/;
                    for(i=0;i<tmpEmails.length;i++)
                        {
                            if(emailRegExp.test(tmpEmails[i]))
                                $scope.eMails.push({name: tmpEmails[i], correct:"correct"});
                            else
                                $scope.eMails.push({name: tmpEmails[i], correct:"wrong"});
                        }
                    $scope.emailsString="";
                };
                
                $scope.findIndexByName = function(source, name){
                    for(i=0;i<source.length;i++){
                        if(source[i].name === name)
                            {
                                return i;
                            }
                    }
                    return -1;
                };
                
                $scope.paste = function(){
                    $scope.pasted = true;              
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
                eMails: "=ngModel"
            }
        };
    })



    .controller("editEmailsController",function($scope){
    
        $scope.getEmailsCount = function(){
            alert("e-mails count is: " + $scope.addresses.length);
        };
    
        $scope.addEmail = function(){
            $scope.addresses.push({ name:$scope.genEmail(), correct:"correct" });   
        };
    
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