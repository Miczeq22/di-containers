import { Container } from "inversify";
import TYPES from "./types";
import { Katana, Ninja, Shuriken } from "./classes";
import { Warrior, Weapon, ThrowableWeapon } from "./interfaces";

(async () => {
  const container = new Container();
  container.bind<Warrior>(TYPES.Warrior).to(Ninja);
  container.bind<Weapon>(TYPES.Weapon).to(Katana);
  container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

  const ninja = container.get<Warrior>(TYPES.Warrior);

  console.log(ninja.fight());
  console.log(ninja.sneak());
})();
