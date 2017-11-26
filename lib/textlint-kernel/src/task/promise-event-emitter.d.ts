/// <reference types="node" />
import { EventEmitter } from "events";
import Bluebird = require("bluebird");
export declare class PromiseEventEmitter {
    private events;
    constructor();
    listenerCount(type: string | symbol): number;
    on(event: string, listener: (...args: any[]) => void): EventEmitter;
    emit(event: string, ...args: Array<any>): Bluebird<Array<void>>;
}