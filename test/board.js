module('Board');

test('find_by_name', function() {
  var b = new WeiQi.Board(),
      dot;
  
  dot = b.find_by_name('pd');
  equal(dot.name, 'pd');
});
