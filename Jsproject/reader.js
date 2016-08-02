var fs = require("fs");
var input = "./csv/India2011.csv";
var output = "outputJson.json";
var count = 0;
var result = [];
var parse = function (inFile, callback) {
    //reading the input file
    fs.readFile(inFile, function (err, data) {
        if (err) {
            throw err;
        }
        var d = data.toString();
        var line = d.split('\n');

        //heading 
        var headers= line[0].split(",");
        count = count + 1;
        for (var i = 1, len = line.length; i < len - 1; i = i + 1) {
            var value = line[i].split(",");

            var objArray = {};
            for (var j = 0, len1 = value.length; j < len1; j = j + 1) {
                if (value[j] != undefined || value[j].trim() != "") {
                    objArray[headers[j]] = value[j];
                }
            }
            //pushing into object array
            result.push(objArray);

        }
        callback(result);
    });
};
var converter = function () {
    parse(input, function (result) {
              //converting csv into JSON 
                fs.writeFile(output,JSON.stringify(result), function (err) {
                    if (err) throw err;
                    //console.log("sucessfully converted: "+output);
                })
            })
    
    
};
converter();
