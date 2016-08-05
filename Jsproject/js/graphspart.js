var fs = require("fs");
var temp;
var input = "outputJson.json";
var res = [];
var ages = {};
var obj = [];
var arr = [];

fs.readFile(input, function(err, data) {
    if (err)
        throw err;

    data = data.toString();
    temp = JSON.parse(data);
    //Array of graduate population with gender wise
    var education = {
        "Educational level - Literate without educational level - Males": 0,
        "Educational level - Literate without educational level - Females": 0,
        "Educational level - Below Primary - Males": 0,
        "Educational level - Below Primary - Females": 0,
        "Educational level - Primary - Males": 0,
        "Educational level - Primary - Females": 0,
        "Educational level - Middle - Males": 0,
        "Educational level - Middle - Females": 0,
        "Educational level - Matric/Secondary - Males": 0,
        "Educational level - Matric/Secondary - Females": 0,
        "Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Males": 0,
        "Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Females": 0,
        "Educational level - Non-technical diploma or certificate not equal to degree - Males": 0,
        "Educational level - Non-technical diploma or certificate not equal to degree - Females": 0,
        "Educational level - Graduate & above - Males": 0,
        "Educational level - Graduate & above - Females": 0,
        "Educational level - Unclassified - Males": 0,
        "Educational level - Unclassified - Females": 0
    }

    for (var i = 0, len = temp.length; i < len; i++) {
        var li = temp[i];
       //console.log(li);
        var age = li["Age-group"];
      // console.log(age);
        if (age != "All ages") {
            if (ages.hasOwnProperty(age)) {

                ages[age] = parseInt(ages[age]) + parseInt(temp[i]["Literate - Persons"]);

            } else {
                ages[age] = parseInt(temp[i]["Literate - Persons"]);
            }
        } else {
            for (var column in education) {
                education[column] = parseInt(li[column]) + parseInt(education[column]);
            }
        }

    }

    //console.log(ages);
    /**Json data for first file**/
    for (var i in ages) {

        if (ages.hasOwnProperty(i)) {
            res.push({ "x": i, "y": ages[i] });
        }

    }
    fs.writeFile("agegraph.json", JSON.stringify(res), function(err) {
        if (err)
            throw err;
    });

    /**Json data for second file**/
    for (var value in education) {
        if (education.hasOwnProperty(value)) {
            obj.push({ "x": value, "y": education[value] });
        }
    }

    fs.writeFile("edugraph.json", JSON.stringify(obj), function(err) {
        if (err)
            throw err;
    });
    /****json data for 3rd file*****/

    var findSum = function(cat, callback) {
        var sum = 0;
        for (var i = 0, len = temp.length; i < len; i++) {
            var val = parseInt(temp[i][cat]);
            if (!isNaN(val)) {
                sum = sum + val;
            }
        }
        //return sum;
        //console.log(sum);
        callback(sum);
    }

    // Araay of elements with category wise
    var categories = [
        "Educational level - Literate without educational level - Persons",
        "Educational level - Below Primary - Persons",
        "Educational level - Primary - Persons",
        "Educational level - Middle - Persons",
        "Educational level - Matric/Secondary - Persons",
        "Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons",
        "Educational level - Non-technical diploma or certificate not equal to degree - Persons",
        "Educational level - Technical diploma or certificate not equal to degree - Persons",
        "Educational level - Graduate & above - Persons",
        "Educational level - Unclassified - Persons",
    ];

    for (var i = 0, len = categories.length; i < len; i++) {
        var cat = categories[i];
        var obj1 = {};
        var index1 = cat.indexOf("-");
        var index2 = cat.indexOf("/");
            var index3;
            if (index2 == -1) {
                index3 = cat.lastIndexOf("-");
            }
            else { index3 = index2; }

        var str = cat.substring(index1 + 1,index3).trim();
        //console.log(str);

        findSum(cat, function(sum) { obj1["x"] = str.substring(0,18), obj1["y"] = sum; });
        arr.push(obj1);
        //console.log(arr);

    }


    fs.writeFile("educategory.json", JSON.stringify(arr), function(err) {
        if (err)
            throw err;
    });

});
