
export class Level {
  private static levels: { [key: string]: Level } = Level.initDictionary();
  public static readonly off: Level   = new Level(Number.MAX_VALUE, 'off', 'OFF');
// tslint:disable:no-magic-numbers
  public static readonly fatal: Level = new Level(500, 'fatal', 'FATAL');
  public static readonly error: Level = new Level(400, 'error', 'ERROR');
  public static readonly warn: Level  = new Level(300, 'warn',  'WARN');
  public static readonly info: Level  = new Level(200, 'info',  'INFO');
  public static readonly debug: Level = new Level(100, 'debug', 'DEBUG');
// tslint:enable:no-magic-numbers
  private _displayName: string;

// tslint:disable:no-console
  constructor(public readonly value: number,
              public readonly name: string,
              displayName: string) {
    if (value == null) {    /* Inexact so it will also catch undefined values */
      console.error(`LOG4NGX: A numeric value must be specified for 'value'`);
    } else {
      if (name == null /* Inexact so it will also catch undefined values */ || name.length === 0) {
        console.error(`LOG4NGX: A non-null, non-empty string value must be specified for 'name'`);
      } else {
        const key: string = name.toLowerCase();
        const level: Level = Level.levels[key];
        if (level) {
          console.error(`LOG4NGX: A level has already been defined with the name '${key}'`);
        } else {
          if (this.isDisplayNameValid(displayName)) {
            this._displayName = displayName;
            Level.levels[key] = this;
          }
        }
      }
    }
  }

  private static initDictionary(): { [key: string]: Level } {
    return Object.create(null);   /* Use null prototype to ensure there are no default keys */
  }

  public static getLevel(levelName: string): Level {
    let level: Level = null;

    if (levelName) {
      level = this.levels[levelName.toLowerCase()];
      if (!level) {
        console.error(`LOG4NGX: No level defined for '${levelName.toLowerCase()}'`);
      }
    }

    return level || null;
  }

  public get displayName(): string {
    return this._displayName;
  }
  public set displayName(displayName: string) {
    if (this.isDisplayNameValid(displayName)) {
      this._displayName = displayName;
    }
  }

  private isDisplayNameValid(displayName: string): boolean {
    let isValid: boolean = true;

    if (displayName == null) {    /* Inexact so it will also catch undefined values */
      console.error(`LOG4NGX: A string value must be specified for 'displayName'`);
      isValid = false;
    }

    return isValid;
  }
// tslint:enable:no-console
}
