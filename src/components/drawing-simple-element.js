import { ANGLE_ARROW, CANVAS_ELEMENT_HEIGHT, CANVAS_ELEMENT_WIDTH, WIDTH_AXIS } from "./constant";

const degreeToRadian = degree => Math.PI * degree / 180;

const calculateRotatedPoint = (xCenter, yCenter, x, y, degreeOfRotate,
                               centerOfRotate,
                               isPointHigher = false) => {
    const multiplicative = isPointHigher ? -1 : 1;
    const diffX = xCenter - x;
    const diffY = multiplicative * Math.abs(yCenter - y);
    const v1 = diffX * Math.cos(degreeToRadian(degreeOfRotate));
    const v2 = diffY * Math.sin(degreeToRadian(degreeOfRotate));
    const v3 = diffX * Math.sin(degreeToRadian(degreeOfRotate));
    const v4 = diffY * Math.cos(degreeToRadian(degreeOfRotate));
    return {
        x: xCenter - v1 - v2 - centerOfRotate.x * (Math.cos(degreeToRadian(degreeOfRotate)) - 1) + centerOfRotate.y * Math.sin(degreeToRadian(degreeOfRotate)),
        y: yCenter - v3 + v4 - centerOfRotate.y * (Math.cos(degreeToRadian(degreeOfRotate)) - 1) - centerOfRotate.x * Math.sin(degreeToRadian(degreeOfRotate))
    };
};

const drawLine = (funcForChangePoint = null) => (props, style = {}) => {
    const { ctx, xStart, yStart, xEnd, yEnd } = props;
    const funcChanger = funcForChangePoint ? funcForChangePoint : (x, y) => ({ x, y });
    const { color = "black", width = 1, lineDash = [] } = style;
    ctx.beginPath();
    const startPoint = funcChanger(xStart, yStart);
    const endPoint = funcChanger(xEnd, yEnd);
    ctx.setLineDash(lineDash);
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
};

const drawGrid = (ctx, step, transformFunc) => {
    const draw = drawLine(transformFunc);
    for (let stepGrid = step; stepGrid <= CANVAS_ELEMENT_WIDTH; stepGrid += step) {
        draw({ ctx, xStart: stepGrid, yStart: 0, xEnd: stepGrid, yEnd: CANVAS_ELEMENT_HEIGHT });
    }
    // draw horizontal lines
    for (let stepGrid = step; stepGrid <= CANVAS_ELEMENT_HEIGHT; stepGrid += step) {
        draw({ ctx, xStart: 0, yStart: stepGrid, xEnd: CANVAS_ELEMENT_WIDTH, yEnd: stepGrid });
    }
};

const drawXGrid = (ctx, step, transformFunc) => {
    const draw = drawLine(transformFunc);
    for (let stepGrid = 275; stepGrid <= CANVAS_ELEMENT_WIDTH; stepGrid += step) {
        draw({ ctx, xStart: stepGrid, yStart: 400, xEnd: stepGrid - Math.tan(45) * 275, yEnd: CANVAS_ELEMENT_HEIGHT });
    }
    // draw horizontal lines
    let startX = 250;
    let endX = CANVAS_ELEMENT_WIDTH;
    for (let stepGrid = 400; stepGrid <= CANVAS_ELEMENT_HEIGHT; stepGrid += step) {
        draw({ ctx, xStart: startX, yStart: stepGrid, xEnd: endX, yEnd: stepGrid });
        startX -= 25;
        endX -= 25;
    }
};

const drawAxis = (ctx, step, transformFunc) => {
    // draw axis X
    drawLine(transformFunc)({ ctx, xStart: step * 2, yStart: 0,
        xEnd: step * 2, yEnd: CANVAS_ELEMENT_HEIGHT, axis: true }, { width: WIDTH_AXIS });
    // draw axis Y
    drawLine(transformFunc)({ ctx, xStart: 0, yStart: step * 2,
        xEnd: CANVAS_ELEMENT_WIDTH, yEnd: step * 2, axis: true }, { width: WIDTH_AXIS });
};

const drawAxisXYZ = (ctx, step, transformFunc) => {
    // draw axis Y
    drawLine(transformFunc)({ ctx, xStart: 250, yStart: 400,
        xEnd: 0, yEnd: CANVAS_ELEMENT_HEIGHT - 200, axis: true }, { width: WIDTH_AXIS });
    // draw axis X
    drawLine(transformFunc)({ ctx, xStart: 250, yStart: 400,
        xEnd: CANVAS_ELEMENT_WIDTH, yEnd: 400, axis: true }, { width: WIDTH_AXIS });
    // draw axis Z
    drawLine(transformFunc)({ ctx, xStart: 250, yStart: 400,
        xEnd: 250, yEnd: 0, axis: true }, { width: WIDTH_AXIS });
};

const drawArrows = (ctx, step, transformFunc) => {
    // down arrow
    drawLine(transformFunc)({
            ctx,
            xStart: CANVAS_ELEMENT_WIDTH - step,
            yStart: (step * 2) - Math.tan(ANGLE_ARROW) * step,
            xEnd: CANVAS_ELEMENT_WIDTH,
            yEnd: step * 2
        },
        { width: WIDTH_AXIS });
    drawLine(transformFunc)({
            ctx,
            xStart: CANVAS_ELEMENT_WIDTH - step,
            yStart: (step * 2) + Math.tan(ANGLE_ARROW) * step,
            xEnd: CANVAS_ELEMENT_WIDTH,
            yEnd: step * 2
        },
        { width: WIDTH_AXIS });
    // up arrow
    drawLine(transformFunc)({
            ctx,
            xStart: step * 2 - Math.tan(ANGLE_ARROW) * step,
            yStart: CANVAS_ELEMENT_HEIGHT - step,
            xEnd: step * 2,
            yEnd: CANVAS_ELEMENT_HEIGHT
        },
        { width: WIDTH_AXIS });
    drawLine(transformFunc)({
            ctx,
            xStart: step * 2 + Math.tan(ANGLE_ARROW) * step,
            yStart: CANVAS_ELEMENT_HEIGHT - step,
            xEnd: step * 2,
            yEnd: CANVAS_ELEMENT_HEIGHT
        },
        { width: WIDTH_AXIS });
};

const draw3dArrows = (ctx, step, transformFunc) => {
    // x arrow
    drawLine(transformFunc)({
            ctx,
            xStart: CANVAS_ELEMENT_WIDTH - step,
            yStart: (400) - Math.tan(ANGLE_ARROW) * step,
            xEnd: CANVAS_ELEMENT_WIDTH,
            yEnd: 400
        },
        { width: WIDTH_AXIS });
    drawLine(transformFunc)({
            ctx,
            xStart: CANVAS_ELEMENT_WIDTH - step,
            yStart: (400) + Math.tan(ANGLE_ARROW) * step,
            xEnd: CANVAS_ELEMENT_WIDTH,
            yEnd: 400
        },
        { width: WIDTH_AXIS });
    // z arrow
    drawLine(transformFunc)({
            ctx,
            xStart: 250 - Math.tan(ANGLE_ARROW) * step,
            yStart: step,
            xEnd: 250,
            yEnd: 0
        },
        { width: WIDTH_AXIS });
    drawLine(transformFunc)({
            ctx,
            xStart: 250 + Math.tan(ANGLE_ARROW) * step,
            yStart: step,
            xEnd: 250,
            yEnd: 0
        },
        { width: WIDTH_AXIS });
    // y arrow
    drawLine(transformFunc)({
            ctx,
            xStart: Math.tan(ANGLE_ARROW) * step,
            yStart: CANVAS_ELEMENT_HEIGHT - 225,
            xEnd: 0,
            yEnd: CANVAS_ELEMENT_HEIGHT - 200
        },
        { width: WIDTH_AXIS });
    drawLine(transformFunc)({
            ctx,
            xStart: 25,
            yStart: CANVAS_ELEMENT_HEIGHT - 200 - Math.tan(ANGLE_ARROW) * step,
            xEnd: 0,
            yEnd: CANVAS_ELEMENT_HEIGHT - 200
        },
        { width: WIDTH_AXIS });
};

const drawFlags = (ctx, step, transformFunc) => {
    ctx.fillStyle = "#b11515";
    ctx.font = "20px Arial";
    let point = transformFunc(step + 5, CANVAS_ELEMENT_HEIGHT - step);
    ctx.fillText("Y", point.x, point.y);
    point = transformFunc(step + 5, step);
    ctx.fillText("0", point.x, point.y);
    point = transformFunc(CANVAS_ELEMENT_WIDTH - step, step);
    ctx.fillText("X", point.x, point.y);
    ctx.stroke();
};

const draw3Flags = (ctx, step, transformFunc) => {
    ctx.fillStyle = "#b11515";
    ctx.font = "20px Arial";
    let point = transformFunc(225, step);
    ctx.fillText("Z", point.x, point.y);
    point = transformFunc(225, 400);
    ctx.fillText("0", point.x, point.y);
    point = transformFunc(CANVAS_ELEMENT_WIDTH - step, 390);
    ctx.fillText("X", point.x, point.y);
    point = transformFunc(0, CANVAS_ELEMENT_HEIGHT - 225);
    ctx.fillText("Y", point.x, point.y);
    ctx.stroke();
};

const printText = (ctx, x, y, text) => {
    ctx.fillStyle = "#b11515";
    ctx.font = "30px Arial";
    ctx.fillText(text, x, y);
    ctx.stroke();
};

const drawWorkingArea = (ctx, step, transformFunc, transformFuncAxis, showGrid = true) => {
    if (showGrid) {
        drawGrid(ctx, step, transformFunc);
    }
    drawArrows(ctx, step, transformFuncAxis);
    drawAxis(ctx, step, transformFuncAxis);
    drawFlags(ctx, step, transformFuncAxis);
};

const drawWorking3DArea = (ctx, step, transformFunc, transformFuncAxis, showGrid = false) => {
    if (showGrid) {
        drawXGrid(ctx, step, transformFunc);
    }
    draw3dArrows(ctx, step, transformFuncAxis);
    drawAxisXYZ(ctx, step, transformFuncAxis);
    draw3Flags(ctx, step, transformFuncAxis);
};

const drawArc = transformationFunc => (props, style = {}) => {
    const { ctx, xCenter, yCenter, radius, startAngle, endAngle, degreeOfRotate = 0 } = props;
    const { color = "black", width = 1 } = style;
    const stepSize = (endAngle - startAngle) / 360;
    let angle = startAngle  + 90 + degreeOfRotate;
    let first = true;
    let point;
    while (angle <= endAngle + degreeOfRotate + 90) {
        const px = (Math.sin(degreeToRadian(angle)) * radius) + xCenter,
            py = (-Math.cos(degreeToRadian(angle)) * radius) + yCenter;
        point = transformationFunc(px, py);
        if (first) {
            ctx.moveTo(point.x, point.y);
            first = false;
        } else {
            ctx.lineTo(point.x, point.y);
        }
        angle += stepSize;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
};

const drawAxialDashedLines = ({ ctx, xCenter, yCenter,
                                  lengthHorizontalLine, lengthVerticalLine, centerRotate,
                                  transformationFunc, degreeOfRotate = 0, additionalLength = 0 }) => {
    ctx.beginPath();
    ctx.setLineDash([15, 10]);
    let pointStart = calculateRotatedPoint(xCenter, yCenter,
        xCenter, yCenter - lengthVerticalLine - additionalLength, degreeOfRotate, centerRotate, true);
    let pointEnd = calculateRotatedPoint(xCenter, yCenter,
        xCenter, yCenter + lengthVerticalLine + additionalLength, degreeOfRotate, centerRotate);
    drawLine(transformationFunc)({
        ctx,
        xStart: pointStart.x,
        yStart: pointStart.y,
        xEnd: pointEnd.x,
        yEnd: pointEnd.y,
    }, { color: "gray" });
    pointStart = calculateRotatedPoint(xCenter, yCenter,
        xCenter  - lengthHorizontalLine - additionalLength, yCenter, degreeOfRotate, centerRotate, true);
    pointEnd = calculateRotatedPoint(xCenter, yCenter,
        xCenter + lengthHorizontalLine + additionalLength, yCenter, degreeOfRotate, centerRotate);
    drawLine(transformationFunc)({
        ctx,
        xStart: pointStart.x,
        yStart: pointStart.y,
        xEnd: pointEnd.x,
        yEnd: pointEnd.y,
    }, { color: "gray" });
    ctx.stroke();
    ctx.beginPath();
    ctx.setLineDash([]);
};

const drawCircle = (props, transformationFunc, style = {}) => {
    const { ctx, xCenter, yCenter, radius } = props;
    const { color = "black", width = 1, showDashedLine = false } = style;
    drawArc(transformationFunc)({ ctx, xCenter, yCenter, radius, startAngle: 0, endAngle: 360 }, { color, width });
    if (showDashedLine) {
        drawAxialDashedLines({
            ctx, xCenter, yCenter,
            lengthHorizontalLine: radius, lengthVerticalLine: radius,
            additionalLength: 5, centerRotate: { x: 0, y: 0 }, transformationFunc });
    }
};

const drawSimpleArc = (props, style = {}) => {
    const { ctx, xCenter, yCenter, radius,
        startAngle = 0, endAngle = 360, degreeOfRotate = 0 } = props;
    const { color = "black", width = 1, showDashedLine = false } = style;
    ctx.beginPath();
    ctx.arc(xCenter, yCenter, radius,
        degreeToRadian(startAngle + degreeOfRotate),
        degreeToRadian(endAngle  + degreeOfRotate));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    if (showDashedLine && startAngle === 0 && endAngle === 360) {
        drawAxialDashedLines({
            ctx, xCenter, yCenter,
            lengthHorizontalLine: radius,
            lengthVerticalLine: radius,
            transformationFunc: (x, y) => ({ x, y }),
            centerRotate: { x: 0, y: 0 },
            additionalLength: 5 });
    }
};

const drawRectangle = () => {};

export { drawWorkingArea, drawLine,
         drawCircle, drawArc, drawRectangle,
         drawAxialDashedLines, printText,
         drawSimpleArc, degreeToRadian,
         calculateRotatedPoint, drawWorking3DArea };
