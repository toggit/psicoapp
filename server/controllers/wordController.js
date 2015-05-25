var WordModel = require('../models/wordModel');
var request = require('request');

//********************************** Load Data ********************************************
module.exports.postMeJson = function(req,res)
{
        var words = req.body;

        words.forEach(function(word) {
            saveWord(word);
        });

        console.log("save like done");
        res.sendStatus(200);
}

module.exports.import2mongo = function(req,res)
{
    request('http://192.168.1.150:8089/psico/words/4', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }
        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        console.log(JSON.stringify(body));
        var words = JSON.parse(body);

        words.forEach(function(word) {
            saveWord(word);
        });

        console.log("save like done");
        res.sendStatus(200);
    });
}

function saveWord(word) {

    var newWord = new WordModel();

    newWord.word = (word.word);
    newWord.description = (word.description);
    newWord.lang = word.lang;
    newWord.char =word.char;

    newWord.save(function(err, word) {
        if (err) return console.error(err);
        console.log(word);
    });
};

function trim1 (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
//************* retrive words from server *******************************************

module.exports.get10Words = function (req, res) {
        // write your code here
    var x =5;
    x=8/2;
    WordModel.find({lang:{$in:[req.body.lang || 'he']},char:{$in: req.body.char || ['א']}},{_id:0,_v:0,/* word: 0, description: 0 ,*/lang: 0,char: 0}).limit(500).exec(function(err,result){
        if(!err) {

            var words_arr = [];
            words_arr = result;
            var n = words_arr.length;
            var words =[] ;

            for (var i = 0; i < 40; i++) {
                var temp = words_arr[Math.floor(Math.random() * n)];
                if(words.indexOf(temp) == -1)
                    words.push(temp);
                else
                    i--;
            }

            for (var i = 0; i < 10; i++) {
                words[i]._doc.option1 = words[i+10].description;
                words[i]._doc.option2 = words[i+20].description;
                words[i]._doc.option3 = words[i+30].description;
            }

            var obj2return = words.slice(0,10).map(function(elem) {
                var obj = {}
                obj.answer = elem.description;
                obj.question = elem.word;
                obj.option1 = elem._doc.option1;
                obj.option2 = elem._doc.option2;
                obj.option3 = elem._doc.option3;
                return obj;
            });
            res.send(obj2return);
        }
    });
 };



