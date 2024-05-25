import { shaders } from './shaders2.js';


console.log('shaders ', shaders);

//获取canvas
const canvas = document.getElementById('canvas');
//console.log(canvas);

const context = canvas.getContext("webgpu");

//console.log(context);

async function init() {
    /*———— init WebGPU start ————*/
    //请求GPU适配器
    const adapter = await navigator.gpu.requestAdapter();
    //请求GPU设备
    const device = await adapter.requestDevice();
    const format = navigator.gpu.getPreferredCanvasFormat();
    //canvas 上下文 配置
    context.configure({
        device,
        format,    //颜色格式
    });


    //创建顶点缓冲区
    const vertices = new Float32Array([
        0.0, 0.6, 0, 1,
        1, 0, 0, 1,

        -0.5, -0.6, 0, 1,
        0, 1, 0, 1,

        0.5, -0.6, 0, 1,
        0, 0, 1, 1

    ]);

    console.log("vertices.byteLength ———→" + vertices.byteLength);

    //创建缓冲区，存放数据
    const vertexBuffer = device.createBuffer({
        size: vertices.byteLength,  //获取字节长度
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST, //缓冲区用途  作为顶点缓冲区 | 可以写入顶点数据
    });

    //写入顶点数据到缓冲区
    device.queue.writeBuffer(vertexBuffer, 0, vertices);

    /*———— 渲染管线 Start ————*/
    //创建渲染管线
    const pipeline = device.createRenderPipeline({
        layout: 'auto', //自动布局
        vertex: {  //顶点的设置 顶点着色器
            module: device.createShaderModule({ code: shaders }),  //设置渲染管线要执行的着色器代码 WGSL
            entryPoint: 'vertex_main',  //入口函数名称
            buffers: [
                {
                    arrayStride: 4 * 8,  //一个顶点占用4个字节 一个顶点由8个值构成
                    attributes: [
                        {
                            shaderLocation: 0, //GPU显存上顶点缓冲区标记存储位置
                            format: 'float32x4', //格式  float32x3一个顶点数据包含3个32位浮点数
                            offset: 0, //arrayStride表示每一组顶点数间隔，offset表示读取该组的偏差字节数，没特殊一般设置0
                        }, {
                            shaderLocation: 1, //这个在shaders2.js里的那个（0）（1）
                            format: 'float32x4',
                            offset: 16,
                        },
                    ],
                    stepMode: 'vertex',
                },
            ],
        },
        fragment: {  //片源的设置 片元着色器
            module: device.createShaderModule({ code: shaders }),  //配置片元着色器的代码
            entryPoint: 'fragment_main', //入口函数名称
            targets: [
                {
                    format,  //上面的navigator.gpu.getPreferredCanvasFormat(); 颜色格式
                },
            ],
        },
        primitive: {  //图元装配
            topology: 'triangle-list', //三角形line-strip
        },
    });
    /*———— 渲染管线 End ————*/

    /*———— 创建GPU命令编码器对象 Start ————*/
    const commandEncoder = device.createCommandEncoder();

    //给渲染通道定制颜色缓冲区，配置指定的缓冲区域
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [
            {
                //指向用于Canvas画布的纹理视图对象
                view: context.getCurrentTexture().createView(),  //获取当前纹理视图
                storeOp: 'store', //像素数据写入颜色缓冲区
                loadOp: 'clear',
                clearValue: { r: 0.0, g: 0.5, b: 1.0, a: 1.0 }, //canvas画布背景颜色
            },
        ],
    });
    /*———— 创建GPU命令编码器对象 End ————*/

    renderPass.setPipeline(pipeline); //设置渲染管线
    renderPass.setVertexBuffer(0, vertexBuffer); //设置顶点缓冲区
    renderPass.draw(3); //绘制三角形
    renderPass.end();

    const commandBuffer = commandEncoder.finish(); //命令编码器 finish 拿到GPU指令
    device.queue.submit([commandBuffer]);

    console.log(device);
}

init();