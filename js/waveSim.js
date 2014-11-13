/**
 * Created by scarzer on 11/9/14.
 */

var canvas = document.getElementById("waveSim");
var rect   = canvas.getBoundingClientRect();
var gl = canvas.getContext("webgl");

canvas.onmousedown      = function(){};
document.onmouseup      = function(){};
document.onmousemove    = function(){};



document.getElementById('SinX').oninput = createHandle('SinX');
document.getElementById('SinY').oninput = createHandle('SinY');
document.getElementById('CosX').oninput = createHandle('CosX');
document.getElementById('CosY').oninput = createHandle('CosY');

compileShaders(gl, "waveSim-vertex", "waveSim-fragment");

// Start setting up the GL Stuff here
// Buffers and what not

gl.clearColor(0,0,0,1);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);

var sqrt2inv = 1.0 / 1.414213562;

var sinX, sinY, cosX, cosY, grid;

// The initial grid will be 64 x 64....

// Creating a field
var forceGrid = createGrid(grid);
var velocGrid = createGrid(grid);
var positGrid = createGrid(grid);

// An array that will
// void getFaceNormSegs(void)
// {
//     float center0[3], center1[3], normSeg0[3], normSeg1[3];
//     float geom0[3], geom1[3], geom2[3], geom3[3];
//
//     for(int i=0; i < grid-1; i++) {
//     for(int j=0; j < grid-1; j++) {
//         geom0[0] = i;   geom0[1] = j;   geom0[2] = posit[ i ][j];
//         geom1[0] = i;   geom1[1] = j+1; geom1[2] = posit[ i ][j+1];
//         geom2[0] = i+1; geom2[1] = j;   geom2[2] = posit[i+1][j];
//         geom3[0] = i+1; geom3[1] = j+1; geom3[2] = posit[i+1][j+1];
//
//         // find center of triangle face by averaging three vertices
//         add( center0, geom2, geom0 );
//         add( center0, center0, geom1 );
//         scalDiv( center0, 3.0 );
//
//         add( center1, geom2, geom1 );
//         add( center1, center1, geom3 );
//         scalDiv( center1, 3.0 );
//
//         // translate normal to center of triangle face to get normal segment
//         add( normSeg0, center0, faceNorms[0][i][j] );
//         add( normSeg1, center1, faceNorms[1][i][j] );
//
//         copy( faceNormSegs[0][0][i][j], center0 );
//         copy( faceNormSegs[1][0][i][j], center1 );
//
//         copy( faceNormSegs[0][1][i][j], normSeg0 );
//         copy( faceNormSegs[1][1][i][j], normSeg1 );
//     }
// }
// }



var vertexNormalBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);


// We finish all of the init stuff. AND THEN WE DO THE BOOP
boop();

// Vector addition function. Returns a vector;
function vecAdd(vec1, vec2){
    var vecRes = Array(3);
    vecRes[0] = vec1[0] + vec2[0];
    vecRes[1] = vec1[1] + vec2[1];
    vecRes[2] = vec1[2] + vec2[2];

    return vecRes;
}

// Vector Subtraction
function vecSub(vec1, vec2){
    var vecRes = Array(3);
    vecRes[0] = vec1[0] - vec2[0];
    vecRes[1] = vec1[1] - vec2[1];
    vecRes[2] = vec1[2] - vec2[2];

    return vecRes;
}

// Vector copy, cause arrays are passed by reference in JS
function vecCopy(vec1){
    var vecRes = Array(3);
    vecRes[0] = vec1[0];
    vecRes[1] = vec1[1];
    vecRes[2] = vec1[2];
}

// Vector Cross Multiplication
function vecCross(vec1, vec2){
    var vecRes = Array(3);
    vecRes[0] = (vec1[1] * vec2[2]) - (vec1[2] * vec2[1]);
    vecRes[1] = (vec1[2] * vec2[0]) - (vec1[0] * vec2[2]);
    vecRes[2] = (vec1[0] * vec2[1]) - (vec1[1] * vec2[0]);

}

// Vector Normalization Function
function vecNorm(vec1){
    var vecLen = Math.sqrt( Math.exp(vec1[0], 2) + Math.exp(vec1[1], 2) + Math.exp(vec1[2],2) );
    var vecRes = Array(3);

    vecRes[0] = vec1[0] / vecLen;
    vecRes[1] = vec1[1] / vecLen;
    vecRes[2] = vec1[2] / vecLen;

}

function makeScene(){
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHegiht);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.prospective()

}

function boop(){

}

// My own convience function :D
function compileShaders(ctx, vShaderID, fShaderID){

    var vShaderSrc = document.getElementById(vShaderID).innerHTML;if(!vShaderSrc) return console.error("Error getting vShader");

    var fShaderSrc = document.getElementById(fShaderID).innerHTML;
    if(!fShaderSrc) return console.error("Error getting fShader");

    initShaders(ctx, vShaderSrc, fShaderSrc)
};

// Simplyifying the handles on the sliders. Cause Javascript is awesome like that
function createHandle(elementID){
    return function(){
        document.getElementById(elementID+'Span').innerHTML = this.value;
    }
}

function createGrid(gridSize){

    var theGrid = Array(gridSize);

    for(var i = 0; i < gridSize; i++){
        theGrid[i] = Array(gridSize);
        for(var j = 0; j < gridSize; j++){
            theGrid[i][j] = 0;
        }
    }
}

function getFaceNormals(){

    // Center of edges;
    var center0 = Array(3);
    var center1 = Array[3];

    // Normal Segments
    var normSeg0 = Array(3);
    var normSeg1 = Array(3);

    // Geometric Coordinates
    var geom0   = Array(3);
    var geom1   = Array(3);
    var geom2   = Array(3);
}
