/**
 * Created by Tog on 6/1/2014.
 */
app.factory('dataSrv',function($q){
    var mistakes = undefined;
    
    return{
        setMistakes: function(data){
            mistakes = data;
        },
        getMistakes: function(){
            if(mistakes == undefined){
                mistakes = {"list":[],"exercises":0}
            }
            return mistakes;
        }
    }
});


