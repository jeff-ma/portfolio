window.onload = () => {
    const $contactForm = $('#contact-form'); 
    const scrollMagicController = new ScrollMagic.Controller({addIndicators: false});

    // animate navbar
    new ScrollMagic.Scene({
        duration: 0,
        offset:80,
        triggerElement: 'body',
        triggerHook: 0,
        reverse: true
    })
    .setClassToggle(".navbar", "bg-dark")
    .addTo(scrollMagicController);

    //animate navbar links
    new TweenMax.staggerFrom(".nav-item, .navbar-bar", 0.5, {opacity: 0, y: -100}, -0.2)

    // animate home caption 
    new TweenMax.staggerFrom($(".caption").children(), 0.5, {opacity: 0, y: 20, delay: 1}, 0.3);

    // animate about heading
    new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: '#about-section',
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(new TweenMax.from('#about-heading', 0.5, {opacity: 0, y: 100}))
    .addTo(scrollMagicController);

    // animate about icon box
    $(".about-icon-box").each((index, object) => {
        const xOffset = index % 2 === 0 ? -200 : 200;
        new ScrollMagic.Scene({
            duration: 0,
            offset: 0,
            triggerElement: object,
            triggerHook: 0.8,
            reverse: false
        })
        .setTween(new TweenMax.staggerFrom(object.children, 0.5, {opacity:0, x: xOffset, display: "none"}, 0.3))
        .addTo(scrollMagicController);
    });

    // animate about section hr
    new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: '#about-section hr',
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(new TweenMax.from('#about-section hr', 0.5, {opacity: 0}))
    .addTo(scrollMagicController);

    // animate about text
    $(".about-text").each((index, object) => {
        new ScrollMagic.Scene({
            duration: 0,
            offset: 0,
            triggerElement: object,
            triggerHook: 0.8,
            reverse: false
        })
        .setTween(new TweenMax.from(object, 1, {opacity:0, scale: 0}))
        .addTo(scrollMagicController);
    });

    // animate resume section
    new ScrollMagic.Scene({
        duration: 0,
        offset: 150,
        triggerElement: "#resume-section",
        triggerHook: 0.5,
        reverse: false
    })
    .setTween(new TweenMax.staggerFrom($("#resume-section").children(), 0.2, {opacity:0, yPercent: 30, delay: 0}, 0.2))
    .addTo(scrollMagicController);

    // animate projects section
    new ScrollMagic.Scene({
        duration: 0,
        offset: 150,
        triggerElement: "#project-samples-row",
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(new TweenMax.staggerFrom($("#project-heading, .project-sample-card"), 0.4, {opacity:0, delay: 0}, 0.2))
    .addTo(scrollMagicController);

    // animate contact section
    new ScrollMagic.Scene({
        duration: 0,
        offset: 150,
        triggerElement: "#contact-section",
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(new TweenMax.staggerFrom($("#contact-text, .form-group"), 0.2, {opacity:0, yPercent: 30}, 0.2))
    .addTo(scrollMagicController);

    // animate footer text
    new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: "footer",
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(new TweenMax.from("footer p", 0.5, {opacity: 0, scale: 0}))
    .addTo(scrollMagicController);

    // animate footer links
    new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: "footer",
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(new TweenMax.staggerFrom(".footer-link", 0.2, {opacity: 0, delay: 0.2}, 0.2))
    .addTo(scrollMagicController);

    $contactForm.submit((e) => {
        e.preventDefault();
        // clear error messages
        $(".form-control").removeClass("is-invalid");
        // send submission
        $.ajax({
            type: "POST",
            url: "contact.php",
            data: $contactForm.serialize(),
            dataType: "json",
            success: (data) => {
                if (data.success) {
                    let alertMessageHeader = '<div class="alert bg-info alert-dismissible fade show" role="alert">' +
                    '<strong>Message sent!</strong>' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span id="success-close" aria-hidden="true">&times;</span>' +
                    '</button>';
                    // clear input fields
                    e.target.reset();
                    // display message
                    $("#contact-form-alert").html(alertMessageHeader);
                    // automatically close success message header after 4 seconds
                    setTimeout(() => {
                        $(".alert").alert("close");
                    }, 4000);
                } else {
                    let errors = data.errors;
                    // show error messages
                    if (errors.name) {
                        $("#name").addClass("is-invalid");
                        $("#name-error").text(errors.name);
                    }
                    if (errors.email) {
                        $("#email").addClass("is-invalid");
                        $("#email-error").text(errors.email);
                    }
                    if (errors.subject) {
                        $("#subject").addClass("is-invalid");
                        $("#subject-error").text(errors.subject);
                    }
                    if (errors.message) {
                        $("#message").addClass("is-invalid");
                        $("#message-error").text(errors.message);
                    }
                }
            },
            error: (error) => {
                let alertMessageHeader = '<div class="alert bg-danger alert-dismissible fade show" role="alert">' +
                '<strong>Message could not be sent! Try again.</strong>' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span id="success-close" aria-hidden="true">&times;</span>' +
                '</button>';
                // display message
                $("#contact-form-alert").html(alertMessageHeader);
                // automatically close success message header after 4 seconds
                setTimeout(() => {
                    $(".alert").alert("close");
                }, 4000);
                console.log(error);
            }
        });
    });
};
