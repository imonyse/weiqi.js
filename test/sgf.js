module('SGFParser');

var sgf_sample_1 = "(;FF[4]GM[1]SZ[19]FG[257:Figure 1]PM[1]PB[Takemiya Masaki]BR[9 dan]PW[Cho Chikun]WR[9 dan]RE[W+Resign]KM[5.5]TM[28800]DT[1996-10-18,19]EV[21st Meijin]RO[2 (final)]SO[Go World #78]US[Arno Hollosi];B[pd];W[dp];B";

test('next', function(){
  var p = new WeiQi.SGFParser(sgf_sample_1);
  p.next();
  equal(p.lookahead.charAt(0), ';');
});
