// WeiQi.js 0.1.1
// (c) 2011 Huang Wei, imonyse@gmail.com

// require: underscore.js, raphael.js 

(function() {
  var root = this,
      _ = root._,
      Raphael = root.Raphael,
      WeiQi;
  
  if (!_ && (typeof require !== 'undefined')) {
    _ = require('underscore')._;
  }
  
  if (!Raphael && (typeof require !== 'undefined')) {
    Raphael = require('Raphael').Raphael;
  }
  
  // The top-level namespace. All public WeiQi classes and modules will be
  // attached to this.
  WeiQi = root.WeiQi = {};

  /* ----------------------------------------------------------------
   * @group helpers
   * ---------------------------------------------------------------- */
  function assertBoard(pos, color) {
    var on_board_pos;
    
    if (color !== 'b' && color !== 'w') {
      throw('assertBoard: unknown color ' + color);
    }

    if (pos.charAt(0) > this.max_pos
	|| pos.charAt(1) > this.max_pos) {
      throw('assertBoard: illegal move ' + pos);
    }

    on_board_pos = this.moves[pos];
    if (typeof on_board_pos !== 'undefined') {
      throw('assertBoard: ' + pos + ' already has a stone');
    }

    return null;
  }


  /* ----------------------------------------------------------------
   * @group SGFNode, SGFProperty
   * ---------------------------------------------------------------- */
  var SGFProperty;
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

  var SGFNode;
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

    getProperty: function(propident) {
      var i = 0,
          len = this._property.length,
          p = null;
      
      for (i=0; i<len; i++) {
	p = this._property[i];
	if (p.name === propident) {
	  return p.value;
	}
      }

      return null;
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
  
  SGFTree = function(){
    this.root = null;
    this.lastnode = null;
  };

  _.extend(SGFTree.prototype, {
    clear: function() {
      this.root = null;
      this.lastnode = null;
    },

    back: function() {

    },

    // Forward one node in the tree.
    forward: function() {
      if (this.lastnode) {
	if (this.lastnode._child) {
	  this.lastnode = this.lastnode._child;
	} else {
	  return 0;
	}
      } else {
	this.lastnode = this.root;
      }

      return 1;
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
  SGFParser = function(sgf_text) {
    this.sgf_text = sgf_text;
    this.lookahead = this.sgf_text;
    this.non_whitespace = /\S/;
    this.STRICT_SGF = 's';
    this.LAX_SGF = 'l';
  };
  
  _.extend(SGFParser.prototype, {
    stepNext: function(i) {
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
	  this.stepNext(i);
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
	  this.stepNext();
	  if (this.lookahead === '\r') {
	    this.stepNext();
	    if (this.lookahead === '\n') {
	      this.stepNext();
	    }
	  }
	} else if (this.lookahead === '\n') {
	  this.stepNext();
	  if (this.lookahead === '\r') {
	    this.stepNext();
	  }
	}
	
	if (v === null) {
	  v = this.lookahead.charAt(0);
	} else {
	  v += this.lookahead.charAt(0);
	}
	this.stepNext();
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
      var head = {},
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

      // I know this is weird, but seems like a good way to solve the problem
      return head._child;
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


  /* ----------------------------------------------------------------
   * @group GameInfo
   * ---------------------------------------------------------------- */
  Player = function() {
    this.handicap = 0;
    this.komi = 5.5;
    this.to_move = 1;
    this.game_record = null;
  };

  _.extend(Player.prototype, {
    playSgftree: function(tree) {
      // SGF Reference: http://www.red-bean.com/sgf/properties.html
      var board_size,
          next,
          move = null,
          action_table = {
	    // Move Properties
	    'B': function() {
	      
	    },
	    'W': function() {
	      
	    },
	    'KO': function() {
	      // TODO: Don't know how it works, find some example ...
	      // Execute a given move (B or W) even it's illegal. This is
	      // an optional property, SGF viewers themselves should execute
	      // ALL moves. It's purpose is to make it easier for other
	      // applications (e.g. computer-players) to deal with illegal
	      // moves. A KO property without a black or white move within
	      // the same node is illegal.'
	    },
	    'MN': function() {
	      // Sets the move number to the given value, i.e. a move
	      // specified in this node has exactly this move-number. This
	      // can be useful for variations or printing.
	      
	    },
	    'IL': function() {
	      // GNU Go extension, mark ko capture as illegal position
	    },

	    // Setup Properties
	    'AB': function() {
	      
	    },
	    'AW': function() {
	      
	    },
	    'AE': function() {
	      
	    },
	    'PL': function() {
	      // PL tells whose turn it is to play. This can be used when
	      // setting up positions or problems.
	    },

	    // Node Annotation Properties
	    'C': function() {
	      
	    },
	    'DM': function() {
	      // The position is even. SGF viewers should display a
	      // message. This property may indicate main variations in
	      // opening libraries (joseki) too. Thus DM[2] indicates an
	      // even result for both players and that this is a main
	      // variation of this joseki/opening.
	      // This property must not be mixed with UC, GB or GW
	      // within a node.
	    },
	    'GB': function() {
	      // Something good for black. SGF viewers should display a
	      // message. The property is not related to any specific place
	      // on the board, but marks the whole node instead.
	      // GB must not be mixed with GW, DM or UC within a node.
	    },
	    'GW': function() {
	      
	    },
	    'HO': function() {
	      // Node is a 'hotspot', i.e. something interesting (e.g.
	      // node contains a game-deciding move).
	      // SGF viewers should display a message.
	      // The property is not related to any specific place
	      // on the board, but marks the whole node instead.
	      // Sophisticated applications could implement the navigation
	      // command next/previous hotspot.
	    },
	    'N': function() {
	      // Provides a name for the node
	    },
	    'UC': function() {
	      // TODO: examples
	      // The position is unclear
	    },
	    'V': function() {
	      // Define a value for the node.  Positive values are good for
	      // black, negative values are good for white.
	      // The interpretation of particular values is game-specific.
	      // In Go, this is the estimated score.
	    },

	    // Move Annotation Properties
	    'BM': function() {
	      // The played move is bade. Viewers should display a message.
	    },
	    'DO': function() {
	      // The played move is doubtful.
	    },
	    'IT': function() {
	      // The played move is interesting.
	    },
	    'TE': function() {
	      // The played move is a tesuji (good move).
	    },
	    
	    // Markup Properties
	    'AR': function() {
	      // draw an arrow pointing FROM the first point
	      // TO the second point.
	      // It's illegal to specify the same arrow twice,
	      // e.g. (Go) AR[aa:bb][aa:bb]. Different arrows may have the same
	      // starting or ending point though.
	      // It's illegal to specify a one point arrow, e.g. AR[cc:cc]
	      // as it's impossible to tell into which direction the
	      // arrow points.
	    },
	    'CR': function() {
	      // Marks the given points with a circle.
	    },
	    'DD': function() {
	      // Dim (grey out) the given points.
	      // http://www.red-bean.com/sgf/DD_VW.html
	    },
	    'LB': function() {
	      // Writes the given text on the board
	    },
	    'LN': function() {
	      // Applications should draw a simple line from one point 
	      // to the other.
	    },
	    'MA': function() {
	      // Marks the given points with an 'X'
	    },
	    'SL': function() {
	      // Selected points.
	    },
	    'SQ': function() {
	      // Marks the given points with a square.
	    },
	    'TR': function() {
	      // Marks the given points with a triangle.
	    },

	    // Root Properties
	    'AP': function() {
	      // Provides the name and version number of the application used
	      // to create this gametree.
	    },
	    'CA': function() {
	      // Provides the used charset for SimpleText and Text type.
	      // Default value is 'ISO-8859-1' aka 'Latin1'.
	    },
	    'FF': function() {
	      
	    },
	    'GM': function() {
	      // Defines the type of game, Go = 1
	    },
	    'ST': function() {
	      // Defines how variations should be shown
	    },
	    'SZ': function() {
	      // Size of the board
	    },

	    // Game Info Properties
	    'AN': function() {
	      // Provides the name of the person, who made the annotations
	      // to the game.
	    },
	    'BR': function() {
	      
	    },
	    'BT': function() {
	      // Provides the name of the black team, if game was part of a
	      // team-match
	    },
	    'CP': function() {
	      // copyright information
	    },
	    'DT': function() {
	      
	    },
	    'EV': function() {
	      
	    },
	    'GN': function() {
	      // Provides a name for the game. The name is used to
	      // easily find games within a collection.
	    },
	    'GC': function() {
	      // Provides some extra information about the following game.
	      // The intend of GC is to provide some background information
	      // and/or to summarize the game itself.
	    },
	    'ON': function() {
	      // Provides some information about the opening played
	      // (e.g. san-ren-sei, Chinese fuseki, etc.).
	    },
	    'OT': function() {
	      // Describes the method used for overtime (byo-yomi)
	    },
	    'PB': function() {
	      
	    },
	    'PC': function() {
	      // Provides the place where the games was played.
	    },
	    'PW': function() {
	      
	    },
	    'RE': function() {
	      
	    },
	    'RO': function() {
	      // Provides round-number and type of round. It should be
	      // written in the following way: RO[xx (tt)], where xx is the
	      // number of the round and (tt) the type:
	      // final, playoff, league, ...
	    },
	    'RU': function() {

	    },
	    'SO': function() {
	      // Provides the name of the source (e.g. book, journal, ...).
	    },
	    'TM': function() {
	      // Provides the time limits of the game.
	      // The time limit is given in seconds.
	    },
	    'WR': function() {
	      
	    },
	    'WT': function() {
	      
	    },

	    // Timing Properties (Do I need it?)
	    'BL': function() {
	      
	    },
	    'OB': function() {
	      
	    },
	    'OW': function() {
	      
	    },
	    'WL': function() {
	      
	    },

	    // Miscellaneous Properties
	    'FG': function() {
	      
	    },
	    'PM': function() {
	      
	    },
	    'VW': function() {
	      
	    }
	  };

      board_size = tree.root.getProperty('SZ');
      if ( board_size === null ) {
	board_size = 19;
      }

      this.handicap = tree.root.getProperty('HA');
      if (this.handicap > 1) {
	next = 'w';
      }
      if (this.handicap > board_size*board_size - 1 
	  || this.handicap < 0) {
	throw("Handicap HA[" + this.handicap + "] is unreasonable.");
      }

      this.komi = tree.root.getProperty('KM');
      if (this.komi === null) {
	if (this.handicap === 0) {
	  this.komi = 5.5;
	} else {
	  this.komi = 0.5;
	}
      }

      // Now, follow the '_child' property of the root
      // and make actions
      var props,
          i,
          action,
          p,
          len;
      for (tree.lastnode=null; tree.forward();) {
	props = tree.lastnode._property;
	len = props.length;
	for (i=0;i<len;i++) {
	  p = props[i];

	  action = action_table[p.name];
	  if (typeof action === 'function') {
	    action();
	  } 
	}
      }

      this.to_move = next;
      return next;
    }

  });

  /* ----------------------------------------------------------------
   * @group Default Settings
   * ---------------------------------------------------------------- */
  var Defaults;
  Defaults = {
    height: 450,
    width: 450,
    board_size: 19,
    komi: 5.5,
    Handicap: 0,
    next_player: 'b',
    confirm: false
  };

  /* ----------------------------------------------------------------
   * @group Go Board
   * ---------------------------------------------------------------- */
  var Stars;
  Stars = ["dd", "dj", "dp","jd", "jj", "jp", "pd", "pj", "pp"];

  var Dragon;
  Dragon = function(dot, alphabet) {
    var i, j, name,
        end = alphabet.charAt(alphabet.length - 1);
        full = 4;
    
    name = dot.name;
    i = name.charAt(0);
    j = name.charAt(1);
    // initial liberties depending on dot's position
    if (i === 'a' || i === end) { full--; }
    if (j === 'a' || j === end) { full--; }
    this.liberties = full;
    
    this.color = dot.color;
    // all stones in this dragon
    this.stones = [dot];
    this.neighbors = 0;
    // mark used for traverse
    this.mark = 0;
  };

  _.extend(Dragon.prototype, {
    // calculate the dragon's liberties from scratch
    updateLiberties: function() {
      var i, len, dot, 
          count = 0;
      len = this.stones.length;

      for (i=0; i<len; i++) {
	dot = this.stones[i];
	if (dot.mark === 0) {
	  count += dot.getLiberties();
	}
      }

      // Done with liberties counting
      // Remove mark from each dot
      for (i=0; i<len; i++) {
	dot = this.stones[i];
	dot.clearMark();
      }

      this.liberties = count;
      return count;
    },

    removeLiberty: function(name) {
      
    }
  });

  var Dot;
  Dot = function(name, x, y, radius, parent) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.owner = 'e';
    this.radius = radius;
    this.parent = parent;
    // which dragon it belongs to
    this.dragon = null;
    // mark used for travese
    this.mark = 0;
    // cache 4 direction dots
    this.north_dot = null;
    this.south_dot = null;
    this.west_dot = null;
    this.east_dot = null;
  };

  _.extend(Dot.prototype, {
    isStar: function() {
      var i = _.indexOf(Stars, this.name);
      if (i !== -1) {
	return true;
      } else {
	return false;
      }
    },

    clearMark: function() {
      var north_dot = null, 
          south_dot = null, 
          west_dot = null,
          east_dot = null;

      if (this.north_dot !== null) {
	north_dot = this.north_dot;
      } else {
	north_dot = this.north_dot = this.parent.north(this.name);
      }

      if (this.south_dot !== null) {
	south_dot = this.south_dot;
      } else {
	south_dot = this.south_dot = this.parent.south(this.name);
      }

      if (this.west_dot !== null) {
	west_dot = this.west_dot;
      } else {
	west_dot = this.west_dot = this.parent.west(this.name);
      }

      if (this.east_dot !== null) {
	east_dot = this.east_dot;
      } else {
	east_dot = this.east_dot = this.parent.east(this.name);
      }
      
      this.mark = 0;
      if (north_dot !== null) { north_dot.mark = 0; }
      if (south_dot !== null) { south_dot.mark = 0; }
      if (west_dot !== null) { west_dot.mark = 0; }
      if (east_dot !== null) { east_dot.mark = 0; }

      return true;
    },

    // This function should only be called by Dragon's updateLiberties()
    // It calculate its own liberty and doesn't care about allies or dragons
    // The mark property should be cleared by updateLiberties()
    getLiberties: function() {
      var count = 0,
          north_dot = null,
          south_dot = null,
          west_dot = null,
          east_dot = null;

      if (this.north_dot !== null) {
	north_dot = this.north_dot;
      } else {
	north_dot = this.north_dot = this.parent.north(this.name);
      }

      if (this.south_dot !== null) {
	south_dot = this.south_dot;
      } else {
	south_dot = this.south_dot = this.parent.south(this.name);
      }

      if (this.west_dot !== null) {
	west_dot = this.west_dot;
      } else {
	west_dot = this.west_dot = this.parent.west(this.name);
      }

      if (this.east_dot !== null) {
	east_dot = this.east_dot;
      } else {
	east_dot = this.east_dot = this.parent.east(this.name);
      }

      // calculate liberties from unmarked dot
      if ((north_dot !== null) 
	  && (north_dot.owner === 'e') 
	  && (north_dot.mark === 0)) { count++; }
      north_dot.mark = 1;

      if ((south_dot !== null) 
	  && (south_dot.owner === 'e')
	  && (south_dot.mark === 0)) { count++; }
      south_dot.mark = 1;

      if ((west_dot !== null) 
	  && (west_dot.owner === 'e')
	  && (west_dot.mark === 0)) { count++; }
      west_dot.mark = 1;

      if ((east_dot !== null) 
	  && (east_dot.owner === 'e')
	  && (east_dot.mark === 0)) { count++; }
      east_dot.mark = 1;

      this.mark = 1;
      return count;
    },

    newDragon: function(alphabet) {
      this.dragon = new Dragon(this, alphabet);
    },

    // Played a stone with exactly one friendly neighbor
    // Add the new stone to the neighbor's dragon
    extendNeighborDragon: function(dragon) {
      this.dragon = dragon;
      dragon.stones.push(this);
    },

    assimilateNeighborDragon: function(dragon) {
      
    },

    render: function(painter, flag) {
      var stone,
          self = this;

      if (typeof flag === 'undefined') {
	flag = true;
      }
      
      if (flag === true) {
	// real stone
	if (self.owner === 'b') {
	  stone = painter.circle(self.x, self.y, self.radius);
	  stone.attr({fill:"#000", stroke:"#000"});
	} else if (self.owner === 'w') {
	  stone = painter.circle(self.x, self.y, self.radius);
	  stone.attr({fill:"#fff", stroke:"#000"});
	}
      } else {
	// fake stone
	if (self.owner === 'b') {
	  stone = painter.circle(self.x, self.y, self.radius);
	  stone.attr({fill:"#000", stroke:"#000", opacity: 0.4});
	} else if (self.owner === 'w') {
	  stone = painter.circle(self.x, self.y, self.radius);
	  stone.attr({fill:"#fff", stroke:"#000", opacity: 0.4});
	}
      }
      
    }
  });

  var Board;
  Board = function(dom_id, settings) {
    var i, j, len, alphabet, dot,
        options = settings || {},
        el, sgf, parser, player;
    
    this.settings = _.defaults(options, Defaults);
    this.color_in_turn = this.settings.next_player;
    this.player = new Player();

    this.sgftree = {root:null, lastnode:null};
    if (typeof dom_id === 'undefined' || dom_id === null){
      this.paper = null;
      this.dom_id = null;
    } else {
      this.paper = Raphael(dom_id, this.settings.height, this.settings.width);
      this.dom_id = dom_id;

      // parse sgf here
      el = document.getElementById(dom_id);
      if (typeof el.dataset !== 'undefined') {
	sgf = el.dataset.sgf || "";
      } else {
	sgf = el.getAttribute('data-sgf');
      }

      parser = new SGFParser(sgf);
      this.sgftree = parser.gametree();
    }
    
    // white or black stone positions on the board
    // eg: {'dd':'b', 'qd':'w'}
    this.moves = {};		
    
    // This 0.5 tricky is the same as HTML5 canvas 
    // (see http://diveintohtml5.info/canvas.html)
    this.margin = this.settings.height * 0.1 - 0.5;
    this.board_len = this.settings.height * 0.8;
    // rect for go board need extra margin for better UE
    this.dot_len = this.board_len / (this.settings.board_size + 1);
    this.star_radius = this.dot_len * 0.15;
    this.stone_radius = this.dot_len / 2 - 1;

    // all dots on the board
    this.dots = [];
    alphabet = this.alphabet = "abcdefghijklmnopqrs".slice(0, this.settings.board_size);
    len = alphabet.length;
    this.max_pos = alphabet.charAt(len-1);
    for (i=0; i<len; i++) {
      for (j=0; j<len; j++) {
	dot = new Dot(alphabet.charAt(i)+alphabet.charAt(j), 
		      this.margin+this.dot_len*(i+1), 
		      this.margin+this.dot_len*(j+1), 
		      this.stone_radius,
		      this);
	this.dots[this.dots.length] = dot;
      }
    }

    // all dragons on the board
    this.dragons = {};
  };

  _.extend(Board.prototype, {
    render: function() {
      // draw the Go board
      var margin = this.margin,
          len = this.board_len,
          m = this.dot_len,
          k = this.settings.board_size,
          i,j,
          stroke_color = "#000",
          fill_color = "#eee",
          path = [],
          pathstr,
          paper = this.paper,
          star_radius = this.star_radius;

      paper.clear();

      margin += m;
      len = len - m*2;
      for (i=0; i<k; i++) {
	j = margin + m*i;
	// horizontal lines path
	path[path.length] = "M" + margin + " " + j + "L" + (margin + len) + " " + j;
      }

      for (i=0; i<k; i++) {
	// vertical lines path
	j = margin + m*i;
	path[path.length] = "M" + j + " " + margin + "L" + j + " " + (margin + len);
      }

      pathstr = path.join("");
      paper.path(pathstr).attr({stroke:stroke_color});

      // star positions (星位)
      _.each(this.dots, function(dot){
	if (dot.isStar()) {
	  paper.circle(dot.x, dot.y, star_radius).attr({fill:"#000"});
	}
      });

      // The drawing order will make sure rect respond to click event right
      margin = this.margin;
      len = this.board_len;
      this.board = paper.rect(margin, margin, len, len).attr({stroke:stroke_color, fill:fill_color, opacity:0.3});

      // stones are drawing here
      _.each(this.dots, function(dot){
	dot.render(paper);
      });

    },

    bind: function() {
      // bind click events
      var self = this;

      this.board.click(function(e){
	var posx = 0,
            posy = 0,
            dot, svg_dom;

	if (e.pageX || e.pageY) {
	  posx = e.pageX;
	  posy = e.pageY;
	} else if (e.clientX || e.clientY) {
	  posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	  posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}

	svg_dom = document.getElementById(board.dom_id);
	posx -= svg_dom.offsetLeft;
	posy -= svg_dom.offsetTop;

	// For IE6, 7, etc
	var ie_parent = svg_dom.offsetParent;
	if (typeof ie_parent !== 'undefined') {
	  for (;ie_parent;ie_parent = ie_parent.offsetParent) {
	    posx -= ie_parent.offsetLeft;
	    posy -= ie_parent.offsetTop;
	  }
	}

	// find the nearest dot according to cursor coordinates
	dot = self.findByCoordinates(posx, posy);

	// draw fake stone or not, depending on settings
	if (self.settings.confirm === false) {
	  dot.owner = self.color_in_turn;
	  dot.render(self.paper);
	  
	  if (dot.owner === 'b') {
	    self.color_in_turn = 'w';
	  } else {
	    self.color_in_turn = 'b';
	  }
	} else {
	  dot.render(self.paper, false);
	  window.pendding_move = function() {
	    // real move here
	  };
	}
	
      });
    },

    // get the dot siblings
    north: function(name) {
      var i = this.alphabet.indexOf(name.charAt(0)),
          j = this.alphabet.indexOf(name.charAt(1)),
          nj;
      
      nj = j - 1;
      return this.findByName(name.charAt(0) + this.alphabet.charAt(nj));
    },

    south: function(name) {
      var i = this.alphabet.indexOf(name.charAt(0)),
          j = this.alphabet.indexOf(name.charAt(1)),
          sj;
      
      sj = j + 1;
      return this.findByName(name.charAt(0) + this.alphabet.charAt(sj));
    },

    west: function(name) {
      var i = this.alphabet.indexOf(name.charAt(0)),
          j = this.alphabet.indexOf(name.charAt(1)),
          wi;

      wi = i - 1;
      return this.findByName(this.alphabet.charAt(wi) + name.charAt(1));
    },

    east: function(name) {
      var i = this.alphabet.indexOf(name.charAt(0)),
          j = this.alphabet.indexOf(name.charAt(1)),
          ei;

      ei = i + 1;
      return this.findByName(this.alphabet.charAt(ei) + name.charAt(1));
    },

    // Algorightm:
    // 1. Place a stone of given color on the board.
    // 2. If there are any adjacent opponent dragons without liberties,
    // remove them and increase the prisoner count. 
    // 3. If the newly placed stone is part of a dragon without liberties,
    // remove it and increase the prisoner count.
    doPlayMove: function(pos, color) {
      var other = color === 'b' ? 'w' : 'b',
          captured_stones = 0,
          neighbor_allies = 0,
          north, south, west, east,
          dot, neighbor_dragon;

      assertBoard(pos, color);

      this.addStone(pos, color);

      // Count the number of neighbor dragons of the same color
      // Remove captured dragons and remove pos as liberty for opponent dragon
      // that are not captured
      north = this.north(pos);
      if (this.moves[north.name] === color) {
	neighbor_allies++;
	north.dragon.mark = 1;
	neighbor_dragon = north.dragon;
      } else if (this.moves[north.name] === other) {
	if (this.liberties(north) > 1) {
	  north.dragon.removeLiberty(pos);
	  north.dragon.mark = 1;
	} else {
	  captured_stones += north.dragon.doRemove();
	}
      }

      south = this.south(pos);
      if (south.dragon.mark === 0) {
	// dot haven't been visited yet
	if (south.owner === color) {
	  neighbor_allies++;
	  south.dragon.mark = 1;
	  neighbor_dragon = south.dragon;
	} else if (south.owner === other) {
	  if (this.liberties(south) > 1) {
	    south.dragon.remove_liberty(pos);
	    south.dragon.mark = 1;
	  } else {
	    captured_stones += south.dragon.doRemove();
	  }
	}
      }

      west = this.west(pos);
      if (west.dragon.mark === 0) {
	if (west.owner === color) {
	  neighbor_allies++;
	  west.dragon.mark = 1;
	  neighbor_dragon = west.dragon;
	} else if (west.owner === other) {
	  if (this.liberties(west) > 1) {
	    west.dragon.remove_liberty(pos);
	    west.dragon.mark = 1;
	  } else {
	    captured_stones += west.dragon.doRemove();
	  }
	}
      }

      east = this.east(pos);
      if (east.mark === 0) {
	if (east.owner === color) {
	  neighbor_allies++;
	  east.dragon.mark = 1;
	  neighbor_dragon = east.dragon;
	} else if (east.owner === other) {
	  if (this.liberties(east) > 1) {
	    east.dragon.remove_liberty(pos);
	    east.dragon.mark = 1;
	  } else {
	    captured_stones += east.dragon.doRemove();
	  }
	}
      }

      dot = this.findByName(pos);
      if (neighbor_allies === 0) {
	// create new dragon
	this.makeDragon(dot);
      } else if (neighbor_allies === 1) {
	// TODO: implement
	dot.extendNeighborDragon(neighbor_dragon);
      } else {
	dot.assimilateNeighborDragon(neighbor_dragon);
      }

      // ko

      
    },

    makeDragon: function(dot) {
      dot.newDragon(this.alphabet);
    },

    addStone: function(pos, color) {
      var dot = this.findByName(pos);

      dot.owner = color;
      this.moves[pos] = color;
    },

    // Return true if
    // 1. There is no neighboring empty intersection
    // 2. There is no neighboring opponent dragon with exactly one liberty
    // 3. There is no neighboring friendly dragon with more than one liberty
    isSuicide: function(pos, color) {
      var north = this.north(pos), 
          south = this.south(pos), 
          west  = this.west(pos), 
          east  = this.east(pos);

      if (north !== null) {
	if ((north.owner === 'e')
	    || ((north.color === color) !== (this.liberties(north) === 1))) {
	  return false;
	} 
      }

      if (south !== null) {
	if ((south.owner === 'e')
	    || ((sourth.color === color) !== (this.liberties(south) === 1))) {
	  return false;
	} 
      }

      if (west !== null) {
	if ((west.owner === 'e')
	    || ((west.color === color) !== (this.liberties(west) === 1))) {
	  return false;
	} 
      }

      if (east !== null) {
	if ((east.owner === 'e')
	    || ((east.color === color) !== (this.liberties(east) === 1))) {
	  return false;
	} 
      }

      return true;
    },

    isLegal: function(color, pos) {
      // mainly for ko position
    },

    liberties: function(dot) {
      // unsafe function, caller must make sure dot has an owner 
      var dragon = dot.dragon;
      return dragon.liberties;
    },

    // return dot or the nearest dot object according to x, y 
    findByCoordinates: function(x, y) {
      var i, len, delta, dot, result,
          min = null;

      len = this.dots.length;
      for (i=0; i<len; i++) {
	dot = this.dots[i];
	delta = Math.sqrt((dot.x - x)*(dot.x - x) + (dot.y - y)*(dot.y - y));
	if (!min) {
	  min = delta;
	  result = dot;
	} else {
	  if (delta < min) {
	    min = delta;
	    result = dot;
	  }
	}
      }

      return result;
    },

    findByName: function(name) {
      var i,
          len,
          dot;

      len = this.dots.length;
      for (i=0; i<len; i++) {
	dot = this.dots[i];
	if (dot.name === name) {
	  return dot;
	}
      }

      return null;
    }
  });

  /* ----------------------------------------------------------------
   * @group interface
   * ---------------------------------------------------------------- */
  WeiQi.SGFParser = SGFParser;
  WeiQi.Board = Board;
  WeiQi.Dot = Dot;
  WeiQi.Dragon = Dragon;
}());
