document.addEventListener("DOMContentLoaded", () => {
    const glassContainer = document.querySelector('.glass_container');
    const containerWidth = glassContainer.clientWidth; // Width of the container
    const containerHeight = glassContainer.clientHeight; // Height of the container
    const containerRadius = containerWidth / 2; // Radius of the circular container
    const circleSize = 30; // Diameter of each circle
    const circleRadius = circleSize / 2;
    const gap = 0.5; // 1px gap between circles and the container border

    // List of solid colors
    const colors = [
        "#ff0081", "#ff48a5", "#ff77bc", "#ffaed7", "#ffcae5",
        "#6dd8dd", "#87d7e0", "#bad6e6", "#d4d5e9", "#eed4ec",
        "#ffb6fc", "#eabaff", "#c9c0ff", "#b7ceff", "#b7ddff",
        "#ff6ec7", "#ffb0b0", "#ffc7f8", "#ff68ad", "#ffb2cf"
    ];

    // Center of the container
    const containerCenterX = containerWidth / 2;
    const containerCenterY = (containerHeight / 2);

    // Maximum radius for the circles to ensure they stay inside and maintain a gap from the border
    const maxRadius = containerRadius - circleRadius - gap;

    for (let i = 0; i < 65; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');

        // Pick a random color from the list
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        circle.style.backgroundColor = randomColor;

        let x, y, distanceFromCenter;
        const bottomHalfYCenter = containerHeight; // Start from the center of the bottom half
        
        // Keep generating positions until the circle stays within the container and doesn't overlap
        do {
            // Randomly generate positions within the bounds of the container minus the gap
            const angle = Math.random() * 2 * Math.PI; // Random angle for circular distribution
            const radius = Math.random() * maxRadius; // Random radius within the allowed range

            x = containerCenterX + 250 * Math.cos(angle);

             // Adjust vertical position to control the spread (using verticalSpreadFactor)
            const verticalRadius = 1.3 * Math.random() * (maxRadius); // Limit vertical range
            y = bottomHalfYCenter + verticalRadius * Math.sin(angle); // Use bottom half of container for Y-position

            // Ensure the circle stays inside the container and respects the gap
            distanceFromCenter = Math.sqrt(
                Math.pow(x - containerCenterX, 2) +
                Math.pow(y - containerCenterY, 2)
            );
        } while (distanceFromCenter > maxRadius);

        // Adjust position to account for the circle's radius
        circle.style.left = `${x - circleRadius}px`;
        circle.style.top = `${y - circleRadius}px`;

        // Append circle to the container
        glassContainer.appendChild(circle);
    }
});

// function for the gacha to shake
function shakeCircle() {
    const circles = document.querySelectorAll('.circle'); // Select all circles
    circles.forEach(circle => {
        circle.classList.add('shake'); // Add shake class to each circle
    });

    // Remove the shake class after the animation ends (0.5s duration)
    setTimeout(() => {
        circles.forEach(circle => {
            circle.classList.remove('shake');
        });
    }, 450); // 500ms corresponds to the duration of the shake animation
    
    // after shaking finishes, show circle in the output-slot
    setTimeout(() => {
        showCircle();  // Show circle after shaking
    }, 500);  // Match with shake duration (450ms)

}

let currentRotation = 0;
let shown = false;

document.getElementById('knob').addEventListener('click', function() {
    if (shown == false) {
        const turner = this.querySelector('.turner');
    
        // Increment the rotation by 180 degrees with each click
        currentRotation += 180;
    
        // Apply the new rotation
        turner.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;

        shakeCircle();
    }
});

function showCircle() {
    shown = true;
    const colors = [
        "#ff0081", "#ff48a5", "#ff77bc", "#ffaed7", "#ffcae5",
        "#6dd8dd", "#87d7e0", "#bad6e6", "#d4d5e9", "#eed4ec",
        "#ffb6fc", "#eabaff", "#c9c0ff", "#b7ceff", "#b7ddff",
        "#ff6ec7", "#ffb0b0", "#ffc7f8", "#ff68ad", "#ffb2cf"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const circle = document.querySelector('.output-slot .output-circle');
    circle.style.backgroundColor = randomColor;

    if (circle) {
        circle.style.display = 'block';  // Make the circle visible
    }
}

// make the circle hidden when pressed
document.querySelector('.output-slot .output-circle').addEventListener('click', function() {
    const circle = this;

    // Check if circle is visible, then hide it
    if (circle.style.display !== 'none') {
        circle.style.display = 'none';  
        shown = false; 

        showResume();
    }
});

function showResume() {
    const popup = document.getElementById('popup');
    const pdfViewer = document.getElementById('pdfViewer');

    pdfViewer.src = "/misc/resume.pdf";
    console.log(pdfViewer.src);

    popup.style.display = 'flex';
}

// Close the pop-up when the close button is clicked
document.getElementById('closePopup').addEventListener('click', function() {
    const popup = document.getElementById('popup');
    const pdfViewer = document.getElementById('pdfViewer');

    popup.style.display = 'none';
    pdfViewer.src = '';
});