var app = angular.module('twitchStreaming', []);

//var entries = [];

app.controller('streamers', function($scope, $http){
    
    $scope.results;
    $scope.channels = [];
    $scope.omniArray = [];
    $scope.filter;
        
    
    $scope.getStreamers = function(){
    
      $("#mainDiv").show();
        
    $http.get('https://api.twitch.tv/kraken/users/swimmerlungs/follows/channels?oauth_token=37uu01q6t6311dli0ncug4c68rgjev').then(function(response){
        //$scope.channels = [];
                
        
        for(var i=0;i<response.data.follows.length;i++){
            $scope.channels.push(response.data.follows[i].channel.display_name);
            //console.log($scope.channels);
        }
        
        console.log($scope.channels);        
        
        $scope.results = response;
        
        console.log($scope.results);
        
        
        $http.get('https://api.twitch.tv/kraken/streams?channel=brunofin,' + $scope.channels.join(",") + '&client_id=97toxu558dwa6xfcz56vdd575g2qfvg').then(function(response){
        
        console.log(response);
            
            
            for(var i=0;i<$scope.results.data.follows.length;i++){
                
                var user = {}
                
                for(var j = 0;j<response.data.streams.length;j++){
                    
                    if($scope.results.data.follows[i].channel.display_name == response.data.streams[j].channel.display_name){
                        console.log(response.data.streams[j].channel.display_name + ", is online.");
                        user.status = true;
                        user.game = (response.data.streams[j].game);
                    }
                }
                
                user.name = $scope.results.data.follows[i].channel.display_name;
                user.picture = $scope.results.data.follows[i].channel.logo;
                user.url = $scope.results.data.follows[i].channel.url;
                $scope.omniArray[i] = user;
                console.log(user);
            }
            
            
        
        }); //end of channelsAPI=>then
        
        
    }); //end of followsAPI=>then
    
        return 0;
    }
    
    $scope.showAll = function(){
        
        $(".channelList").show();
        
    }
    
    $scope.showOnline = function(){
        $(".channelList").hide();
        $(".true").show();
        
    }
    
    $scope.showOffline = function(){
        $(".channelList").show();
        $(".true").hide();
    }
    
    
    
    
    
    
});
