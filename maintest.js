const CounterFactory = () => {
  let number = 1;
  const addOne = () => {
    number++;
    console.log(number);
  };
  const returnNumber = () => {
    return number;
  };
  return { number, addOne, returnNumber };
};

counter = CounterFactory();
counter.addOne(); // 2
counter.addOne(); // 3
console.log(counter.returnNumber()); // 3
console.log(counter.number); // 1  why not 3?
counter.number = 0;
counter.addOne(); // 4  why not 1?
console.log(counter.number); // 0  here it remembers the variable was changed

const ListFactory = () => {
  const list = [];
  const returnList = () => {
    return list;
  };
  const addOne = () => {
    list.push(1);
    console.log(list);
  };
  return { list, returnList, addOne };
};

const listObject = ListFactory();
listObject.addOne(); // [ 1 ]
listObject.addOne(); // [ 1, 1 ]
console.log(listObject.returnList()); // [ 1, 1 ]
console.log(listObject.list); // [ 1, 1 ]
