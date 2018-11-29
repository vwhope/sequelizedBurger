
// UPDATE: on click of devour it button, get ID, 
// then change devoured from FALSE to TRUE
// ?? I don't want to update the jQuery - browser data, just want to change 
// the value of devoured in the database  - 
// UPDATE burgers SET devoured=TRUE WHERE id = '3';

// wait until DOM is fully loaded to attach handlers
$(function() {

    $('.devour').on('click', function(event) {
        var id = $(this).data('id');
        var newDevour = true;
        
        var newDevouredState = {
        devoured: newDevour
        };

        // Send the UPDATE request for specified id.
        $.ajax('/api/burgers/' + id, {
        type: 'PUT',
        data: newDevouredState
        }).then(
        function() {
            console.log('change devoured to ', newDevour);
            // Reload the page to get the updated list
            // below reloads page from cache
            // if need to reload from server...
            // must use location.reload(true)
            location.reload();
        }
      );
    });

    // ADD: on submit, create new burger object, post to database
    $('#addburger').on('submit', function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
        burger: $('#addburger [name=burger]').val().trim(),
        devoured: 0
        };

        // Send the POST request.
        $.ajax('/api/burgers', {
        type: 'POST',
        data: newBurger
        }).then(
        function() {
            console.log('added new burger');
            // Reload the page to get the updated list
            location.reload();
        }
        );
    });


    // UPDATE: on submit, get ID#, and new burger value to be updated, then PUT request to update recored in DB 
    $('#updateburger').on('submit', function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var id = $('[name=id]').val().trim();

        var updatedBurger = {
        burger: $('#updateburger [name=burger]').val().trim()
        };

        // Send the PUT request.
        $.ajax('/api/burgers/' + id, {
        type: 'PUT',
        data: updatedBurger
        }).then(
        function() {
            console.log('updated id ', id);
            // Reload the page to get the updated list
            location.reload();
        }
        );
    });
});
