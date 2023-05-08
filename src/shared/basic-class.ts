import EventEmitter from "events";
import { Transformer } from "./transformer";

class BasicClass {
  constructor(
    private readonly transformer: Transformer,
    private readonly eventEmitter: EventEmitter
  ) {}

  public sayHello(name: string): string {
    console.log(this.eventEmitter.listenerCount("test"));

    return this.transformer.transform(`Hello, ${name}`);
  }
}

export default BasicClass;
