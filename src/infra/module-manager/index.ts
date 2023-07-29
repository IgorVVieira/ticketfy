class ModuleManager {
  addSingleton<T>(singleton: any, ...dependencies: any[]): T {
    const dependenciesInstances = dependencies.map((dependency: any) => {
      // se n tiver sido instanciado, instancia
      if (typeof dependency === "function") {
        return new dependency();
      }
      return dependency;
    });
    return new singleton(...dependenciesInstances);
    // return new User(new UserRepository(), new AuthRepository())
  }
}

export default new ModuleManager();
