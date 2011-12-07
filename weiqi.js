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

  SGFProperty = function(){
    
  };

  _.extend(SGFProperty.prototype, {
    get: function(name) {
      
    },

    add: function(name, value) {
      
    },

    overwrite: function(name, value) {
      
    }
  });

  SGFNode = function(property){
    this.property = property || new SGFProperty();
  };

  _.extend(SGFNode.prototype, {
    prev: function() {
      
    },

    root: function() {
      
    },

    makeProperty: function(name, value) {
      
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
    this.nexttoken = /(;|\(|\))/;
    this.STRICT_SGF = 's';
    this.LAX_SGF = 'l';
  };
  
  _.extend(WeiQi.SGFParser.prototype, {
    next: function() {
      var i = this.lookahead.search(this.nexttoken);
      if (i === -1) {
	this.lookahead = null;
	return;
      } else {
	this.lookahead = this.lookahead.slice(i+1);
	return this.lookahead;
      }
    },

    fuseki: function(parent, mode, moves_per_game, i) {
      if (mode === this.STRICT_SGF) {
	match(/\(/);
      } else {
	for (;;) {
	  if (this.lookahead === null) {
	    throw('SGFParser.fuseki(): Empty String?');
	  }
	  if (this.lookahead.charAt(0) === '(') {
	    while (this.lookahead.charAt(0) === '(') {
	      this.next();
	    }
	  }
	}
      }
    }
  });

}());
