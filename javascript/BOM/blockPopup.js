var blocked = false;

try {
    var wroxWin == window.open("http://www.wrox.com", "_blank");
    if (wroxWin == null) {
        blocked = true;
    }
} catch (ex) {
    blocked = true;
}

if (blocked) {
    alert("The popup was blocked!");
}