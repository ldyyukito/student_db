$(function() {
  var order = $('thead th').data('order');
  $('thead').on('click', 'th', function() {
    var key = $(this).data('id');
    $.get('/scores', {
      sortKey: key,
      orderKey: order
    }, function(scores) {
      $("tbody").empty();
      fill(scores);
    });

    if ((key !== 'name') && (key !== 'do')) {
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
    string += ('<tr>' + '<td>' + val.id + '</td>' + '<td>' + val.name + '</td>' + '<td>' + val.Chinese + '</td>' + '<td>' + val.Math +
      '</td>' + '<td>' + val.English + '</td>' + '<td>' + '删除>' + '</td>' + '</tr>');
  });
  $('tbody').html(string);
}


$(function() {
  $('.delete').on('click', function() {
    var key = $(this).data('id');
    $.get('/delete', {
      id: key
    }, function(resq) {
      $('tbody #' + key).remove();
    });
  });
});

$(function() {

  $("#id").focus(function() {
    var txt_value = $(this).val();
    if (txt_value === "请输入学号") {
      $(this).val("");
    }
  });
  $("#id").blur(function() {
    var txt_value = $(this).val();
    if (txt_value === "") {
      $(this).val("请输入学号");
    }
  });
  $("#name").focus(function() {
    var txt_value = $(this).val();
    if (txt_value === "请输入姓名") {
      $(this).val("");
    }
  });
  $("#name").blur(function() {
    var txt_value = $(this).val();
    if (txt_value === "") {
      $(this).val("请输入姓名");
    }
  });
  $("#math").focus(function() {
    var txt_value = $(this).val();
    if (txt_value === "请输数学成绩") {
      $(this).val("");
    }
  });


  $("#math").blur(function() {
    var txt_value = $(this).val();
    if (txt_value === "") {
      $(this).val("请输数学成绩");
    }
  });

  $("#chinese").focus(function() {
    var txt_value = $(this).val();
    if (txt_value === "请输语文成绩") {
      $(this).val("");
    }
  });
  $("#chinese").blur(function() {
    var txt_value = $(this).val();
    if (txt_value === "") {
      $(this).val("请输语文成绩");
    }
  });

  $("#english").focus(function() {
    var txt_value = $(this).val();
    if (txt_value === "请输英语成绩") {
      $(this).val("");
    }
  });
  $("#english").blur(function() {
    var txt_value = $(this).val();
    if (txt_value === "") {
      $(this).val("请输英语成绩");
    }
  });
});

//见AJAX的用法
$(function() {
  $('#add').on('click', function() {
    var student = {
      id: $("#id").val(),
      name: $("#name").val(),
      chinese: $('#chinese').val(),
      math: $('#math').val(),
      english: $('#english').val()
    };
    $.ajax({
      url: '/add',
      data: student,
      type: 'post',
      dataType: 'text',
      success: function() {
        $("tbody").append("<tr id=" + studnt.id + ">" +
          "<td>" + student.name + "</td>" +
          "<td>" + student.chinese + "</td>" +
          "<td>" + student.math + "</td>" +
          "<td>" + student.english + "</td>" +
          '<td>' + '删除>' + '</td>' + "</tr>");
      }
    });
  });
});
