$('#picbar li').on('click', function() {
    $('#clickdir').text('Close Photos');
    $('#clickdir').css('font-weight', 'bolder');
    $('.hide').css('opacity', '0');
    $('img').css('height', '30vmin');
})

$('#clickdir').on('click', function() {
    $(this).text('Click Below for Photos');
    $(this).css('font-weight', 'lighter');
    $('.hide').css('opacity', '1');
    $('img').css('height', '0');
})

$('#Law').on('click', function() {
    $('img').attr('src', 'images/CJB Picture.jpg');
});


$('#Beach').on('click', function() {
    $("img").attr('src', 'images/CJB-3.jpg');
});

$('#MM').on('click', function() {
    $('img').attr('src', 'images/CJ.jpg');
});


$('#Bug').on('click', function() {
    $('img').attr('src', 'images/Molly.jpg');
});