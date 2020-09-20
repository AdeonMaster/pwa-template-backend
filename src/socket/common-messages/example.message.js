export default (io) => {
  io.onMessage('ExampleMessage', async ({ payload }, { decoded }) => {
    console.log(payload, decoded);
  });
};
