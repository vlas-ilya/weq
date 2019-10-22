class BaseController {
    constructor() {
        this.onMessage = this.onMessage.bind(this);
        this.searchMethod = this.searchMethod.bind(this);
    }

    onMessage(message) {
        message = JSON.parse(message);
        this.searchMethod(message.type)(message);
    }

    searchMethod(type) {
        const defaultMethod = () => {};
        if (!type) {
            return defaultMethod;
        }
        
        const method = this[type];
        
        if (typeof method !== 'function') {
            return defaultMethod;
        }
        
        return method;
    }
}

module.exports = BaseController;