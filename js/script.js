// $(document).ready(function(){
//     $('.carousel__inner').slick({
//       speed: 1200,
//       // adaptiveHeight: true,
//       prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.png" alt="left"></button>',
//       nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.png" alt="right"></button>',
//       responsive: [
//         {
//           breakpoint: 992,
//           settings: {
//             dots: true,
//             arrows: false
//           }
//         }
//       ]
//     });
//   });

$(document).ready(function(){
  console.log('jQuery is ready');

  // Инициализация слайдера Tiny Slider
  const slider = tns({
      container: '.carousel__inner',
      items: 1,
      slideBy: 'page',
      autoplay: false,
      controls: false
  });

  console.log('Tiny Slider initialized');

  // Обработчики для кнопок слайдера
  document.querySelector('.prev').addEventListener('click', function () {
      console.log('Prev button clicked');
      slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
      console.log('Next button clicked');
      slider.goTo('next');
  });

  // Обработчик для переключения вкладок
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      console.log('Tab clicked:', this);
      $(this)
          .addClass('catalog__tab_active')
          .siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content')
          .removeClass('catalog__content_active').eq($(this).index())
          .addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('fast');
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  $('.button_mini').each(function(i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    })
  });


  function validateForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста введите свое имя.",
          minlength: jQuery.validator.format("Введите {0} символа")
        },
        phone: "Введите свой номер телефона",
        email: {
          required: "Вы должны указать свой электроенный адрес почты",
          email: "Ваша почта не правильного формата"
        }
      }
    });
  };

  validateForm('#consultation-form');
  validateForm('#consultation form');
  validateForm('#order form');

  $('input[name=phone]').mask('+7 (999) 999-99-99');

  $('form').submit(function(e) {
    e.preventDefault(); /* Отмена перезагрузки страницы */

    if (!$(this).valid()) {
      return;
    }
    console.log("Hello, epta!");
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();
      $('form').trigger('reset');
    });
    return false;
  });

  // Скролл верх

  $(window).scroll(function(e) {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#'").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(_href).offset().top+"px"
    });
  });

  new WOW().init();
});
