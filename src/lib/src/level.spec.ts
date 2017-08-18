import { TestBed, inject } from '@angular/core/testing';

import { Level } from './level';

describe('Level', () => {

  it('should define initial default levels', () => {
    let level: Level;

    level = Level.getLevel('off');
    expect(level).toEqual(Level.off);

    level = Level.getLevel('fatal');
    expect(level).toEqual(Level.fatal);

    level = Level.getLevel('error');
    expect(level).toEqual(Level.error);

    level = Level.getLevel('warn');
    expect(level).toEqual(Level.warn);

    level = Level.getLevel('info');
    expect(level).toEqual(Level.info);

    level = Level.getLevel('debug');
    expect(level).toEqual(Level.debug);
  });

  it('defines default levels in correct order', () => {
    expect(Level.off.value).toBeGreaterThan(Level.fatal.value);
    expect(Level.fatal.value).toBeGreaterThan(Level.error.value);
    expect(Level.error.value).toBeGreaterThan(Level.warn.value);
    expect(Level.warn.value).toBeGreaterThan(Level.info.value);
    expect(Level.info.value).toBeGreaterThan(Level.debug.value);
  });

  it('can define custom levels', () => {
    const value: number = 600;
    const name: string = 'catastrophic-' + Math.random().toString();
    const displayName: string = 'Catastrophic!';
    const customLevel: Level = new Level(value, name, displayName);

    const newLevel: Level = Level.getLevel(name);
    expect(newLevel).toEqual(customLevel);
  });

  it('allows any numeric value for value property', () => {
    // tslint:disable-next-line:no-magic-numbers
    let value: number = -1000;
    let level: Level = new Level(value, 'test-1000', 'test level -1000');
    expect(level.value).toEqual(value);

    // tslint:disable-next-line:no-magic-numbers
    value = -1.5;
    level = new Level(value, 'test-1.5', 'test level -1.5');
    expect(level.value).toEqual(value);

    // tslint:disable-next-line:no-magic-numbers
    value = 0;
    level = new Level(value, 'test0', 'test level 0');
    expect(level.value).toEqual(value);

    // tslint:disable-next-line:no-magic-numbers
    value = 1.5;
    level = new Level(value, 'test1.5', 'test level 1.5');
    expect(level.value).toEqual(value);

    // tslint:disable-next-line:no-magic-numbers
    value = 1000;
    level = new Level(value, 'test1000', 'test level 1000');
    expect(level.value).toEqual(value);
  });

  it('allows duplicate numeric value for value property', () => {
    // tslint:disable-next-line:no-magic-numbers
    const value: number = 1234;
    let name: string = 'test-' + Math.random().toString();
    let displayName: string = name;
    let level: Level = new Level(value, name, displayName);
    expect(level.value).toEqual(value);

    name = 'test-' + Math.random().toString();
    displayName = name;
    level = new Level(value, name, displayName);
    expect(level.value).toEqual(value);
  });

  it('throws error if an undefined value is specified for value property', () => {
    const name: string = 'test';
    const displayName: string = 'test level';

    // tslint:disable-next-line:no-unnecessary-initializer
    const value: number = undefined;
    expect(() => { const badLevel: Level = new Level(value, name, displayName); }).toThrowError(Error);
  });

  it('throws error if a null value is specified for value property', () => {
    const name: string = 'test';
    const displayName: string = 'test level';

    // tslint:disable-next-line:no-unnecessary-initializer
    const value: number = null;
    expect(() => { const badLevel: Level = new Level(value, name, displayName); }).toThrowError(Error);
  });

  it('throws error if duplicate string value is specified for name property', () => {
    const originalDebugLevel: Level = Level.debug;
    const newDebugValue: number = originalDebugLevel.value + 1;
    const newDebugDisplayName: string = '!!' + originalDebugLevel.displayName + '!!';

    expect(() => { const newDebugLevel: Level = new Level(newDebugValue, originalDebugLevel.name, newDebugDisplayName); })
          .toThrowError(Error);
  });

  it('throws error if an empty string value is specified for name property', () => {
    const value: number = 1000;
    const name: string = '';
    const displayName: string = 'test level';

    expect(() => { const badLevel: Level = new Level(value, name, displayName); }).toThrowError(Error);
  });

  it('throws error if an undefined value is specified for name property', () => {
    const value: number = 1000;
    const name: string = undefined;
    const displayName: string = 'test level';

    expect(() => { const badLevel: Level = new Level(value, name, displayName); }).toThrowError(Error);
  });

  it('throws error if a null value is specified for name property', () => {
    const value: number = 1000;
    const name: string = null;
    const displayName: string = 'test level';

    expect(() => { const badLevel: Level = new Level(value, name, displayName); }).toThrowError(Error);
  });

  it('allows an empty string value for displayName property', () => {
    const value: number = 1111;
    const name: string = 'test-' + Math.random().toString();
    const displayName: string = '';
    const level: Level = new Level(value, name, displayName);
    expect(level.displayName).toEqual(displayName);
  });

  it('allows duplicate string value for displayName property', () => {
    let value: number = 1111;
    let name: string = 'test-' + Math.random().toString();
    const displayName: string = 'test display name';
    let level: Level = new Level(value, name, displayName);
    expect(level.displayName).toEqual(displayName);

    // tslint:disable-next-line:no-magic-numbers
    value = 2222;
    name = 'test-' + Math.random().toString();
    level = new Level(value, name, displayName);
    expect(level.displayName).toEqual(displayName);
  });

  it('throws error if an undefined value is specified for displayName property', () => {
    const value: number = 1000;
    const name: string = 'test-' + Math.random().toString();  /* Ensure it's unique, otherwise 'wrong' error may be thrown */
    const displayName: string = undefined;

    expect(() => { const badLevel: Level = new Level(value, name, displayName); }).toThrowError(Error);
  });

  it('throws error if a null value is specified for displayName property', () => {
    const value: number = 1000;
    const name: string = 'test-' + Math.random().toString();  /* Ensure it's unique, otherwise 'wrong' error may be thrown */
    const displayName: string = null;

    expect(() => { const badLevel: Level = new Level(value, name, displayName); }).toThrowError(Error);
  });

  it('is possible to change the displayName property', () => {
    const level: Level = Level.fatal;
    const originalDisplayName: string = level.displayName;

    let newDisplayName: string = 'Catastrophic!';
    expect(newDisplayName).not.toEqual(originalDisplayName);  /* Just in case! */
    level.displayName = newDisplayName;
    expect(level.displayName).toEqual(newDisplayName);

    newDisplayName = 'Really CATASTROPHIC!!!!!';
    level.displayName = newDisplayName;
    expect(level.displayName).toEqual(newDisplayName);
  });

  it('uses case-insensitive search for levels', () => {
    const value: number = 600;
    const name: string = 'CaTaStRoPhIc-' + Math.random().toString();
    const displayName: string = 'Catastrophic!';
    const level: Level = new Level(value, name, displayName);

    expect(level.name).toEqual(name);

    let newLevel: Level = Level.getLevel(name.toUpperCase());
    expect(newLevel.name).toEqual(name);
    newLevel = Level.getLevel(name.toLowerCase());
    expect(newLevel.name).toEqual(name);
  });

  it('returns null for non-existent levels', () => {
    const nonexistentLevel: Level = Level.getLevel('£$%^&*(');
    expect(nonexistentLevel).toBeNull();
  });
});
