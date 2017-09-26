function initCulture() {
    var cultureName = "en";

    if (applicationData.CultureName != null) {
        cultureName = applicationData.CultureName;

        if ($.jStorage.get('cultureName') == null) {
            $.jStorage.set('cultureName', cultureName);
        }
    } else {
        if ($.jStorage.get('cultureName') != null) {
            cultureName = $.jStorage.get('cultureName');
        } else if ($.jStorage.get('cultureName') == null) {
            $.jStorage.set('cultureName', cultureName);
        }
    }

    if (cultureName == "ru" || cultureName == "Ru" || cultureName == "ru-RU") {
        initRuCulture();
    } else if (cultureName == "ua" || cultureName == "uk" || cultureName == "ua-UK") {
        initUaCulture()
    } else {
        initEnCulture();
    }
	$(".startScan-wrapper h1").html(cultureRes.pleaseScan);
    $("#startScan").html(cultureRes.startScan);


    $(".container-statusBooking .cart-top-line span").html(cultureRes.bookStatus);
    $(".bookingServices-container .cart-top-line span").html(cultureRes.services);
    $(".bookingServices-container .btn-order-booking span").html(cultureRes.orderBook);
    $(".container-selectFreeBookTime .back-to-container-from-book span").html(cultureRes.selectFreeTime);
    $(".container-selectFreeBookTime p span").html(cultureRes.offerTimes);
    $(".container-selectFreeBookTime #bookAfterConfirmFreeTime span").html(cultureRes.book);
    $(".dateTimePicker-container .cart-top-line span").html(cultureRes.selectDate);
    $("label[for='dateTimePicker-time']").html(cultureRes.selectTime);
    $("label[for='dateTimePicker-date']").html(cultureRes.selectDate);
    $("label[for='nameOrder']").html(cultureRes.name);
    $("label[for='confirmMethod']").html(cultureRes.phone);
    $("label[for='commentOrder']").html(cultureRes.orderComments);
    $(".dateTimePicker-container .btn-confirmDateForBook span").html(cultureRes.confirmMeth);
    $(".order-booking .cart-top-line span").html(cultureRes.orderInfo);
    $(".order-booking .btn-send-order-booking span ").html(cultureRes.book);
    $(".cart .cart-top-line span").html(cultureRes.yourOrder);
    $(".cart .totalPrice span ").html(cultureRes.total);
    $(".cart .btn-order span ").html(cultureRes.order);
    $(".cart .go-to-menu").html(cultureRes.contShop);
    $("#orderInfo .go-to-menu-btn").html(cultureRes.contShop);
    $("#orderInfo .cart-top-line span ").html(cultureRes.orderInfo);
    $("#orderInfo label[for='nameOrder']").html(cultureRes.name);
    $("#orderInfo label[for='phoneOrder']").html(cultureRes.phone);
    $("#orderInfo label[for='emailOrder']").html(cultureRes.email);
    $("#orderInfo label[for='commentOrder']").html(cultureRes.orderComments);
    $("#orderInfo .placeAnOrder span").html(cultureRes.buy);
}

function initEnCulture() {
    window.cultureRes = new Object();
    //index.html
	cultureRes.startScan = "Start Scan";
    cultureRes.pleaseScan = "Please Scan QR for your Application";
    cultureRes.bookStatus = "Your book status list";
    cultureRes.services = "Services";
    cultureRes.selectFreeTime = "Select free time";
    cultureRes.offerTimes = "We can offer you these times:";
    cultureRes.selectDate = "Select Date";
    cultureRes.selectTime = "Select time";
    cultureRes.name = "Name";
    cultureRes.phone = "Phone Number";
    cultureRes.email = "Email";
    cultureRes.orderComments = "Your Order Comments";
    cultureRes.confirmMeth = "Сontinue";
    cultureRes.orderInfo = "Your Order Info";
    cultureRes.yourOrder = "Your Order";
    cultureRes.total = "Total ";
    cultureRes.order = "Order";
    cultureRes.buy = "Buy";
    cultureRes.contShop = "Сontinue shopping"

    //day of week
    cultureRes.sunday = "Sunday";
    cultureRes.monday = "Monday";
    cultureRes.tuesday = "Tuesday";
    cultureRes.wednesday = "Wednesday";
    cultureRes.thursday = "Thursday";
    cultureRes.friday = "Friday";
    cultureRes.saturday = "Saturday";
    //bookingWork
    cultureRes.time = "Time";
    cultureRes.date = "Date";
    cultureRes.dontAnyBook = "You don't book any service!";
    cultureRes.bookConf = "You can  order only  one kind of time line! If you continue booking this service, other services will be cleared from booking list?";
    cultureRes.book = "Book";
    cultureRes.alreadyBook = "You already have booked this service!";
    cultureRes.resourcesDontWork = "Sorry, resource don't work in this day of week!";
    cultureRes.selectServTime = "Please, select date for this service!";
    cultureRes.cantBookOne = "Извените, но вы можете зарезервировать от";
    cultureRes.cantBookTwo = "и до";
    cultureRes.cantBookThree = "Time";
    cultureRes.ok = "OK";
    cultureRes.instOpen = "Sorry, Institution is open from ";
    cultureRes.sorryError = "Sorry, error!";
    //cartWork
    cultureRes.thankYou = "Thank You";
    cultureRes.nothingOrdered = "You have nothing ordered!";
    //eventWork
    cultureRes.lockedPage = "This page is locked!";
    cultureRes.loginPlease = "Login Please";
    //formWork
    cultureRes.noInternet = "Извините, проверте Интернет соединение!";
    cultureRes.requiredFields = "Please fill in all required fields!";
    cultureRes.validPhone = "Please enter valid phone number!";
    cultureRes.validEmail = "Please enter valid email!";
    cultureRes.passLength = "Password must contain 4 or more characters!";
    cultureRes.pathNotMatgh = "Passwords do not match. Try again.";
    //MobileView
    cultureRes.haveNotOrders = "You haven't any orders!";
    cultureRes.confirmated = "Confirmated";
    cultureRes.pending = "Pending";
    cultureRes.sorryOnline = "Sorry, is only available online!";
    //render-booking
    cultureRes.displayInst = "Institution";
    cultureRes.displayInstTwo = "Institution - ";
    cultureRes.orderBook = "Order Booking";
    cultureRes.timeLine = "Time Line";
    cultureRes.displayName = 'Name - ';
    cultureRes.openTime = "Working hours ";
    cultureRes.closeTime = "Close Time";
    cultureRes.startBookDay = "Start book day - ";
    cultureRes.stepMin = "Step Minutes - ";
    cultureRes.countDay = "Count Days For Book - ";
    cultureRes.service = "Service";
    cultureRes.description = "Description - ";
    cultureRes.durationTime = "Duration Time - ";
    cultureRes.book = "Book";
    cultureRes.resource = "Resource";

    //render-*-form
    cultureRes.formBlock = "FormBlock";
    cultureRes.telPlaceholder = "Format: +XXXXXXXXXXX";
    cultureRes.dropDown = "DropDownModels";
    cultureRes.checkBox = "CheckBoxModels";
    cultureRes.RadioButton = "RadioButtonModels";
    cultureRes.submit = "Submit";
    cultureRes.logout = "Logout";

    //render-restaurant-menu
    cultureRes.RestMenu = "RestaurantMenuBlock";
    cultureRes.add = "Add";

    //render-inst
    cultureRes.inst = "Institution";
    cultureRes.instDisplay = "Institution - ";

    //render-single-shopitem
    cultureRes.shopitem = "singleShopItem";
    cultureRes.shopitemDesc = "Description:";
    cultureRes.addToCart = "Add to Cart";
    cultureRes.goToMenu = "Menu";

    cultureRes.itemAdded = "Item add to cart!";
    cultureRes.restConf = "Your shopping cart already has order from previous restaurant. If you add and confirm current order the order from previous restaurant will be removed. Continue?";
    cultureRes.sorryOnline = "Sorry, is only available online!";
    cultureRes.noTime = "No time for this rest!";

}

function initRuCulture() {
    window.cultureRes = new Object();
    //index.html
	cultureRes.startScan = "Начать сканировать";
    cultureRes.pleaseScan = "Пожалуйста, отсканируйте QR-код Вашего приложения";
    cultureRes.bookStatus = "Список статусов Ваших бронирований";
    cultureRes.services = "Сервисы";
    cultureRes.selectFreeTime = "Выберите свободное время";
    cultureRes.offerTimes = "Мы можем предложить Вам другое время:";
    cultureRes.selectDate = "Выбрать дату";
    cultureRes.selectTime = "Выбрать время";
    cultureRes.name = "Имя";
    cultureRes.phone = "Номер телефона";
    cultureRes.email = "Email";
    cultureRes.orderComments = "Коментарии к заказу";
    cultureRes.confirmMeth = "Продолжить";
    cultureRes.orderInfo = "Информация и заказе";
    cultureRes.yourOrder = "Ваш заказ";
    cultureRes.total = "Всего: ";
    cultureRes.order = "Заказ";
    cultureRes.buy = "Купить";
    cultureRes.contShop = "Продолжить покупки"

    //day of week
    cultureRes.sunday = "Воскресенье";
    cultureRes.monday = "Понедельник";
    cultureRes.tuesday = "Вторник";
    cultureRes.wednesday = "Среде";
    cultureRes.thursday = "Четверг";
    cultureRes.friday = "Пятница";
    cultureRes.saturday = "Суббота";
    //bookingWork
    cultureRes.time = "Время";
    cultureRes.date = "Дата";
    cultureRes.dontAnyBook = "Вы не выбрали сервис!";
    cultureRes.bookConf = "Вы можете заказать только один тип графика! Если вы продолжите бронирование этого сервиса, другие услуги будут удалены из списка бронирования?";
    cultureRes.book = "Забронировать";
    cultureRes.alreadyBook = "Вы уже забронировали этот сервис!";
    cultureRes.resourcesDontWork = "Извините, ресурс не доступен в этот день недели!";
    cultureRes.selectServTime = "Пожалуйста, укажите дату джля этого сервиса!";
    cultureRes.cantBookOne = "Извените, но вы можете зарезервировать от";
    cultureRes.cantBookTwo = "и до";
    cultureRes.cantBookThree = "Время";
    cultureRes.ok = "OK";
    cultureRes.instOpen = "Извините, организация открыта с ";
    cultureRes.sorryError = "Извините, ошибка!";
    //cartWork
    cultureRes.thankYou = "Спасибо";
    cultureRes.nothingOrdered = "Вам нечего заказивать!";
    //eventWork
    cultureRes.lockedPage = "Это страница заблокирована!";
    cultureRes.loginPlease = "Войдите в систему, пожалуйста";
    //formWork
    cultureRes.noInternet = "Извините, проверте Интернет соединение!";
    cultureRes.requiredFields = "Пожалуйста, заполните все обязательные поля!";
    cultureRes.validPhone = "Пожалуйста, введите номер правильного формата!";
    cultureRes.validEmail = "Пожалуйста, введите правильный формат електронной почты!";
    cultureRes.passLength = "Пароль должен содержать 4 или более символов!";
    cultureRes.pathNotMatgh = "Пароли не совпадают. Попробуйте еще.";
    //MobileView
    cultureRes.haveNotOrders = "У Вас нет заказов!";
    cultureRes.confirmated = "Подтвержденно";
    cultureRes.pending = "В ожидании";
    cultureRes.sorryOnline = "Извинити, но требуется подключение к сети Интернет!";
    //render-booking
    cultureRes.displayInst = "Организация";
    cultureRes.displayInstTwo = "Организация - ";
    cultureRes.orderBook = "Бронирование заказа";
    cultureRes.timeLine = "График";
    cultureRes.displayName = 'Название - ';
    cultureRes.openTime = "Время работы ";
    cultureRes.closeTime = "Время закрытия";
    cultureRes.startBookDay = "Дни до начала работы - ";
    cultureRes.stepMin = "Шаг(минут) - ";
    cultureRes.countDay = "Дни бронирования - ";
    cultureRes.service = "Сервис";
    cultureRes.description = "Описание - ";
    cultureRes.durationTime = "Продолжительность - ";
    cultureRes.book = "Бронировать";
    cultureRes.resource = "Ресурс";

    //render-*-form
    cultureRes.formBlock = "Форма";
    cultureRes.telPlaceholder = "Формат: +XXXXXXXXXXX";
    cultureRes.dropDown = "Выпадающий список";
    cultureRes.checkBox = "Флажок";
    cultureRes.RadioButton = "Переключатель";
    cultureRes.submit = "Подтвердить";
    cultureRes.logout = "Выйти из системы";

    //render-restaurant-menu
    cultureRes.RestMenu = "Меню ресторана";
    cultureRes.add = "Добавить";

    //render-inst
    cultureRes.inst = "Организация";
    cultureRes.instDisplay = "Организация - ";

    //render-single-shopitem
    cultureRes.shopitem = "Магазин";
    cultureRes.shopitemDesc = "Описание:";
    cultureRes.addToCart = "Добавить в корзину";
    cultureRes.goToMenu = "Перейти к меню";

    cultureRes.itemAdded = "Добавленно в корзину!";
    cultureRes.restConf = "В Вашей корзине есть заказ и предыдущего ресторана. Если вы добавите и подтвердите текущий заказ, заказ из предыдущего ресторана будет удален. Продолжить?";
    cultureRes.sorryOnline = "Извинити, но требуется подключение к сети Интернет!";
    cultureRes.noTime = "В ресторане, нет свободного времени!";
}

function initUaCulture() {
    window.cultureRes = new Object();
    //index.html
	cultureRes.startScan = "Почати сканування";
    cultureRes.pleaseScan = "Будь ласка, відскануйте QR-код Вашого додатку";
    cultureRes.bookStatus = "Список статусів Ваших замовлень";
    cultureRes.services = "Сервіси";
    cultureRes.selectFreeTime = "Оберіть вільний час";
    cultureRes.offerTimes = "Ми можемо, запропонувати Вам інший час:";
    cultureRes.selectDate = "Оберіть дату";
    cultureRes.selectTime = "Оберіть час";
    cultureRes.name = "Ім`я";
    cultureRes.phone = "Номер телефону";
    cultureRes.email = "Email";
    cultureRes.orderComments = "Коментарі до Вашого резервування";
    cultureRes.confirmMeth = "Продовжити";
    cultureRes.orderInfo = "Інофрмація про резервування";
    cultureRes.yourOrder = "Ваше резервування";
    cultureRes.total = "Всього ";
    cultureRes.order = "Резервування";
    cultureRes.buy = "Придбати";
    cultureRes.contShop = "Продовжити покупки"

    //day of week
    cultureRes.sunday = "Неділя";
    cultureRes.monday = "Понеділок";
    cultureRes.tuesday = "Вівторок";
    cultureRes.wednesday = "Середа";
    cultureRes.thursday = "Четвер";
    cultureRes.friday = "П`ятниця";
    cultureRes.saturday = "Субота";
    //bookingWork
    cultureRes.time = "Час";
    cultureRes.date = "Дата";
    cultureRes.dontAnyBook = "Ви, не обрали сервісYou don't book any service!";
    cultureRes.bookConf = "Ви можете замовити тільки один графік! Якщо продовжити бронювання цієї послуги, інші послуги будуть вилучені зі списку бронювання?";
    cultureRes.book = "Бронювання";
    cultureRes.alreadyBook = "Ви, вже забронювали данний сервіс!";
    cultureRes.resourcesDontWork = "Вибачте, ресурс не доступний в данний день тиждня!";
    cultureRes.selectServTime = "Будь ласка, вкажіть дату для сервісу!";
    cultureRes.cantBookOne = "Вибачте, але Ві можете забронювати від ";
    cultureRes.cantBookTwo = "и до";
    cultureRes.cantBookThree = "Час";
    cultureRes.ok = "OK";
    cultureRes.instOpen = "Вибачте, організація відкрита з ";
    cultureRes.sorryError = "Вибачте помилка!";
    //cartWork
    cultureRes.thankYou = "Дякуємо";
    cultureRes.nothingOrdered = "Вам немає чого бронювати!";
    //eventWork
    cultureRes.lockedPage = "Ця сторінка заблокована!";
    cultureRes.loginPlease = "Увійдить у систему";
    //formWork
    cultureRes.noInternet = "Вибачте, відсутнє Інтернет з`єднання!";
    cultureRes.requiredFields = "Будь ласка, заповніть все обов`язкові поля!";
    cultureRes.validPhone = "Будь ласка, вкажіть номер телефону у правильноve форматі!";
    cultureRes.validEmail = "Будь ласка, вкажіть правильний формат електронної пошти!";
    cultureRes.passLength = "Пароль має містити 4 або більше символів!";
    cultureRes.pathNotMatgh = "Паролі не співпадають. Спробуйте знову.";
    //MobileView
    cultureRes.haveNotOrders = "У Вас не має бронювань!";
    cultureRes.confirmated = "Підтвердженно";
    cultureRes.pending = "В очікуванні";
    cultureRes.sorryOnline = "Вибачте, але для цього потрібне Інтернет з`єднання!";
    //render-booking
    cultureRes.displayInst = "Організація";
    cultureRes.displayInstTwo = "Організація - ";
    cultureRes.orderBook = "Заказ бронювання";
    cultureRes.timeLine = "Графік";
    cultureRes.displayName = 'Назва - ';
    cultureRes.openTime = "Час роботи";
    cultureRes.closeTime = "Час закріття";
    cultureRes.startBookDay = "Днів до початку роботи - ";
    cultureRes.stepMin = "Крок(хвилин) - ";
    cultureRes.countDay = "Днів броннювання - ";
    cultureRes.service = "Сервіс";
    cultureRes.description = "Описання - ";
    cultureRes.durationTime = "Тривалість - ";
    cultureRes.book = "Бронювання";
    cultureRes.resource = "Ресурс";

    //render-*-form
    cultureRes.formBlock = "Форма";
    cultureRes.telPlaceholder = "Формат: +XXXXXXXXXXX";
    cultureRes.dropDown = "Випадаючий список";
    cultureRes.checkBox = "Прапорець";
    cultureRes.RadioButton = "Перемикач";
    cultureRes.submit = "Підтвердити";
    cultureRes.logout = "Вийти з системи";

    //render-restaurant-menu
    cultureRes.RestMenu = "Меню ресторана";
    cultureRes.add = "Додати";

    //render-inst
    cultureRes.inst = "Орагнізація";
    cultureRes.instDisplay = "Організація - ";

    //render-single-shopitem
    cultureRes.shopitem = "Магазин";
    cultureRes.shopitemDesc = "Описання:";
    cultureRes.addToCart = "Додати в корзину";
    cultureRes.goToMenu = "Перейти до меню";
    cultureRes.itemAdded = "Додано в корзину!";
    cultureRes.restConf = "У Вашій корзині є замовлення від попереднього ресторану. Якщо додати і підтвердити поточне замовлення, замовлення від попереднього ресторану буде видалено. Продовжити?";
    cultureRes.sorryOnline = "Вибачте, але для цього потрібне Інтернет з`єднання!";
    cultureRes.noTime = "Ресторан не має вільного часу!";

}