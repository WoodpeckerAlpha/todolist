const tasks = [
    {
        id: "1138465078061",
        completed: false,
        text: "Посмотреть новый урок по JavaScript",
    },
    {
        id: "1138465078062",
        completed: false,
        text: "Выполнить тест после урока",
    },
    {
        id: "1138465078063",
        completed: false,
        text: "Выполнить ДЗ после урока",
    },
];

document.addEventListener("DOMContentLoaded", () => {
    showTask(tasks);
    const submitButton = document.querySelector(".create-task-block");

    submitButton.addEventListener("submit", handleAddTask);

    function handleAddTask(event) {
        event.preventDefault();

        const taskInput = document.querySelector(".create-task-block__input");
        const newTaskText = taskInput.value.trim();

        if (validateTaskInput(newTaskText)) return;

        const taskId = generateUniqueId();
        const newTaskObject = {
            id: taskId,
            completed: false,
            text: newTaskText,
        };

        tasks.push(newTaskObject);
        showTask([newTaskObject]);

        taskInput.value = "";
        removeErrorMessages();
    }

    function showTask(tasks) {
        const tasksList = document.querySelector(".tasks-list");

        tasks.forEach((task) => {
            const taskItem = createTaskItem(task);
            tasksList.appendChild(taskItem);
        });
    }

    function createTaskItem(task) {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.setAttribute("data-task-id", task.id);

        const taskItemMainContainer = document.createElement("div");
        taskItemMainContainer.className = "task-item__main-container";

        const taskContent = document.createElement("div");
        taskContent.className = "task-item__main-content";

        const form = document.createElement("form");
        form.className = "checkbox-form";

        const input = document.createElement("input");
        input.className = "checkbox-form__checkbox";
        input.type = "checkbox";
        input.id = `task-${task.id}`;

        const label = document.createElement("label");
        label.htmlFor = input.id;

        const span = document.createElement("span");
        span.className = "task-item__text";
        span.textContent = task.text;

        const button = document.createElement("button");
        button.className =
            "task-item__delete-button default-button delete-button";
        button.textContent = "удалить";

        form.appendChild(input);
        form.appendChild(label);
        taskContent.appendChild(form);
        taskContent.appendChild(span);

        taskItemMainContainer.appendChild(taskContent);
        taskItemMainContainer.appendChild(button);

        taskItem.appendChild(taskItemMainContainer);

        return taskItem;
    }

    function generateUniqueId(length = 15) {
        const existingIds = new Set(tasks.map((task) => task.id));
        let id;
        do {
            id = Array.from({ length }, () =>
                "0123456789".charAt(Math.floor(Math.random() * 10))
            ).join("");
        } while (existingIds.has(id));
        return id;
    }

    function validateTaskInput(taskText) {
        const existingError = document.querySelector(".error-message-block");
        if (existingError) existingError.remove();

        const errorMessage = document.createElement("span");
        errorMessage.className = "error-message-block";
        const createTaskBlock = document.querySelector(".create-task-block");

        if (!taskText) {
            errorMessage.textContent = "Название задачи не должно быть пустым";
            createTaskBlock.appendChild(errorMessage);
            return true;
        }

        if (tasks.some((task) => task.text === taskText)) {
            errorMessage.textContent =
                "Задача с таким названием уже существует.";
            createTaskBlock.appendChild(errorMessage);
            return true;
        }

        return false;
    }

    function removeErrorMessages() {
        document
            .querySelectorAll(".error-message-block")
            .forEach((error) => error.remove());
    }
    function createModalOverlay() {
        const modalOverlay = document.createElement("div");
        modalOverlay.className = "modal-overlay ";

        const deleteModal = document.createElement("div");
        deleteModal.className = "delete-modal";

        const deleteModalQuestion = document.createElement("h3");
        deleteModalQuestion.className = "delete-modal__question";
        deleteModalQuestion.textContent =
            "Вы действительно хотите удалить эту задачу?";

        const deleteModalButton = document.createElement("div");
        deleteModalButton.className = "delete-modal__buttons";

        const deleteModalCancelButton = document.createElement("button");
        deleteModalCancelButton.className =
            "delete-modal__button delete-modal__cancel-button";
        deleteModalCancelButton.textContent = "Отменить";

        const deleteModalConfirmButton = document.createElement("button");
        deleteModalConfirmButton.className =
            "delete-modal__button delete-modal__confirm-button";
        deleteModalConfirmButton.textContent = "Удалить";

        deleteModalButton.appendChild(deleteModalCancelButton);
        deleteModalButton.appendChild(deleteModalConfirmButton);

        deleteModal.appendChild(deleteModalQuestion);
        deleteModal.appendChild(deleteModalButton);

        modalOverlay.appendChild(deleteModal);

        document.body.appendChild(modalOverlay);

        return {
            modalOverlay,
            deleteModalCancelButton,
            deleteModalConfirmButton,
        };
    }

    function removeTask(taskId) {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            document
                .querySelector(`.task-item[data-task-id="${taskId}"]`)
                .remove();
        }
    }

    const tasksListSecond = document.querySelector(".tasks-list");

    tasksListSecond.addEventListener("click", (event) => {
        const deleteButtom = event.target.closest(".task-item__delete-button");
        if (deleteButtom) {
            const taskId = deleteButtom
                .closest(".task-item")
                .getAttribute("data-task-id");
            const {
                modalOverlay,
                deleteModalCancelButton,
                deleteModalConfirmButton,
            } = createModalOverlay();

            deleteModalCancelButton.addEventListener("click", () => {
                modalOverlay.remove();
            });

            deleteModalConfirmButton.addEventListener("click", () => {
                removeTask(taskId);
                modalOverlay.remove();
            });
        }
    });

    let flagTheme = "light";

    document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
                      swapTheme();
        }
    });

    function swapTheme() {
        const body = document.querySelector("body");
        const taskItem = document.querySelectorAll(".task-item");
        const bottom = document.querySelectorAll("button");
        if (flagTheme === "light") {
            body.style.background = "#24292E";
            taskItem.forEach((item) => {
                item.style.color = "#ffffff";
            });
            bottom.forEach((item) => {
                item.style.border = "1px solid #ffffff";
            });
            flagTheme = "dark";
        } else {
            body.style.background = "initial";
            taskItem.forEach((item) => {
                item.style.color = "initial";
            });
            bottom.forEach((item) => {
                item.style.border = "none";
            });
            flagTheme = "light";
        }
    }
});
