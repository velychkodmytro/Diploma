import React, {Component} from 'react';
import {Form, FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {
    CANVAS_ELEMENT_HEIGHT,
    CANVAS_ELEMENT_WIDTH,
    STEP_GRID,
} from '../constant';
import {drawCircle, drawWorkingArea} from '../drawing-simple-element';
import './diploma.css';
import drawFigure from './drawing-figure';

const randomChoice = (list) => list[Math.floor(Math.random() * list.length)];
const zeroOne = [0, 1];

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

console.log(degrees_to_radians(45));

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
export default class Diploma extends Component {
    constructor(props) {
        super(props);
        const matrix = [];
        for (var i = 0; i < 6; i++) {
            matrix[i] = new Array(6);
        }
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                matrix[i][j] = '-';
            }
        }
        this.state = {
            errorMessage: '',
            updateCanvas: true,
            radius: STEP_GRID * 2,
            radiusArcOverCircle: STEP_GRID * 10,
            stepGrid: STEP_GRID,
            matrix,
        };
        this.listOfZeroesAndOnes = [
            randomChoice(zeroOne),
            randomChoice(zeroOne),
            randomChoice(zeroOne),
            randomChoice(zeroOne),
            randomChoice(zeroOne),
            randomChoice(zeroOne),
            randomChoice(zeroOne),
            randomChoice(zeroOne),
            randomChoice(zeroOne),
            randomChoice(zeroOne),
        ];
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.updateCanvas) {
            this.updateCanvas();
        }
    }

    handleChangeGrid = (event) => {
        const stepGridInputValue = parseInt(event.target.value);
        const {radius, stepGrid, radiusArcOverCircle} = this.state;
        this.setState({
            stepGrid: stepGridInputValue,
            radius: (stepGridInputValue * radius) / stepGrid,
            radiusArcOverCircle:
                (stepGridInputValue * radiusArcOverCircle) / stepGrid,
        });
    };

    handleChange = (event) => {
        const value = parseInt(event.target.value);

        this.setState({[event.target.name]: value});
    };

    handleChangeValue = (event) => {
        this.setState({
            [event.target.name]: parseFloat(event.target.value) || 0,
        });
    };

    handleChangeDegree = (event) => {
        let value = parseInt(event.target.value);
        if (value > 360 && !(value < 0)) {
            value = 0;
        } else if (value < 0) {
            value = 360;
        }
        this.setState({
            [event.target.name]: value,
        });
    };

    updateCanvas = () => {
        const ctx = this.refs.canvas.getContext('2d');
        //ctx.clearRect(0, 0, CANVAS_ELEMENT_WIDTH, CANVAS_ELEMENT_HEIGHT);

        drawFigure(
            ctx,
            this.state.radiusArcOverCircle,
            this.listOfZeroesAndOnes
        );

        const transformFunction = this.props.transformFunction(this.state);
        console.log(transformFunction);
        let transformFunctionAxis;

        if (this.props.showHomographyInputs) {
            transformFunctionAxis = this.props.transformFunction({
                ...this.state,
                axis: true,
            });
        } else {
            transformFunctionAxis = transformFunction;
        }

        drawWorkingArea(
            ctx,
            this.state.stepGrid,
            transformFunction,
            transformFunctionAxis,
            this.props.showGrid
        );
        const xCenter =
            (CANVAS_ELEMENT_WIDTH + this.state.stepGrid * 2) / 2 +
            this.state.offsetX;
        const yCenter =
            (CANVAS_ELEMENT_HEIGHT - this.state.stepGrid * 2) / 2 +
            this.state.offsetY;
        const centerRotate = transformFunction(
            xCenter - 5 + this.state.centerOfRotateX,
            yCenter - 5 + this.state.centerOfRotateY
        );
        ctx.fillRect(centerRotate.x, centerRotate.y, 10, 10);
        ctx.stroke();
    };

    handleAnimation = () => {
        const ctx = this.refs.canvas.getContext('2d');
        let iter = 0;
        setInterval(() => {
            const {radiusArcOverCircle} = this.state;

            if (iter > 10) {
                return;
            }
            const randomFrom = [60, 120, 180, 240, 300, 360];
            const randomTo = [60, 120, 180, 240, 300, 360];

            const from = randomChoice(randomFrom);
            let to = randomChoice(randomTo);

            if (from === to) {
                to = randomChoice(randomTo);
            }

            const indexFrom = randomFrom.indexOf(from);
            const indexTo = randomTo.indexOf(to);
            const valueFrom = this.listOfZeroesAndOnes[indexFrom];
            const valueTo = this.listOfZeroesAndOnes[indexTo];

            let result;
            if (valueFrom) {
                result = randomChoice([0, 1]);
            } else if (valueFrom === 0 && valueTo === 1) {
                result = 1;
            } else {
                result = 0;
            }
            const {matrix} = this.state;
            matrix[indexFrom][indexTo] = result;
            this.setState({matrix});

            console.log(this.matrix);

            const fromCord = {
                x:
                    radiusArcOverCircle * Math.cos(degrees_to_radians(from)) +
                    500,
                y:
                    radiusArcOverCircle * Math.sin(degrees_to_radians(from)) +
                    500,
            };
            const toCord = {
                x: radiusArcOverCircle * Math.cos(degrees_to_radians(to)) + 500,
                y: radiusArcOverCircle * Math.sin(degrees_to_radians(to)) + 500,
            };

            let root1, root2;

            let p1 = toCord.x * fromCord.y - fromCord.x * toCord.y;
            let p2 = fromCord.y - toCord.y;
            let p3 = toCord.x - fromCord.x;

            let a = (1 + p2 / p3) ** 2;
            let b = (p1 * p2) / p3 / p3;
            let c = (p1 / p3) ** 2;

            let discriminant = b * b - 4 * a * c;

            if (discriminant > 0) {
                root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            } else if (discriminant == 0) {
                root1 = root2 = -b / (2 * a);
            } else {
                let realPart = (-b / (2 * a)).toFixed(2);
                let imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
            }
            const k = (toCord.y - fromCord.y) / (toCord.x - fromCord.x);
            const alpha = Math.atan(k);

            requestAnimationFrame(() => {
                ctx.beginPath();
                ctx.moveTo(
                    radiusArcOverCircle * Math.cos(degrees_to_radians(from)) +
                        500,
                    radiusArcOverCircle * Math.sin(degrees_to_radians(from)) +
                        500
                );
                ctx.lineTo(
                    radiusArcOverCircle * Math.cos(degrees_to_radians(to)) +
                        500,
                    radiusArcOverCircle * Math.sin(degrees_to_radians(to)) + 500
                );
                ctx.stroke();

                drawArrowhead(
                    ctx,
                    {
                        x:
                            radiusArcOverCircle *
                                Math.cos(degrees_to_radians(from)) +
                            500,
                        y:
                            radiusArcOverCircle *
                                Math.sin(degrees_to_radians(from)) +
                            500,
                    },
                    {
                        x:
                            radiusArcOverCircle *
                                Math.cos(degrees_to_radians(to)) +
                            500,
                        y:
                            radiusArcOverCircle *
                                Math.sin(degrees_to_radians(to)) +
                            500,
                    },
                    15
                );
            });
            iter++;
        }, 1000);
    };

    render() {
        return (
            <React.Fragment>
                <div className="col-9 canvas-element">
                    <canvas
                        ref="canvas"
                        width={CANVAS_ELEMENT_WIDTH}
                        height={CANVAS_ELEMENT_HEIGHT}
                    />
                </div>
                <div className="col-3 inputs">
                    <Form>
                        <Form.Group></Form.Group>

                        <Form.Group>
                            <Form.Label>Radius of arcs</Form.Label>
                            <FormControl
                                type="number"
                                value={this.state.radiusArcOverCircle}
                                name={'radiusArcOverCircle'}
                                onChange={this.handleChange}
                                min={0}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Value of grid</Form.Label>
                            <FormControl
                                type="number"
                                value={this.state.stepGrid}
                                name={'stepGrid'}
                                onChange={this.handleChangeGrid}
                                min={1}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Count of modules</Form.Label>
                            <FormControl type="number" value="6" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Count of checks</Form.Label>
                            <FormControl type="number" value="10" />
                        </Form.Group>
                        <Form.Group>
                            <Button
                                className="mr-2"
                                variant="primary"
                                onClick={this.handleAnimation}>
                                Animation
                            </Button>
                        </Form.Group>
                    </Form>
                    <div>
                        {this.state.matrix.map((row, i) => (
                            <div key={i}>
                                {row.map((col, j) => (
                                    <span key={j}> {col} </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
