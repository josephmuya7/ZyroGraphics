const faqData = [
    {
        question: "What services do you offer?",
        answer: "We offer a range of graphic design services including poster design, flyer creation, video editing, and photo retouching."
    },
    {
        question: "How long does it take to complete a project?",
        answer: "Project timelines vary depending on the complexity and scope of work. Typically, simple designs can be completed within 2-3 business days, while more complex projects may take up to a week or more."
    },
    {
        question: "What file formats do you deliver?",
        answer: "We deliver files in various formats depending on your needs. Common formats include JPG, PNG, PDF for print designs, and MP4 for video projects. We can accommodate specific format requests as well."
    },
    {
        question: "Do you offer revisions?",
        answer: "Yes, we offer up to two rounds of revisions for each project. Additional revisions may incur extra charges."
    },
    {
        question: "How do I place an order?",
        answer: "You can place an order by contacting us through our website's contact form, email, or phone. We'll discuss your project requirements and provide a quote before starting the work."
    }
    // Add more FAQ items as needed
];

function createFaqItem(item) {
    return `
    <div class="faq-item">
        <div class="faq-question">${item.question}</div>
        <div class="faq-answer">${item.answer}</div>
    </div>
    `;
}

function renderFaq() {
    const faqContainer = document.querySelector('.faq-container');
    faqContainer.innerHTML = faqData.map(createFaqItem).join('');
}

function toggleFaqItem(e) {
    if (e.target.classList.contains('faq-question')) {
        const faqItem = e.target.parentElement;
        faqItem.classList.toggle('active');
    }
}

function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search FAQ...';
    searchInput.classList.add('faq-search');
    
    document.querySelector('.faq h1').insertAdjacentElement('afterend', searchInput);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderFaq();
    addSearchFunctionality();
    document.querySelector('.faq-container').addEventListener('click', toggleFaqItem);
});