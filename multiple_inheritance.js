if(!Object.setPrototypesOf) {
    /*
    * How it will work?
    * We set the prototype of the object, on which we called setPrototypesOf(), to a Proxy, and
    * it will dispatch the [[Get]]/[[Set]] requests to the prototypes
    * Why not directly wrap the object into a proxy and return it?
    * Because we would then have to use the Proxy returned and no more the object directly
    * */
    Object.setPrototypesOf = function(target, ...prototypes) {

        if(!target || typeof target != "object") {
            throw new TypeError("'target' must be an object");
        }

        if(prototypes.length == 0) {
            throw new TypeError("insert two or more prototypes");
        }

        if(prototypes.length == 1) {
            throw new TypeError("use Object.setPrototypeOf instead");
        }

        if(prototypes.find(prototype => typeof prototype != "object" && !prototype)) {
            throw new TypeError("a prototype is not an object");
        }


        // target == the object on which we called setPrototypesOf()
        target[Symbol.for("[[Prototypes]]")] = [...prototypes];

        const proxy = new Proxy({}, {
            get(target, propertyKey, receiver) {
                // if the trap is executed, it means that the object
                // did not own this property directly, because if it had been so
                // the proxy would not have been triggered
                // target = the empty unused wrapped obj
                // receiver = the object on which we called setPrototypesOf()

                for (const prototype of receiver[Symbol.for("[[Prototypes]]")]) {
                    if(Reflect.has(prototype, propertyKey)) {
                        // if the property were a getter
                        // this inside them will be the receiver (inheritance/polymorphism principle)
                        // console.log("GET");
                        return Reflect.get(prototype, propertyKey, receiver);
                    }
                }

                // property no found
                return undefined;
            },

            set(target, propertyKey, value, receiver) {
                // if the trap is executed, it means that the object
                // did not own this property directly, because if it had been so
                // the proxy would not have been triggered
                // target = the empty unused wrapped obj
                // receiver = the object on which we called setPrototypesOf()

                for (const prototype of receiver[Symbol.for("[[Prototypes]]")]) {
                    if(Reflect.has(prototype, propertyKey)) {
                        // if the property were a setter
                        // this inside them will be the receiver (inheritance/polymorphism principle)
                        // Generally, even if a property were found in one of the prototypes
                        // we have to set it on the receiver
                        // console.log("SET");
                        return Reflect.set(prototype, propertyKey, value, receiver);
                    }
                }

                // property no found in the prototypes?
                // we have to set it to the receiver without reusing Reflect.set
                // because the trap would be triggered again in an endless cycle
                return Reflect.defineProperty(receiver, propertyKey, {
                    value
                });
            },

        });

        Object.setPrototypeOf(target, proxy);

        return target;
    }

}
