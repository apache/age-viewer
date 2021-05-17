import AgtypeListener from "./AgtypeListener";

class CustomAgTypeListener extends AgtypeListener {
    rootObject = null;
    objectInsider = [];
    lastValue = null;

    exitStringValue(ctx) {
        this.lastValue = this.stripQuotes(ctx.getText());
    }

    exitIntegerValue(ctx) {
        this.lastValue = parseInt(ctx.getText());
    }

    exitFloatValue(ctx) {
        this.lastValue = parseFloat(ctx.getText());
    }

    exitTrueBoolean(ctx) {
        this.lastValue = true;
    }

    exitFalseBoolean(ctx) {
        this.lastValue = false;
    }

    exitNullValue(ctx) {
        this.lastValue = null;
    }

    enterObjectValue(ctx) {
        this.objectInsider.unshift({});
        this.lastValue = this.objectInsider[0];
    }

    exitObjectValue(ctx) {
        if (this.objectInsider.length >= 2 && this.objectInsider[1] instanceof Array) {
            const currentObject = this.objectInsider.shift();
            this.objectInsider[0].push(currentObject);
        }
    }

    enterArrayValue(ctx) {
        this.objectInsider.unshift([]);
        this.lastValue = this.objectInsider[0];
    }

    exitArrayValue(ctx) {
        if (this.objectInsider.length >= 2 && this.objectInsider[1] instanceof Array) {
            // if objectInsider == Object then is pair or root
            const currentObject = this.objectInsider.shift();
            this.objectInsider[0].push(currentObject);
        }
    }


    exitPair(ctx) {
        const name = this.stripQuotes(ctx.STRING().getText());

        if (this.lastValue !== undefined) {
            this.objectInsider[0][name] = this.lastValue;
            this.lastValue = undefined;
        } else {
            const lastValue = this.objectInsider.shift();
            if (this.objectInsider[0] instanceof Array) {
                this.objectInsider[0].push(lastValue);
            } else {
                this.objectInsider[0][name] = lastValue;
            }
        }
    }

    exitFloatLiteral(ctx) {
        this.lastValue = ctx.getText();
    }

    exitAgType(ctx) {
        this.rootObject = this.objectInsider.shift();
    }

    stripQuotes(quotesString) {
        return JSON.parse(quotesString);
    }

    getResult() {
        return this.rootObject;
    }
}

export default CustomAgTypeListener;
