// var txt = "我是string";

// const shaders = /*wgsl*/ `
// ${txt};
// `;

//顶点着色器  demo1.js入口叫main,这里也叫main
const shaders = /* wgsl*/`

struct VertexOut{
    @builtin(position) position : vec4f,
    @location(0) color : vec4f
}

@vertex
fn vertex_main(@location(0) position: vec4f,
               @location(1) color: vec4f) -> VertexOut{
    var output : VertexOut;
    output.position = position;
    output.color = color;
    return output;
}
//片元着色器
@fragment
fn fragment_main(fragData:VertexOut) -> @location(0) vec4f{
    return fragData.color;
} 

`;

export { shaders };