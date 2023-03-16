const circles = document.querySelectorAll(".circle");
const message = document.getElementById("message");

const swapColors = (circle1, circle2) => {
    const tempColor = circle1.style.backgroundColor;
    circle1.style.backgroundColor = circle2.style.backgroundColor;
    circle2.style.backgroundColor = tempColor;

    const tempDataColor = circle1.dataset.color;
    circle1.dataset.color = circle2.dataset.color;
    circle2.dataset.color = tempDataColor;
};

circles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
        const nextIndex = (index + 1) % circles.length;
        swapColors(circle, circles[nextIndex]);
        message.textContent = `${circle.dataset.color} 색상 버튼이 눌러졌습니다.`;
    });
});
