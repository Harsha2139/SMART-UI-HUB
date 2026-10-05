"use strict";


/* ============================================================
   SMARTUI HUB
   REAL TEMPLATE PREVIEW SYSTEM

   IMPORTANT:
   Every preview uses the actual template's:

   frontend/templates/
       category/
           collection/
               template/
                   index.html

   Clicking the preview opens that same index.html.
============================================================ */


/* ============================================================
   CATEGORY DATABASE
============================================================ */

const CATEGORY_DATA = [

  {
    id:"ai",
    title:"AI",
    icon:"✦",
    accent:"#7657ff",
    shade:"#2919a8",
    image:"https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    base:"ai",

    collections:[

      {
        slug:"ai-chat",
        title:"AI Chat",
        templates:[
          "01-basic-ai-chat",
          "02-modern-ai-chat",
          "03-ai-chat-dashboard",
          "04-team-ai-chat"
        ]
      },

      {
        slug:"ai-assistant",
        title:"AI Assistant",
        templates:[
          "01-personal-ai-assistant",
          "02-business-ai-assistant",
          "03-voice-ai-assistant",
          "04-smart-ai-assistant"
        ]
      },

      {
        slug:"ai-dashboard",
        title:"AI Dashboard",
        templates:[
          "01-ai-analytics-dashboard",
          "02-ai-monitoring-dashboard",
          "03-ai-insights-dashboard",
          "04-enterprise-ai-dashboard"
        ]
      },

      {
        slug:"ai-agent-management",
        title:"AI Agent Management",
        templates:[
          "01-modern-saas-dashboard",
          "02-analytics-saas",
          "03-productivity-saas",
          "04-enterprise-saas"
        ]
      }

    ]
  },


  {
    id:"saas",
    title:"SaaS",
    icon:"☁",
    accent:"#20cdb0",
    shade:"#087e70",
    image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    base:"saas",

    collections:[

      {
        slug:"saas-dashboard",
        title:"SaaS Dashboard",
        templates:[
          "01-modern-saas-dashboard",
          "02-analytics-saas",
          "03-productivity-saas",
          "04-enterprise-saas"
        ]
      },

      {
        slug:"saas-admin",
        title:"SaaS Admin",
        templates:[
          "01-basic-admin",
          "02-modern-admin",
          "03-enterprise-admin",
          "04-saas-control-center"
        ]
      },

      {
        slug:"saas-billing",
        title:"SaaS Billing",
        templates:[
          "01-billing-dashboard",
          "02-subscription-billing",
          "03-payment-management",
          "04-revenue-billing"
        ]
      },

      {
        slug:"user-management",
        title:"User Management",
        templates:[
          "01-user-dashboard",
          "02-user-administration",
          "03-customer-management",
          "04-enterprise-users"
        ]
      },

      {
        slug:"team-management",
        title:"Team Management",
        templates:[
          "01-team-dashboard",
          "02-team-members",
          "03-organization-management",
          "04-workspace-management"
        ]
      },

      {
        slug:"integrations",
        title:"Integrations",
        templates:[
          "01-integration-hub",
          "02-api-integrations",
          "03-app-connections",
          "04-enterprise-integrations"
        ]
      }

    ]
  },


  {
    id:"swiggy",
    title:"Swiggy",
    icon:"🍔",
    accent:"#ff5b18",
    shade:"#a6290a",
    image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    base:"swiggy",

    collections:[

      {
        slug:"01-food-delivery",
        title:"Food Delivery",
        templates:[
          "01-modern-food-delivery",
          "02-food-delivery-dashboard"
        ]
      },

      {
        slug:"02-restaurant-discovery",
        title:"Restaurant Discovery",
        templates:[
          "01-restaurant-discovery",
          "02-smart-restaurant-search"
        ]
      },

      {
        slug:"03-food-ordering",
        title:"Food Ordering",
        templates:[
          "01-food-order",
          "02-modern-food-cart"
        ]
      },

      {
        slug:"04-grocery-delivery",
        title:"Grocery Delivery",
        templates:[
          "01-grocery-delivery",
          "02-grocery-shopping"
        ]
      },

      {
        slug:"05-food-dashboard",
        title:"Food Dashboard",
        templates:[
          "01-swiggy-dashboard",
          "02-order-management"
        ]
      }

    ]
  },


  {
    id:"where-is-my-train",
    title:"Where Is My Train",
    icon:"🚆",
    accent:"#23a8ff",
    shade:"#0757a2",
    image:"https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80",
    base:"where-is-my-train",

    collections:[

      {
        slug:"01-train-tracker",
        title:"Train Tracker",
        templates:[
          "01-modern-train-tracker",
          "02-live-train-tracker"
        ]
      },

      {
        slug:"02-train-booking",
        title:"Train Booking",
        templates:[
          "01-train-booking",
          "02-modern-ticket-booking"
        ]
      },

      {
        slug:"03-live-train-status",
        title:"Live Train Status",
        templates:[
          "01-live-status",
          "02-train-status-board"
        ]
      },

      {
        slug:"04-pnr-tracker",
        title:"PNR Tracker",
        templates:[
          "01-pnr-status",
          "02-pnr-dashboard"
        ]
      },

      {
        slug:"05-railway-dashboard",
        title:"Railway Dashboard",
        templates:[
          "01-railway-dashboard",
          "02-modern-rail-dashboard"
        ]
      }

    ]
  },


  {
    id:"bookmyshow",
    title:"BookMyShow",
    icon:"🎟",
    accent:"#ff3159",
    shade:"#8e112b",
    image:"https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
    base:"bookmyshow",

    collections:[

      {
        slug:"01-movie-booking",
        title:"Movie Booking",
        templates:[
          "01-modern-movie-booking",
          "02-movie-ticket-booking"
        ]
      },

      {
        slug:"02-movie-streaming",
        title:"Movie Streaming",
        templates:[
          "01-movie-streaming",
          "02-streaming-home"
        ]
      },

      {
        slug:"03-theatre-booking",
        title:"Theatre Booking",
        templates:[
          "01-theatre-booking",
          "02-seat-selection"
        ]
      },

      {
        slug:"04-event-booking",
        title:"Event Booking",
        templates:[
          "01-event-booking",
          "02-event-discovery"
        ]
      },

      {
        slug:"05-entertainment-dashboard",
        title:"Entertainment Dashboard",
        templates:[
          "01-entertainment-dashboard",
          "02-booking-dashboard"
        ]
      }

    ]
  },


  {
    id:"flipkart",
    title:"Flipkart",
    icon:"🛒",
    accent:"#2879ff",
    shade:"#073f9b",
    image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    base:"flipkart",

    collections:[

      {
        slug:"online-shopping",
        title:"Online Shopping",
        templates:[
          "01-modern-online-shopping",
          "02-ecommerce-shopping"
        ]
      },

      {
        slug:"product-discovery",
        title:"Product Discovery",
        templates:[
          "01-product-discovery",
          "02-smart-product-search"
        ]
      },

      {
        slug:"product-details",
        title:"Product Details",
        templates:[
          "01-product-details",
          "02-modern-product-page"
        ]
      },

      {
        slug:"cart-checkout",
        title:"Cart & Checkout",
        templates:[
          "01-shopping-cart",
          "02-modern-checkout"
        ]
      },

      {
        slug:"orders-account",
        title:"Orders & Account",
        templates:[
          "01-order-management",
          "02-customer-account"
        ]
      }

    ]
  },


  {
    id:"byjus",
    title:"BYJU'S",
    icon:"🎓",
    accent:"#7b53ff",
    shade:"#32168f",
    image:"https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=900&q=80",
    base:"byjus",

    collections:[

      {
        slug:"online-learning",
        title:"Online Learning",
        templates:[
          "01-online-learning",
          "02-modern-learning"
        ]
      },

      {
        slug:"course-dashboard",
        title:"Course Dashboard",
        templates:[
          "01-course-dashboard",
          "02-student-dashboard"
        ]
      },

      {
        slug:"video-learning",
        title:"Video Learning",
        templates:[
          "01-video-learning",
          "02-interactive-lessons"
        ]
      },

      {
        slug:"tests-assessments",
        title:"Tests & Assessments",
        templates:[
          "01-online-test",
          "02-quiz-assessment"
        ]
      },

      {
        slug:"student-progress",
        title:"Student Progress",
        templates:[
          "01-learning-progress",
          "02-performance-dashboard"
        ]
      }

    ]
  },


  {
    id:"game-app",
    title:"Game App",
    icon:"🎮",
    accent:"#c23dff",
    shade:"#67118f",
    image:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    base:"game-app",

    collections:[

      {
        slug:"game-home",
        title:"Game Home",
        templates:[
          "01-modern-game-home",
          "02-game-discovery"
        ]
      },

      {
        slug:"game-library",
        title:"Game Library",
        templates:[
          "01-game-library",
          "02-game-browser"
        ]
      },

      {
        slug:"player-profile",
        title:"Player Profile",
        templates:[
          "01-player-profile",
          "02-gaming-profile"
        ]
      },

      {
        slug:"leaderboard",
        title:"Leaderboard",
        templates:[
          "01-game-leaderboard",
          "02-player-ranking"
        ]
      },

      {
        slug:"game-dashboard",
        title:"Game Dashboard",
        templates:[
          "01-gaming-dashboard",
          "02-modern-game-dashboard"
        ]
      }

    ]
  },


  {
    id:"portfolio",
    title:"Portfolio",
    icon:"💼",
    accent:"#20d0b0",
    shade:"#076f63",
    image:"https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
    base:"portfolio",

    collections:[

      {
        slug:"developer-showcase",
        title:"Developer Showcase",
        templates:[
          "01-codecraft-portfolio",
          "02-devfolio-studio"
        ]
      },

      {
        slug:"creative-portfolio",
        title:"Creative Portfolio",
        templates:[
          "01-visual-storyboard",
          "02-creative-grid"
        ]
      },

      {
        slug:"freelancer-portfolio",
        title:"Freelancer Portfolio",
        templates:[
          "01-freelance-hub",
          "02-client-workspace"
        ]
      },

      {
        slug:"resume-showcase",
        title:"Resume Showcase",
        templates:[
          "01-career-profile",
          "02-resume-timeline"
        ]
      },

      {
        slug:"portfolio-cms",
        title:"Portfolio CMS",
        templates:[
          "01-project-command-center",
          "02-creator-dashboard"
        ]
      }

    ]
  },


  {
    id:"sports",
    title:"Sports",
    icon:"🏏",
    accent:"#12d899",
    shade:"#08784e",
    image:"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=900&q=80",
    base:"sports",

    collections:[

      {
        slug:"cricket-live",
        title:"Cricket Live",
        templates:[
          "01-cricket-pulse",
          "02-live-score-arena"
        ]
      },

      {
        slug:"match-center",
        title:"Match Center",
        templates:[
          "01-match-command",
          "02-ball-by-ball"
        ]
      },

      {
        slug:"player-zone",
        title:"Player Zone",
        templates:[
          "01-player-card",
          "02-player-stat-lab"
        ]
      },

      {
        slug:"tournaments",
        title:"Tournaments",
        templates:[
          "01-cricket-league-hub",
          "02-tournament-arena"
        ]
      },

      {
        slug:"sports-community",
        title:"Sports Community",
        templates:[
          "01-fan-zone",
          "02-cricket-social"
        ]
      }

    ]
  },


  {
    id:"airtel-recharge",
    title:"Airtel Recharge",
    icon:"📱",
    accent:"#ff3e3e",
    shade:"#9d141d",
    image:"https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80",
    base:"airtel-recharge",

    collections:[

      {
        slug:"recharge-flow",
        title:"Recharge Flow",
        templates:[
          "01-one-tap-recharge",
          "02-smart-recharge"
        ]
      },

      {
        slug:"plan-explorer",
        title:"Plan Explorer",
        templates:[
          "01-plan-finder",
          "02-data-plan-lab"
        ]
      },

      {
        slug:"payments-bills",
        title:"Payments & Bills",
        templates:[
          "01-bill-control-center",
          "02-payment-pocket"
        ]
      },

      {
        slug:"connectivity",
        title:"Connectivity",
        templates:[
          "01-fiber-control",
          "02-home-connect-hub"
        ]
      },

      {
        slug:"telecom-dashboard",
        title:"Telecom Dashboard",
        templates:[
          "01-my-connectivity",
          "02-network-command-center"
        ]
      }

    ]
  }

];


/* ============================================================
   HELPERS
============================================================ */

function prettyName(value){

  return value
    .replace(/^\d+-/,"")
    .replace(/-/g," ")
    .replace(/\bai\b/gi,"AI")
    .replace(/\bsaas\b/gi,"SaaS")
    .replace(/\bpnr\b/gi,"PNR")
    .replace(/\bapi\b/gi,"API")
    .replace(/\bcms\b/gi,"CMS")
    .replace(/\bbyjus\b/gi,"BYJU'S")
    .replace(/\bairtel\b/gi,"Airtel")
    .replace(/\bbookmyshow\b/gi,"BookMyShow")
    .replace(/\b\w/g,char => char.toUpperCase());

}


function getTemplateCount(category){

  return category.collections.reduce(
    (total,collection) =>
      total + collection.templates.length,
    0
  );

}


/* ============================================================
   CREATE ALL TEMPLATE OBJECTS
============================================================ */

function buildTemplates(){

  const templates = [];

  CATEGORY_DATA.forEach(category => {

    category.collections.forEach(collection => {

      collection.templates.forEach(slug => {

        templates.push({

          id:
            category.id +
            "-" +
            collection.slug +
            "-" +
            slug,

          slug:slug,

          title:prettyName(slug),

          category:category,

          collection:collection,

          description:
            `${collection.title} interface designed for modern ${category.title} applications.`,

          rating:
            (4.6 + ((templates.length * 7) % 5) / 10)
            .toFixed(1),

          reviews:
            180 +
            ((templates.length * 73) % 1800)

        });

      });

    });

  });

  return templates;

}


const ALL_TEMPLATES =
  buildTemplates();


/* ============================================================
   ELEMENTS
============================================================ */

const categoryGrid =
  document.getElementById(
    "categoryGrid"
  );

const templateGrid =
  document.getElementById(
    "templateGrid"
  );

const templateHeading =
  document.getElementById(
    "templateHeading"
  );

const templateDescription =
  document.getElementById(
    "templateDescription"
  );

const emptyState =
  document.getElementById(
    "emptyState"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const bottomSheet =
  document.getElementById(
    "bottomSheet"
  );

const sheetOverlay =
  document.getElementById(
    "sheetOverlay"
  );

const collectionGrid =
  document.getElementById(
    "collectionGrid"
  );

const sheetCategory =
  document.getElementById(
    "sheetCategory"
  );


/* ============================================================
   ACTUAL TEMPLATE PATH
============================================================ */

function getTemplatePath(template){

  return [
    "frontend",
    "templates",
    template.category.base,
    template.collection.slug,
    template.slug,
    "index.html"
  ].join("/");

}


/* ============================================================
   CATEGORY CARDS
============================================================ */

function renderCategories(){

  categoryGrid.innerHTML = "";

  CATEGORY_DATA.forEach(category => {

    const card =
      document.createElement("article");

    card.className =
      "category-card";

    card.style.setProperty(
      "--accent",
      category.accent
    );

    card.style.setProperty(
      "--shade",
      category.shade
    );

    card.innerHTML = `

      <div class="category-image">

        <img
          src="${category.image}"
          alt="${category.title}"
          loading="lazy"
        >

      </div>

      <div class="category-logo">
        ${category.icon}
      </div>

      <div class="category-info">

        <h3>
          ${category.title}
        </h3>

        <p>
          ${getTemplateCount(category)}
          Templates
        </p>

      </div>

      <div class="category-arrow">
        →
      </div>

    `;

    card.addEventListener(
      "click",
      () => openCategory(category)
    );

    categoryGrid.appendChild(card);

  });

}


/* ============================================================
   BOTTOM SHEET
============================================================ */

function openCategory(category){

  sheetCategory.textContent =
    category.title.toUpperCase();

  collectionGrid.innerHTML = "";

  category.collections.forEach(collection => {

    const button =
      document.createElement("button");

    button.className =
      "collection";

    button.style.setProperty(
      "--accent",
      category.accent
    );

    button.style.setProperty(
      "--soft",
      category.accent + "18"
    );

    button.innerHTML = `

      <div class="collection-icon">
        ${category.icon}
      </div>

      <h3>
        ${collection.title}
      </h3>

      <p>
        ${collection.templates.length}
        templates
      </p>

    `;

    button.addEventListener(
      "click",
      () => {

        closeCategory();

        showCollection(
          category,
          collection
        );

      }
    );

    collectionGrid.appendChild(button);

  });

  document.body.classList.add(
    "sheet-open"
  );

}


function closeCategory(){

  document.body.classList.remove(
    "sheet-open"
  );

}


/* ============================================================
   REAL TEMPLATE PREVIEW
============================================================ */

function createTemplateCard(template){

  const card =
    document.createElement("article");

  card.className =
    "template-card";

  const path =
    getTemplatePath(template);

  card.innerHTML = `

    <div
      class="template-preview"
      style="--accent:${template.category.accent}"
      title="Open ${template.title}"
    >

      <iframe
        src="${path}"
        title="${template.title} preview"
        loading="lazy"
        scrolling="no"
        tabindex="-1"
      ></iframe>

      <div class="preview-gradient"></div>

      <span class="preview-badge">
        ${template.category.title}
      </span>

      <span class="preview-open">
        Open Full Template →
      </span>

    </div>


    <div class="template-info">

      <div class="template-top">

        <h3>
          ${template.title}
        </h3>

        <button
          class="favorite"
          aria-label="Favorite ${template.title}"
        >
          ♡
        </button>

      </div>

      <p class="template-description">
        ${template.description}
      </p>

      <div class="template-meta">

        <span class="rating">
          ★ ${template.rating}
          (${template.reviews})
        </span>

        <a
          class="open-template"
          href="${path}"
          target="_blank"
          rel="noopener"
        >
          Open →
        </a>

      </div>

    </div>

  `;


  const preview =
    card.querySelector(
      ".template-preview"
    );

  preview.addEventListener(
    "click",
    () => {

      window.open(
        path,
        "_blank",
        "noopener"
      );

    }
  );


  const favorite =
    card.querySelector(
      ".favorite"
    );

  favorite.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      favorite.classList.toggle(
        "active"
      );

      favorite.textContent =
        favorite.classList.contains(
          "active"
        )
          ? "♥"
          : "♡";

    }
  );


  const iframe =
    card.querySelector(
      "iframe"
    );

  iframe.addEventListener(
    "load",
    () => {

      try{

        const documentBody =
          iframe.contentDocument?.body;

        if(
          documentBody &&
          documentBody.innerHTML.trim() === ""
        ){

          showToast(
            `${template.title} has an empty index.html`
          );

        }

      }catch(error){

        /*
          Same-origin is expected because
          the template is inside this project.
        */

      }

    }
  );


  return card;

}


/* ============================================================
   RENDER TEMPLATES
============================================================ */

function renderTemplates(list){

  templateGrid.innerHTML = "";

  emptyState.hidden =
    list.length > 0;

  list.forEach(template => {

    templateGrid.appendChild(
      createTemplateCard(template)
    );

  });

}


/* ============================================================
   SHOW COLLECTION
============================================================ */

function showCollection(
  category,
  collection
){

  const templates =
    ALL_TEMPLATES.filter(
      template =>
        template.category.id === category.id &&
        template.collection.slug === collection.slug
    );

  templateHeading.textContent =
    `${category.title} — ${collection.title}`;

  templateDescription.textContent =
    `${templates.length} templates in this collection.`;

  renderTemplates(
    templates
  );

  document
    .getElementById("templates")
    .scrollIntoView({
      behavior:"smooth"
    });

}


/* ============================================================
   SEARCH
============================================================ */

function searchTemplates(value){

  const query =
    value
      .trim()
      .toLowerCase();

  if(!query){

    templateHeading.textContent =
      "Popular Templates";

    templateDescription.textContent =
      "Real template previews from your project folders.";

    renderTemplates(
      ALL_TEMPLATES.slice(0,12)
    );

    return;

  }


  const results =
    ALL_TEMPLATES.filter(
      template => {

        const searchable = [

          template.title,

          template.slug,

          template.category.title,

          template.collection.title,

          template.description

        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(
          query
        );

      }
    );


  templateHeading.textContent =
    "Search Results";

  templateDescription.textContent =
    `${results.length} templates found for "${value}".`;

  renderTemplates(
    results
  );

}


document
  .getElementById("searchForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();

      searchTemplates(
        searchInput.value
      );

      document
        .getElementById("templates")
        .scrollIntoView({
          behavior:"smooth"
        });

    }
  );


searchInput.addEventListener(
  "input",
  () => {

    if(
      searchInput.value.trim() === ""
    ){

      searchTemplates("");

    }

  }
);


/* ============================================================
   VIEW ALL TEMPLATES
============================================================ */

document
  .getElementById("viewAllTemplates")
  .addEventListener(
    "click",
    () => {

      templateHeading.textContent =
        "All Templates";

      templateDescription.textContent =
        `${ALL_TEMPLATES.length} premium templates across 11 categories.`;

      renderTemplates(
        ALL_TEMPLATES
      );

    }
  );


/* ============================================================
   VIEW CATEGORIES
============================================================ */

document
  .getElementById("viewCategories")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById("categories")
        .scrollIntoView({
          behavior:"smooth"
        });

    }
  );


/* ============================================================
   CLOSE SHEET
============================================================ */

document
  .getElementById("closeSheet")
  .addEventListener(
    "click",
    closeCategory
  );


sheetOverlay.addEventListener(
  "click",
  closeCategory
);


/* ============================================================
   ESCAPE KEY
============================================================ */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.key === "Escape"
    ){

      closeCategory();

    }

  }
);


/* ============================================================
   SEARCH ICON
============================================================ */

document
  .getElementById("focusSearch")
  .addEventListener(
    "click",
    () => {

      searchInput.focus();

      window.scrollTo({
        top:0,
        behavior:"smooth"
      });

    }
  );


/* ============================================================
   THEME BUTTON
============================================================ */

document
  .getElementById("themeButton")
  .addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "light-mode"
      );

      document.getElementById(
        "themeButton"
      ).textContent =
        document.body.classList.contains(
          "light-mode"
        )
          ? "☀"
          : "☾";

    }
  );


/* ============================================================
   TOAST
============================================================ */

let toastTimer;

function showToast(message){

  const toast =
    document.getElementById(
      "toast"
    );

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2500
    );

}


/* ============================================================
   INITIALIZE
============================================================ */

renderCategories();

renderTemplates(
  ALL_TEMPLATES.slice(0,12)
);


console.log(
  "SMARTUI HUB loaded:",
  CATEGORY_DATA.length,
  "categories /",
  ALL_TEMPLATES.length,
  "templates"
);
