export class RecorderNode extends AudioWorkletNode {
  buffers: Array<Float32Array>;

  constructor(audioContext: AudioContext) {
    super(audioContext, 'recorder-processor');
    this.buffers = [];
    this.port.onmessage = (e: MessageEvent<Float32Array>) => this.buffers.push(e.data);
  }

  getDataRaw(): Float32Array {
    const dataLength = this.buffers.reduce((len, buf) => len + buf.length, 0);
    const data = new Float32Array(dataLength);
    let index = 0;
    this.buffers.forEach((buf) => {
      buf.forEach((d) => {
        data[index] = d;
        index++;
      })
    })
    return data;
  }

  getData(): Float32Array {
    const data = this.getDataRaw();
    const start = data.findIndex((value) => Math.abs(value) >= 0.2);
    return data.slice(start);
  }
}
