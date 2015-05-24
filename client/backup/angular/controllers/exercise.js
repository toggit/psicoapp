app.controller('exercise', function($scope, $stateParams, $state,$timeout) {
    console.log("exercise controller loaded");

    $scope.lang = $stateParams.lang;

    $scope.alert = {
        good:'alert bg-green',
        info:'alert bg-teal',
        wrong:'alert bg-red'
    }

    $scope.hebmessage = {
        good:"Good Answer!!",
        info:"Please Select Answer ",
        wrong:"Wrong Answer!"
    }

    $scope.engmessage = {
        good:"תשובה נכונה !!",
        info:"בחר תשובה",
        wrong:"תשובה שגויה!!"
    }

    $scope.message = []
    $scope.message[0] = $scope.engmessage.info;
    $scope.message[1] = $scope.engmessage.info;
    $scope.message_style = [];
    $scope.message_style[0] =  $scope.alert.info;
    $scope.message_style[1] =  $scope.alert.info;

    $scope.questions_buffer;
    $scope.questions = [{'q':'WTF','o1':'we think fool','o2':'what you what','o3':'click me!','a':'what the fuck'},
        {'q':'LOL','o1':'look o lame','o2':'lalala o la','o3':'click me!','a':'laugh out loud'},
        {'q':'KOKO','o1':'123','o2':'safsaff','o3':'cha cha cha','a':'wowo'},
        {'q':'MAMA','o1':'1cic','o2':'wwwwwww','o3':'hahaha','a':'wooot'}]

    $scope.isdisabled = [];
    $scope.isdisabled[0] = false;
    $scope.isdisabled[1] = false;
    $scope.question =[];
    $scope.option = [];
    $scope.option[0] = [];
    $scope.option[1] = [];
    $scope.answer = [];
    $scope.question_index = 0;
    $scope.question_alt = 0;

    $scope.load_Question = function(index,alt){
        $scope.question[alt] = $scope.questions[index].q;
        $scope.answer[alt] = $scope.questions[index].a;

        var temp = [];
        temp.push($scope.questions[index].o1);
        temp.push($scope.questions[index].o2);
        temp.push($scope.questions[index].o3);

        var r = Math.floor((Math.random() * 4) + 0);
        console.log("random is : "+r);

        for (var i = 0,t=0; i < 4; i++) {
            if (i == r)
                $scope.option[alt][i] = $scope.questions[index].a;
            else {
                $scope.option[alt][i] = temp[t]
                t++;
            }
        };

     $scope.message[alt] = $scope.engmessage.info;
     $scope.message_style[alt] =  $scope.alert.info;

     $scope.question_index ++;
     $scope.question_alt++;

     if ($scope.question_alt == 2) {$scope.question_alt=0};
    }

    // loadquestion first time
    $('.carousel').carousel('pause');
    $scope.load_Question(0,0);
    $scope.load_Question(1,1);

    var alt_answer = 0;
    $scope.isgood = function(a){
        console.log(a);
        console.log($scope.answer[alt_answer]);
        if (a == $scope.answer[alt_answer]) {
             $scope.isdisabled[alt_answer] = true;
             console.log($scope.isdisabled);
             $scope.message[alt_answer] = $scope.engmessage.good;
             $scope.message_style[alt_answer] = $scope.alert.good;
             $timeout(function(){$scope.next()},1000);
             alt_answer++;
             
        } else{
            $scope.message[alt_answer] = $scope.engmessage.wrong;
            $scope.message_style[alt_answer] = $scope.alert.wrong;
        };

        if (alt_answer == 2) { alt_answer = 0};
    }

    console.log($scope.alert.good)
    //console.log($scope.engmassage.good)
    
    $scope.next = function(){
        $('.carousel').carousel('next')
        $timeout(function(){
            $scope.isdisabled[$scope.question_alt] = false;
            $scope.load_Question($scope.question_index,$scope.question_alt);
            if ($scope.question_index == 2) {console.log("load more questions")};
            if ($scope.question_index == 4) {console.log("replace question array"); $scope.question_index=0};    
        },1500);
        
    }

});
