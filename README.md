# Object.setPrototypesOf
multiple inheritance using Proxies

## how
```js
const obj = {};

const baseObj1 = {prop: 'value'};
const baseObj2 = {prop2: 'value2'};
const baseObj3 = {prop3: 'value3'};

Object.setPrototypesOf(obj, baseObj1, baseObj2, baseObj3);
```
