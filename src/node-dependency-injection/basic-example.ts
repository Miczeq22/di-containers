import {
  ContainerBuilder,
  JsonFileLoader,
  YamlFileLoader,
} from "node-dependency-injection";
import path from "path";
import BasicClass from "../shared/basic-class";

(async () => {
  const dir = path.join(__dirname, "..");

  const container = new ContainerBuilder(false, dir);

  const loader = new JsonFileLoader(container);

  await loader.load(path.join(__dirname, "services.json"));

  const service = container.get(BasicClass);

  console.log(service.sayHello("John"));
})();
