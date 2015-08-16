$(function() {
  var order = $('thead th').data('order');
  $('#score thead').on('click', 'th', function() {
    var key = $(this).data('id');
    $.get('/scores', {
      sortKey: key,
      orderKey: order
    }, function(scores) {
      console.log(scores);
      $("#sc").empty();
      fill(scores);
    });

    if (key !== 'name') {
      if (order === "asc") {
        order = "dec";
      } else {
        order = "asc";
      }
    }

  });
});



function fill(newResult) {
  var string = '';
  newResult.forEach(function(val) {
    string += '<tr>' + '<td>' + val.name + '</td>' + '<td>' + val.chinese + '</td>' + '<td>' + val.math +
      '</td>' + '<td>'+ '<input type="button" value="删除">'+'</td>'+ '</tr>';
  });
  $('tbody').html(string);
}
