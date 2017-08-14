
export class Level {
  private static levels: { [key: string]: Level } = Level.initDictionary();
  public static readonly off: Level   = new Level(Number.MAX_VALUE, 'off', 'OFF');
/* tslint:disable:no-magic-numbers */
  public static readonly fatal: Level = new Level(500, 'fatal', 'FATAL');
  public static readonly error: Level = new Level(400, 'error', 'ERROR');
  public static readonly warn: Level  = new Level(300, 'warn',  'WARN');
  public static readonly info: Level  = new Level(200, 'info',  'INFO');
  public static readonly debug: Level = new Level(100, 'debug', 'DEBUG');
/* tslint:enable:no-magic-numbers */

  constructor(public readonly value: number,
              public readonly name: string,
              public displayName: string) {
    Level.levels[name.toLowerCase()] = this;
  }

  private static initDictionary(): { [key: string]: Level } {
    return {};
  }

  public static getLevel(levelName: string): Level {
    const level: Level = this.levels[levelName.toLowerCase()];

    if (!level) {
// tslint:disable-next-line:no-console
      console.error(`LOG4NG: No level defined for \'${levelName.toLowerCase()}\'`);
    }

    return level || null;
  }
}
