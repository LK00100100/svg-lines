import { Coordinate } from "./Coordinate.js";

export default class MainScript {

    svgDefaultSize = 600;

    constructor() {
        this.svgBox = document.getElementById("svg-box");
    }

    /**
     * reset the svg to an initial starting point.
     * @param {Number} size desired size of the svg
     */
    resetSvg(size) {
        this.svgBox.setAttribute("width", "" + size);
        this.svgBox.setAttribute("height", "" + size);

        this.drawAxis();

        this.clearLines();
    }

    /**
     * draw x and y axis across the canvas
     */
    drawAxis() {
        let svgWidth = this.svgBox.getAttribute("width");
        let svgHeight = this.svgBox.getAttribute("height");
        let svgMidWidth = svgWidth / 2;
        let svgMidHeight = svgHeight / 2;

        //create x axis
        let xAxis = document.createElement("line");
        xAxis.setAttribute("x1", "0");
        xAxis.setAttribute("y1", "" + svgMidHeight);
        xAxis.setAttribute("x2", "" + svgWidth);
        xAxis.setAttribute("y2", "" + svgMidHeight);
        xAxis.setAttribute("stroke", "black");
        xAxis.setAttribute("stroke-width", "0.5");
        xAxis.classList.add("axis");
        this.svgBox.append(xAxis);

        //create y axis
        let yAxis = document.createElement("line");
        yAxis.setAttribute("x1", "" + svgMidWidth);
        yAxis.setAttribute("y1", "0");
        yAxis.setAttribute("x2", "" + svgMidWidth);
        yAxis.setAttribute("y2", "" + svgHeight);
        yAxis.setAttribute("stroke", "black");
        yAxis.setAttribute("stroke-width", "0.5");
        yAxis.classList.add("axis");
        this.svgBox.append(yAxis);

        this.forceSvgRefresh();
    }

    /**
     * clears all lines except x and y axis
     */
    clearLines() {
        for (let i = this.svgBox.children.length - 1; i >= 0; i--) {
            let child = this.svgBox.children[i];

            if (!child.classList.contains("axis"))
                this.svgBox.removeChild(child);
        }
    }

    addLineButton() {
        console.log("SQRT:" + math.sqrt(-4));   // 2i

        let x2 = document.getElementById("line-x2").value;
        let y2 = document.getElementById("line-y2").value;

        this.addLineToSvg(x2, y2);
    }

    /**
     * adds a line from 0,0 to x2,y2 on the svg
     * @param {Number} x2 cartesian coordinate
     * @param {Number} y2 cartesian coordinate
     */
    addLineToSvg(x2, y2) {
        console.log(`x2: ${x2}`);
        console.log(`y2: ${y2}`);

        x2 = Number.parseInt(x2);
        y2 = Number.parseInt(y2);

        if (x2 == NaN)
            console.error("x2 is invalid");

        if (y2 == NaN)
            console.error("y2 is invalid");

        let originCoord = this.translateToSvgPixel(new Coordinate(0, 0));
        let pixelCoord = this.translateToSvgPixel(new Coordinate(x2, y2));

        //create line
        let lineElement = document.createElement("line");
        lineElement.setAttribute("x1", originCoord.x);
        lineElement.setAttribute("y1", originCoord.y);
        lineElement.setAttribute("x2", pixelCoord.x);
        lineElement.setAttribute("y2", pixelCoord.y);
        lineElement.setAttribute("stroke", "black");
        this.svgBox.append(lineElement);

        this.forceSvgRefresh();
    }


    /**
     * 
     * @param {Coordinate} coordinate cartesian coordinate
     * @returns {Coordinate} svg pixel coordinate. (0,0) is upper left corner.
     */
    translateToSvgPixel(coordinate) {
        let svgWidth = this.svgBox.getAttribute("width");
        let svgHeight = this.svgBox.getAttribute("height");
        let svgMidWidth = svgWidth / 2;
        let svgMidHeight = svgHeight / 2;

        let svgOriginX = svgMidWidth;
        let svgOriginY = svgMidHeight;

        let newX = svgOriginX + coordinate.x;
        let newY = svgOriginY - coordinate.y;

        return new Coordinate(newX, newY);
    }

    forceSvgRefresh() {
        this.svgBox.innerHTML = this.svgBox.innerHTML;
    }
}