"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _antlr = _interopRequireDefault(require("antlr4"));
var _AgtypeListener = _interopRequireDefault(require("./AgtypeListener.js"));
function _superPropGet(t, o, e, r) { var p = (0, _get2["default"])((0, _getPrototypeOf2["default"])(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /*
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
 */ // Generated from src/tools/Agtype.g4 by ANTLR 4.9.2
// jshint ignore: start
var serializedATN = ["\x03\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786", "\u5964\x03\x15R\x04\x02\t\x02\x04\x03\t\x03\x04\x04", "\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t\x07", "\x04\b\t\b\x04\t\t\t\x03\x02\x03\x02\x03\x02\x03\x03", "\x03\x03\x05\x03\x18\n\x03\x03\x04\x03\x04\x03", "\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05", "\x04\"\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x07", "\x05(\n\x05\f\x05\x0E\x05+\x0B\x05\x03\x05\x03\x05", "\x03\x05\x03\x05\x05\x051\n\x05\x03\x06\x03\x06", "\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07", "\x07\x07;\n\x07\f\x07\x0E\x07>\x0B\x07\x03\x07\x03", "\x07\x03\x07\x03\x07\x05\x07D\n\x07\x03\b\x03\b", "\x03\b\x03\t\x03\t\x03\t\x05\tL\n\t\x03\t\x03\t\x05", "\tP\n\t\x03\t\x02\x02\n\x02\x04\x06\b\n\f\x0E\x10\x02", "\x02\x02Y\x02\x12\x03\x02\x02\x02\x04\x15\x03", "\x02\x02\x02\x06!\x03\x02\x02\x02\b0\x03\x02\x02", "\x02\n2\x03\x02\x02\x02\fC\x03\x02\x02\x02\x0EE", "\x03\x02\x02\x02\x10O\x03\x02\x02\x02\x12\x13", "\x05\x04\x03\x02\x13\x14\x07\x02\x02\x03\x14\x03", "\x03\x02\x02\x02\x15\x17\x05\x06\x04\x02\x16\x18", "\x05\x0E\b\x02\x17\x16\x03\x02\x02\x02\x17\x18", "\x03\x02\x02\x02\x18\x05\x03\x02\x02\x02\x19\"", "\x07\x11\x02\x02\x1A\"\x07\x12\x02\x02\x1B\"\x05", "\x10\t\x02\x1C\"\x07\x03\x02\x02\x1D\"\x07\x04\x02", "\x02\x1E\"\x07\x05\x02\x02\x1F\"\x05\b\x05\x02 ", "\"\x05\f\x07\x02!\x19\x03\x02\x02\x02!\x1A\x03\x02", "\x02\x02!\x1B\x03\x02\x02\x02!\x1C\x03\x02\x02", "\x02!\x1D\x03\x02\x02\x02!\x1E\x03\x02\x02\x02", "!\x1F\x03\x02\x02\x02! \x03\x02\x02\x02\"\x07\x03", "\x02\x02\x02#$\x07\x06\x02\x02$)\x05\n\x06\x02%", "&\x07\x07\x02\x02&(\x05\n\x06\x02'%\x03\x02\x02", "\x02(+\x03\x02\x02\x02)'\x03\x02\x02\x02)*\x03", "\x02\x02\x02*,\x03\x02\x02\x02+)\x03\x02\x02\x02", ",-\x07\b\x02\x02-1\x03\x02\x02\x02./\x07\x06\x02", "\x02/1\x07\b\x02\x020#\x03\x02\x02\x020.\x03\x02", "\x02\x021\t\x03\x02\x02\x0223\x07\x11\x02\x0234", "\x07\t\x02\x0245\x05\x04\x03\x025\x0B\x03\x02\x02", "\x0267\x07\n\x02\x027<\x05\x04\x03\x0289\x07\x07", "\x02\x029;\x05\x04\x03\x02:8\x03\x02\x02\x02;>\x03", "\x02\x02\x02<:\x03\x02\x02\x02<=\x03\x02\x02\x02", "=?\x03\x02\x02\x02><\x03\x02\x02\x02?@\x07\x0B\x02", "\x02@D\x03\x02\x02\x02AB\x07\n\x02\x02BD\x07\x0B", "\x02\x02C6\x03\x02\x02\x02CA\x03\x02\x02\x02D\r", "\x03\x02\x02\x02EF\x07\f\x02\x02FG\x07\x10\x02\x02", "G\x0F\x03\x02\x02\x02HP\x07\x13\x02\x02IP\x07\x14", "\x02\x02JL\x07\r\x02\x02KJ\x03\x02\x02\x02KL\x03", "\x02\x02\x02LM\x03\x02\x02\x02MP\x07\x0E\x02\x02", "NP\x07\x0F\x02\x02OH\x03\x02\x02\x02OI\x03\x02\x02", "\x02OK\x03\x02\x02\x02ON\x03\x02\x02\x02P\x11\x03", "\x02\x02\x02\n\x17!)0<CKO"].join("");
var atn = new _antlr["default"].atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map(function (ds, index) {
  return new _antlr["default"].dfa.DFA(ds, index);
});
var sharedContextCache = new _antlr["default"].PredictionContextCache();
var AgtypeParser = exports["default"] = /*#__PURE__*/function (_antlr4$Parser) {
  function AgtypeParser(input) {
    var _this;
    (0, _classCallCheck2["default"])(this, AgtypeParser);
    _this = _callSuper(this, AgtypeParser, [input]);
    _this._interp = new _antlr["default"].atn.ParserATNSimulator(_this, atn, decisionsToDFA, sharedContextCache);
    _this.ruleNames = AgtypeParser.ruleNames;
    _this.literalNames = AgtypeParser.literalNames;
    _this.symbolicNames = AgtypeParser.symbolicNames;
    return _this;
  }
  (0, _inherits2["default"])(AgtypeParser, _antlr4$Parser);
  return (0, _createClass2["default"])(AgtypeParser, [{
    key: "atn",
    get: function get() {
      return atn;
    }
  }, {
    key: "agType",
    value: function agType() {
      var localctx = new AgTypeContext(this, this._ctx, this.state);
      this.enterRule(localctx, 0, AgtypeParser.RULE_agType);
      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 16;
        this.agValue();
        this.state = 17;
        this.match(AgtypeParser.EOF);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;
          this._errHandler.reportError(this, re);
          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }
      return localctx;
    }
  }, {
    key: "agValue",
    value: function agValue() {
      var localctx = new AgValueContext(this, this._ctx, this.state);
      this.enterRule(localctx, 2, AgtypeParser.RULE_agValue);
      var _la = 0; // Token type
      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 19;
        this.value();
        this.state = 21;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === AgtypeParser.T__9) {
          this.state = 20;
          this.typeAnnotation();
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;
          this._errHandler.reportError(this, re);
          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }
      return localctx;
    }
  }, {
    key: "value",
    value: function value() {
      var localctx = new ValueContext(this, this._ctx, this.state);
      this.enterRule(localctx, 4, AgtypeParser.RULE_value);
      try {
        this.state = 31;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case AgtypeParser.STRING:
            localctx = new StringValueContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 23;
            this.match(AgtypeParser.STRING);
            break;
          case AgtypeParser.INTEGER:
            localctx = new IntegerValueContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 24;
            this.match(AgtypeParser.INTEGER);
            break;
          case AgtypeParser.T__10:
          case AgtypeParser.T__11:
          case AgtypeParser.T__12:
          case AgtypeParser.RegularFloat:
          case AgtypeParser.ExponentFloat:
            localctx = new FloatValueContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 25;
            this.floatLiteral();
            break;
          case AgtypeParser.T__0:
            localctx = new TrueBooleanContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 26;
            this.match(AgtypeParser.T__0);
            break;
          case AgtypeParser.T__1:
            localctx = new FalseBooleanContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 27;
            this.match(AgtypeParser.T__1);
            break;
          case AgtypeParser.T__2:
            localctx = new NullValueContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 28;
            this.match(AgtypeParser.T__2);
            break;
          case AgtypeParser.T__3:
            localctx = new ObjectValueContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 29;
            this.obj();
            break;
          case AgtypeParser.T__7:
            localctx = new ArrayValueContext(this, localctx);
            this.enterOuterAlt(localctx, 8);
            this.state = 30;
            this.array();
            break;
          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;
          this._errHandler.reportError(this, re);
          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }
      return localctx;
    }
  }, {
    key: "obj",
    value: function obj() {
      var localctx = new ObjContext(this, this._ctx, this.state);
      this.enterRule(localctx, 6, AgtypeParser.RULE_obj);
      var _la = 0; // Token type
      try {
        this.state = 46;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input, 3, this._ctx);
        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 33;
            this.match(AgtypeParser.T__3);
            this.state = 34;
            this.pair();
            this.state = 39;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === AgtypeParser.T__4) {
              this.state = 35;
              this.match(AgtypeParser.T__4);
              this.state = 36;
              this.pair();
              this.state = 41;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 42;
            this.match(AgtypeParser.T__5);
            break;
          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 44;
            this.match(AgtypeParser.T__3);
            this.state = 45;
            this.match(AgtypeParser.T__5);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;
          this._errHandler.reportError(this, re);
          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }
      return localctx;
    }
  }, {
    key: "pair",
    value: function pair() {
      var localctx = new PairContext(this, this._ctx, this.state);
      this.enterRule(localctx, 8, AgtypeParser.RULE_pair);
      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 48;
        this.match(AgtypeParser.STRING);
        this.state = 49;
        this.match(AgtypeParser.T__6);
        this.state = 50;
        this.agValue();
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;
          this._errHandler.reportError(this, re);
          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }
      return localctx;
    }
  }, {
    key: "array",
    value: function array() {
      var localctx = new ArrayContext(this, this._ctx, this.state);
      this.enterRule(localctx, 10, AgtypeParser.RULE_array);
      var _la = 0; // Token type
      try {
        this.state = 65;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input, 5, this._ctx);
        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 52;
            this.match(AgtypeParser.T__7);
            this.state = 53;
            this.agValue();
            this.state = 58;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === AgtypeParser.T__4) {
              this.state = 54;
              this.match(AgtypeParser.T__4);
              this.state = 55;
              this.agValue();
              this.state = 60;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 61;
            this.match(AgtypeParser.T__8);
            break;
          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 63;
            this.match(AgtypeParser.T__7);
            this.state = 64;
            this.match(AgtypeParser.T__8);
            break;
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;
          this._errHandler.reportError(this, re);
          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }
      return localctx;
    }
  }, {
    key: "typeAnnotation",
    value: function typeAnnotation() {
      var localctx = new TypeAnnotationContext(this, this._ctx, this.state);
      this.enterRule(localctx, 12, AgtypeParser.RULE_typeAnnotation);
      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 67;
        this.match(AgtypeParser.T__9);
        this.state = 68;
        this.match(AgtypeParser.IDENT);
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;
          this._errHandler.reportError(this, re);
          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }
      return localctx;
    }
  }, {
    key: "floatLiteral",
    value: function floatLiteral() {
      var localctx = new FloatLiteralContext(this, this._ctx, this.state);
      this.enterRule(localctx, 14, AgtypeParser.RULE_floatLiteral);
      var _la = 0; // Token type
      try {
        this.state = 77;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case AgtypeParser.RegularFloat:
            this.enterOuterAlt(localctx, 1);
            this.state = 70;
            this.match(AgtypeParser.RegularFloat);
            break;
          case AgtypeParser.ExponentFloat:
            this.enterOuterAlt(localctx, 2);
            this.state = 71;
            this.match(AgtypeParser.ExponentFloat);
            break;
          case AgtypeParser.T__10:
          case AgtypeParser.T__11:
            this.enterOuterAlt(localctx, 3);
            this.state = 73;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === AgtypeParser.T__10) {
              this.state = 72;
              this.match(AgtypeParser.T__10);
            }
            this.state = 75;
            this.match(AgtypeParser.T__11);
            break;
          case AgtypeParser.T__12:
            this.enterOuterAlt(localctx, 4);
            this.state = 76;
            this.match(AgtypeParser.T__12);
            break;
          default:
            throw new _antlr["default"].error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof _antlr["default"].error.RecognitionException) {
          localctx.exception = re;
          this._errHandler.reportError(this, re);
          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }
      return localctx;
    }
  }]);
}(_antlr["default"].Parser);
(0, _defineProperty2["default"])(AgtypeParser, "grammarFileName", "Agtype.g4");
(0, _defineProperty2["default"])(AgtypeParser, "literalNames", [null, "'true'", "'false'", "'null'", "'{'", "','", "'}'", "':'", "'['", "']'", "'::'", "'-'", "'Infinity'", "'NaN'"]);
(0, _defineProperty2["default"])(AgtypeParser, "symbolicNames", [null, null, null, null, null, null, null, null, null, null, null, null, null, null, "IDENT", "STRING", "INTEGER", "RegularFloat", "ExponentFloat", "WS"]);
(0, _defineProperty2["default"])(AgtypeParser, "ruleNames", ["agType", "agValue", "value", "obj", "pair", "array", "typeAnnotation", "floatLiteral"]);
AgtypeParser.EOF = _antlr["default"].Token.EOF;
AgtypeParser.T__0 = 1;
AgtypeParser.T__1 = 2;
AgtypeParser.T__2 = 3;
AgtypeParser.T__3 = 4;
AgtypeParser.T__4 = 5;
AgtypeParser.T__5 = 6;
AgtypeParser.T__6 = 7;
AgtypeParser.T__7 = 8;
AgtypeParser.T__8 = 9;
AgtypeParser.T__9 = 10;
AgtypeParser.T__10 = 11;
AgtypeParser.T__11 = 12;
AgtypeParser.T__12 = 13;
AgtypeParser.IDENT = 14;
AgtypeParser.STRING = 15;
AgtypeParser.INTEGER = 16;
AgtypeParser.RegularFloat = 17;
AgtypeParser.ExponentFloat = 18;
AgtypeParser.WS = 19;
AgtypeParser.RULE_agType = 0;
AgtypeParser.RULE_agValue = 1;
AgtypeParser.RULE_value = 2;
AgtypeParser.RULE_obj = 3;
AgtypeParser.RULE_pair = 4;
AgtypeParser.RULE_array = 5;
AgtypeParser.RULE_typeAnnotation = 6;
AgtypeParser.RULE_floatLiteral = 7;
var AgTypeContext = /*#__PURE__*/function (_antlr4$ParserRuleCon) {
  function AgTypeContext(parser, parent, invokingState) {
    var _this2;
    (0, _classCallCheck2["default"])(this, AgTypeContext);
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    _this2 = _callSuper(this, AgTypeContext, [parent, invokingState]);
    _this2.parser = parser;
    _this2.ruleIndex = AgtypeParser.RULE_agType;
    return _this2;
  }
  (0, _inherits2["default"])(AgTypeContext, _antlr4$ParserRuleCon);
  return (0, _createClass2["default"])(AgTypeContext, [{
    key: "agValue",
    value: function agValue() {
      return this.getTypedRuleContext(AgValueContext, 0);
    }
  }, {
    key: "EOF",
    value: function EOF() {
      return this.getToken(AgtypeParser.EOF, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterAgType(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitAgType(this);
      }
    }
  }]);
}(_antlr["default"].ParserRuleContext);
var AgValueContext = /*#__PURE__*/function (_antlr4$ParserRuleCon2) {
  function AgValueContext(parser, parent, invokingState) {
    var _this3;
    (0, _classCallCheck2["default"])(this, AgValueContext);
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    _this3 = _callSuper(this, AgValueContext, [parent, invokingState]);
    _this3.parser = parser;
    _this3.ruleIndex = AgtypeParser.RULE_agValue;
    return _this3;
  }
  (0, _inherits2["default"])(AgValueContext, _antlr4$ParserRuleCon2);
  return (0, _createClass2["default"])(AgValueContext, [{
    key: "value",
    value: function value() {
      return this.getTypedRuleContext(ValueContext, 0);
    }
  }, {
    key: "typeAnnotation",
    value: function typeAnnotation() {
      return this.getTypedRuleContext(TypeAnnotationContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterAgValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitAgValue(this);
      }
    }
  }]);
}(_antlr["default"].ParserRuleContext);
var ValueContext = /*#__PURE__*/function (_antlr4$ParserRuleCon3) {
  function ValueContext(parser, parent, invokingState) {
    var _this4;
    (0, _classCallCheck2["default"])(this, ValueContext);
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    _this4 = _callSuper(this, ValueContext, [parent, invokingState]);
    _this4.parser = parser;
    _this4.ruleIndex = AgtypeParser.RULE_value;
    return _this4;
  }
  (0, _inherits2["default"])(ValueContext, _antlr4$ParserRuleCon3);
  return (0, _createClass2["default"])(ValueContext, [{
    key: "copyFrom",
    value: function copyFrom(ctx) {
      _superPropGet(ValueContext, "copyFrom", this, 3)([ctx]);
    }
  }]);
}(_antlr["default"].ParserRuleContext);
var NullValueContext = /*#__PURE__*/function (_ValueContext) {
  function NullValueContext(parser, ctx) {
    var _this5;
    (0, _classCallCheck2["default"])(this, NullValueContext);
    _this5 = _callSuper(this, NullValueContext, [parser]);
    _superPropGet((_this5, NullValueContext), "copyFrom", _this5, 3)([ctx]);
    return _this5;
  }
  (0, _inherits2["default"])(NullValueContext, _ValueContext);
  return (0, _createClass2["default"])(NullValueContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterNullValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitNullValue(this);
      }
    }
  }]);
}(ValueContext);
AgtypeParser.NullValueContext = NullValueContext;
var ObjectValueContext = /*#__PURE__*/function (_ValueContext2) {
  function ObjectValueContext(parser, ctx) {
    var _this6;
    (0, _classCallCheck2["default"])(this, ObjectValueContext);
    _this6 = _callSuper(this, ObjectValueContext, [parser]);
    _superPropGet((_this6, ObjectValueContext), "copyFrom", _this6, 3)([ctx]);
    return _this6;
  }
  (0, _inherits2["default"])(ObjectValueContext, _ValueContext2);
  return (0, _createClass2["default"])(ObjectValueContext, [{
    key: "obj",
    value: function obj() {
      return this.getTypedRuleContext(ObjContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterObjectValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitObjectValue(this);
      }
    }
  }]);
}(ValueContext);
AgtypeParser.ObjectValueContext = ObjectValueContext;
var IntegerValueContext = /*#__PURE__*/function (_ValueContext3) {
  function IntegerValueContext(parser, ctx) {
    var _this7;
    (0, _classCallCheck2["default"])(this, IntegerValueContext);
    _this7 = _callSuper(this, IntegerValueContext, [parser]);
    _superPropGet((_this7, IntegerValueContext), "copyFrom", _this7, 3)([ctx]);
    return _this7;
  }
  (0, _inherits2["default"])(IntegerValueContext, _ValueContext3);
  return (0, _createClass2["default"])(IntegerValueContext, [{
    key: "INTEGER",
    value: function INTEGER() {
      return this.getToken(AgtypeParser.INTEGER, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterIntegerValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitIntegerValue(this);
      }
    }
  }]);
}(ValueContext);
AgtypeParser.IntegerValueContext = IntegerValueContext;
var TrueBooleanContext = /*#__PURE__*/function (_ValueContext4) {
  function TrueBooleanContext(parser, ctx) {
    var _this8;
    (0, _classCallCheck2["default"])(this, TrueBooleanContext);
    _this8 = _callSuper(this, TrueBooleanContext, [parser]);
    _superPropGet((_this8, TrueBooleanContext), "copyFrom", _this8, 3)([ctx]);
    return _this8;
  }
  (0, _inherits2["default"])(TrueBooleanContext, _ValueContext4);
  return (0, _createClass2["default"])(TrueBooleanContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterTrueBoolean(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitTrueBoolean(this);
      }
    }
  }]);
}(ValueContext);
AgtypeParser.TrueBooleanContext = TrueBooleanContext;
var FalseBooleanContext = /*#__PURE__*/function (_ValueContext5) {
  function FalseBooleanContext(parser, ctx) {
    var _this9;
    (0, _classCallCheck2["default"])(this, FalseBooleanContext);
    _this9 = _callSuper(this, FalseBooleanContext, [parser]);
    _superPropGet((_this9, FalseBooleanContext), "copyFrom", _this9, 3)([ctx]);
    return _this9;
  }
  (0, _inherits2["default"])(FalseBooleanContext, _ValueContext5);
  return (0, _createClass2["default"])(FalseBooleanContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterFalseBoolean(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitFalseBoolean(this);
      }
    }
  }]);
}(ValueContext);
AgtypeParser.FalseBooleanContext = FalseBooleanContext;
var FloatValueContext = /*#__PURE__*/function (_ValueContext6) {
  function FloatValueContext(parser, ctx) {
    var _this0;
    (0, _classCallCheck2["default"])(this, FloatValueContext);
    _this0 = _callSuper(this, FloatValueContext, [parser]);
    _superPropGet((_this0, FloatValueContext), "copyFrom", _this0, 3)([ctx]);
    return _this0;
  }
  (0, _inherits2["default"])(FloatValueContext, _ValueContext6);
  return (0, _createClass2["default"])(FloatValueContext, [{
    key: "floatLiteral",
    value: function floatLiteral() {
      return this.getTypedRuleContext(FloatLiteralContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterFloatValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitFloatValue(this);
      }
    }
  }]);
}(ValueContext);
AgtypeParser.FloatValueContext = FloatValueContext;
var StringValueContext = /*#__PURE__*/function (_ValueContext7) {
  function StringValueContext(parser, ctx) {
    var _this1;
    (0, _classCallCheck2["default"])(this, StringValueContext);
    _this1 = _callSuper(this, StringValueContext, [parser]);
    _superPropGet((_this1, StringValueContext), "copyFrom", _this1, 3)([ctx]);
    return _this1;
  }
  (0, _inherits2["default"])(StringValueContext, _ValueContext7);
  return (0, _createClass2["default"])(StringValueContext, [{
    key: "STRING",
    value: function STRING() {
      return this.getToken(AgtypeParser.STRING, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterStringValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitStringValue(this);
      }
    }
  }]);
}(ValueContext);
AgtypeParser.StringValueContext = StringValueContext;
var ArrayValueContext = /*#__PURE__*/function (_ValueContext8) {
  function ArrayValueContext(parser, ctx) {
    var _this10;
    (0, _classCallCheck2["default"])(this, ArrayValueContext);
    _this10 = _callSuper(this, ArrayValueContext, [parser]);
    _superPropGet((_this10, ArrayValueContext), "copyFrom", _this10, 3)([ctx]);
    return _this10;
  }
  (0, _inherits2["default"])(ArrayValueContext, _ValueContext8);
  return (0, _createClass2["default"])(ArrayValueContext, [{
    key: "array",
    value: function array() {
      return this.getTypedRuleContext(ArrayContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterArrayValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitArrayValue(this);
      }
    }
  }]);
}(ValueContext);
AgtypeParser.ArrayValueContext = ArrayValueContext;
var ObjContext = /*#__PURE__*/function (_antlr4$ParserRuleCon4) {
  function ObjContext(parser, parent, invokingState) {
    var _this11;
    (0, _classCallCheck2["default"])(this, ObjContext);
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    _this11 = _callSuper(this, ObjContext, [parent, invokingState]);
    (0, _defineProperty2["default"])(_this11, "pair", function (i) {
      if (i === undefined) {
        i = null;
      }
      if (i === null) {
        return this.getTypedRuleContexts(PairContext);
      } else {
        return this.getTypedRuleContext(PairContext, i);
      }
    });
    _this11.parser = parser;
    _this11.ruleIndex = AgtypeParser.RULE_obj;
    return _this11;
  }
  (0, _inherits2["default"])(ObjContext, _antlr4$ParserRuleCon4);
  return (0, _createClass2["default"])(ObjContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterObj(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitObj(this);
      }
    }
  }]);
}(_antlr["default"].ParserRuleContext);
var PairContext = /*#__PURE__*/function (_antlr4$ParserRuleCon5) {
  function PairContext(parser, parent, invokingState) {
    var _this12;
    (0, _classCallCheck2["default"])(this, PairContext);
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    _this12 = _callSuper(this, PairContext, [parent, invokingState]);
    _this12.parser = parser;
    _this12.ruleIndex = AgtypeParser.RULE_pair;
    return _this12;
  }
  (0, _inherits2["default"])(PairContext, _antlr4$ParserRuleCon5);
  return (0, _createClass2["default"])(PairContext, [{
    key: "STRING",
    value: function STRING() {
      return this.getToken(AgtypeParser.STRING, 0);
    }
  }, {
    key: "agValue",
    value: function agValue() {
      return this.getTypedRuleContext(AgValueContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterPair(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitPair(this);
      }
    }
  }]);
}(_antlr["default"].ParserRuleContext);
var ArrayContext = /*#__PURE__*/function (_antlr4$ParserRuleCon6) {
  function ArrayContext(parser, parent, invokingState) {
    var _this13;
    (0, _classCallCheck2["default"])(this, ArrayContext);
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    _this13 = _callSuper(this, ArrayContext, [parent, invokingState]);
    (0, _defineProperty2["default"])(_this13, "agValue", function (i) {
      if (i === undefined) {
        i = null;
      }
      if (i === null) {
        return this.getTypedRuleContexts(AgValueContext);
      } else {
        return this.getTypedRuleContext(AgValueContext, i);
      }
    });
    _this13.parser = parser;
    _this13.ruleIndex = AgtypeParser.RULE_array;
    return _this13;
  }
  (0, _inherits2["default"])(ArrayContext, _antlr4$ParserRuleCon6);
  return (0, _createClass2["default"])(ArrayContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterArray(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitArray(this);
      }
    }
  }]);
}(_antlr["default"].ParserRuleContext);
var TypeAnnotationContext = /*#__PURE__*/function (_antlr4$ParserRuleCon7) {
  function TypeAnnotationContext(parser, parent, invokingState) {
    var _this14;
    (0, _classCallCheck2["default"])(this, TypeAnnotationContext);
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    _this14 = _callSuper(this, TypeAnnotationContext, [parent, invokingState]);
    _this14.parser = parser;
    _this14.ruleIndex = AgtypeParser.RULE_typeAnnotation;
    return _this14;
  }
  (0, _inherits2["default"])(TypeAnnotationContext, _antlr4$ParserRuleCon7);
  return (0, _createClass2["default"])(TypeAnnotationContext, [{
    key: "IDENT",
    value: function IDENT() {
      return this.getToken(AgtypeParser.IDENT, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterTypeAnnotation(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitTypeAnnotation(this);
      }
    }
  }]);
}(_antlr["default"].ParserRuleContext);
var FloatLiteralContext = /*#__PURE__*/function (_antlr4$ParserRuleCon8) {
  function FloatLiteralContext(parser, parent, invokingState) {
    var _this15;
    (0, _classCallCheck2["default"])(this, FloatLiteralContext);
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    _this15 = _callSuper(this, FloatLiteralContext, [parent, invokingState]);
    _this15.parser = parser;
    _this15.ruleIndex = AgtypeParser.RULE_floatLiteral;
    return _this15;
  }
  (0, _inherits2["default"])(FloatLiteralContext, _antlr4$ParserRuleCon8);
  return (0, _createClass2["default"])(FloatLiteralContext, [{
    key: "RegularFloat",
    value: function RegularFloat() {
      return this.getToken(AgtypeParser.RegularFloat, 0);
    }
  }, {
    key: "ExponentFloat",
    value: function ExponentFloat() {
      return this.getToken(AgtypeParser.ExponentFloat, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.enterFloatLiteral(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof _AgtypeListener["default"]) {
        listener.exitFloatLiteral(this);
      }
    }
  }]);
}(_antlr["default"].ParserRuleContext);
AgtypeParser.AgTypeContext = AgTypeContext;
AgtypeParser.AgValueContext = AgValueContext;
AgtypeParser.ValueContext = ValueContext;
AgtypeParser.ObjContext = ObjContext;
AgtypeParser.PairContext = PairContext;
AgtypeParser.ArrayContext = ArrayContext;
AgtypeParser.TypeAnnotationContext = TypeAnnotationContext;
AgtypeParser.FloatLiteralContext = FloatLiteralContext;
//# sourceMappingURL=AgtypeParser.js.map