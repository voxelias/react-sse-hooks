import * as React from 'react';
import { useRef } from 'react';
import EventSourceContext from './EventSourceContext';
import ImplementationNotExists from './exceptions/ImplementationNotExists';
var internalEventSource = window && window.EventSource;
var EventSourceProvider = function (_a) {
    var eventSource = _a.eventSource, children = _a.children;
    var connections = useRef({});
    if (!internalEventSource && !eventSource)
        throw new ImplementationNotExists();
    var createConnection = function (url, options) {
        var _a;
        if (options === void 0) { options = {}; }
        var EventSourceImplementation = eventSource || internalEventSource;
        var connection = new EventSourceImplementation(url, options);
        connections.current = Object.assign({}, connections, (_a = {}, _a[url] = connection, _a));
        return connection;
    };
    var getConnection = function (url) { return connections.current[url]; };
    return (React.createElement(EventSourceContext.Provider, { value: {
            createConnection: createConnection,
            getConnection: getConnection,
        } }, children));
};
export default EventSourceProvider;
