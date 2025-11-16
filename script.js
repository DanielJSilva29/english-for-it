// ===== GLOSSARY DATA =====
const glossaryData = [
    {
        term: "Motherboard",
        definition: "A motherboard is a circuit board inside general-purpose computing systems, including personal computers, smart televisions, smart monitors, and other similar devices, which supports communication between different electrical components and houses components such as the CPU, memory, etc."
    },
    {
        term: "CPU",
        definition: "CPU, or Central Processing Unit, serves as the computer's brain, executing instructions for the operating system and applications. It processes data, performs calculations, and manages operations by fetching instructions from memory, completing tasks, and delivering output."
    },
    {
        term: "GPU",
        definition: "A graphics processing unit (graphical processing unit, GPU) is an electronic circuit designed to speed computer graphics and image processing on various devices. These devices include video cards, system boards, mobile phones and pc's."
    },
    {
        term: "RAM",
        definition: "RAM (Random Access Memory) is essential for a computer to store and access large amounts of data quickly. RAM works as a buffer, storing information for the time being as it is processed by the CPU."
    },
    {
        term: "HDD",
        definition: "A hard drive (HDD) is a data storage device for laptops and desktops, known for being non-volatile, allowing it to retain data without power."
    },
    {
        term: "SSD",
        definition: "Solid state drive (SSD) is a data storage device like the HDD but is faster and more durable."
    },
    {
        term: "Power Supply Unit",
        definition: "A power supply is a device that converts electrical energy from the mains into a form suitable for powering electronic equipment."
    },
    {
        term: "Cooling System",
        definition: "A cooling system is a set of equipment and processes designed to remove heat from an environment or device, maintaining the temperature at safe and efficient levels for operation."
    },
    {
        term: "Hardware",
        definition: "Hardware is the physical part of a computer or electronic device—everything that can be touched, such as boards, cables, processors, and external devices."
    },
    {
        term: "Software",
        definition: "Software is a set of instructions, data, or programs that tell a computer how to perform specific tasks. It represents the logical and intangible part of computer systems."
    },
    {
        term: "Operating System",
        definition: "An operating system is the main software that manages a device's hardware and software resources, allowing the user to interact with the machine and run programs."
    },
    {
        term: "Server",
        definition: "A server is a computer or software that provides services, resources, or data to other devices on a network, called clients."
    },
    {
        term: "Network",
        definition: "A network is a set of interconnected devices that communicate with each other to share data, resources, and services."
    },
    {
        term: "Firewall",
        definition: "A firewall is a security system that monitors and controls network traffic, blocking or allowing data based on defined rules, with the aim of protecting networks against unauthorized access and external threats."
    },
    {
        term: "AI",
        definition: "AI (Artificial Intelligence) is the technology that enables machines to simulate human capabilities such as reasoning, learning, decision-making, and creativity."
    },
    {
        term: "Database",
        definition: "A database is an organized collection of structured information, stored electronically, that can be easily accessed, managed, and updated by computer systems."
    },
    {
        term: "Backup",
        definition: "Backup is the process of creating backup copies of digital data so that it can be recovered in the event of loss, failure, or corruption of the original data."
    },
    {
        term: "Cryptography",
        definition: "Encryption is the practice of encoding information to protect it from unauthorized access, ensuring that only people or systems with the correct key can decrypt it."
    },
    {
        term: "Cloud",
        definition: "Cloud computing is the delivery of computing services—such as servers, storage, databases, networking, software, and analytics—over the internet, enabling remote access, scalability, and reduced operating costs."
    },
    {
        term: "Wi-Fi",
        definition: "Wi-Fi is a wireless network technology that allows devices such as computers, smartphones, and tablets to connect to the internet or to each other without the use of physical cables."
    }
];

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Script loaded successfully");
    renderGlossary(glossaryData);
    setupEventListeners();
});

// ===== RENDER GLOSSARY =====
function renderGlossary(terms) {
    const glossaryGrid = document.getElementById('glossaryGrid');
    if (!glossaryGrid) {
        console.error("❌ Glossary grid not found");
        return;
    }

    glossaryGrid.innerHTML = '';

    if (terms.length === 0) {
        glossaryGrid.innerHTML = '<div style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: var(--gray); padding: 40px;">No terms found. Try a different search.</div>';
        return;
    }

    terms.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glossary-card';
        card.innerHTML = `
            <h3 class="glossary-term">${item.term}</h3>
            <p class="glossary-definition">${item.definition}</p>
        `;
        glossaryGrid.appendChild(card);
    });
}

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log("Menu toggled");
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.nav-container');
        if (navbar && !navbar.contains(e.target)) {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();

            const filteredTerms = glossaryData.filter(item => 
                item.term.toLowerCase().includes(searchTerm) || 
                item.definition.toLowerCase().includes(searchTerm)
            );

            renderGlossary(filteredTerms);
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            this.reset();
        });
    }
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        animateCards();
    });
} else {
    animateCards();
}

function animateCards() {
    const cards = document.querySelectorAll('.feature-card, .component-card, .glossary-card, .content-box');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

console.log("✅ All functions registered successfully");
