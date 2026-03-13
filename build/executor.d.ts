import { type RuntimeMap, type Language } from "./runtime.js";
export type { ExecResult } from "./types.js";
import type { ExecResult } from "./types.js";
interface ExecuteOptions {
    language: Language;
    code: string;
    timeout?: number;
    /** Keep process running after timeout instead of killing it. */
    background?: boolean;
}
interface ExecuteFileOptions extends ExecuteOptions {
    /** Single file — injects FILE_CONTENT_PATH, FILE_CONTENT, file_path (existing behaviour). */
    path?: string;
    /** Multiple explicit files — injects a `files` map keyed by the given paths. */
    paths?: string[];
    /** Directory — globs all matching files, injects a `files` map, returns resolvedPaths for FTS5 indexing. */
    dir?: string;
    /** Glob filter for dir mode (e.g. "**\/*.ts"). Default: all non-binary files ≤ 100 KB. */
    glob?: string;
}
export declare class PolyglotExecutor {
    #private;
    constructor(opts?: {
        maxOutputBytes?: number;
        hardCapBytes?: number;
        projectRoot?: string;
        runtimes?: RuntimeMap;
        /**
         * Additional environment variables to pass through to sandboxed processes.
         *
         * - `true` — inherit ALL parent environment variables (no filtering).
         * - `string[]` — list of variable names or glob patterns (e.g. `"SLACK_*"`)
         *   to pass through in addition to the built-in whitelist.
         * - `undefined` (default) — only pass the built-in whitelist.
         *
         * Can also be configured via the `CONTEXT_MODE_ENV_PASSTHROUGH` env var:
         * - `"*"` — same as `true`
         * - Comma-separated patterns — e.g. `"SLACK_*,LINEAR_*,MY_TOKEN"`
         */
        envPassthrough?: string[] | true;
    });
    get runtimes(): RuntimeMap;
    /** Kill all backgrounded processes to prevent zombie/port-conflict issues. */
    cleanupBackgrounded(): void;
    execute(opts: ExecuteOptions): Promise<ExecResult>;
    executeFile(opts: ExecuteFileOptions): Promise<ExecResult & {
        resolvedPaths?: string[];
    }>;
}
