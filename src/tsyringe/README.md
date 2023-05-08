# TSyringe

### 1. Configuration

It relies heavily on decorators

```ts
import { injectable } from "tsyringe";

@injectable()
class Foo {
  constructor(@inject("Database") private database: Database) {}
}

@singleton()
class SingletonExample {}

/** 
  Transient
    The default registration scope, a new instance will be created with each resolve
  Singleton
    Each resolve will return the same instance (including resolves from child containers)
  ResolutionScoped
    The same instance will be resolved for each resolution of this dependency during a single resolution chain
  ContainerScoped
    The dependency container will return the same instance each time a resolution for this dependency is requested. This is similar to being a singleton, however if a child container is made, that child container will resolve an instance unique to it.
*/

@scoped(Lifecycle.Transient)
class ScopedExample {}

// some other file
import "reflect-metadata";
import { container } from "tsyringe";
import { Foo } from "./foo";

const instance = container.resolve(Foo);
```

### 2. Working with container

```ts
import { container } from "tsyringe";

container.register<SomeClassType>("#token", {
  useClass: SomeClass,
});

@registry([
  {
    token: "#token",
    useClass: SomeClass,
  },
])
class Module {}

container.resolve<SomeClassType>("#token");
```

### Pros
- Easy possibility to create module based containers with `@registry`
- Easy to work with, whole work can be done with two-three decorators
- lifecycle scope

### Cons
- You have to "touch" existing code to make it work e.g. @inject decorator
- It works more like a framework instead of a simple lib, i.e. to use it effectively we have to follow the guidelines and use decorators, among other things
- may affect testing

### Steps to include TSyringe to Flick codebase

1. Register dependencies either through `@registry` or `container.register`, it should be quite fast with the module-way with `@registry`

2. Create tokens or re-use existing one (DITypes keys)

3. Change `@Inject` from typedi to `@inject` from TSyringe

