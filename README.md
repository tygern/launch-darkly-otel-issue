# Launch Darkly – Open Telemetry issue

Reproduces an issue with Launch Darkle and [otel-cf-workers](https://github.com/evanderkoogh/otel-cf-workers).

## Steps to reproduce

1.  Install dependencies
    ```shell
    npm install
    ```

1.  Load feature flags
    ```shell
    ./loadFeatureFlags.js
    ```

1.  Start the app
    ```shell
    npm start
    ```
