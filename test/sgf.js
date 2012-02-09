module('SGFParser');

var sgf_sample_1 = "(;FF[4]GM[1]SZ[19]FG[257:Figure 1]PM[1]PB[Takemiya Masaki]BR[9 dan]PW[Cho Chikun]WR[9 dan]RE[W+Resign]KM[5.5]TM[28800]DT[1996-10-18,19]EV[21st Meijin]RO[2 (final)]SO[Go World #78]US[Arno Hollosi];B[pd];W[dp])";

test('nexttoken from custom string', function() {
  var p = new WeiQi.SGFParser(' ((\n (\t( ss s(\r)'),
      i = null;

  i = p.nexttoken();
  equal(i, '(');
  equal(p.lookahead, '(\n (\t( ss s(\r)');
  
  i = p.nexttoken();
  equal(i, '(');
  equal(p.lookahead, '\n (\t( ss s(\r)');
  
  i = p.nexttoken();
  equal(i, '(');
  equal(p.lookahead, '\t( ss s(\r)');

  i = p.nexttoken();
  equal(i, '(');
  equal(p.lookahead, ' ss s(\r)');
  
  i =p.nexttoken();
  equal(i, 's');
  equal(p.lookahead, 's s(\r)');

  i = p.nexttoken();
  equal(i, 's');
  equal(p.lookahead, ' s(\r)');

  i = p.nexttoken();
  equal(i, 's');
  equal(p.lookahead, '(\r)');

  i = p.nexttoken();
  equal(i, '(');
  equal(p.lookahead, '\r)');

  i = p.nexttoken();
  equal(i, ')');
  equal(p.lookahead, "");

  i = p.nexttoken();
  equal(i, null);
  equal(p.lookahead, null);
});

test('stepNext', function(){
  var p = new WeiQi.SGFParser(sgf_sample_1);
  p.lookahead = "12345";

  p.stepNext();
  equal(p.lookahead, "2345");
});

test('propvalue', function() {
  var p = new WeiQi.SGFParser(sgf_sample_1);
  p.lookahead = "[19]DT[2011-11-11]";
  equal(p.propvalue(), 19);
  
  p.lookahead = "[sss[OMG\\]ok]";
  equal(p.propvalue(), "sss[OMG]ok");
});

test('propident', function(){
  var p = new WeiQi.SGFParser(sgf_sample_1);
  var v;
  p.lookahead = "PB[Takemiya Masaki]BR[9 dan]";
  v = p.propident();
  equal(v, "PB");

  p.lookahead = "LB[dc:1][fc:2][nc:3][pc:4][dj:a][fj:b][nj:c][pj:d][gs:ABCDEFGH][gr:ABCDEFG][gq:ABCDEF][gp:ABCDE][go:ABCD][gn:ABC][gm:AB][mm:12][mn:123][mo:1234][mp:12345][mq:123456][mr:1234567][ms:12345678]";
  v = p.propident();
  equal(v, "LB");

  p.lookahead = "C[ss]";
  v = p.propident();
  equal(v, "C");
});

test('property', function(){
  var p = new WeiQi.SGFParser(sgf_sample_1),
      result;
  p.lookahead = "LB[dc:1]";
  result = p.property();
  equal(result.name, "LB");
  equal(result.value[0], "dc:1");

  p.lookahead = "LB[dc:1][fc:2][nc:3][pc:4][dj:a][fj:b][nj:c][pj:d][gs:ABCDEFGH][gr:ABCDEFG][gq:ABCDEF][gp:ABCDE][go:ABCD][gn:ABC][gm:AB][mm:12][mn:123][mo:1234][mp:12345][mq:123456][mr:1234567][ms:12345678]W[dc]";
  result = p.property();
  equal(result.name, "LB");
  equal(result.value[0], "dc:1");
  equal(result.value[1], "fc:2");
  equal(result.value.length, 22);
  equal(result.value[21], "ms:12345678");

  result = p.property();
  equal(result.name, "W");
  equal(result.value, "dc");
});

test('sequence', function(){
  var p = new WeiQi.SGFParser(sgf_sample_1),
      head = {},
      seq;

  p.lookahead = sgf_sample_1.slice(1);
  seq = p.sequence(head);

  equal(head._child._property.length, 17);
  equal(head._child._property[0].name, "FF");
  equal(head._child._child._property[0].name, "B");
  equal(head._child._child._child._property[0].name, "W");
});

test('gametree', function(){
  var p = new WeiQi.SGFParser(sgf_sample_1),
      root;

  root = p.gametree(null, 's');
  equal(root._property.length, 17);
  equal(root._next, null);

  p = new WeiQi.SGFParser(window.ff4_ex);
  root = p.gametree(null, 'l');

  p = new WeiQi.SGFParser(window.print1);
  root = p.gametree(null, 'l');

  p = new WeiQi.SGFParser(window.print2);
  root = p.gametree(null, 'l');
});


module('SGFNode');

test('getProperty', function(){
  var p = new WeiQi.SGFParser(sgf_sample_1),
      tree = {root:null, lastnode:null};

  tree.root = p.gametree(null, 's');
  equal(tree.root.getProperty('SZ')[0], 19);
  equal(tree.root.getProperty('PB')[0], "Takemiya Masaki");
});

