const orders = document.getElementById("orders");
const addOrderButton = document.getElementById("addOrder");
const summary = document.getElementById("summary");

const createOrder = () => {
    const order = document.createElement("div");
    order.classList.add("order");

    const nameInput = document.createElement("input");
    nameInput.placeholder = "이름";
    order.appendChild(nameInput);

    const coffeeSelect = document.createElement("select");
    coffeeSelect.innerHTML = `
        <option value="">커피 종류 선택</option>
        <option value="아메리카노">아메리카노</option>
        <option value="카페라떼">카페라떼</option>
        <option value="바닐라라떼">바닐라라떼</option>
    `;
    order.appendChild(coffeeSelect);

    const temperatureSelect = document.createElement("select");
    temperatureSelect.innerHTML = `
        <option value="">온도 선택</option>
        <option value="Hot">Hot</option>
        <option value="Ice">Ice</option>
    `;
    order.appendChild(temperatureSelect);

    const submitButton = document.createElement("button");
    submitButton.textContent = "주문 완료";
    submitButton.className = "btn btn-primary btn-sm";
    submitButton.onclick = () => {
        if (nameInput.value && coffeeSelect.value && temperatureSelect.value) {
            order.dataset.name = nameInput.value;
            order.dataset.coffee = coffeeSelect.value;
            order.dataset.temperature = temperatureSelect.value;

            nameInput.disabled = true;
            coffeeSelect.disabled = true;
            temperatureSelect.disabled = true;
            submitButton.disabled = true;

            updateSummary();
        } else {
            alert("모든 정보를 입력해주세요!");
        }
    };
    order.appendChild(submitButton);

    return order;
};

const updateSummary = () => {
    const ordersData = Array.from(orders.children)
        .filter(order => order.dataset.name && order.dataset.coffee && order.dataset.temperature)
        .map(order => ({
            name: order.dataset.name,
            coffee: order.dataset.coffee,
            temperature: order.dataset.temperature,
        }));

    summary.innerHTML = "";
        // 커피 종류별 수량 집계를 위한 객체 생성
        const coffeeCounts = {};

    ordersData.forEach((order, index) => {
        const {name, coffee, temperature} = order;
        const summaryItem = document.createElement("div");
        summaryItem.classList.add("summary-item");
        summaryItem.textContent = `${name}님의 주문: ${coffee} (${temperature}) `;

        // 수정 버튼 추가
        const editButton = document.createElement("button");
        editButton.textContent = "수정";
        editButton.className = "btn btn-warning btn-sm";
        editButton.onclick = () => {
            // 수정 기능 구현
            const newName = prompt("새로운 이름을 입력하세요:", name);
            const newCoffee = prompt("새로운 커피 종류를 입력하세요:", coffee);
            const newTemperature = prompt("새로운 온도를 입력하세요 (Hot 또는 Ice):", temperature);

            if (newName && newCoffee && newTemperature) {
                order.dataset.name = newName;
                order.dataset.coffee = newCoffee;
                order.dataset.temperature = newTemperature;
                updateSummary();
            }
                // 커피 종류별 수량 집계
        const coffeeKey = `${coffee} (${temperature})`;
        if (coffeeCounts[coffeeKey]) {
            coffeeCounts[coffeeKey]++;
        } else {
            coffeeCounts[coffeeKey] = 1;
        }
        };
        summaryItem.appendChild(editButton);

        // 삭제 버튼 추가
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.onclick = () => {
            // 삭제 기능 구현
            orders.removeChild(orders.children[index]);
            updateSummary();
        };
        summaryItem.appendChild(deleteButton);

        summary.appendChild(summaryItem);
    });
        // 전체 주문 수량 정보를 요약에 추가
        const totalOrdersItem = document.createElement("div");
        totalOrdersItem.textContent = `전체 주문 수량: ${totalOrders}잔`;
        summary.appendChild(totalOrdersItem);
};

addOrderButton.addEventListener("click", () => {
    const newOrder = createOrder();
    orders.appendChild(newOrder);
});