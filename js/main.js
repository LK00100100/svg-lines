
export default class MainScript {

    constructor() {
        //blank
    }

    static addLineButton() {
        let x2 = document.getElementById("line-x2").value;
        let y2 = document.getElementById("line-y2").value;

        MainScript.addLineToSvg(x2, y2);
    }

    /**
     * adds a line from 0,0 to x2,y2 on the svg
     * @param {Number} x2 
     * @param {Number} y2 
     */
    static addLineToSvg(x2, y2) {
        console.log(`x2: ${x2}`);
        console.log(`y2: ${y2}`);

        x2 = Number.parseInt(x2);
        y2 = Number.parseInt(y2);        

        if(x2 == NaN)
            console.error("x2 is invalid");

        if(y2 == NaN)
            console.error("y2 is invalid");

        let originX = 300; 
        let originY = 300;

        //TODO: fix this
        x2 += 300;
        y2 += 300;

        //create line
        let lineElement = document.createElement("line");
        lineElement.setAttribute("x1", originX);
        lineElement.setAttribute("y1", originY);
        lineElement.setAttribute("x2", x2);
        lineElement.setAttribute("y2", y2);
        lineElement.setAttribute("stroke", "black");

        let svgBox = document.getElementById("svg-box");
        svgBox.append(lineElement);

        //force refresh of svg
        svgBox.innerHTML = svgBox.innerHTML;
    }

}