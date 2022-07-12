class RecorderProcessor extends AudioWorkletProcessor {
  process(inputs: Array<Array<Float32Array | undefined>>): boolean {
    const data = inputs[0][0]
    if (!data) {
      return false;
    }
    this.port.postMessage(data.subarray());
    return true;
  }
}

registerProcessor('recorder-processor', RecorderProcessor);
