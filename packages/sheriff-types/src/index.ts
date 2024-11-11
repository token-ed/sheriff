export interface NoRestrictedSyntaxSlice {
  selector: string;
  message: string;
}

export interface Entry {
  ruleName: string;
  parentPluginName: string;
  severity: NumericSeverity;
  ruleOptions: RuleOptionsConfig;
  affectedFiles: string;
  docs: {
    description: string;
    url: string;
  };
}

export type NumericSeverity = 0 | 1 | 2;
export type StringSeverity = 'error' | 'warn' | 'off';
export type Severity = NumericSeverity | StringSeverity;

export type RuleOptions =
  | [Severity, ...(Record<string, unknown> | string)[]]
  | Severity
  | undefined;

export type Plugins =
  | {
      [key: string]:
        | {
            files?: string[];
            rules?: any;
            configs?: any;
          }
        | undefined;
    }
  | null
  | undefined;

export interface BarebonesConfigAtom {
  rules?: Record<string, RuleOptions> | undefined;
  plugins?: Plugins;
  files?: string[] | undefined;
}

export interface ExportableConfigAtom {
  rules?: Record<string, any>;
  plugins?: Plugins;
  files?: string[];
  languageOptions?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  ignores?: string[];
}

export type RuleOptionsConfig = (Record<string, any> | string)[];

export interface SheriffConfigurablePlugins {
  /**
   * React support.
   */
  react: boolean;
  /**
   * Lodash support.
   */
  lodash: boolean;
  /**
   * Remeda support.
   */
  remeda: boolean;
  /**
   * Nextjs support.
   */
  next: boolean;
  /**
   * Astro support.
   */
  astro: boolean;
  /**
   * Playwright support.
   */
  playwright: boolean;
  /**
   * Jest support. Select this or vitest, not both.
   */
  jest: boolean;
  /**
   * Vitest support. Select this or jest, not both.
   */
  vitest: boolean;
}

export interface SheriffSettings extends Partial<SheriffConfigurablePlugins> {
  /**
   * This parameter allows you to override the paths for some Sheriff settings.
   */
  pathsOverrides?: {
    /**
     * With this setting, if you have multiple tsconfig.json files in your project (like tsconfig.json, tsconfig.eslint.json, tsconfig.node.json, etc...) you can specify which config Sheriff will pickup. You can also specify a list of paths, see: https://typescript-eslint.io/linting/typed-linting/monorepos/#one-tsconfigjson-per-package-and-an-optional-one-in-the-root.
     */
    tsconfigLocation?: string | string[];
    /**
     * This setting overrides the default Sheriff filepaths for Vitest and Jest linting. It accepts an array of filepaths, dictaced by minimatch syntax. Sheriff will apply Jest or Vitest rules only on these files.
     */
    tests?: string[];
    /**
     * This setting overrides the default Sheriff filepaths for Playwright linting. It accepts an array of filepaths, dictaced by minimatch syntax. Sheriff will apply Playwright rules only on these files.
     */
    playwrightTests: string[];
  };
  /**
   * This setting apply some ignore patterns to the whole config.
   */
  ignores?: {
    /**
     * Some commonly ignored folders.
     */
    recommended?: boolean;
    /**
     * With this setting, Sheriff will ignore all the files that are currently ignored by git. Chances are that if you are ignoring a file in git, you don't want to lint it, which usually is the case with temporary and autogenerated files.
     */
    inheritedFromGitignore?: boolean;
  };
  /**
   * This setting accepts an array of filepaths, dictaced by minimatch syntax. Only the matching files found in this array will be linted. All other files will be ignored. This is useful if you want to lint only a subset of your project.
   */
  files?: string[];
}

export interface ServerResponse {
  compiledConfig: Entry[];
  pluginsNames: string[];
  totalAvailableRulesAmount?: number;
}
