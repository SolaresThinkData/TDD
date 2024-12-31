document.addEventListener('DOMContentLoaded', function () {
    fetch('Components/togglerform.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('form-placeholder').innerHTML = data;
            initializeAIOptions();
            initializeAccordion();
            initializeChatbot();
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
});

function initializeAIOptions() {
    const toggleAIButton = document.getElementById('toggleAIOptions');
    const aiOptions = document.getElementById('aiOptions');

    if (toggleAIButton && aiOptions) {
        toggleAIButton.addEventListener('click', function () {
            aiOptions.style.display = aiOptions.style.display === 'none' ? 'block' : 'none';
        });
    } else {
        console.error('No se encontraron los elementos necesarios para las opciones de IA.');
    }
}


function initializeAccordion() {
    const accordion = document.getElementById('formAccordion');
    const currentStepDisplay = document.getElementById('currentStep');

    if (accordion && currentStepDisplay) {
        accordion.addEventListener('show.bs.collapse', function (event) {
            const target = event.target;
            const itemIndex = Array.from(accordion.children).indexOf(target.closest('.accordion-item'));

            currentStepDisplay.textContent = itemIndex + 1;
        });
    } else {
        console.error('No se encontraron los elementos necesarios para el acordeón.');
    }
}

function initializeChatbot() {
    const chatbot = document.getElementById('chatbot');
    const toggleButtons = document.querySelectorAll('#toggleChatbot, #aiOptions button:last-child');
    const toggleChatbotButton = document.getElementById('toggleChatbot'); // Botón flotante
    const closeButton = document.getElementById('closeChatbot');
    const sendChatbotMessage = document.getElementById('sendChatbotMessage');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (!chatbot || !closeButton || !sendChatbotMessage || !chatbotInput || !chatbotMessages || !toggleChatbotButton) {
        console.error('Elementos del chatbot no encontrados en el DOM.');
        return;
    }


    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatbot.classList.add('active');
            toggleChatbotButton.style.display = 'none';
        });
    });


    closeButton.addEventListener('click', () => {
        chatbot.classList.remove('active');
        toggleChatbotButton.style.display = 'block';
    });


    sendChatbotMessage.addEventListener('click', () => {
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            const userMessageElement = document.createElement('p');
            userMessageElement.textContent = userMessage;
            userMessageElement.classList.add('user-message');
            chatbotMessages.appendChild(userMessageElement);

            setTimeout(() => {
                const botMessageElement = document.createElement('p');
                botMessageElement.textContent = 'Estoy procesando tu solicitud...';
                botMessageElement.classList.add('bot-message');
                chatbotMessages.appendChild(botMessageElement);

                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1000);

            chatbotInput.value = '';
        }
    });

    chatbotInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendChatbotMessage.click();
        }
    });
}
