app.controller('exerciseCtrl', function($scope, $stateParams, $state,$timeout,connectionSrv,dataSrv) {
    console.log("exercise controller loaded");
    console.log(connectionSrv.getQuery())

    //##########################init #################################
    $scope.lang = $stateParams.lang;

    $scope.alert = {
        good:'alert bg-green',
        info:'alert',
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

    //$scope.message[0] = $scope.engmessage.info;
    $scope.message_style =  $scope.alert.info;


    $scope.user_answer = [];
    $scope.first_click = false;
    $scope.questions_buffer;
    $scope.questions = []
    /*$scope.questions = [{'q':'אספלנית','o1':'סירה קטנה','o2':'נעלי בית','o3':'קלסר','a':'פלסטר'},
        {'q':'אנקול','o1':'מכשול','o2':'אילם','o3':'צדפה','a':'קרס, וו לתליית חפצים'},
        {'q':'ארכאי','o1':'אערכה','o2':'חריכה','o3':'להעריך','a':'מיושן'},
        {'q':'אקוטי','o1':'קצר','o2':'מיושן','o3':'ילקוט','a':'חריף , חמור'}];*/

    
    $scope.isdisabled = false;
    $scope.question ;
    $scope.option = [];
    $scope.answer ;
    $scope.question_index = 0;
    

    connectionSrv.get(connectionSrv.getQuery()).then(function(){
        console.log("get questions : "+connectionSrv.bind() )
        $scope.questions = connectionSrv.bind();
        $scope.load_Question(0);
    })
    

    $scope.mistakes = {"list":[],"exercises":0}


// ######################  function ####################################

    $scope.load_Question = function(index){
        console.log(" $scope.question_index : "+$scope.question_index)
        $scope.question = $scope.questions[index].question;
        $scope.answer = $scope.questions[index].answer;

        var temp = [];
        temp.push($scope.questions[index].option1);
        temp.push($scope.questions[index].option2);
        temp.push($scope.questions[index].option3);

        var r = Math.floor((Math.random() * 4) + 0);
        console.log("random is : "+r);

        for (var i = 0,t=0; i < 4; i++) {
            if (i == r)
                $scope.option[i] = $scope.questions[index].answer;
            else {
                $scope.option[i] = temp[t]
                t++;
            }
        };
        

        $scope.message_style =  $scope.alert.info;

        
        $scope.isdisabled = false;
        $scope.question_index ++;
        if ($scope.question_index == 10) 
        {
            console.log("question 10 now reseting")
           $scope.question_index=0;
           $scope.questions = $scope.questions_buffer.slice(0)
          // $scope.questions = $scope.questions_buffer
           console.log(" question equal to buffer : " )
           console.log(" question : "+$scope.questions )
           console.log(" question_buffer : "+$scope.questions_buffer )
           $scope.questions_buffer = []
           console.log(" question after  : " )
           console.log(" question : "+$scope.questions )
           console.log(" question_buffer : "+$scope.questions_buffer )
       }; 


       // if this is question 8 get more questions from server
       if ($scope.question_index == 9) {
            $timeout(function(){
                console.log("get more questions")
                connectionSrv.get(connectionSrv.getQuery()).then(function(){
                console.log("get more questions : "+connectionSrv.bind() )
                $scope.questions_buffer = connectionSrv.bind();
                })
            },1000);
       };
    }

    // loadquestion first time
    //$scope.load_Question(0);
    
    $scope.isgood = function(a){
        console.log(a);
        console.log($scope.answer);
        if (a == $scope.answer) {
             $scope.isdisabled = true;

             if ($scope.first_click == false) {
                $timeout(function(){
                    var isexist = false;
                    for(i in $scope.mistakes.list){
                        if($scope.mistakes.list[i] == a)
                            isexist=true;
                    }

                    if(!isexist)
                        $scope.mistakes.list.push({"question":$scope.question,"answer":$scope.answer});
                    
                    console.log("in thread")
                    console.log($scope.mistakes.list)
                },1);
             };
             $scope.message_style = $scope.alert.good;
             $timeout(function(){
                $scope.load_Question($scope.question_index)
            },1000);
             
             $scope.first_click = true;
             $scope.mistakes.exercises ++;
             console.log($scope.mistakes.exercises)
        } else{
            $scope.first_click = false;
            $scope.message_style = $scope.alert.wrong;
        };
    }

    $scope.sum = function(){
        dataSrv.setMistakes($scope.mistakes)
        $state.go('summary');
    }

});
