console.log("index");

import {add} from "util";

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

add(1, 2);
