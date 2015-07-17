function dataPrinter(result) {
   $('#table').empty();
   result.data.forEach(function(ele) {
       $("<tr><td>" + ele.id + "</td><td>" + ele.name + "</td><td>" + "<button type='button' class='btn btn-primary' id=" + ele.id + " >" + "删除" + "</button>" + "</td></tr>").appendTo("#table");
   })
}

function getInfo() {
   $.get('/student_names', function(data) {
       dataPrinter(data);
   });
}

$(function() {
   getInfo();
   $('#table').on('click', function(evt) {
       $.ajax({
           url: '/student_name',
           type: 'delete',
           data: {
               id: evt.target.id
           }
       });
       getInfo();
   });
});

$('#add').on('click', function() {
    $.post('/table', {
           name: $('#addName').prop('value')
       }, function() {});
       getInfo();
       $('#addName').prop('value', '');
 });
