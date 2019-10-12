export default class EventManager {
    static listeners = Array();
    
    static unsubscribe(eventName) {
        this.listeners = this.listeners.filter(listener => { 
            if(listerner.eventName === eventName)
            {
                console.log(`Event ${eventName} deleted`);
            }
            return listener.eventName != eventName; 
        });
    }
    
    static subscribe(eventName, callback) {
        let listener = new Listener(eventName, callback);

        this.listeners.push(listener);

        console.log(`New listener for event ${eventName} added`);
    }

    static publish(eventName, data) {
        console.log(`Event ${eventName} published`);
        
        this.listeners.forEach(listerner => {
            if(listerner.eventName === eventName)
            {
                listerner.callback(data);
            }
        });
    }
}

class Listener {
    eventName;
    callback;

    constructor(eventName, callback)
    {
        this.eventName = eventName;
        this.callback = callback;
    }
}