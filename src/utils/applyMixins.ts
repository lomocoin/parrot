export default function applyMixins(derivedConstructor: any, baseConstructors: any[]) {
  baseConstructors.forEach(constructor => {
    Object.getOwnPropertyNames(constructor.prototype).forEach(name => {
      derivedConstructor.prototype[name] = constructor.prototype[name];
    })
  })
};
