window.onload = () => {
    const $contactForm = $("#contact-section form"); 
    const swiper = (elementId) => new Swiper(elementId, {
        loop: true,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    const swiperEnterTheDj = swiper("#swiperEnterTheDj");
    const swiperPoliceShooting = swiper("#swiperPoliceShooting");
    const swiperPureAutoRepair = swiper("#swiperPureAutoRepair");
    const scrollMagicController = new ScrollMagic.Controller({addIndicators: false});

    // navbar
    new ScrollMagic.Scene({
        duration: 0,
        offset:80,
        triggerElement: 'body',
        triggerHook: 0,
        reverse: true
    })
    .setClassToggle(".navbar", "bg-dark")
    .addTo(scrollMagicController);

    // navbar links
    gsap.fromTo(".nav-item, .navbar-bar", {y: -200}, {duration: 0.5, opacity: 1, stagger: -0.2, y: 0});

    // intro
    gsap.fromTo($("#intro-section").children(), {y: 20}, {delay: 1, duration: 0.5, opacity: 1, stagger: 0.3, y: 0});

    // about section heading
    new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: '#about-section',
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(gsap.from('#about-heading', {duration: 0.5, opacity: 0, y: 100}))
    .addTo(scrollMagicController);

    // about section articles
    $("#about-section article").each((index, object) => {
        const xOffset = index % 2 === 0 ? -200 : 200;
        new ScrollMagic.Scene({
            duration: 0,
            offset: 0,
            triggerElement: object,
            triggerHook: 0.8,
            reverse: false
        })
        .setTween(gsap.from(object.children, {display: "none", duration: 0.5, opacity:0, stagger: 0.3, x: xOffset}))
        .addTo(scrollMagicController);
    });

    // about section hr
    new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: '#about-section hr',
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(gsap.from('#about-section hr', {duration: 0.5, opacity: 0}))
    .addTo(scrollMagicController);

    // about section text
    $("#about-section div:last-child").each((index, object) => {
        new ScrollMagic.Scene({
            duration: 0,
            offset: 0,
            triggerElement: object,
            triggerHook: 0.8,
            reverse: false
        })
        .setTween(gsap.from(object, {duration: 1, opacity:0, scale: 0}))
        .addTo(scrollMagicController);
    });

    // resume section image
    new ScrollMagic.Scene({
        duration: 0,
        offset: 150,
        triggerElement: "#resume-section",
        triggerHook: 0.5,
        reverse: false
    })
    .setTween(gsap.from("#resume-section img", {duration: 0.3, opacity: 0, yPercent: 30}))
    .addTo(scrollMagicController);

    // project section articles
    new ScrollMagic.Scene({
        duration: 0,
        offset: 150,
        triggerElement: "#project-section",
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(gsap.from("#project-section article", {duration: 0.5, opacity: 0, stagger: 0.2}))
    .addTo(scrollMagicController);

    // contact section form
    new ScrollMagic.Scene({
        duration: 0,
        offset: 150,
        triggerElement: "#contact-section",
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(gsap.from("#contact-section p, .form-group, #contact-section button", {duration: 0.5, opacity:0, stagger: 0.2, yPercent: 30}))
    .addTo(scrollMagicController);

    // footer text
    new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: "footer",
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(gsap.from("footer p", {duration: 0.5, opacity: 0, scale: 0}))
    .addTo(scrollMagicController);

    // footer links
    new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: "footer",
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(gsap.from("footer a", {duration: 0.2, opacity: 0, delay: 0.2, stagger: 0.2}))
    .addTo(scrollMagicController);

    $("#project-section article").hover(
        function() {
            $(this).find("img").addClass("clear");
            $(this).find("figcaption").removeClass("opacity-transparent");
            $(this).find("figcaption button").css("bottom", "calc(50% - 40px)");
            $(this).find("figcaption h1").css("top", "calc(50% - 40px)");
        },
        function() {
            $(this).find("img").removeClass("clear");
            $(this).find("figcaption").addClass("opacity-transparent");
            $(this).find("figcaption button").css("bottom", "0");
            $(this).find("figcaption h1").css("top", "0");
        }     
    );

    $contactForm.submit((event) => {
        event.preventDefault();
        // clear error messages
        $(".form-control").removeClass("is-invalid");
        $.ajax({
            type: "POST",
            url: "contact.php",
            data: $contactForm.serialize(),
            dataType: "json",
            success: (data) => {
                if (data.success) {
                    let alertMessage = '<div class="alert bg-info alert-dismissible fade show" role="alert">' +
                        '<strong>Message sent!</strong>' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span id="success-close" aria-hidden="true">&times;</span>' +
                        '</button>';
                    // clear input fields
                    e.target.reset();
                    $("#contact-form-alert").html(alertMessage);
                    setTimeout(() => {
                        $(".alert").alert("close");
                    }, 4000);
                } else {
                    let errors = data.errors;
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
                let alertMessage = '<div class="alert bg-danger alert-dismissible fade show" role="alert">' +
                    '<strong>Message could not be sent! Try again.</strong>' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span id="success-close" aria-hidden="true">&times;</span>' +
                    '</button>';
                $("#contact-form-alert").html(alertMessage);
                setTimeout(() => {
                    $(".alert").alert("close");
                }, 4000);
                console.log(error);
            }
        });
    });

    // delay slides and video embed loading for page to load more smoothly
    setTimeout(() => {
    // add image slides for chowbox project modal
    for (i = 1; i <= 247; i++) {
        $("#swiperChowbox .swiper-wrapper").append(`<div class="swiper-slide"><img src="images/chowbox/image${i}.jpg" alt="chowbox"/></div>`)
    }
    swiper("#swiperChowbox");
    document.getElementById("video-slide").innerHTML = '<iframe src="https://www.youtube.com/embed/9UJYzSgAA-g" frameborder="0" allowfullscreen></iframe>';    
    }, 2000);
};