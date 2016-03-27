angular.module("emailsEditorApp", [])
    .directive("emailsEditor", function() {
        return {
            restrict: 'E'
            ,
            link: function($scope, $elem){
                
                console.log("Hello, i'm emails-edit directive");
                
                $scope.emailsString = ""; //строка в поле ввода
                $scope.eMails = []; //массив с адресами электронной почты
                $scope.pasted = false; //флаг: была ли сделала вставка

                //отслеживает ввод запятой и вставку
                $scope.change = function(){
                    if($scope.emailsString.indexOf(",")>=0 || $scope.pasted)
                    {
                        $scope.addEmails();
                        $scope.pasted = false;
                    }
                };

                //отслеживает нажатие enter
                $scope.keyUp = function($event){
                    if($event.keyCode==13)
                    {
                        $scope.addEmails();
                    }
                };

                //отслеживает уход из фокуса
                $scope.blur = function(){
                    $scope.addEmails();
                };
                
                //добавляет email-ы в массив
                $scope.addEmails = function(){
                    
                    //разделяем введенную строку запятыми, удаляем пустые и посвторяющиеся значения
                    var tmpEmails = $scope.emailsString.split(",");
                    var i=0;
                    while(i<tmpEmails.length)
                        {
                            tmpEmails[i]=tmpEmails[i].trim();
                            if( tmpEmails[i]=="" || $scope.eMails.indexOf(tmpEmails[i])>=0)
                                tmpEmails.splice(i,1);
                            else
                                i++;
                        }

                    //вставляем в массив
                    for(i=0;i<tmpEmails.length;i++)
                        {
                                $scope.eMails.push(tmpEmails[i]);
                        }
                    
                    //очищаем поле ввода
                    $scope.emailsString="";
                };
                
                //отслеживает вставку
                $scope.paste = function(){
                    $scope.pasted = true;              
                };

                //удаляет выбранный e-mail
                $scope.remove = function($index){
                    $scope.eMails.splice($index,1);
                };

                //отслеживает клик на div, окружающий поле ввода
                $scope.focus = function(){
                    ($elem)[0].getElementsByTagName("input")[0].focus();
                };
                
                //проверка на то, является ли e-mail, нужна для установки класса
                //для span.email
                $scope.isEmail = function(str){
                    var emailRegExp = /^[a-z]+[a-z0-9._-]+@([a-z0-9]+\.)+[a-z]{2,3}$/;
                    return emailRegExp.test(str);
                }
            }
            ,
            templateUrl : "emailsEditor.html"
            ,
            scope: {
                eMails: "=ngModel"
            }
        };
    });