// Generated from src/tools/Agtype.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import AgtypeListener from './AgtypeListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0015R\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003",
    "\u0003\u0003\u0005\u0003\u0018\n\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005",
    "\u0004\"\n\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0007",
    "\u0005(\n\u0005\f\u0005\u000e\u0005+\u000b\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0005\u00051\n\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0007\u0007;\n\u0007\f\u0007\u000e\u0007>\u000b\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0005\u0007D\n\u0007\u0003\b\u0003\b",
    "\u0003\b\u0003\t\u0003\t\u0003\t\u0005\tL\n\t\u0003\t\u0003\t\u0005",
    "\tP\n\t\u0003\t\u0002\u0002\n\u0002\u0004\u0006\b\n\f\u000e\u0010\u0002",
    "\u0002\u0002Y\u0002\u0012\u0003\u0002\u0002\u0002\u0004\u0015\u0003",
    "\u0002\u0002\u0002\u0006!\u0003\u0002\u0002\u0002\b0\u0003\u0002\u0002",
    "\u0002\n2\u0003\u0002\u0002\u0002\fC\u0003\u0002\u0002\u0002\u000eE",
    "\u0003\u0002\u0002\u0002\u0010O\u0003\u0002\u0002\u0002\u0012\u0013",
    "\u0005\u0004\u0003\u0002\u0013\u0014\u0007\u0002\u0002\u0003\u0014\u0003",
    "\u0003\u0002\u0002\u0002\u0015\u0017\u0005\u0006\u0004\u0002\u0016\u0018",
    "\u0005\u000e\b\u0002\u0017\u0016\u0003\u0002\u0002\u0002\u0017\u0018",
    "\u0003\u0002\u0002\u0002\u0018\u0005\u0003\u0002\u0002\u0002\u0019\"",
    "\u0007\u0011\u0002\u0002\u001a\"\u0007\u0012\u0002\u0002\u001b\"\u0005",
    "\u0010\t\u0002\u001c\"\u0007\u0003\u0002\u0002\u001d\"\u0007\u0004\u0002",
    "\u0002\u001e\"\u0007\u0005\u0002\u0002\u001f\"\u0005\b\u0005\u0002 ",
    "\"\u0005\f\u0007\u0002!\u0019\u0003\u0002\u0002\u0002!\u001a\u0003\u0002",
    "\u0002\u0002!\u001b\u0003\u0002\u0002\u0002!\u001c\u0003\u0002\u0002",
    "\u0002!\u001d\u0003\u0002\u0002\u0002!\u001e\u0003\u0002\u0002\u0002",
    "!\u001f\u0003\u0002\u0002\u0002! \u0003\u0002\u0002\u0002\"\u0007\u0003",
    "\u0002\u0002\u0002#$\u0007\u0006\u0002\u0002$)\u0005\n\u0006\u0002%",
    "&\u0007\u0007\u0002\u0002&(\u0005\n\u0006\u0002\'%\u0003\u0002\u0002",
    "\u0002(+\u0003\u0002\u0002\u0002)\'\u0003\u0002\u0002\u0002)*\u0003",
    "\u0002\u0002\u0002*,\u0003\u0002\u0002\u0002+)\u0003\u0002\u0002\u0002",
    ",-\u0007\b\u0002\u0002-1\u0003\u0002\u0002\u0002./\u0007\u0006\u0002",
    "\u0002/1\u0007\b\u0002\u00020#\u0003\u0002\u0002\u00020.\u0003\u0002",
    "\u0002\u00021\t\u0003\u0002\u0002\u000223\u0007\u0011\u0002\u000234",
    "\u0007\t\u0002\u000245\u0005\u0004\u0003\u00025\u000b\u0003\u0002\u0002",
    "\u000267\u0007\n\u0002\u00027<\u0005\u0004\u0003\u000289\u0007\u0007",
    "\u0002\u00029;\u0005\u0004\u0003\u0002:8\u0003\u0002\u0002\u0002;>\u0003",
    "\u0002\u0002\u0002<:\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002\u0002",
    "=?\u0003\u0002\u0002\u0002><\u0003\u0002\u0002\u0002?@\u0007\u000b\u0002",
    "\u0002@D\u0003\u0002\u0002\u0002AB\u0007\n\u0002\u0002BD\u0007\u000b",
    "\u0002\u0002C6\u0003\u0002\u0002\u0002CA\u0003\u0002\u0002\u0002D\r",
    "\u0003\u0002\u0002\u0002EF\u0007\f\u0002\u0002FG\u0007\u0010\u0002\u0002",
    "G\u000f\u0003\u0002\u0002\u0002HP\u0007\u0013\u0002\u0002IP\u0007\u0014",
    "\u0002\u0002JL\u0007\r\u0002\u0002KJ\u0003\u0002\u0002\u0002KL\u0003",
    "\u0002\u0002\u0002LM\u0003\u0002\u0002\u0002MP\u0007\u000e\u0002\u0002",
    "NP\u0007\u000f\u0002\u0002OH\u0003\u0002\u0002\u0002OI\u0003\u0002\u0002",
    "\u0002OK\u0003\u0002\u0002\u0002ON\u0003\u0002\u0002\u0002P\u0011\u0003",
    "\u0002\u0002\u0002\n\u0017!)0<CKO"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map((ds, index) => new antlr4.dfa.DFA(ds, index));

const sharedContextCache = new antlr4.PredictionContextCache();

export default class AgtypeParser extends antlr4.Parser {

    static grammarFileName = "Agtype.g4";
    static literalNames = [null, "'true'", "'false'", "'null'", "'{'",
        "','", "'}'", "':'", "'['", "']'", "'::'", "'-'",
        "'Infinity'", "'NaN'"];
    static symbolicNames = [null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, "IDENT",
        "STRING", "INTEGER", "RegularFloat", "ExponentFloat",
        "WS"];
    static ruleNames = ["agType", "agValue", "value", "obj", "pair", "array",
        "typeAnnotation", "floatLiteral"];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = AgtypeParser.ruleNames;
        this.literalNames = AgtypeParser.literalNames;
        this.symbolicNames = AgtypeParser.symbolicNames;
    }

    get atn() {
        return atn;
    }


    agType() {
        let localctx = new AgTypeContext(this, this._ctx, this.state);
        this.enterRule(localctx, 0, AgtypeParser.RULE_agType);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 16;
            this.agValue();
            this.state = 17;
            this.match(AgtypeParser.EOF);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
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


    agValue() {
        let localctx = new AgValueContext(this, this._ctx, this.state);
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
            if (re instanceof antlr4.error.RecognitionException) {
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


    value() {
        let localctx = new ValueContext(this, this._ctx, this.state);
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
                    throw new antlr4.error.NoViableAltException(this);
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
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


    obj() {
        let localctx = new ObjContext(this, this._ctx, this.state);
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
            if (re instanceof antlr4.error.RecognitionException) {
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


    pair() {
        let localctx = new PairContext(this, this._ctx, this.state);
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
            if (re instanceof antlr4.error.RecognitionException) {
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


    array() {
        let localctx = new ArrayContext(this, this._ctx, this.state);
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
            if (re instanceof antlr4.error.RecognitionException) {
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


    typeAnnotation() {
        let localctx = new TypeAnnotationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 12, AgtypeParser.RULE_typeAnnotation);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 67;
            this.match(AgtypeParser.T__9);
            this.state = 68;
            this.match(AgtypeParser.IDENT);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
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


    floatLiteral() {
        let localctx = new FloatLiteralContext(this, this._ctx, this.state);
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
                    throw new antlr4.error.NoViableAltException(this);
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
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


}

AgtypeParser.EOF = antlr4.Token.EOF;
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

class AgTypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AgtypeParser.RULE_agType;
    }

    agValue() {
        return this.getTypedRuleContext(AgValueContext, 0);
    };

    EOF() {
        return this.getToken(AgtypeParser.EOF, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterAgType(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitAgType(this);
        }
    }


}


class AgValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AgtypeParser.RULE_agValue;
    }

    value() {
        return this.getTypedRuleContext(ValueContext, 0);
    };

    typeAnnotation() {
        return this.getTypedRuleContext(TypeAnnotationContext, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterAgValue(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitAgValue(this);
        }
    }


}


class ValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AgtypeParser.RULE_value;
    }


    copyFrom(ctx) {
        super.copyFrom(ctx);
    }

}


class NullValueContext extends ValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterNullValue(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitNullValue(this);
        }
    }


}

AgtypeParser.NullValueContext = NullValueContext;

class ObjectValueContext extends ValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    obj() {
        return this.getTypedRuleContext(ObjContext, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterObjectValue(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitObjectValue(this);
        }
    }


}

AgtypeParser.ObjectValueContext = ObjectValueContext;

class IntegerValueContext extends ValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    INTEGER() {
        return this.getToken(AgtypeParser.INTEGER, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterIntegerValue(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitIntegerValue(this);
        }
    }


}

AgtypeParser.IntegerValueContext = IntegerValueContext;

class TrueBooleanContext extends ValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterTrueBoolean(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitTrueBoolean(this);
        }
    }


}

AgtypeParser.TrueBooleanContext = TrueBooleanContext;

class FalseBooleanContext extends ValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }


    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterFalseBoolean(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitFalseBoolean(this);
        }
    }


}

AgtypeParser.FalseBooleanContext = FalseBooleanContext;

class FloatValueContext extends ValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    floatLiteral() {
        return this.getTypedRuleContext(FloatLiteralContext, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterFloatValue(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitFloatValue(this);
        }
    }


}

AgtypeParser.FloatValueContext = FloatValueContext;

class StringValueContext extends ValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    STRING() {
        return this.getToken(AgtypeParser.STRING, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterStringValue(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitStringValue(this);
        }
    }


}

AgtypeParser.StringValueContext = StringValueContext;

class ArrayValueContext extends ValueContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

    array() {
        return this.getTypedRuleContext(ArrayContext, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterArrayValue(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitArrayValue(this);
        }
    }


}

AgtypeParser.ArrayValueContext = ArrayValueContext;

class ObjContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AgtypeParser.RULE_obj;
    }

    pair = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(PairContext);
        } else {
            return this.getTypedRuleContext(PairContext, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterObj(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitObj(this);
        }
    }


}


class PairContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AgtypeParser.RULE_pair;
    }

    STRING() {
        return this.getToken(AgtypeParser.STRING, 0);
    };

    agValue() {
        return this.getTypedRuleContext(AgValueContext, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterPair(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitPair(this);
        }
    }


}


class ArrayContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AgtypeParser.RULE_array;
    }

    agValue = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(AgValueContext);
        } else {
            return this.getTypedRuleContext(AgValueContext, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterArray(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitArray(this);
        }
    }


}


class TypeAnnotationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AgtypeParser.RULE_typeAnnotation;
    }

    IDENT() {
        return this.getToken(AgtypeParser.IDENT, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterTypeAnnotation(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitTypeAnnotation(this);
        }
    }


}


class FloatLiteralContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = AgtypeParser.RULE_floatLiteral;
    }

    RegularFloat() {
        return this.getToken(AgtypeParser.RegularFloat, 0);
    };

    ExponentFloat() {
        return this.getToken(AgtypeParser.ExponentFloat, 0);
    };

    enterRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.enterFloatLiteral(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof AgtypeListener) {
            listener.exitFloatLiteral(this);
        }
    }


}


AgtypeParser.AgTypeContext = AgTypeContext;
AgtypeParser.AgValueContext = AgValueContext;
AgtypeParser.ValueContext = ValueContext;
AgtypeParser.ObjContext = ObjContext;
AgtypeParser.PairContext = PairContext;
AgtypeParser.ArrayContext = ArrayContext;
AgtypeParser.TypeAnnotationContext = TypeAnnotationContext;
AgtypeParser.FloatLiteralContext = FloatLiteralContext;
