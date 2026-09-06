(function (global) {
  'use strict';

  var namespace = global.FastRespChat = global.FastRespChat || {};

  function parseRaw(raw) {
    if (typeof raw === 'string') return JSON.parse(raw);
    if (raw && typeof raw.data === 'string') return JSON.parse(raw.data);
    if (raw && raw.data && typeof raw.data === 'object') return raw.data;
    return raw;
  }

  function ChatProtocolBridge(options) {
    var settings = options || {};
    this.version = settings.version || '1';
    this.customEncode = settings.encode;
    this.customDecode = settings.decode;
  }

  ChatProtocolBridge.prototype.encode = function (command) {
    if (typeof this.customEncode === 'function') return this.customEncode(command);
    return JSON.stringify({
      version: this.version,
      event: command.type,
      requestId: command.requestId,
      conversationId: command.conversationId || null,
      payload: command.payload || {}
    });
  };

  ChatProtocolBridge.prototype.decode = function (raw) {
    if (typeof this.customDecode === 'function') return this.customDecode(raw);
    var frame = parseRaw(raw);
    if (!frame) return [];
    if (Array.isArray(frame)) {
      return frame.reduce(function (events, item) {
        return events.concat(this.decode(item));
      }.bind(this), []);
    }

    var type = frame.event || frame.type;
    var payload = frame.payload === undefined ? frame.data : frame.payload;
    return [{
      type: type,
      requestId: frame.requestId || null,
      conversationId: frame.conversationId || (payload && payload.conversationId) || null,
      payload: payload === undefined ? {} : payload,
      error: frame.error || null
    }];
  };

  namespace.ChatProtocolBridge = ChatProtocolBridge;
})(typeof window !== 'undefined' ? window : globalThis);
