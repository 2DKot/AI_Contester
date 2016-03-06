declare class Backend {
    ip: string;
    port: string;
}

declare class Config {
    backend: Backend;
}

declare var config: Config;
