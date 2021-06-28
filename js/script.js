// Создаем функцию filterByType которая принемает значения из select и input и фильтрует данные значения по типу данных
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	// Создаем стрелочную функцию hideAllResponseBlocks которая
	hideAllResponseBlocks = () => {
		// создает перемменую, которая принемает новый массив из всех полученных со страницы
		// элементов div с классом dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// запускаем цикл forEach, который устанавливает каждому элемменту класс display = 'none'(скрытие элемента)
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	// Создаем стрелочную функцию showResponseBlock которая принимает три значения
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// запускает функцию hideAllResponseBlocks
		hideAllResponseBlocks();
		// получает элемент с селектором blockSelector и устанавливает ему класс display = 'block'(отобразить элемент)
		document.querySelector(blockSelector).style.display = 'block';
		// если в функцию переданно значение spanSelector то
		if (spanSelector) {
			// получаем элемент с селектором полученным из spanSelector и устанавливает ему значение textContent
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// Создаем стрелочную функцию showError, которая принемает значение из catch и отображает div блок с ошибкой
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// Создаем стрелочную функцию showResults, 
	// которая принемает значение из try alertMsg и отображает div блок с отфильтрованным результатом
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// Создаем стрелочную функцию showNoResults,
	// которая отображает div блок с с сообщением 'Пока что нечего показать'
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// Создаем стрелочную функцию tryFilterByType для обрабатки данных из select и input,
	tryFilterByType = (type, values) => {
		// проверяем код на ошибки внутри блока try
		try {
			// создаем переменную valuesArray, которая запустит функцию filterByType и обьеденит все элементы из массива в строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// создаем переменную alertMsg которая проверяет длинну строки valuesArray
			// если valuesArray.length имеет значение
			const alertMsg = (valuesArray.length) ?
				// то выводим сообщение
				`Данные с типом ${type}: ${valuesArray}` :
				// иначе выводим сообщение 
				`Отсутствуют данные типа ${type}`;
			// после проверки запускаем функцию showResults и передаем в нее параметры полученные в alertMsg
			showResults(alertMsg);
			// Если есть ошибка
		} catch (e) {
			// то выводим сообщение запустив функцию showError
			showError(`Ошибка: ${e}`);
		}
	};
//получаем кнопку со странице по id 'filter-btn'
const filterButton = document.querySelector('#filter-btn');
// навешиваем событие клик на кнопку
filterButton.addEventListener('click', e => {
	//получаем select со страницы по id 'type'
	const typeInput = document.querySelector('#type');
	//получаем input со страницы по id 'data'
	const dataInput = document.querySelector('#data');
	// Если value у input равно пустому значению
	if (dataInput.value === '') {
		// То устанавливаем специальное сообщение с ошибкой для input
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// И запускаем функцию showNoResults
		showNoResults();
		// Иначе
	} else {
		// Убираем специальное сообщение для input
		dataInput.setCustomValidity('');
		// Отменяем стандартное событие браузера
		e.preventDefault();
		// Запускаем функцию tryFilterByType и передаем данные из select и input, 
		// предварительно убрав пробелы в начале и конце строки
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});