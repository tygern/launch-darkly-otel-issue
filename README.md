# Launch Darkly – Open Telemetry issue

Reproduces an issue with Launch Darkly and [otel-cf-workers](https://github.com/evanderkoogh/otel-cf-workers).

## Steps to reproduce

1.  Install [jq](https://jqlang.github.io/jq/)
    ```shell
    # On Mac
    brew install jq
    # On Debian
    sudo apt install jq
    ```

1.  Install NPM dependencies
    ```shell
    npm install
    ```

1.  Load feature flags
    ```shell
    ./loadFeatureFlags.sh
    ```

1.  Start the app
    ```shell
    npm start
    ```

1.  Trigger the worker
    ```shell
    curl localhost:8787
    ```

If the issue is successfully reproduced, you'll see an error that looks like this.

```
{"name":"TypeError","message":"Cannot read properties of undefined (reading 'Symbol(unwrap)')","stack":"TypeError: Cannot read properties of undefined (reading 'Symbol(unwrap)')\n    at isWrapped (worker.js:15817:16)\n    at wrap (worker.js:15820:7)\n    at instrumentKVFn (worker.js:16563:10)\n    at Object.get (worker.js:16570:14)\n    at proxyHandler.get (worker.js:15829:25)\n    at JSON.stringify (<anonymous>)\n    at createOptions (worker.js:13348:105)\n    at new LDClient (worker.js:13358:28)\n    at init (worker.js:13399:10)\n    at init2 (worker.js:13432:10)"}
```
