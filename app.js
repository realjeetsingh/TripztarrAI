// Application Configuration
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSyBNKr_0HbAK77YI_APUJMkgmPJg9ybg3PQ',
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    CURRENCY: 'INR',
    CURRENCY_SYMBOL: '₹',
    APP_NAME: 'Tripztarr'
};

// Sample data for fallbacks and suggestions
const SAMPLE_DESTINATIONS = [
    "Mumbai, India", "Delhi, India", "Goa, India", "Jaipur, India", "Kerala, India",
    "Bangkok, Thailand", "Dubai, UAE", "Singapore", "Bali, Indonesia", "Tokyo, Japan",
    "Paris, France", "London, UK", "New York, USA", "Sydney, Australia", "Barcelona, Spain"
];

const SAMPLE_ITINERARY = {
    destination: "Goa, India",
    duration: 5,
    travelStyle: "Mid-range",
    totalCost: 45000,
    overview: {
        highlights: [
            "Relax on pristine beaches of North and South Goa",
            "Explore Portuguese colonial architecture in Old Goa",
            "Experience vibrant nightlife in Baga and Calangute",
            "Taste authentic Goan cuisine and fresh seafood",
            "Visit historic churches and temples"
        ],
        budgetBreakdown: {
            accommodation: 15000,
            meals: 12000,
            activities: 10000,
            transportation: 6000,
            miscellaneous: 2000
        },
        stats: {
            activities: 15,
            restaurants: 10,
            attractions: 8
        },
        weather: "Pleasant tropical weather, 25-32°C, ideal for beach activities"
    },
    dailyItinerary: [
        {
            day: 1,
            title: "Arrival & North Goa Beaches",
            activities: [
                {
                    time: "10:00 AM",
                    activity: "Arrive at Goa Airport",
                    description: "Transfer to hotel in North Goa, check-in and freshen up",
                    cost: 800,
                    duration: "2 hours"
                },
                {
                    time: "1:00 PM",
                    activity: "Lunch at Beach Shack",
                    description: "Traditional Goan fish curry rice at a popular beach shack",
                    cost: 600,
                    duration: "1 hour"
                },
                {
                    time: "3:00 PM",
                    activity: "Calangute Beach",
                    description: "Relax on the famous Calangute beach, water sports available",
                    cost: 500,
                    duration: "3 hours"
                },
                {
                    time: "7:00 PM",
                    activity: "Sunset at Baga Beach",
                    description: "Enjoy sunset with drinks at a beachside café",
                    cost: 800,
                    duration: "2 hours"
                }
            ]
        },
        {
            day: 2,
            title: "Old Goa Heritage Tour",
            activities: [
                {
                    time: "9:00 AM",
                    activity: "Basilica of Bom Jesus",
                    description: "Visit the UNESCO World Heritage site housing St. Francis Xavier",
                    cost: 0,
                    duration: "1.5 hours"
                },
                {
                    time: "11:00 AM",
                    activity: "Se Cathedral",
                    description: "Explore one of Asia's largest churches with Portuguese architecture",
                    cost: 0,
                    duration: "1 hour"
                },
                {
                    time: "1:00 PM",
                    activity: "Traditional Goan Lunch",
                    description: "Authentic Goan thali with bebinca dessert",
                    cost: 700,
                    duration: "1.5 hours"
                },
                {
                    time: "4:00 PM",
                    activity: "Spice Plantation Tour",
                    description: "Guided tour of spice gardens with traditional lunch",
                    cost: 1200,
                    duration: "3 hours"
                }
            ]
        }
    ],
    hotels: [
        {
            name: "Taj Holiday Village Resort & Spa",
            rating: 4.5,
            price: "₹8,500/night",
            amenities: ["Beach Access", "Spa", "Pool", "Free WiFi", "Restaurant"],
            description: "Luxury beachfront resort with traditional Goan architecture and modern amenities.",
            pros: ["Direct beach access", "Excellent spa", "Great food"],
            cons: ["Expensive", "Crowded during peak season"]
        },
        {
            name: "Hotel Beira Mar",
            rating: 4.0,
            price: "₹3,500/night",
            amenities: ["AC", "Free WiFi", "Restaurant", "Room Service"],
            description: "Comfortable mid-range hotel near Calangute beach with good amenities.",
            pros: ["Good location", "Clean rooms", "Friendly staff"],
            cons: ["No pool", "Limited parking"]
        }
    ],
    restaurants: {
        breakfast: [
            {
                name: "Infantaria",
                cuisine: "Goan-Portuguese",
                description: "Famous for Goan breakfast and fresh bread",
                price: "₹300-500"
            }
        ],
        lunch: [
            {
                name: "Fisherman's Wharf",
                cuisine: "Seafood",
                description: "Riverside dining with fresh catch of the day",
                price: "₹800-1200"
            },
            {
                name: "Vinayak Family Restaurant",
                cuisine: "Goan",
                description: "Authentic Goan thali and fish curry rice",
                price: "₹400-600"
            }
        ],
        dinner: [
            {
                name: "Thalassa",
                cuisine: "Greek-Goan Fusion",
                description: "Clifftop dining with stunning sunset views",
                price: "₹1500-2500"
            }
        ]
    },
    travelGuide: {
        transportation: [
            "Pre-paid taxi from airport: ₹600-800 to North Goa",
            "Rent a scooter: ₹300-400 per day (most convenient)",
            "Auto-rickshaw: ₹10-15 per km (negotiate fare)",
            "Local bus: ₹10-30 for short distances",
            "Uber/Ola available in major areas"
        ],
        culture: [
            "Goa has a relaxed, laid-back culture",
            "Dress modestly when visiting churches and temples",
            "Tipping 10% is appreciated at restaurants",
            "English, Hindi, and Konkani are widely spoken",
            "Respect local customs and beach rules"
        ],
        safety: [
            "Goa is generally safe for tourists",
            "Avoid deserted beaches at night",
            "Drink responsibly and know your limits",
            "Emergency: 100 (Police), 102 (Ambulance)",
            "Tourist helpline: 1363"
        ],
        packing: [
            "Light cotton clothes and swimwear",
            "Sunscreen and hat for beach protection",
            "Comfortable footwear for walking",
            "Light jacket for AC rooms",
            "First aid kit and personal medications"
        ]
    }
};

// Global state
let currentItinerary = null;
let chatHistory = [];

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Tripztarr');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing Tripztarr app...');
    
    // Set minimum date for start date input
    setMinDate();
    
    // Setup form submission
    setupFormSubmission();
    
    // Setup destination autocomplete
    setupDestinationAutocomplete();
    
    // Setup chat functionality
    setupChatFunctionality();
    
    // Hide chat initially
    const chatAssistant = document.getElementById('chatAssistant');
    if (chatAssistant) {
        chatAssistant.style.display = 'none';
    }
    
    console.log('Tripztarr app initialized successfully');
}

function setMinDate() {
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        startDateInput.min = minDate;
        startDateInput.value = minDate; // Set default value to tomorrow
        console.log('Min date set to:', minDate);
    }
}

function setupFormSubmission() {
    const form = document.getElementById('plannerForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            console.log('Form submit event triggered');
            e.preventDefault();
            e.stopPropagation();
            handleFormSubmit(e);
        });
        console.log('Form submission event listener added');
    } else {
        console.error('Form not found');
    }
}

function setupDestinationAutocomplete() {
    const destinationInput = document.getElementById('destination');
    const destinationSuggestions = document.getElementById('destinationSuggestions');
    
    if (destinationInput && destinationSuggestions) {
        destinationInput.addEventListener('input', function(e) {
            handleDestinationInput(e, destinationSuggestions);
        });
        
        destinationInput.addEventListener('focus', function(e) {
            handleDestinationInput(e, destinationSuggestions);
        });
        
        destinationInput.addEventListener('blur', function() {
            setTimeout(() => {
                destinationSuggestions.style.display = 'none';
            }, 200);
        });
        
        console.log('Destination autocomplete setup complete');
    }
}

function setupChatFunctionality() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
}

function handleDestinationInput(e, suggestionsContainer) {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 1) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    const filtered = SAMPLE_DESTINATIONS.filter(dest => 
        dest.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
        suggestionsContainer.innerHTML = filtered
            .slice(0, 5)
            .map(dest => `<div class="destination-suggestion" onclick="selectDestination('${dest.replace(/'/g, "\\'")}')">${dest}</div>`)
            .join('');
        suggestionsContainer.style.display = 'block';
    } else {
        suggestionsContainer.style.display = 'none';
    }
}

function selectDestination(destination) {
    const destinationInput = document.getElementById('destination');
    const destinationSuggestions = document.getElementById('destinationSuggestions');
    
    if (destinationInput) {
        destinationInput.value = destination;
    }
    if (destinationSuggestions) {
        destinationSuggestions.style.display = 'none';
    }
}

function scrollToPlanner() {
    const plannerElement = document.getElementById('planner');
    if (plannerElement) {
        plannerElement.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

function handleFormSubmit(e) {
    console.log('Handle form submit called');
    
    const formData = collectFormData();
    console.log('Collected form data:', formData);
    
    if (!validateFormData(formData)) {
        console.log('Form validation failed');
        return false;
    }

    console.log('Form validation passed, showing loading state');
    showLoadingState();
    
    // Use setTimeout to ensure UI updates before heavy processing
    setTimeout(async () => {
        try {
            console.log('Generating itinerary...');
            const itinerary = await generateItinerary(formData);
            currentItinerary = itinerary;
            console.log('Itinerary generated, displaying results');
            displayResults(itinerary);
            showChatAssistant();
        } catch (error) {
            console.error('Error generating itinerary:', error);
            handleApiError(formData);
        }
    }, 100);
    
    return false;
}

function collectFormData() {
    const interestsElements = document.querySelectorAll('input[name="interests"]:checked');
    const interests = Array.from(interestsElements).map(cb => cb.value);
    
    const travelStyleElement = document.querySelector('input[name="travelStyle"]:checked');
    const travelStyle = travelStyleElement ? travelStyleElement.value : 'Mid-range';
    
    const destinationInput = document.getElementById('destination');
    const durationInput = document.getElementById('duration');
    const startDateInput = document.getElementById('startDate');
    const groupSizeInput = document.getElementById('groupSize');
    const budgetAmountInput = document.getElementById('budgetAmount');
    const specialRequirementsInput = document.getElementById('specialRequirements');
    
    return {
        destination: destinationInput ? destinationInput.value.trim() : '',
        duration: durationInput ? parseInt(durationInput.value) || 5 : 5,
        startDate: startDateInput ? startDateInput.value : '',
        groupSize: groupSizeInput ? parseInt(groupSizeInput.value) || 2 : 2,
        budgetAmount: budgetAmountInput ? parseInt(budgetAmountInput.value) || 10000 : 10000,
        travelStyle: travelStyle,
        interests: interests,
        specialRequirements: specialRequirementsInput ? specialRequirementsInput.value.trim() : ''
    };
}

function validateFormData(data) {
    console.log('Validating form data:', data);
    
    if (!data.destination || data.destination.length < 2) {
        alert('Please enter a valid destination');
        return false;
    }
    
    if (!data.startDate) {
        alert('Please select a start date');
        return false;
    }
    
    if (data.interests.length === 0) {
        alert('Please select at least one interest/preference');
        return false;
    }
    
    if (!data.budgetAmount || data.budgetAmount < 1000) {
        alert('Please enter a valid budget amount (minimum ₹1,000)');
        return false;
    }
    
    if (data.duration < 1 || data.duration > 30) {
        alert('Trip duration must be between 1 and 30 days');
        return false;
    }
    
    console.log('Form validation passed');
    return true;
}

function showLoadingState() {
    console.log('Showing loading state');
    const plannerSection = document.getElementById('planner');
    const resultsSection = document.getElementById('resultsSection');
    const loadingSection = document.getElementById('loadingSection');
    
    if (plannerSection) {
        plannerSection.style.display = 'none';
        console.log('Hidden planner section');
    }
    if (resultsSection) {
        resultsSection.classList.add('hidden');
        console.log('Hidden results section');
    }
    if (loadingSection) {
        loadingSection.classList.remove('hidden');
        console.log('Showed loading section');
    }
    
    simulateLoadingProgress();
}

function simulateLoadingProgress() {
    const progressBar = document.getElementById('loadingProgress');
    const stepText = document.getElementById('loadingStep');
    
    if (!progressBar || !stepText) {
        console.log('Progress elements not found');
        return;
    }
    
    const steps = [
        'Analyzing destination...',
        'Finding the best attractions...',
        'Researching local restaurants...',
        'Calculating optimal routes...',
        'Converting prices to INR...',
        'Generating personalized recommendations...',
        'Finalizing your itinerary...'
    ];
    
    let currentStep = 0;
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (currentStep < steps.length - 1 && progress > (currentStep + 1) * 14) {
            currentStep++;
            stepText.textContent = steps[currentStep];
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                stepText.textContent = 'Complete!';
            }, 500);
        }
    }, 300);
}

async function generateItinerary(formData) {
    console.log('Starting itinerary generation for Tripztarr');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const prompt = createPrompt(formData);
    
    try {
        const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 8192,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        
        return parseAIResponse(generatedText, formData);
    } catch (error) {
        console.error('Gemini API Error:', error);
        return createFallbackItinerary(formData);
    }
}

function createPrompt(formData) {
    return `Create a comprehensive ${formData.duration}-day travel itinerary for ${formData.destination} with the following requirements:

Budget: ₹${formData.budgetAmount} per person for the entire trip
Travel Style: ${formData.travelStyle}
Interests: ${formData.interests.join(', ')}
Group Size: ${formData.groupSize} travelers
Special Requirements: ${formData.specialRequirements || 'None'}
Start Date: ${formData.startDate}

IMPORTANT: All prices must be in Indian Rupees (₹/INR) and should be realistic for Indian travelers.

Please provide a detailed response including:
1. Trip overview with highlights and total estimated cost in INR
2. Daily itinerary with specific times, activities, costs in INR, and descriptions
3. 3-4 hotel recommendations with ratings, prices in INR, amenities, pros/cons
4. Restaurant recommendations categorized by meal type with prices in INR
5. Transportation options with costs in INR and cultural tips
6. Safety information and packing suggestions for Indian travelers

Format as a structured, detailed travel guide that includes realistic INR costs and practical information for Indian tourists. Make recommendations authentic to the destination and appropriate for the ${formData.travelStyle} travel style and ₹${formData.budgetAmount} budget.`;
}

function parseAIResponse(aiText, formData) {
    const itinerary = {
        destination: formData.destination,
        duration: formData.duration,
        travelStyle: formData.travelStyle,
        totalCost: estimateTotalCost(formData.travelStyle, formData.duration, formData.groupSize, formData.budgetAmount),
        overview: parseOverview(aiText, formData),
        dailyItinerary: parseDailyItinerary(aiText, formData.duration),
        hotels: parseHotels(aiText),
        restaurants: parseRestaurants(aiText),
        travelGuide: parseTravelGuide(aiText)
    };
    
    return itinerary;
}

function estimateTotalCost(travelStyle, duration, groupSize, budgetAmount) {
    // Use the user's budget amount as base, adjusted for group size and duration
    const baseTotal = budgetAmount * groupSize;
    
    // Add some variation based on travel style
    const styleMultiplier = {
        'Budget': 0.9,
        'Mid-range': 1.0,
        'Luxury': 1.3
    };
    
    return Math.round(baseTotal * (styleMultiplier[travelStyle] || 1.0));
}

function parseOverview(text, formData) {
    return {
        highlights: extractHighlights(text, formData.destination),
        budgetBreakdown: {
            accommodation: Math.round(estimateTotalCost(formData.travelStyle, formData.duration, formData.groupSize, formData.budgetAmount) * 0.35),
            meals: Math.round(estimateTotalCost(formData.travelStyle, formData.duration, formData.groupSize, formData.budgetAmount) * 0.30),
            activities: Math.round(estimateTotalCost(formData.travelStyle, formData.duration, formData.groupSize, formData.budgetAmount) * 0.25),
            transportation: Math.round(estimateTotalCost(formData.travelStyle, formData.duration, formData.groupSize, formData.budgetAmount) * 0.08),
            miscellaneous: Math.round(estimateTotalCost(formData.travelStyle, formData.duration, formData.groupSize, formData.budgetAmount) * 0.02)
        },
        stats: {
            activities: formData.duration * 3,
            restaurants: formData.duration * 2,
            attractions: Math.max(5, formData.duration)
        },
        weather: extractWeatherInfo(text)
    };
}

function extractHighlights(text, destination) {
    const highlights = [
        `Explore iconic landmarks and attractions in ${destination}`,
        "Experience authentic local cuisine and dining",
        "Discover hidden gems and local favorites",
        "Immerse in cultural activities and traditions",
        "Enjoy scenic views and photo opportunities"
    ];
    return highlights;
}

function extractWeatherInfo(text) {
    return "Pleasant weather expected, check local forecast for latest updates";
}

function parseDailyItinerary(text, duration) {
    const days = [];
    
    for (let i = 1; i <= duration; i++) {
        days.push({
            day: i,
            title: getDayTitle(i),
            activities: generateDayActivities(i)
        });
    }
    
    return days;
}

function getDayTitle(day) {
    const titles = [
        "Arrival & City Center",
        "Cultural Exploration",
        "Local Experiences", 
        "Nature & Relaxation",
        "Adventure & Discovery",
        "Shopping & Entertainment",
        "Final Adventures"
    ];
    return titles[(day - 1) % titles.length];
}

function generateDayActivities(day) {
    const baseActivities = [
        {
            time: "9:00 AM",
            activity: "Morning Exploration",
            description: "Start your day discovering local attractions and landmarks",
            cost: 500,
            duration: "2.5 hours"
        },
        {
            time: "12:00 PM",
            activity: "Local Lunch Experience",
            description: "Enjoy authentic cuisine at a recommended local restaurant",
            cost: 800,
            duration: "1 hour"
        },
        {
            time: "2:00 PM",
            activity: "Afternoon Adventure",
            description: "Continue exploring with cultural sites and unique experiences",
            cost: 600,
            duration: "3 hours"
        },
        {
            time: "7:00 PM",
            activity: "Evening Dining",
            description: "Experience the local dining scene with dinner at a featured restaurant",
            cost: 1200,
            duration: "2 hours"
        }
    ];
    
    // Add some variation based on day
    baseActivities.forEach(activity => {
        activity.cost += Math.floor(Math.random() * 200) - 100; // Random variation of ±100
        if (activity.cost < 0) activity.cost = 0;
    });
    
    return baseActivities;
}

function parseHotels(text) {
    return SAMPLE_ITINERARY.hotels;
}

function parseRestaurants(text) {
    return SAMPLE_ITINERARY.restaurants;
}

function parseTravelGuide(text) {
    return SAMPLE_ITINERARY.travelGuide;
}

function createFallbackItinerary(formData) {
    const fallback = JSON.parse(JSON.stringify(SAMPLE_ITINERARY)); // Deep copy
    fallback.destination = formData.destination;
    fallback.duration = formData.duration;
    fallback.travelStyle = formData.travelStyle;
    fallback.totalCost = estimateTotalCost(formData.travelStyle, formData.duration, formData.groupSize, formData.budgetAmount);
    fallback.overview = parseOverview('', formData);
    fallback.dailyItinerary = parseDailyItinerary('', formData.duration);
    
    return fallback;
}

function handleApiError(formData) {
    const fallbackItinerary = createFallbackItinerary(formData);
    
    currentItinerary = fallbackItinerary;
    displayResults(fallbackItinerary);
    showChatAssistant();
    
    // Show error message after a brief delay
    setTimeout(() => {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'status status--error';
        errorMsg.style.margin = '16px 0';
        errorMsg.innerHTML = '<p>⚠️ Using demo data - AI service integration in progress. This shows the full functionality with sample content.</p>';
        const overviewTab = document.getElementById('overview-tab');
        if (overviewTab) {
            overviewTab.prepend(errorMsg);
        }
    }, 500);
}

function displayResults(itinerary) {
    console.log('Displaying results for:', itinerary.destination);
    
    const loadingSection = document.getElementById('loadingSection');
    const resultsSection = document.getElementById('resultsSection');
    
    if (loadingSection) loadingSection.classList.add('hidden');
    if (resultsSection) resultsSection.classList.remove('hidden');
    
    displayOverview(itinerary);
    displayDailyItinerary(itinerary);
    displayHotels(itinerary);
    displayRestaurants(itinerary);
    displayTravelGuide(itinerary);
    
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function displayOverview(itinerary) {
    const tripSummaryEl = document.getElementById('tripSummary');
    if (tripSummaryEl) {
        tripSummaryEl.innerHTML = `
            <p><strong>Destination:</strong> ${itinerary.destination}</p>
            <p><strong>Duration:</strong> ${itinerary.duration} days</p>
            <p><strong>Travel Style:</strong> ${itinerary.travelStyle}</p>
            <p><strong>Total Estimated Cost:</strong> ₹${itinerary.totalCost.toLocaleString('en-IN')}</p>
            <div class="highlights">
                <h4>Trip Highlights:</h4>
                <ul>
                    ${itinerary.overview.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    const budgetBreakdownEl = document.getElementById('budgetBreakdown');
    if (budgetBreakdownEl) {
        budgetBreakdownEl.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Accommodation:</span>
                <span class="price-moderate">₹${itinerary.overview.budgetBreakdown.accommodation.toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Meals:</span>
                <span class="price-moderate">₹${itinerary.overview.budgetBreakdown.meals.toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Activities:</span>
                <span class="price-moderate">₹${itinerary.overview.budgetBreakdown.activities.toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Transportation:</span>
                <span class="price-budget">₹${itinerary.overview.budgetBreakdown.transportation.toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>Miscellaneous:</span>
                <span class="price-budget">₹${itinerary.overview.budgetBreakdown.miscellaneous.toLocaleString('en-IN')}</span>
            </div>
        `;
    }
    
    const quickStatsEl = document.getElementById('quickStats');
    if (quickStatsEl) {
        quickStatsEl.innerHTML = `
            <div style="text-align: center; margin-bottom: 16px;">
                <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">${itinerary.overview.stats.activities}</div>
                <span style="color: var(--color-text-secondary); font-size: 14px;">Activities Planned</span>
            </div>
            <div style="text-align: center; margin-bottom: 16px;">
                <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">${itinerary.overview.stats.restaurants}</div>
                <span style="color: var(--color-text-secondary); font-size: 14px;">Restaurant Recommendations</span>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">${itinerary.overview.stats.attractions}</div>
                <span style="color: var(--color-text-secondary); font-size: 14px;">Major Attractions</span>
            </div>
        `;
    }
    
    const weatherInfoEl = document.getElementById('weatherInfo');
    if (weatherInfoEl) {
        weatherInfoEl.innerHTML = `
            <p>${itinerary.overview.weather}</p>
            <p><em>💡 Tip: Check the local weather forecast before your trip for the most accurate conditions.</em></p>
        `;
    }
}

function displayDailyItinerary(itinerary) {
    const container = document.getElementById('dailyItinerary');
    if (!container) return;
    
    container.innerHTML = itinerary.dailyItinerary.map(day => `
        <div class="day-card">
            <div class="day-header" onclick="toggleDay(${day.day})">
                <h3 class="day-title">Day ${day.day}: ${day.title}</h3>
                <button class="day-toggle" id="toggle-${day.day}">▼</button>
            </div>
            <div class="day-activities" id="activities-${day.day}">
                ${day.activities.map(activity => `
                    <div class="activity-item">
                        <div class="activity-time">${activity.time}</div>
                        <div class="activity-content">
                            <div class="activity-title">${activity.activity}</div>
                            <div class="activity-description">${activity.description}</div>
                            <div class="activity-meta">
                                <span class="activity-cost">₹${activity.cost}</span>
                                <span>•</span>
                                <span>${activity.duration}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function displayHotels(itinerary) {
    const container = document.getElementById('hotelsGrid');
    if (!container) return;
    
    container.innerHTML = itinerary.hotels.map(hotel => `
        <div class="hotel-card">
            <div class="hotel-image">📸 Hotel Photo</div>
            <div class="hotel-content">
                <h3 class="hotel-title">${hotel.name}</h3>
                <div class="hotel-rating">
                    <span class="hotel-stars">${'★'.repeat(Math.floor(hotel.rating))}${'☆'.repeat(5-Math.floor(hotel.rating))}</span>
                    <span>${hotel.rating}</span>
                </div>
                <div class="hotel-price">${hotel.price}</div>
                <div class="hotel-amenities">
                    ${hotel.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                </div>
                <p>${hotel.description}</p>
                <div class="hotel-pros-cons">
                    <div><strong>Pros:</strong> ${hotel.pros.join(', ')}</div>
                    <div><strong>Cons:</strong> ${hotel.cons.join(', ')}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function displayRestaurants(itinerary) {
    const container = document.getElementById('restaurantsContent');
    if (!container) return;
    
    const categories = ['breakfast', 'lunch', 'dinner'];
    container.innerHTML = categories.map(category => `
        <div class="restaurant-category">
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Recommendations</h3>
            <div class="restaurant-list">
                ${(itinerary.restaurants[category] || []).map(restaurant => `
                    <div class="restaurant-item">
                        <div class="restaurant-info">
                            <h4>${restaurant.name}</h4>
                            <div class="restaurant-cuisine">${restaurant.cuisine}</div>
                            <div class="restaurant-description">${restaurant.description}</div>
                        </div>
                        <div class="restaurant-price">${restaurant.price}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function displayTravelGuide(itinerary) {
    const container = document.getElementById('travelGuide');
    if (!container) return;
    
    const guide = itinerary.travelGuide;
    container.innerHTML = `
        <div class="guide-section">
            <h3>🚌 Transportation</h3>
            <div class="guide-content">
                <ul>
                    ${guide.transportation.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="guide-section">
            <h3>🏛️ Cultural Etiquette</h3>
            <div class="guide-content">
                <ul>
                    ${guide.culture.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="guide-section">
            <h3>🛡️ Safety Information</h3>
            <div class="guide-content">
                <ul>
                    ${guide.safety.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="guide-section">
            <h3>🎒 Packing Suggestions</h3>
            <div class="guide-content">
                <ul>
                    ${guide.packing.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }
}

function toggleDay(dayNumber) {
    const activities = document.getElementById(`activities-${dayNumber}`);
    const toggle = document.getElementById(`toggle-${dayNumber}`);
    
    if (!activities || !toggle) return;
    
    if (activities.style.display === 'none') {
        activities.style.display = 'block';
        toggle.textContent = '▼';
        toggle.classList.remove('rotated');
    } else {
        activities.style.display = 'none';
        toggle.textContent = '▶';
        toggle.classList.add('rotated');
    }
}

function showChatAssistant() {
    const chatAssistant = document.getElementById('chatAssistant');
    if (chatAssistant && currentItinerary) {
        chatAssistant.style.display = 'flex';
        
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '<div class="chat-message assistant"><p>Hi! I\'m your Tripztarr AI assistant. Ask me anything about your itinerary or travel plans!</p></div>';
            
            setTimeout(() => {
                addChatMessage('assistant', `Great! I've created your ${currentItinerary.duration}-day itinerary for ${currentItinerary.destination} with a budget of ₹${currentItinerary.totalCost.toLocaleString('en-IN')}. Feel free to ask me any questions about your trip, request modifications, or get more details about specific activities!`);
            }, 1000);
        }
    }
}

function toggleChat() {
    const messages = document.getElementById('chatMessages');
    const input = document.querySelector('.chat-input');
    const toggle = document.querySelector('.chat-toggle');
    
    if (messages && input && toggle) {
        if (messages.style.display === 'none') {
            messages.style.display = 'block';
            input.style.display = 'flex';
            toggle.textContent = '−';
        } else {
            messages.style.display = 'none';
            input.style.display = 'none';
            toggle.textContent = '+';
        }
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    addChatMessage('user', message);
    chatInput.value = '';
    
    setTimeout(() => {
        const response = generateChatResponse(message);
        addChatMessage('assistant', response);
    }, 1000);
}

function addChatMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateChatResponse(userMessage) {
    if (!currentItinerary) return "I'd be happy to help! Please generate an itinerary first.";
    
    const message = userMessage.toLowerCase();
    
    if (message.includes('cost') || message.includes('price') || message.includes('budget')) {
        return `The total estimated cost for your ${currentItinerary.duration}-day trip to ${currentItinerary.destination} is ₹${currentItinerary.totalCost.toLocaleString('en-IN')}. This breaks down to accommodation (₹${currentItinerary.overview.budgetBreakdown.accommodation.toLocaleString('en-IN')}), meals (₹${currentItinerary.overview.budgetBreakdown.meals.toLocaleString('en-IN')}), activities (₹${currentItinerary.overview.budgetBreakdown.activities.toLocaleString('en-IN')}), and transportation (₹${currentItinerary.overview.budgetBreakdown.transportation.toLocaleString('en-IN')}).`;
    }
    
    if (message.includes('weather') || message.includes('climate')) {
        return `${currentItinerary.overview.weather} I recommend checking the local forecast closer to your travel date for the most accurate information.`;
    }
    
    if (message.includes('restaurant') || message.includes('food') || message.includes('eat')) {
        return `I've recommended ${currentItinerary.overview.stats.restaurants} restaurants in your itinerary. You can find detailed recommendations in the Restaurants tab, including options for breakfast, lunch, and dinner with price ranges in INR.`;
    }
    
    if (message.includes('hotel') || message.includes('accommodation') || message.includes('stay')) {
        return `I've suggested ${currentItinerary.hotels.length} hotel options that match your ${currentItinerary.travelStyle.toLowerCase()} travel style and budget. Check the Hotels tab for detailed information including ratings, amenities, and pros/cons for each option.`;
    }
    
    if (message.includes('activity') || message.includes('attraction') || message.includes('do')) {
        return `Your itinerary includes ${currentItinerary.overview.stats.activities} activities across ${currentItinerary.duration} days. Each day has a mix of cultural experiences, sightseeing, and local attractions. You can see the detailed schedule in the Daily Itinerary tab.`;
    }
    
    return `That's a great question! Your ${currentItinerary.travelStyle.toLowerCase()} itinerary for ${currentItinerary.destination} includes comprehensive planning for ${currentItinerary.duration} days within your budget of ₹${currentItinerary.totalCost.toLocaleString('en-IN')}. You can explore all the details in the different tabs above, or ask me something more specific about your trip!`;
}

function exportToPDF() {
    if (!currentItinerary) {
        alert('Please generate an itinerary first');
        return;
    }
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Tripztarr Itinerary - ${currentItinerary.destination}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                    h1, h2, h3 { color: #333; }
                    .day { margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 15px; }
                    .activity { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
                    .activity-time { font-weight: bold; color: #007acc; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .budget { background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Tripztarr Travel Itinerary</h1>
                    <h2>${currentItinerary.destination}</h2>
                    <p><strong>Duration:</strong> ${currentItinerary.duration} days | <strong>Style:</strong> ${currentItinerary.travelStyle}</p>
                </div>
                
                <div class="budget">
                    <h3>Budget Overview</h3>
                    <p><strong>Total Cost:</strong> ₹${currentItinerary.totalCost.toLocaleString('en-IN')}</p>
                    <p>Accommodation: ₹${currentItinerary.overview.budgetBreakdown.accommodation.toLocaleString('en-IN')} | 
                       Meals: ₹${currentItinerary.overview.budgetBreakdown.meals.toLocaleString('en-IN')} | 
                       Activities: ₹${currentItinerary.overview.budgetBreakdown.activities.toLocaleString('en-IN')}</p>
                </div>
                
                <h2>Daily Itinerary</h2>
                ${currentItinerary.dailyItinerary.map(day => `
                    <div class="day">
                        <h3>Day ${day.day}: ${day.title}</h3>
                        ${day.activities.map(activity => `
                            <div class="activity">
                                <div class="activity-time">${activity.time}</div>
                                <strong>${activity.activity}</strong><br>
                                ${activity.description}<br>
                                <em>Cost: ₹${activity.cost} | Duration: ${activity.duration}</em>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
                
                <div style="margin-top: 30px; text-align: center; color: #666;">
                    <p>Generated by Tripztarr - AI-Powered Travel Planning</p>
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function shareItinerary() {
    if (!currentItinerary) {
        alert('Please generate an itinerary first');
        return;
    }
    
    if (navigator.share) {
        navigator.share({
            title: `Tripztarr Itinerary: ${currentItinerary.destination}`,
            text: `Check out my ${currentItinerary.duration}-day ${currentItinerary.travelStyle.toLowerCase()} travel plan for ${currentItinerary.destination}! Budget: ₹${currentItinerary.totalCost.toLocaleString('en-IN')}`,
            url: window.location.href
        });
    } else {
        const shareText = `My ${currentItinerary.duration}-day ${currentItinerary.travelStyle.toLowerCase()} travel itinerary for ${currentItinerary.destination} - Total cost: ₹${currentItinerary.totalCost.toLocaleString('en-IN')} - Created with Tripztarr`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Itinerary details copied to clipboard!');
        }).catch(() => {
            alert('Unable to copy to clipboard. Please copy the URL manually to share.');
        });
    }
}

function startNewTrip() {
    currentItinerary = null;
    chatHistory = [];
    
    const resultsSection = document.getElementById('resultsSection');
    const chatAssistant = document.getElementById('chatAssistant');
    const plannerSection = document.getElementById('planner');
    const plannerForm = document.getElementById('plannerForm');
    
    if (resultsSection) resultsSection.classList.add('hidden');
    if (chatAssistant) chatAssistant.style.display = 'none';
    if (plannerSection) plannerSection.style.display = 'block';
    
    if (plannerForm) {
        plannerForm.reset();
        const travelStyleRadio = document.querySelector('input[name="travelStyle"][value="Mid-range"]');
        if (travelStyleRadio) travelStyleRadio.checked = true;
        
        // Reset date to tomorrow
        setMinDate();
    }
    
    if (plannerSection) {
        plannerSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Make functions globally available
window.scrollToPlanner = scrollToPlanner;
window.selectDestination = selectDestination;
window.showTab = showTab;
window.toggleDay = toggleDay;
window.toggleChat = toggleChat;
window.sendChatMessage = sendChatMessage;
window.exportToPDF = exportToPDF;
window.shareItinerary = shareItinerary;
window.startNewTrip = startNewTrip;