// ES6 Singleton Pattern. We are able to access the same instance
// of the class Global from different files when importing it.

class Global {
  constructor() {
    this.endpoint = "http://localhost:11686/sparql";
  }
}

export default (new Global);