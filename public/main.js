$(function() {
  var order = $('thead th').data('order');
  $('thead').on('click', 'th', function() {
    var key = $(this).data('id');
    $.get('/scores', {sortKey: key,orderKey: order}, function(scores) {
      $("tbody").empty();
      fill(scores);
    });

    if ((key !== 'name') && (key !== 'do')&& (key !== 'id')) {
      if (order === "asc") {
        order = "dec";
      } else {
        order = "asc";
      }
    }
  });
});

$(function(){
  $('.mmd').on('click', function() {
  var key = $(this).data('id');
  $.get('/delete', {id:key},function(resq) {
   $('tbody #'+key).remove();
    });
  });
});

function fill(newResult) {
  var string = '';
  newResult.forEach(function(val) {
    string += ('<tr>'+'<td>' + val.id + '</td>' + '<td>' + val.name + '</td>' + '<td>' + val.Chinese + '</td>' + '<td>' + val.Math +
      '</td>' + '<td>' + val.English + '</td>' +'<td>'+ '删除>'+'</td>'+ '</tr>');
  });
  $('tbody').html(string);
}



//
//
// $(function() {
//   var order = $('thead th').data('order');
//   $('thead').on('click', 'th', function() {
//     var key = $(this).data('id');
//   //  console.log(order);
//     $.get('/scores', {sortKey: key,orderKey: order}, function(scores) {
//       $("tbody").empty();
//     //  console.log(scores);
//       fill(scores);
//     });
//
//     if ((key !== 'name') && (key !== 'do')&& (key !== 'id')) {
//       if (order === "asc") {
//         order = "dec";
//       } else {
//         order = "asc";
//       }
//     }
//   });
// });
//
// function fill(newResult) {
//   var string = '';
//   newResult.forEach(function(val) {
//     string += ('<tr>'+'<td>' + val.id + '</td>' + '<td>' + val.name + '</td>' + '<td>' + val.Chinese + '</td>' + '<td>' + val.Math +
//       '</td>' + '<td>' + val.English + '</td>' +'<td>'+ '<input type="button" value="删除">'+'</td>'+ '</tr>');
//   });
//   $('tbody').html(string);
// }
