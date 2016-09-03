(function(){
angular.module('starter')
.controller('Diario', function($scope, $ionicPopup, $localStorage){
    var watchers = ['dias'];
    for( var i_ in watchers){
        var i = watchers[i_];
        console.log(i + " "+ JSON.stringify($localStorage[i]));
        if($localStorage[i] == undefined){
            $localStorage[i]={};
        }else{
            $scope.dias = $localStorage[i];
        }
    }

    $scope.popupField = {};
    $scope.popupField.ativCurr = "";
    $scope.popupField.minCurr = "";
    $scope.popupField.hourCurr = "";
    var temp = "";
    var diasArray = [
        'domingo',
        'segunda',
        'terça',
        'quarta',
        'quinta',
        'sexta',
        'sabado'
    ];
    var diasDict = {};
    for(var i =0; i< 7; i++)
        diasDict[i] = diasArray[i];
    
    function preProcessDate(dateObj){
           var day = dateObj.getDay();
           
           var month = dateObj.getMonth()+1+'';
           var year = dateObj.getFullYear() + '';
           return day+'/'+month+'/'+year[2]+year[3]+'';
    }
    
    function Dia (){
        var date = new Date();
        var self = {};
        self.nome = diasDict[date.getDay()];
        self.data = preProcessDate(date);
        self.ativs = [];
        return self;
    }
     
    function Ativ(txt, hora){
        var self = {};
        self.txt = txt;
        self.hora = hora;
        return self;
    }
    var diaCurr = Dia();
    if(undefined == $scope.dias[diaCurr.data])
        $scope.dias[diaCurr.data] = diaCurr;
        
    //$scope.dias[diaCurr.data].ativs = [];//RESET
    $scope.addAtiv = function(ativ, index){
        if(isDef(ativ)){
            $scope.popupField.ativCurr = ativ.txt;
            var isHoraIniDefined = isDef(ativ.horaIni);
            
        }
        else{
            ativ = {};
            $scope.popupField.ativCurr = "";
        }
        
        var horas = {}; 
        var dateTemp = new Date();
        if(isHoraIniDefined){
            $scope.popupField.ativCurr = ativ.txt;
            horas.ini =  ativ.horaIni.split(':');
            if(isDef(ativ.horaFim)){
                horas.fim =   ativ.horaFim.split(':');
                $scope.popupField.hourCurr = horas.fim[0]*1;
                $scope.popupField.minCurr = horas.fim[1]*1;
            }
            else{
                
                $scope.popupField.hourCurr = dateTemp.getHours();
                $scope.popupField.minCurr = dateTemp.getMinutes();
            }

        }
        else{
            
           
            $scope.popupField.hourCurr = dateTemp.getHours();
            $scope.popupField.minCurr = dateTemp.getMinutes();
        }
        
        $scope.popupField.isFim = isHoraIniDefined;

        var template_=
        '<ion-toggle ng-click="changePopupToggle" class=" toggle-off-balanced" ng-model="popupField.isFim" toggle-class="toggle-assertive">Início<->Fim</ion-toggle>' +
        '<input type="text" placeholder="descreva a atividade" ng-model="popupField.ativCurr">' +
        'Horas<input class="POPUP-INPUT" type="number" placeholder="Hora" ng-model="popupField.hourCurr">h' +
        '<input type="number" class="POPUP-INPUT" placeholder="Minuto" ng-model="popupField.minCurr">min';
        var popupAddAtiv = $ionicPopup.show({
            template: template_,
            scope: $scope,
            buttons: [// Array[Object] (optional). Buttons to place in the popup footer.
            {
                text: 'Cancelar',
                type: 'button-stable',
                onTap: function(e) {
                // Returning a value will cause the promise to resolve with the given value         
                    return ;
                }
            },
         {
        text: 'OK',
        type: 'button-positive',
        onTap: function(e) {
            // Returning a value will cause the promise to resolve with the given value.
            var estado = $scope.popupField.isFim? 'Fim' : 'Ini';
            ativ.txt = $scope.popupField.ativCurr;
            ativ['hora' + estado] = $scope.popupField.hourCurr + ':'+ $scope.popupField.minCurr; 
            
            return {temp:ativ , index: index};
        }
        }]//fim butões
            
        });//fim definição popup   
        popupAddAtiv.then(function(res){
            if(res){
                if(isDef($scope.dias[diaCurr.data].ativs[res.index]))
                    $scope.dias[diaCurr.data].ativs[res.index] = res.temp;
                else{
                $scope.dias[diaCurr.data].ativs.push(res.temp);
                }
            } 
        
        });
    
        $scope.changePopupToggle = function(){
            if(isDef(horas.fim) || isDef(horas.ini)){
                if($scope.popupField.isFim){
                    $scope.popupField.hora = horas.fim[0]*1;
                    $scope.popupField.min = horas.fim[1]*1;
                }
                else{
                    $scope.popupField.hora = horas.ini[0]*1;
                    $scope.popupField.min = horas.ini[1]*1;
                }
            }
        }
    }//FIM função POPUP

    function delAtiv(index){
        $scope.dias[diaCurr.data].ativs.splice(index);
    }
    
    var isDef = function (foo){
        return !(undefined == foo);
    }
    
});//FIM CONTROLLER
})();