# Inversify

### 1. Configuration

Similar to tsyringe it relies heavily on decorators and from DX it is very similar

```ts
@injectable()
class Katana implements Weapon {
  public hit() {
    return "cut!";
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return "hit!";
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon;
  private _shuriken: ThrowableWeapon;

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
}
```

### 2. Working with container

```ts
const container = new Container();
container.bind<Warrior>(TYPES.Warrior).to(Ninja);
container.bind<Weapon>(TYPES.Weapon).to(Katana);
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

// With scopes
container.bind<Shuriken>("Shuriken").to(Shuriken).inTransientScope();
container.bind<Shuriken>("Shuriken").to(Shuriken).inSingletonScope();
container.bind<Shuriken>("Shuriken").to(Shuriken).inRequestScope();

const ninja = container.get<Warrior>(TYPES.Warrior);
```

### Pros

- Easy to use
- lifecycle scope support
- Multi-injection support (we can inject another value to existing key and key value will change automatically to array of values)
- we have control over container

### Cons

- Poor support for modularity
- You have to "touch" existing code to make it work e.g. @inject decorator
- It works more like a framework instead of a simple lib, i.e. to use it effectively we have to follow the guidelines and use decorators, among other things

### Steps to include TSyringe to Flick codebase

1. Register dependencies through `container.bind`.

2. Create tokens or re-use existing one (DITypes keys)

3. Change `@Inject` from typedi to `@inject` from Inversify

