import { Transformer } from "./transformer";

export class Base64Transformer implements Transformer {
  public transform(value: string): string {
    return Buffer.from(value).toString("base64");
  }
}
