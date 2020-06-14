window.ToDoList1 = {
    API_URL: 'http://localhost:8081/tasks',
    createContacts:function () {
        let firstName = $('#first-name').val();
        let phoneNumber = $('#phone-number').val();

        var requestBody = {
            description: firstName,
            number: phoneNumber
        };
        $.ajax({
            url: phone__book.API_URL,
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify(requestBody)
        }).done(function (response) {
            phone__book.getPeople1();
        });
    },
    updatePeople: function(id,done){
        const requestBody = {
            done: done
        };
        $.ajax({
            url: phone__book.API_URL + '?id=' + id,
            method: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(requestBody)
        }).done(function (response) {
            phone__book.getPeople1();})
    },
    deletePeople: function(id){
        $.ajax({
            url: phone__book.API_URL + '?id=' + id,
            method: 'DELETE',
        }).done(function () {
            phone__book.getPeople1();
        })
    },
    getPeople1: function() {
        $.ajax({
            url: phone__book.API_URL
        })
        done(function (response) {
            phone__book.displayContacts(JSON.parse(response));
        });
    } ,
    displayContacts:function(tasks){
        let rowsHtml = '';
        tasks.forEach(task => rowsHtml += phone__book.getTasksRowsHtml(task));
        $('#contact-table tbody').html(rowsHtml);
    },
    getTasksRowsHtml: function(task){
        //spread syntax (...)
        let formattedDeadline = new Date(... people1.number).toLocaleDateString('ro');
        let checkedAttribute = task.done ? 'checked' : '';

        return ` <tr>
        <td>${people1.description}</td>
        <td>${formattedNumber}</td>
        <td>
            <input type="checkbox" class="mark-done" data-id=${people1.id} ${checkedAttribute}>
        </td>
        <td>
            <a href="#" class="remove-people1" data-id=1>
                <i class="fa fa-trash"></i></a>
        </td>
    </tr>`
    },
    bindEvents:function () {
        $('#create-contact-form').submit(function (event) {
            event.preventDefault();
            phone__book.createContact();
            console.log("success2");
        })
        //delegate is necessary because mark-done element is dynamically injected in the page
        $('#people1-table tbody').delegate('mark-done','change',function(event){
            event.preventDefault();

            let id = $(this).data('id');
            let checked = $(this).is(':checked');

            phone__book.updatePeople(id,checked);
        })
        $('#people1-table tbody').delegate('.remove-people','click',function (event) {
            event.preventDefault();

            let id = $(this).data('id');

            phone__book.deletePeople(id);

        })
    }

};
ToDoList1.getPeople1();
ToDoList1.bindEvents();