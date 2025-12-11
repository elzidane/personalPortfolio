document.addEventListener("DOMContentLoaded", function () {

    new TypeIt("#simpleUsage", {
        strings: "",
        speed: 100,
        waitUntilVisible: true,
    }).go();
});

const listPage = ["certificatem", "project"]



document.addEventListener("DOMContentLoaded", function () {

    new TypeIt("#usage", {
        strings: "",
        speed: 70,
        waitUntilVisible: true,
    }).go();
});

window.addEventListener("resize", function () {
    var width = window.innerWidth;
    var simpleUsageElement = document.getElementById("simpleUsage");
    var usageElement = document.getElementById("usage");

    if (width < 600) {
        simpleUsageElement.style.fontSize = "12px";
        usageElement.style.fontSize = "12px";
    } else if (width < 900) {
        simpleUsageElement.style.fontSize = "16px";
        usageElement.style.fontSize = "16px";
    } else {
        simpleUsageElement.style.fontSize = "20px";
        usageElement.style.fontSize = "20px";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var navbar = document.getElementById("navbar");
    var toggleButton = document.getElementById("navbar-toggle");

    toggleButton.addEventListener("click", function () {
        if (navbar.style.display === "none" || navbar.style.display === "") {
            navbar.style.display = "block";
        } else {
            navbar.style.display = "none";
        }
    });
});

document.addEventListener("click", function (event) {
    var navbar = document.getElementById("navbar");
    var toggleButton = document.getElementById("navbar-toggle");

    if (event.target !== toggleButton && !toggleButton.contains(event.target) && !navbar.contains(event.target)) {
        navbar.style.display = "none";
    }
});



function project() {
    document.getElementById('hide2').style.display = 'none';
    document.getElementById('hide3').style.display = 'none';
    document.getElementById('hide1').style.display = 'block';
}

function certif() {
    document.getElementById('hide2').style.display = 'block';
    document.getElementById('hide1').style.display = 'none';
    document.getElementById('hide3').style.display = 'none';
}


function tech() {
    document.getElementById('hide2').style.display = 'none';
    document.getElementById('hide3').style.display = 'block';
    document.getElementById('hide1').style.display = 'none';
}
