import { init } from '@launchdarkly/cloudflare-server-sdk';
import { BatchTraceSpanProcessor, instrument } from '@microlabs/otel-cf-workers';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

export interface Env {
  LAUNCH_DARKLY_KV: KVNamespace,
  LAUNCH_DARKLY_CLIENT_ID: string,
}

export const handler = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const launchDarklyClient = await init(
      env.LAUNCH_DARKLY_CLIENT_ID,
      env.LAUNCH_DARKLY_KV
    ).waitForInitialization();

    const sayHello = await launchDarklyClient.variation(
      'say-hello',
      { kind: 'user', key: 'placeholder' },
      false
    );

    return new Response(`${sayHello ? 'Hello' : 'Hi'} World!`);
  }
};

export default instrument(handler, {
	exporter: new ConsoleSpanExporter(),
	service: { name: "launch-darkly-otel-issue" },
	spanProcessors: new BatchTraceSpanProcessor(),
})
