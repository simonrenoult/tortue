export type Configuration = {
  server: { port: number };
};

const defaults = {
  port: 3000,
};

export default (): Configuration => {
  return {
    server: { port: getPort() },
  };
};

function getPort(): number {
  const rawPort = process.env.PORT;
  if (!rawPort) return defaults.port;
  return parseInt(rawPort, 10);
}
