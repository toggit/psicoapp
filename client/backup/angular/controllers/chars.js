/**
 * Created by Tog on 6/3/2014.
 */
app.controller('chars', function($scope, $stateParams, $state) {
    console.log("chars controller loaded");

    $scope.lang = $stateParams.lang;

    char_eng = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    char_heb = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת']

    

    if ($scope.lang == "English") {
    	$scope.chars = char_eng;
    	$scope.clas = "char-eng bg-aqua";
    	$scope.info = "Select One or More Char";
    	$scope.startgame = "Start Game";
    };
    if ($scope.lang == "Hebrew") {
    	$scope.chars = char_heb;
    	$scope.clas = "bg-red char-heb";
    	$scope.info = "בחר אות או מספר אותיות";
    	$scope.langside = "hebrew";
    	$scope.startgame = "התחל משחק";
    };

    $scope.select = [];

    $scope.selectchar = function(index){
    	for (var i=0 ; i<$scope.select.length ; i++){
    		if ($scope.select[i] == index) {
    			 if ($scope.lang == "English")
    			 	document.getElementById(index).style.background = "#00c0ef";
    			 if ($scope.lang == "Hebrew")
    			 	document.getElementById(index).style.background = "#f56954";
    			 $scope.select.splice(i,1);
    			 console.log("return");
    			 return;
    		};
    	}

    	console.log("add char :"+$scope.chars[index])
    	if ($scope.lang == "English")
    		document.getElementById(index).style.background = "#3498DB";
    	if ($scope.lang == "Hebrew")
    		document.getElementById(index).style.background = "#E74C3C";
    	$scope.select.push(index);

    }


    $scope.start = function(){
    	if ($scope.select.length != 0 ) 
    		$state.go('exercise',{lang:$scope.lang})
    	else
    		alert("Select single or multiple char");
    }

   
});
