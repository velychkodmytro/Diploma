import {CANVAS_ELEMENT_HEIGHT, CANVAS_ELEMENT_WIDTH} from '../constant';
import {printText} from '../drawing-simple-element';

function drawArrowhead(context, from, to, radius) {
    var x_center = to.x;
    var y_center = to.y;
    var angle;
    var x;
    var y;
    context.beginPath();
    angle = Math.atan2(to.y - from.y, to.x - from.x);
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;
    context.moveTo(x, y);
    angle += (1.0 / 3.0) * (2 * Math.PI);
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;
    context.lineTo(x, y);
    angle += (1.0 / 3.0) * (2 * Math.PI);
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;
    context.lineTo(x, y);
    context.closePath();
    context.fill();
}

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

console.log(degrees_to_radians(45));
const drawFigure = (
    ctx,
    radiusArcOverCircle,
    listOfZeroesAndOnes,
    from,
    to
) => {
    const elements = () => {
        const randomChoice = (list) =>
            list[Math.floor(Math.random() * list.length)];

        const zeroOne = [0, 1];
        const findNullOrOne = randomChoice(zeroOne);

        ctx.beginPath();
        //ctx.arc(500, 500, radiusArcOverCircle, 0, 2 * Math.PI);
        ctx.stroke();

        printText(
            ctx,
            radiusArcOverCircle * Math.cos(degrees_to_radians(60)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(60)) + 500,
            listOfZeroesAndOnes[0]
        );
        ctx.beginPath();
        ctx.arc(
            radiusArcOverCircle * Math.cos(degrees_to_radians(60)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(60)) + 500,
            50,
            0,
            2 * Math.PI
        );
        ctx.stroke();

        printText(
            ctx,
            radiusArcOverCircle * Math.cos(degrees_to_radians(120)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(120)) + 500,
            listOfZeroesAndOnes[1]
        );
        ctx.beginPath();
        ctx.arc(
            radiusArcOverCircle * Math.cos(degrees_to_radians(120)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(120)) + 500,
            50,
            0,
            2 * Math.PI
        );
        ctx.stroke();

        printText(
            ctx,
            radiusArcOverCircle * Math.cos(degrees_to_radians(180)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(180)) + 500,
            listOfZeroesAndOnes[2]
        );

        ctx.beginPath();
        ctx.arc(
            radiusArcOverCircle * Math.cos(degrees_to_radians(180)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(180)) + 500,
            50,
            0,
            2 * Math.PI
        );

        ctx.stroke();

        printText(
            ctx,
            radiusArcOverCircle * Math.cos(degrees_to_radians(240)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(240)) + 500,
            listOfZeroesAndOnes[3]
        );

        ctx.beginPath();
        ctx.arc(
            radiusArcOverCircle * Math.cos(degrees_to_radians(240)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(240)) + 500,
            50,
            0,
            2 * Math.PI
        );
        ctx.stroke();

        printText(
            ctx,
            radiusArcOverCircle * Math.cos(degrees_to_radians(300)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(300)) + 500,
            listOfZeroesAndOnes[4]
        );

        ctx.beginPath();
        ctx.arc(
            radiusArcOverCircle * Math.cos(degrees_to_radians(300)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(300)) + 500,
            50,
            0,
            2 * Math.PI
        );
        ctx.stroke();

        printText(
            ctx,
            radiusArcOverCircle * Math.cos(degrees_to_radians(360)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(360)) + 500,
            listOfZeroesAndOnes[5]
        );
        ctx.beginPath();
        ctx.arc(
            radiusArcOverCircle * Math.cos(degrees_to_radians(360)) + 500,
            radiusArcOverCircle * Math.sin(degrees_to_radians(360)) + 500,
            50,
            0,
            2 * Math.PI
        );
        ctx.stroke();
    };

    const animate = () => {
        requestAnimationFrame(elements);
        // ctx.clearRect(0, 0, CANVAS_ELEMENT_WIDTH, CANVAS_ELEMENT_HEIGHT);
    };
    animate();
};

export default drawFigure;
