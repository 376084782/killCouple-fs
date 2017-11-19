declare module EventManager {
    function sub(type: any, fn: Function): any;
    function pub(type: any, ...data): any;
    function unsub(type: any,fn: Function): any;
}

