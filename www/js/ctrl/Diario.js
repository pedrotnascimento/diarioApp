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

    $scope.getFromPopup = {};
    $scope.getFromPopup.ativCurr = "";
    $scope.getFromPopup.minCurr = "";
    $scope.getFromPopup.hourCurr = "";
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
    if($scope.dias[diaCurr.data] == undefined)
        $scope.dias[diaCurr.data] = diaCurr;
    //$scope.dias[diaCurr.data].ativs = [];//RESET
    $scope.addAtiv = function(ativ, index){
        var isAtivDefined = ativ != undefined; 
        var horas = [];
        if(isAtivDefined){
            var horas = ativ.hora.split(':') || "";
            $scope.getFromPopup.ativCurr = ativ.txt;
        }

        var dateTemp = new Date();
        $scope.getFromPopup.hourCurr = horas[0]*1 || dateTemp.getHours();
        $scope.getFromPopup.minCurr = horas[1]*1 || dateTemp.getMinutes();
        

     var template_= '<input type="text" ng-model="getFromPopup.ativCurr">' +
     '<div style="display: inline ! important">' +
     '<input type="number" placeholder="Hora" ng-model="getFromPopup.hourCurr">' +
     '<input type="number" placeholder="Minuto" ng-model="getFromPopup.minCurr">'+
     '</div>';    
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
      if(isAtivDefined) {
            temp = {
            txt: ''+$scope.getFromPopup.ativCurr + '',
            hora: $scope.getFromPopup.hourCurr + ':'+ $scope.getFromPopup.minCurr
            };
            temp.id = ativ.id;
      }
      else{
          var len  = $scope.getFromPopup.ativCurr;

        temp = {
            id:$scope.getFromPopup.ativCurr.slice(len-5,len), 
            txt: ''+$scope.getFromPopup.ativCurr + '',
            hora: $scope.getFromPopup.hourCurr + ':'+ $scope.getFromPopup.minCurr
        };
        }
        return {temp:temp , edit: isAtivDefined, index: index};
    }
  }]
         
     });   
    popupAddAtiv.then(function(res){
        if(res)
            if(res.edit)
                $scope.dias[diaCurr.data].ativs[res.index] = res.temp;
            else{
            $scope.dias[diaCurr.data].ativs.push(res.temp);
            }
    
    });
    }//FIM POPUP

    function delAtiv(index){
        $scope.dias[diaCurr.data].ativs.splice(index);
    }
});//FIM CONTROLLER
})();