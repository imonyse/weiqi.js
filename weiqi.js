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
    next_player: 'b'
  };

  /* ----------------------------------------------------------------
   * @group Go Board
   * ---------------------------------------------------------------- */
  var Stars;
  Stars = ["dd", "dj", "dp","jd", "jj", "jp", "pd", "pj", "pp"];

  var Dot;
  Dot = function(name, x, y, radius) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.owner = 'e';
    this.radius = radius;
    this.stone = null;
  };

  _.extend(Dot.prototype, {
    is_star: function() {
      var i = _.indexOf(Stars, this.name);
      if (i !== -1) {
	return true;
      } else {
	return false;
      }
    },

    render: function(painter) {
      var stone,
          self = this;
      
      if (self.owner === 'b') {
	stone = self.stone = painter.circle(self.x, self.y, self.radius);
	stone.attr({fill:"#000", stroke:"#000"});
      } else if (self.owner === 'w') {
	stone = self.stone = painter.circle(self.x, self.y, self.radius);
	stone.attr({fill:"#fff", stroke:"#000"});
      }
      
    }
  });

  var Board;
  Board = function(dom_id, settings) {
    var i, j, len, alphabet, dot,
        options = settings || {},
        el, sgf, parser, player;
    
    this.settings = _.defaults(options, Defaults);
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
    
    this.dots = [];
    this.margin = this.settings.height * 0.1;
    this.board_len = this.settings.height * 0.8;
    // rect for go board need extra margin for better UE
    this.dot_len = this.board_len / (this.settings.board_size + 1);
    this.star_radius = this.dot_len * 0.2;
    this.stone_radius = this.dot_len / 2 - 1;

    alphabet = "abcdefghijklmnopqrs".slice(0, this.settings.board_size);
    len = alphabet.length;
    for (i=0; i<len; i++) {
      for (j=0; j<len; j++) {
	dot = new Dot(alphabet.charAt(i)+alphabet.charAt(j), 
		      this.margin+this.dot_len*(i+1), 
		      this.margin+this.dot_len*(j+1), 
		      this.stone_radius);
	this.dots[this.dots.length] = dot;
      }
    }
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
	if (dot.is_star()) {
	  paper.circle(dot.x, dot.y, star_radius).attr({fill:"#000"});
	}
      });

      // The drawing order will make sure rect respond to click event right
      margin = this.margin;
      len = this.board_len;
      this.board = paper.rect(margin, margin, len, len).attr({stroke:stroke_color, fill:fill_color, opacity:0.3});

      //  and stones are drawing here
      _.each(this.dots, function(dot){
	dot.render(paper);
      });

    },

    bind: function() {
      // bind click events
      var board = this,
          svg_dom;
      this.board.click(function(e){
	var posx = 0,
            posy = 0;

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

	alert(posx + " " + posy);
      });
    },

    // play sgf if given
    play: function() {
      
    },

    find_by_name: function(name) {
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

}());
