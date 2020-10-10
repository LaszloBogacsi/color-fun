window.onload = () => {

    const mousePos = new Coords2D(0, 0);
    const rgbColor = new RGBColor(0, 0, 0);

    const { body, mouseP, colors } = makePage();

    document.onmousemove = (e) => updateMousePosition(mousePos, e);

    setInterval(apply, 50, body, mousePos, rgbColor, updateElementContent);

    function updateElementContent() {
        updateContent({ position: { element: mouseP, text: `${mousePos.printCoords()}` }, colors: { element: colors, text: rgbColor.printRGB() } })
    }
}

function makePage() {
    const body = document.querySelector("body");
    const bodyStyle = {
        height: '100vh',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    applyStyle(bodyStyle, body);

    const div = document.createElement("DIV");
    const mouseP = document.createElement("P");
    const colors = document.createElement("P");
    document.body.appendChild(div);
    const infoWrapperStyle = {
        boxShadow: "12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(255, 255, 255, 0.3)",
        borderRadius: "50px",
        width: "20rem",
        height: "10rem",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    }
    const infoStyle = {
        color: 'white',
        mixBlendMode: 'difference',
        fontFamily: "Nunito Sans, sans-serif"
        
    };

    applyStyle(infoWrapperStyle, div);
    applyStyle(infoStyle, mouseP);
    applyStyle(infoStyle, colors);

    div.appendChild(mouseP);
    div.appendChild(colors);
    return { body, mouseP, colors };
}

function apply(body, mousePos, rgbColor, updateElementContent) {
    updateColor(mousePos, body, rgbColor);
    applyColor(body, rgbColor);
    updateElementContent();
}

function applyColor(element, rgbColor) {
    applyStyle({ backgroundColor: rgbColor.getRGBFnString() }, element)
}

function updateContent(elementsContents) {
    Object.keys(elementsContents).forEach(key => updateInnerHtml(elementsContents[key].element, elementsContents[key].text));
}

function updateMousePosition(mousePos, e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
}

function updateInnerHtml(element, text) {
    if (element.innerHTML !== text) 
    element.innerHTML = text;
}

function updateColor(mousePos, body, rgbColor) {
    rgbColor.r = getColorValue(mousePos.x, body.offsetWidth);;
    rgbColor.g = getColorValue(mousePos.y, body.offsetHeight);
    rgbColor.b = getColorValue((mousePos.x + mousePos.y) / 2, (body.offsetWidth + body.offsetHeight) / 2);

    return rgbColor;
}

function applyStyle(styles, element) {
    Object.keys(styles).forEach(key => element.style[key] = styles[key]);
}

function getColorValue(num, numMax) {
    return Math.round((num / numMax) * 255);
}

function Coords2D(x, y) {
    Coords2D.prototype.printCoords = () => `X: ${this.x}, Y: ${this.y}`;
}

function RGBColor(r, g, b) {
    RGBColor.prototype.printRGB = () => `R: ${this.r}, G: ${this.g}, B: ${this.b}`;
    RGBColor.prototype.getRGBFnString = () => `rgb(${this.r}, ${this.g}, ${this.b})`;
}

