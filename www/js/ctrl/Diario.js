(function(){
angular.module('starter')
.controller('Diario', function($scope, $ionicPopup){
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
    
    $scope.dias = {};
    $scope.dias[diaCurr.data] = diaCurr;
    $scope.addAtiv = function(){
        var dateTemp = new Date();
        $scope.getFromPopup.hourCurr = dateTemp.getHours();
        $scope.getFromPopup.minCurr = dateTemp.getMinutes();
        
        
     var template_= '<input type="text" ng-model="getFromPopup.ativCurr">' +
     '<div style="display: inline ! important">' +
     'Hora <input type="number" ng-model="getFromPopup.hourCurr">' +
     'Minuto <input type="number" ng-model="getFromPopup.minCurr">'+
     '</div>';    
     var popupAddAtiv = $ionicPopup.show({
         template: template_,
         scope: $scope,
         buttons: [// Array[Object] (optional). Buttons to place in the popup footer.
   {
    text: 'OK',
    type: 'button-positive',
    onTap: function(e) {
      // Returning a value will cause the promise to resolve with the given value.
      temp = {
          txt: ''+$scope.getFromPopup.ativCurr + '',
          hora: $scope.getFromPopup.hourCurr + ':'+ $scope.getFromPopup.minCurr
        };
        return temp;
    }
  }]
         
     });   
    popupAddAtiv.then(function(res){
        $scope.dias[diaCurr.data].ativs.push(res);
    
    });
    }
});//FIM CONTROLLER
})();