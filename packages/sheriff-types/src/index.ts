export interface Entry {
  ruleName: string;
  parentPluginName: string;
  severity: NumericSeverity;
  ruleOptions: string;
  affectedFiles: string;
  docs: {
    description: string;
    url: string;
  };
}

export type NumericSeverity = 0 | 1 | 2;

export type Severity = NumericSeverity | 'error' | 'warn' | 'off';

export type RuleOptions = [Severity, Record<string, any>] | Severity;

export type Plugins =
  | {
      [key: string]:
        | {
            files: string[];
            rules: any;
            configs: any;
          }
        | undefined;
    }
  | null
  | undefined;

export interface BarebonesConfigAtom {
  rules: Record<string, RuleOptions> | undefined;
  plugins: Plugins;
  files: string[] | undefined;
}
