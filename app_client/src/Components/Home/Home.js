import React, {Component} from "react";
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className='div1'>
            <h1 className='list_h1'>О нас</h1>
        <p>Доставка техники к месту ремонта и обратно! Бесплатно, быстро и гарантированно удобно, проверенно тысячами
            клиентов! С нами, Вы, найдете свободное время.</p>
        <p>Никаких непредвиденных расходов! Абсолютно прозрачный ценник предоставляется ещё до ремонта, вплоть до
            расходных материалов.</p>
        <p>У нас многое: лучшие специалисты, быстрый и качественный ремонт, гарантия и безопасность. Вот наше отличие!</p>
        <h1 className='list_h1'>Наши услуги</h1>
        <ul>
            <li><a>Диагностика смартфона</a></li>
            <li><a>Замена дисплея</a></li>
            <li><a>Замена АКБ</a></li>
            <li><a>Замена разъемов</a></li>
            <li><a>Замена микрофона</a></li>
            <li><a>Замена динамиков</a></li>
            <li><a>Диагностика компьютера</a></li>
            <li><a>Замена блока питания</a></li>
        </ul>
        <ul>
            <li><a>Ремонт материнских плат</a></li>
            <li><a>Ремонт видеокарт</a></li>
            <li><a>Сборка и апгрейд компьютера</a></li>
            <li><a>Чистка системного блока</a></li>
            <li><a>Ремонт ноутбуков</a></li>
            <li><a>Диагностика ноутбука</a></li>
            <li><a>Ремонт материнской платы</a></li>
            <li><a>Чистка ноутбука от пыли</a></li>
        </ul>
        <ul>
            <li><a>Замена матрицы</a></li>
            <li><a>Замена клавиатуры</a></li>
            <li><a>Ремонт принтеров</a></li>
            <li><a>Диагностика принтера</a></li>
            <li><a>Заправка картриджей</a></li>
            <li><a>Замена матрицы</a></li>
            <li><a>Замена разъемов</a></li>
            <li><a>Чистка принтера</a></li>
        </ul>
        <h1 className='list_h1'>О компании</h1>
        <p>Наша компания <strong>«ПочиниКА»</strong>
            осуществляет ремонт различных видов электронных устройств (компьютеры, ноутбуки, планшеты, принтеры,
            телефоны) любой сложности в Нижнем Новгороде. </p>
        <p>Сейчас очень много объявлений о ремонте пк, среди которых очень много непрофессиональных мастеров, которые
            пытаются только заработать.
            Цена, быстрота, качество ремонта зависят от того, к какому мастеру Вы обратились. Помните, что желание
            сэкономить на ремонте может в дальнейшем повлечь еще большие финансовые потери.</p>
        <p> Можете быть уверены что наш <strong>сервисный центр «ПочиниКА» обеспечит беспрерывную работу Вашей
            техники</strong>, исходя из желаний и потребностей клиента. Ведь клиент всегда прав!</p>
            </div>
                )
    }
}
export default Home;