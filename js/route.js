document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".mode-button").forEach(button => {
        button.addEventListener("click", function () {
            const mode = this.dataset.mode;
            window.location.href = `game.html?mode=${mode}`;
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-route]").forEach(button => {
        button.addEventListener("click", function () {
            window.location.href = this.dataset.route;
        });
    });
});