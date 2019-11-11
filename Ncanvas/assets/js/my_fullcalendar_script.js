$(document).ready(function () {
    let url = "../php/submit_calender.php";
    loadDataCalendar(url);

    $("#sidenav-collapse-main").on("show.bs.collapse",function () {
        $("#calendar").hide();
    });
    $("#sidenav-collapse-main").on("hidden.bs.collapse",function () {
        $("#calendar").show();
    });
    $("#calender-user-dropdown").on("show.bs.dropdown",function () {
        $("#calendar").hide();
    });
    $("#calender-user-dropdown").on("hidden.bs.dropdown",function () {
        $("#calendar").show();
    });
    function loadDataCalendar(url) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState===4 && xmlHttp.status===200)
            {
                let data=xmlHttp.responseText;
                data = JSON.parse(data);
                renderCalendar(data);
            }
        };
        xmlHttp.open("GET",url+"?uid="+uid,true);
        xmlHttp.send();
    }
    function renderCalendar(data){
        console.log(data);
        jQuery('#calendar').fullCalendar({
            // theme: true,
            themeSystem: 'bootstrap4',
            // emphasizes business hours
            businessHours: false,
            defaultView: 'month',
            // event dragging & resizing
            editable: false,
            // header
            header: {
                left: 'today prev,next',
                center: 'title',
                right: 'month,agendaWeek'
            },
            aspectRatio: 1.5,
            firstDay: 1,
            weekMode: 'liquid',
            events: data,
            eventRender: function (event, element) {
                if (event.icon) {
                    element.find(".fc-title").prepend("<i class='fa fa-" + event.icon + "'></i>");
                }
            },
            eventClick: function (event, jsEvent, view) {
                jQuery('.event-icon').html("<i class='fa fa-" + event.icon + "'></i>");
                jQuery('.event-title').html(event.title);
                jQuery('.event-body').html(event.description);
                jQuery('.eventUrl').attr('href', event.url);
                jQuery('#modal-view-event').modal();
            },
        });
    }

    /*for admin, not used anymore*/

    // jQuery('.datetimepicker').datepicker({
    //     timepicker: true,
    //     language: 'en',
    //     range: true,
    //     multipleDates: true,
    //     multipleDatesSeparator: " - "
    // });
    // jQuery("#add-event").submit(function () {
    //     alert("Submitted");
    //     var values = {};
    //     $.each($('#add-event').serializeArray(), function (i, field) {
    //         values[field.name] = field.value;
    //     });
    //     console.log(
    //         values
    //     );
    // });
    // jQuery('#calendar').fullCalendar({
    //     // theme: true,
    //     themeSystem: 'bootstrap4',
    //     // emphasizes business hours
    //     businessHours: false,
    //     defaultView: 'month',
    //     // event dragging & resizing
    //     editable: false,
    //     // header
    //     header: {
    //         // left: 'title',
    //         // center: 'month,agendaWeek,agendaDay',
    //         left: 'today prev,next',
    //         center: 'title',
    //         right: 'month,agendaDay'
    //     },
    //     aspectRatio: 1.5,
    //     firstDay: 1,
    //     weekMode: 'liquid',
    //     events: data,
    //     eventRender: function (event, element) {
    //         if (event.icon) {
    //             element.find(".fc-title").prepend("<i class='fa fa-" + event.icon + "'></i>");
    //         }
    //     },
    //     // dayClick: function () {
    //     //     jQuery('#modal-view-event-add').modal();
    //     // },
    //     eventClick: function (event, jsEvent, view) {
    //         jQuery('.event-icon').html("<i class='fa fa-" + event.icon + "'></i>");
    //         jQuery('.event-title').html(event.title);
    //         jQuery('.event-body').html(event.description);
    //         jQuery('.eventUrl').attr('href', event.url);
    //         jQuery('#modal-view-event').modal();
    //     },
    // })

});