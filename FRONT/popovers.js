$("#login").popover({
    html: true, 
	  content: function() {
        return $('#popover-content').html();
    }
});

$("#accInfo").popover({
    html: true, 
	  content: function() {

        var htmlContent = $($('#loggedin-content').html());

        $(htmlContent).find('#namePlate').html(`Trenutno ste na nalogu: <b>${localStorage.getItem("uName")}</b>`);
        htmlContent.addClass("text-center");
        console.warn($(htmlContent).html());
        return htmlContent.html();
    }
});
