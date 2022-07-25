class Station {
  #code;
  #name;
  #distanceFromSource;

  constructor(code, name, distanceFormSource) {
    this.#code = code;
    this.#name = name;
    this.#distanceFromSource = distanceFormSource;
  }

  get code() {
    return this.#code;
  }
}

module.exports = { Station };
