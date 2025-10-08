(function() {
// Responsive interactive canvas with colored squares reacting to mouse movement
// Target size: 600x300

const canvas = document.createElement('canvas');
document.querySelector('.hero').appendChild(canvas);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const maxWidth = 600;
    const maxHeight = 300;
    const container = document.querySelector('.hero');
    const width = Math.min(maxWidth, container.offsetWidth);
    const height = Math.min(maxHeight, (width / maxWidth) * maxHeight);
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Color palette (bright, tech feel)
const colors = ['#00796d','#019783', '#ff6c00', '#ffc400', '#011d61', '#0051c5'];

// Rounded rectangle helper
function drawRoundedRect(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

// Squares setup
const squares = [];
const numSquares = 50;
for (let i = 0; i < numSquares; i++) {
    squares.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 5 + Math.random() * 10,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
        color: colors[Math.floor(Math.random() * colors.length)]
    });
}

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    squares.forEach(sq => {
        // normal movement
        sq.x += sq.dx;
        sq.y += sq.dy;

        // bounce off edges
        if (sq.x < 0) { sq.x = 0; sq.dx *= -1; }
        if (sq.x > canvas.width - sq.size) { sq.x = canvas.width - sq.size; sq.dx *= -1; }
        if (sq.y < 0) { sq.y = 0; sq.dy *= -1; }
        if (sq.y > canvas.height - sq.size) { sq.y = canvas.height - sq.size; sq.dy *= -1; }

        // react more when mouse is close
        const distX = mouse.x - sq.x;
        const distY = mouse.y - sq.y;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const influence = 100;
        if (dist < influence) {
            const strength = (influence - dist) / influence * 0.5;
            sq.x += (distX / dist) * strength;
            sq.y += (distY / dist) * strength;
        }

        // draw with rounded corners
        drawRoundedRect(ctx, sq.x, sq.y, sq.size, sq.size, 2, sq.color);
    });

    requestAnimationFrame(animate);
}

animate();

})();

document.getElementById('year').textContent = new Date().getFullYear();