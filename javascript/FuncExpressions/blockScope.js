function outputNumbers(count) {
    (function() {
        for(var i=0; i<count; i++) {
            console.log(i);
        }
    })();

    console.log(i); // Error!
}

(function() {
    var now = new Date();
    if (now.getMonth() == 0 && now.getDate() == 1) {
        alert("Happy new year!");
    }
})();