import { init } from '@launchdarkly/cloudflare-server-sdk';

export interface Env {
  LAUNCH_DARKLY_KV: KVNamespace,
  LAUNCH_DARKLY_CLIENT_ID: string,
}

export default {
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
