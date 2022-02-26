console.log("index");

class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const p = new Person("jack");
p.getName();
