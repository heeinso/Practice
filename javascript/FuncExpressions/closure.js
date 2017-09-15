function createComparisonFunction(propertyName) {
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];

        if(value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}

function createFunctions1() {
    var result = new Array();

    for(var i=0; i<10; i++) {
        result[i] = function() {
            return i;
        };
    }

    return result;
}


function createFunctions2() {
    var result = new Array();

    for(var i=0; i<10; i++) {
        result[i] = function(num) {
            return function() {
                return num;
            };
        }(i);
    }
    return result;
}