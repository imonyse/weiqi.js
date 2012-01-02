module('Board');

test('find_by_name', function() {
  var b = new WeiQi.Board(),
      dot;
  
  dot = b.find_by_name('pd');
  equal(dot.name, 'pd');
});

test('north', function() {
  var b = new WeiQi.Board(),
      north_dot;

  north_dot = b.north('dd');
  equal(north_dot.name, 'dc');

  north_dot = b.north('da');
  equal(north_dot, null);
});

test('south', function() {
  var b = new WeiQi.Board(),
      south_dot;

  south_dot = b.south('dd');
  equal(south_dot.name, 'de');

  south_dot = b.south('ds');
  equal(south_dot, null);
});

test('west', function() {
  var b = new WeiQi.Board(),
      west_dot;

  west_dot = b.west('dd');
  equal(west_dot.name, 'cd');

  west_dot = b.west('ad');
  equal(west_dot, null);
});

test('east', function() {
  var b = new WeiQi.Board(),
      east_dot;
  
  east_dot = b.east('dd');
  equal(east_dot.name, 'ed');

  east_dot = b.east('sd');
  equal(east_dot, null);
});

module('Dragon');

test('initial liberties', function() {
  var alphabet = "abcdefghijklmnopqrs",
      dot, dragon;

  dot = new WeiQi.Dot('aa', 0, 0, 5);
  dragon = new WeiQi.Dragon(dot, alphabet);
  equal(dragon.liberties, 2);

  dot = new WeiQi.Dot('ss', 0, 0, 0);
  dragon = new WeiQi.Dragon(dot, alphabet);
  equal(dragon.liberties, 2);

  dot = new WeiQi.Dot('ap', 0, 0, 0);
  dragon = new WeiQi.Dragon(dot, alphabet);
  equal(dragon.liberties, 3);

  dot = new WeiQi.Dot('pd', 0, 0, 0);
  dragon = new WeiQi.Dragon(dot, alphabet);
  equal(dragon.liberties, 4);
});
