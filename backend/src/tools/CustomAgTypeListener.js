/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import AgtypeListener from "./AgtypeListener";

class CustomAgTypeListener extends AgtypeListener {
    rootObject = null;
    objectInsider = [];
    prevObject = null;
    lastObject = null;
    lastValue = null;

    mergeArrayOrObject(key) {
        if(this.prevObject instanceof Array){
            this.mergeArray();
        }else{
            this.mergeObject(key);
        }
    }

    mergeArray() {
        this.prevObject.push(this.lastObject);
        this.lastObject = this.prevObject;
        this.objectInsider.shift();
        this.prevObject = this.objectInsider[1];
    }

    mergeObject(key) {
        this.prevObject[key] = this.lastObject;
        this.lastObject = this.prevObject;
        this.objectInsider.shift();
        this.prevObject = this.objectInsider[1];
    }

    createNewObject(){
        const newObject = {};
        this.objectInsider.unshift(newObject);
        this.prevObject = this.lastObject;
        this.lastObject = newObject;
    }

    createNewArray(){
        const newObject = [];
        this.objectInsider.unshift(newObject);
        this.prevObject = this.lastObject;
        this.lastObject = newObject;
    }

    pushIfArray(value) {
        if(this.lastObject instanceof Array){
            this.lastObject.push(value);
            return true;
        }
        return false;
    }

    exitStringValue(ctx) {
        const value = this.stripQuotes(ctx.getText());
        if(!this.pushIfArray(value)){
            this.lastValue = value;
        }
    }

    exitIntegerValue(ctx) {
        const value = parseInt(ctx.getText());
        if(!this.pushIfArray(value)){
            this.lastValue = value;
        }
    }

    exitFloatValue(ctx) {
        const value = parseFloat(ctx.getText());
        if(!this.pushIfArray(value)){
            this.lastValue = value;
        }
    }

    exitTrueBoolean(ctx) {
        const value = true;
        if(!this.pushIfArray(value)){
            this.lastValue = value;
        }
    }

    exitFalseBoolean(ctx) {
        const value = false;
        if(!this.pushIfArray(value)){
            this.lastValue = value;
        }
    }

    exitNullValue(ctx) {
        const value = null;
        if(!this.pushIfArray(value)){
            this.lastValue = value;
        }
    }


    exitFloatLiteral(ctx) {
        const value = ctx.getText();
        if(!this.pushIfArray(value)){
            this.lastValue = value;
        }
    }


    enterObjectValue(ctx) {
        this.createNewObject();
    }

    enterArrayValue(ctx) {
        this.createNewArray();
    }

    exitObjectValue(ctx) {
        if(this.prevObject instanceof Array){
            this.mergeArray();
        }
    }

    exitPair(ctx) {
        const name = this.stripQuotes(ctx.STRING().getText());

        if (this.lastValue !== undefined) {
            this.lastObject[name] = this.lastValue;
            this.lastValue = undefined;
        } else {
            this.mergeArrayOrObject(name);
        }
    }

    exitAgType(ctx) {
        this.rootObject = this.objectInsider.shift();
    }

    stripQuotes(quotesString) {
        return JSON.parse(quotesString);
    }

    getResult() {
        return this.rootObject || this.lastValue;
    }
}

export default CustomAgTypeListener;
