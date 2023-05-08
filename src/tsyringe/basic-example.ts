import "reflect-metadata";

import { container } from "tsyringe";
import BasicClass from "./basic-class";
import { Module } from "./module";

(async () => {
  new Module();

  const instance = container.resolve(BasicClass);

  console.log(instance.sayHello("John"));
})();
