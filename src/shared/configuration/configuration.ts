import * as Sentry from "@sentry/node";

export type Configuration = {
  server: { port: number };
  sentry: { dsn: string; release: string };
};

const defaults = {
  port: 3000,
  sentry: { release: "dev" },
};

export default (): Configuration => {
  return {
    server: { port: getPort() },
    sentry: { dsn: getSentryDsn(), release: getSentryRelease() },
  };
};

function getPort(): number {
  const rawPort = process.env.PORT;
  if (!rawPort) return defaults.port;
  return parseInt(rawPort, 10);
}

function getSentryDsn(): string {
  const sentryDsn = process.env.SENTRY_DSN;
  if (!sentryDsn) throw new Error("No environment variable 'SENTRY_DSN' found");
  return sentryDsn;
}

function getSentryRelease(): string {
  const defaultSentryRelease = Sentry.getSentryRelease();
  if (!defaultSentryRelease) return defaults.sentry.release;
  return defaultSentryRelease;
}
