// WeiQi.js 0.1.1
// (c) 2011 Huang Wei, imonyse@gmail.com


// TODO: what I really need for a sgf go player?
// 1. Create on the fly. Can be created from the console, and attached to DOM.
// 2. Control playing mode effortlessly.
// 3. Easy debug, better testing.
(function() {
  var root = this;
  
  // require underscore, a very userful library offers high order functions
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) {
    _ = require('underscore')._;
  }
  
  // The top-level namespace. All public WeiQi classes and modules will be
  // attached to this.
  var WeiQi;

  WeiQi = root.WeiQi = {};

  /* ----------------------------------------------------------------
   * @group SGFNode, SGFProperty
   * ---------------------------------------------------------------- */

  // A property of an SGF node. An SGF node is described by an Array of these
  var SGFProperty;
  var SGFNode;

  SGFProperty = function(name, value){
    this.name = name || null;
    if (typeof value !== 'undefined' && value !== null) {
      this.value = [value];
    } else {
      this.value = [];
    }
  };

  _.extend(SGFProperty.prototype, {
    get: function() {
      return this.name;
    },

    add: function(value) {
      this.value[this.value.length] = value;
    },

    overwrite: function(value) {
      this.value = value;
    }
  });

  SGFNode = function(property){
    this._property = property || new SGFProperty();
    this._parent = null;
    this._child = null;
    this._next = null;
  };

  _.extend(SGFNode.prototype, {
    prev: function() {
      
    },

    root: function() {
      
    },

    addStone: function(color, movex, movey) {
      
    },

    addPlay: function(who, movex, movey) {
      
    },

    addPlayLast: function(who, movex, movey) {
      
    },

    writeResult: function(score, overwrite) {
      
    },

    writeHeader: function(root, overwrite, seed, komi, handicap, level, rules) {
      
    },

    label: function(label, i, j) {
      
    },

    circle: function(i, j) {
      
    },

    square: function(i, j) {
      
    },

    triangle: function(i, j) {
      
    },

    mark: function(i, j) {
      
    },

    addComment: function(comment) {
      
    },

    boardText: function(i, j, text) {
      
    },

    boardChar: function(i, j, c) {
      
    },

    boardNumber: function(i, j, number) {
      
    },

    startVariant: function() {
      
    },

    startVariantFirst: function() {
      
    },

    addChild: function() {
      
    },

    createHeaderNode: function(boardsize, komi, handicap) {
      
    },

    // build and return raw sgf text
    sgf: function() {
      
    },

    show_sgf_properties: function() {
      
    },

    show_sgf_tree: function() {
      
    },

    is_markup_node: function() {
      
    },

    is_move_node: function() {
      
    },

    is_pass_node: function() {
      
    },

    find_move: function() {
      
    }
  });


  /* ----------------------------------------------------------------
   * @group SGFTree
   * ---------------------------------------------------------------- */
  var SGFTree;
  
  SGFTree = function(sgf_text){
    this.root = parse_sgf_text(sgf_text);
  };

  _.extend(SGFTree.prototype, {
    clear: function() {
      this.root = null;
      this.lastnode = null;
    },

    back: function() {

    },

    forward: function() {
      
    },

    addPlay: function(color, movex, movey) {
      
    },

    addPlayLast: function(color, movex, movey) {
      
    },

    addStone: function(color, movex, movey) {
      
    },

    writeResult: function(score, overwrite) {
      
    },

    nodeCheck: function() {
      
    },

    circle: function(i, j) {
      
    },

    square: function(i, j) {
      
    },

    triangle: function(i, j) {
      
    },

    mark: function(i, j) {
      
    },

    addComment: function(comment) {
      
    },

    boardText: function(i, j, text) {
      
    },

    boardChar: function(i, j, c) {
      
    },

    boardNumber: function(i, j, number) {
      
    },

    startVariant: function() {
      
    },

    startVariantFirst: function() {
      
    },

    createHeaderNode: function(boardsize, komi, handicap) {
      
    },

    setLastNode: function(lastnode) {
      
    }
  });

  
  /* ----------------------------------------------------------------
   * @group SGFParser
   * ---------------------------------------------------------------- */
  WeiQi.SGFParser = function(sgf_text) {
    this.sgf_text = sgf_text;
    this.lookahead = this.sgf_text;
    this.non_whitespace = /\S/;
    this.STRICT_SGF = 's';
    this.LAX_SGF = 'l';
  };
  
  _.extend(WeiQi.SGFParser.prototype, {
    step_next: function(i) {
      if (typeof i === 'undefined') {
	i = 0;
      }
      this.lookahead = this.lookahead.slice(i+1);
    },
    
    // get the next non-whitespace character
    nexttoken: function() {
      var token = null,
          i = 0;

      if (this.lookahead !== null) {
	// update this.lookahead
	i = this.lookahead.search(this.non_whitespace);
	if (i === -1) {
	  this.lookahead = null;
	  token = null;
	} else {
	  token = this.lookahead.slice(i).charAt(0);
	  this.step_next(i);
	}
      }

      return token;
    },

    match: function(expected) {
      if (this.lookahead.charAt(0) !== expected) {
	throw("expected: " + expected);
      } else {
	this.nexttoken();
      }
    },

    propvalue: function() {
      var v = null;

      this.match('[');
      // regex match couldn't be done here because we have to ignore the
      // backslash escaping character
      while (this.lookahead !== null && this.lookahead.charAt(0) !== ']') {
	if (this.lookahead.charAt(0) === '\\') {
	  // FF4 definition of backslash
	  this.step_next();
	  if (this.lookahead === '\r') {
	    this.step_next();
	    if (this.lookahead === '\n') {
	      this.step_next();
	    }
	  }
	} else if (this.lookahead === '\n') {
	  this.step_next();
	  if (this.lookahead === '\r') {
	    this.step_next();
	  }
	}
	
	if (v === null) {
	  v = this.lookahead.charAt(0);
	} else {
	  v += this.lookahead.charAt(0);
	}
	this.step_next();
      }
      
      this.match(']');

      return v;
    },

    propident: function() {
      var name = null,
          result = null,
          ident_reg = /^([A-Z]+)(\[)/;

      if (this.lookahead === null) {
	throw("propident: Expected an upper case letter");
      }

      result = this.lookahead.match(ident_reg);
      if (result !== null) {
	name = result[1];
      } else {
	throw("propident: Expected an upper case letter as prop name");
      }

      this.lookahead = this.lookahead.slice(this.lookahead.indexOf(result[2]));
      return name;
    },

    makeProperty: function(name, value) {
      return new SGFProperty(name, value);
      
    },

    // return a property of a node
    property: function() {
      var name,
          value,
          prop;

      name = this.propident();
      value = this.propvalue();
      prop = this.makeProperty(name, value);

      while (this.lookahead.charAt(0) === '[') {
	value = this.propvalue();
	prop.add(value);
      }

      return prop;
    },

    node: function() {
      var last = [];

      this.match(';');
      while (this.lookahead !== null 
	     && this.lookahead.search(/^[A-Z]+\[/) !== -1) {
	last[last.length] = this.property();
      }

      return last;
    },

    // return the last node of a sequence
    sequence: function(n) {
      var seq,
          new_node,
          prop;
      
      while (this.lookahead.charAt(0) === ';') {
	prop = this.node();
	if (prop === null) {
	  break;
	}

	new_node = new SGFNode(prop);
	new_node._parent = n;
	n._child = new_node;
	n = new_node;
      }
      return n;
    },

    gametree: function(parent, mode) {
      if (mode === this.STRICT_SGF) {
	this.match('(');
      } else {
	for (;;) {
	  if (this.lookahead === null) {
	    throw("SGFParser.gametree(): Empty String?");
	  }
	  if (this.lookahead.charAt(0) === '(') {
	    while (this.lookahead.charAt(0) === '(') {
	      this.nexttoken();
	    }
	    if (this.lookahead.charAt(0) === ';') {
	      break;
	    }
	  }
	  this.nexttoken();
	}
      }

      // head is parsed
      var head = {_parent:null, _child:null},
          last,
          next;

      last = this.sequence(head);
      last._next = [];
      while (this.lookahead.charAt(0) === '(') {
	next = this.gametree(last, mode);
	last._next[last._next.length] = next;
      }

      if (mode === this.STRICT_SGF) {
	this.match(')');
      }

      return head;
    },

    fuseki: function(parent, mode, moves_per_game, i) {
      if (mode === this.STRICT_SGF) {
	this.match('(');
      } else {
	for (;;) {
	  if (this.lookahead === null) {
	    throw('SGFParser.fuseki(): Empty String?');
	  }
	  if (this.lookahead.charAt(0) === '(') {
	    while (this.lookahead.charAt(0) === '(') {
	      this.nexttoken();
	    }
	    if (this.lookahead.charAt(0) === ';') {
	      break;
	    }
	  }
	  this.nexttoken();
	}
      }
      
      var head = {},
          last;
      head._parent = parent;
      
    }
  });

}());
