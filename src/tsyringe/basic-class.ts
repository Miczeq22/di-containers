import { autoInjectable, inject, injectable } from "tsyringe";
import { Transformer } from "../shared/transformer";

@injectable()
class BasicClass {
  constructor(
    // @ts-ignore
    @inject("Transformer")
    private readonly Transformer: Transformer
  ) {}

  public sayHello(name: string): string {
    return this.Transformer.transform(`Hello, ${name}`);
  }
}

export default BasicClass;
