// VEC3
class _vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    sub(v) {
        return vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    mul(a) {
        return vec3(this.x * a, this.y * a, this.z * a);
    }
    div(a) {
        return vec3(this.x / a, this.y / a, this.z / a);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        return vec3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }
    len2() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    len() {
        return Math.sqrt(this.len2());
    }
    norm() {
        return vec3(this.div(this.len()));
    }
    mulmat(m) {
        let w = this.x * m.a[0][3] + this.y * m.a[1][3] + this.z * m.a[2][3] + m.a[3][3];

        return vec3(
            (this.x * m.a[0][0] + this.y * m.a[1][0] + this.z * m.a[2][0] + m.a[3][0]) / w,
            (this.x * m.a[0][1] + this.y * m.a[1][1] + this.z * m.a[2][1] + m.a[3][1]) / w,
            (this.x * m.a[0][2] + this.y * m.a[1][2] + this.z * m.a[2][2] + m.a[3][2]) / w
        );
    }
    transform(m) {
        return vec3(
            this.x * m.a[0][0] + this.y * m.a[1][0] + this.z * m.a[2][0],
            this.x * m.a[0][1] + this.y * m.a[1][1] + this.z * m.a[2][1],
            this.x * m.a[0][2] + this.y * m.a[1][2] + this.z * m.a[2][2]
        )
    }
    pointTransform(m) {
        return vec3(
            this.x * m.a[0][0] + this.y * m.a[1][0] + this.z * m.a[2][0] + m.a[3][0],
            this.x * m.a[0][1] + this.y * m.a[1][1] + this.z * m.a[2][1] + m.a[3][1],
            this.x * m.a[0][2] + this.y * m.a[1][2] + this.z * m.a[2][2] + m.a[3][2]
        )
    }
}

function vec3(x, y, z) {
    if (x == undefined)
        return new _vec3(0, 0, 0);
    if (typeof(x) == "object")
        return new _vec3(x.x, x.y, x.z);
    if (y == undefined)
        return new _vec3(x, x, x);
    return new _vec3(x, y, z);
}

// MAT4
class _mat4 {
    constructor(
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
    ) {
        this.a = [
            [a00, a01, a02, a03],
            [a10, a11, a12, a13],
            [a20, a21, a22, a23],
            [a30, a31, a32, a33]
        ];
    }

    mul(m) {
        return mat4(
            this.a[0][0] * m.a[0][0] + this.a[0][1] * m.a[1][0] + this.a[0][2] * m.a[2][0] + this.a[0][3] * m.a[3][0],
            this.a[0][0] * m.a[0][1] + this.a[0][1] * m.a[1][1] + this.a[0][2] * m.a[2][1] + this.a[0][3] * m.a[3][1],
            this.a[0][0] * m.a[0][2] + this.a[0][1] * m.a[1][2] + this.a[0][2] * m.a[2][2] + this.a[0][3] * m.a[3][2],
            this.a[0][0] * m.a[0][3] + this.a[0][1] * m.a[1][3] + this.a[0][2] * m.a[2][3] + this.a[0][3] * m.a[3][3],

            this.a[1][0] * m.a[0][0] + this.a[1][1] * m.a[1][0] + this.a[1][2] * m.a[2][0] + this.a[1][3] * m.a[3][0],
            this.a[1][0] * m.a[0][1] + this.a[1][1] * m.a[1][1] + this.a[1][2] * m.a[2][1] + this.a[1][3] * m.a[3][1],
            this.a[1][0] * m.a[0][2] + this.a[1][1] * m.a[1][2] + this.a[1][2] * m.a[2][2] + this.a[1][3] * m.a[3][2],
            this.a[1][0] * m.a[0][3] + this.a[1][1] * m.a[1][3] + this.a[1][2] * m.a[2][3] + this.a[1][3] * m.a[3][3],

            this.a[2][0] * m.a[0][0] + this.a[2][1] * m.a[1][0] + this.a[2][2] * m.a[2][0] + this.a[2][3] * m.a[3][0],
            this.a[2][0] * m.a[0][1] + this.a[2][1] * m.a[1][1] + this.a[2][2] * m.a[2][1] + this.a[2][3] * m.a[3][1],
            this.a[2][0] * m.a[0][2] + this.a[2][1] * m.a[1][2] + this.a[2][2] * m.a[2][2] + this.a[2][3] * m.a[3][2],
            this.a[2][0] * m.a[0][3] + this.a[2][1] * m.a[1][3] + this.a[2][2] * m.a[2][3] + this.a[2][3] * m.a[3][3],

            this.a[3][0] * m.a[0][0] + this.a[3][1] * m.a[1][0] + this.a[3][2] * m.a[2][0] + this.a[3][3] * m.a[3][0],
            this.a[3][0] * m.a[0][1] + this.a[3][1] * m.a[1][1] + this.a[3][2] * m.a[2][1] + this.a[3][3] * m.a[3][1],
            this.a[3][0] * m.a[0][2] + this.a[3][1] * m.a[1][2] + this.a[3][2] * m.a[2][2] + this.a[3][3] * m.a[3][2],
            this.a[3][0] * m.a[0][3] + this.a[3][1] * m.a[1][3] + this.a[3][2] * m.a[2][3] + this.a[3][3] * m.a[3][3]
        )
    }

    frustum(l, r, b, t, n, f) {
        this.a = [
            [2 * n / (r - l), 0, 0, 0],
            [0, 2 * n / (t - b), 0, 0],
            [(r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n), -1],
            [0, 0, -2 * n * f / (f - n), 0]
        ];
    }
}

function mat4(
    a00, a01, a02, a03,
    a10, a11, a12, a13,
    a20, a21, a22, a23,
    a30, a31, a32, a33
) {
    if (a00 == undefined)
        return new _mat4(
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        );
    if (a00 == 1 && a01 == undefined)
        return new _mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    if (typeof a00 == "object")
        return new _mat4(
            a00[0][0], a00[0][1], a00[0][2], a00[0][3],
            a00[1][0], a00[1][1], a00[1][2], a00[1][3],
            a00[2][0], a00[2][1], a00[2][2], a00[2][3],
            a00[3][0], a00[3][1], a00[3][2], a00[3][3]
        )
    return new _mat4(
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        a30, a31, a32, a33
    );
}

// RENDER
class _render {
    loadShader(shaderType, shaderSource) {
        const shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            let buf = this.gl.getShaderInfoLog(shader);
            console.log('Shader compile fail: ' + buf);
        }                                            
        return shader;
    } 

    constructor(canvas) {
        let rect = canvas.getBoundingClientRect();

        this.gl = canvas.getContext("webgl2");
        this.width = rect.right - rect.left + 1;
        this.height = rect.bottom - rect.top + 1;

        this.gl.enable(this.gl.DEPTH_TEST);

        let vs_txt =
        `#version 300 es
    precision highp float;
    in vec3 InPosition;
    in vec3 InNormal;
        
    out vec3 DrawPos;
    out vec3 DrawNormal;
    uniform float Time;
    uniform mat4 MatWVP;
    uniform mat4 MatW;
    
    void main( void )
    {
        DrawPos = vec3(MatW * vec4(InPosition, 4));
        gl_Position = MatWVP * vec4(InPosition, 1);
        DrawNormal = mat3(transpose(inverse(MatW))) * InNormal;
    }
    `;
        let fs_txt =
        `#version 300 es
    precision highp float;

    in vec3 DrawNormal;
    in vec3 DrawPos;
    out vec4 OutColor;
    
    uniform float Time;
    
    void main( void )
    {
        vec3 color = vec3(188.0 / 255.0, 143.0 / 255.0, 143.0 / 255.0);
        vec3 N = normalize(DrawNormal);
        N = faceforward(N, normalize(DrawPos), N);

        float d = max(0.1, dot(normalize(vec3(-1, 1, 1)), normalize(N)));

        OutColor = vec4(color * d, 1.0);
    } 
    `;
        let
            vs = this.loadShader(this.gl.VERTEX_SHADER, vs_txt),
            fs = this.loadShader(this.gl.FRAGMENT_SHADER, fs_txt);
        this.prg = this.gl.createProgram();
        this.gl.attachShader(this.prg, vs); 
        this.gl.attachShader(this.prg, fs);
        this.gl.linkProgram(this.prg);
        if (!this.gl.getProgramParameter(this.prg, this.gl.LINK_STATUS)) {
            let buf = this.gl.getProgramInfoLog(this.prg);
            console.log('Shader program link fail: ' + buf);
        }                                            

        this.timeLoc = this.gl.getUniformLocation(this.prg, "Time");
        this.wvpLoc = this.gl.getUniformLocation(this.prg, "MatWVP");
        this.wLoc = this.gl.getUniformLocation(this.prg, "MatW");
        
        this.gl.useProgram(this.prg);
        this.gl.clearColor(194 / 255, 177 / 255, 184/ 255, 1);

        this.projSize = 0.1;
        this.projDist = 0.1;
        this.farClip = 300;

        let rx = this.projSize;
        let ry = this.projSize;

        if (this.width >= this.height)
            rx *= this.width / this.height;
        else
            ry *= this.height / this.width;

        this.proj = mat4();
        this.proj.frustum(-rx, rx, -ry, ry, this.projDist, this.farClip);
    } 

    render() { 
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
                                                    
        if (this.timeLoc != -1) {
            const date = new Date();
            let t = date.getMinutes() * 60 +
                    date.getSeconds() +
                    date.getMilliseconds() / 1000;
        
            this.gl.uniform1f(this.timeLoc, t);
        }
    }
}

// VERTEX
class _vertex {
    constructor(pos, norm) {
        this.pos = pos;
        this.norm = norm;
    }
}

// PRIM
class _prim {
    constructor(rnd, verts, inds) {
        let vtts = [], i = 0;

        for (let el of verts) {
            vtts[i++] = el.pos.x;
            vtts[i++] = el.pos.y;
            vtts[i++] = el.pos.z;
            vtts[i++] = el.norm.x;
            vtts[i++] = el.norm.y;
            vtts[i++] = el.norm.z;
        }
        const posLoc = rnd.gl.getAttribLocation(rnd.prg, "InPosition"); 
        this.vertexArray = rnd.gl.createVertexArray();
        const normLoc = rnd.gl.getAttribLocation(rnd.prg, "InNormal");
        rnd.gl.bindVertexArray(this.vertexArray);
        this.vertexBuffer = rnd.gl.createBuffer();

        rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, this.vertexBuffer);
        rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, new Float32Array(vtts), rnd.gl.STATIC_DRAW);
        
        if (posLoc != -1) {
            rnd.gl.vertexAttribPointer(posLoc, 3, rnd.gl.FLOAT, false, 24, 0);
            rnd.gl.enableVertexAttribArray(posLoc);
            rnd.gl.vertexAttribPointer(normLoc, 3, rnd.gl.FLOAT, false, 24, 12);
            rnd.gl.enableVertexAttribArray(normLoc);
        }

        this.indexBuffer = rnd.gl.createBuffer();
        rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(inds), rnd.gl.STATIC_DRAW);

        this.numOfElements = inds.length;

        this.world = mat4(1);
    }
    draw(rnd) {
        rnd.gl.bindVertexArray(this.vertexArray);
        rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        rnd.gl.drawElements(rnd.gl.TRIANGLES, this.numOfElements, rnd.gl.UNSIGNED_INT, 0);
        if (rnd.wvpLoc != -1) {
            rnd.gl.uniformMatrix4fv(rnd.wvpLoc, false, new Float32Array([].concat(...(this.world.mul(rnd.proj)).a)));
        }
        if (rnd.wLoc != -1) {
            rnd.gl.uniformMatrix4fv(rnd.wLoc, false, new Float32Array([].concat(...(this.world.a))));
        }
    }
}

function rotateX(angle) {
    let 
        si = Math.sin(angle),
        co = Math.cos(angle);

    return mat4(1, 0, 0, 0,
        0, co, si, 0,
        0, -si, co, 0,
        0, 0, 0, 1);

}

function translate(v) {
    let m = mat4(1);

    m.a[3][0] = v.x;
    m.a[3][1] = v.y;
    m.a[3][2] = v.z;

    return m;
}

function vertex(pos, norm) {
    return new _vertex(pos, vec3());
}

function autoNormals(verts, inds) {
    for (let i = 0; i < verts.length; i++)
        verts[i].norm = vec3();
    
    for (let i = 0; i < inds.length; i += 3)
    {
        let
            n0 = inds[i], n1 = inds[i + 1], n2 = inds[i + 2];
        let
            p0 = verts[n0].pos,
            p1 = verts[n1].pos,
            p2 = verts[n2].pos,
            N = p1.sub(p0).cross(p2.sub(p0)).norm();
    
        verts[n0].norm = verts[n0].norm.add(N);
        verts[n1].norm = verts[n1].norm.add(N);
        verts[n2].norm = verts[n2].norm.add(N);
    }
    
    for (let i = 0; i < verts.length; i++)
        verts[i].norm = verts[i].norm.norm();
}

class _figure {
    constructor(verts) {
        this.verts = [...verts];
    }
    cube() {
      let verts = [
          [vec3(-1, -1, -1), vec3(-1, 1, -1), vec3(1, 1, -1), vec3(1, -1, -1)], 
          [vec3(-1, -1, 1), vec3(-1, 1, 1), vec3(1, 1, 1), vec3(1, -1, 1)],     
          [vec3(-1, -1, -1), vec3(-1, 1, -1), vec3(-1, 1, 1), vec3(-1, -1, 1)], 
          [vec3(1, -1, -1), vec3(1, 1, -1), vec3(1, 1, 1), vec3(1, -1, 1)],     
          [vec3(-1, -1, -1), vec3(-1, -1, 1), vec3(1, -1, 1), vec3(1, -1, -1)], 
          [vec3(-1, 1, -1), vec3(-1, 1, 1), vec3(1, 1, 1), vec3(1, 1, -1)],     
                  ];

      return new _figure(verts);
    }
    tetrohedron() {
      let sq2 = Math.sqrt(2), sq3 = Math.sqrt(3);
      let k = sq3 / 2, k1 = sq2 / sq3;
      let p0 = vec3(-1.5, -k, 0), p1 = p0.add(vec3(1.5, 3 * k, 0)), p2 = p0.add(vec3(3, 0, 0));
      let p3 = p0.add(p1).add(p2).div(3).add(vec3(0, 0, -3 * k1));

      let verts = [
          [p0, p1, p2],
          [p0, p1, p3],
          [p1, p2, p3], 
          [p2, p0, p3]
      ];
      return new _figure(verts);
    }

    createPrim(rnd) {
        let inds = [];
        let v = [];
        let j = 0;

        for (let g of this.verts)
        {
            for (let p of g)
                v.push(vertex(p));

            for (let i = 2; i < g.length; i++) {
                inds.push(0 + j);
                inds.push(i - 1 + j);
                inds.push(i + j);
            }
            j += g.length;
        }

        autoNormals(v, inds);

        return new _prim(rnd, v, inds);
    }
}

function main() {
    let rnd, pr, rnd1, pr1;

    function init() {
      rnd = new _render(document.getElementById("myCan"));
      rnd1 = new _render(document.getElementById("myCan1"));

      let pl = new _figure([]);
      pl = pl.tetrohedron();
      pr = pl.createPrim(rnd);
      pl = pl.cube();
      pr1 = pl.createPrim(rnd1);
    }

    window.addEventListener("load", () => {
      init();

      const draw = () => {
        rnd.render();
        const date = new Date();
        let t = date.getMinutes() * 60 +
                date.getSeconds() +
                date.getMilliseconds() / 1000;
        pr.world = rotateX(t * 3).mul(translate(vec3(0, 0, -8)));
        pr.draw(rnd);
        rnd1.render();
        pr1.world = rotateX(t * 2).mul(translate(vec3(0, 0, -8)));
        pr1.draw(rnd1);
        window.requestAnimationFrame(draw);
      };
      draw();
    });
};  

main();
