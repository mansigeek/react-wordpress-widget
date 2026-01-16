import { getWidgetCSS } from "./cssSnapshot";
import { getPreviewHTML } from "./domSnapshot";

/**
 * Extract widget configuration from the DOM
 */
function extractWidgetConfig() {
    const previewRoot = document.getElementById("auto-connect-preview-root");
    if (!previewRoot) {
        return null;
    }

    const container = previewRoot.querySelector("[data-widget-container]");
    if (!container) {
        return null;
    }

    // Get config from data attribute
    const configAttr = container.getAttribute("data-widget-config");
    const config = configAttr ? JSON.parse(configAttr) : {};

    // Extract current items data
    const items = container.querySelectorAll("[data-item]");
    const itemsData = Array.from(items).map(item => {
        const dataAttr = item.getAttribute("data-item-data");
        return dataAttr ? JSON.parse(dataAttr) : {};
    });

    // Get pagination info
    const paginationContainer = container.querySelector("[data-pagination-container]");
    const currentPage =
        paginationContainer ? parseInt(paginationContainer.getAttribute("data-current-page") || "1") : 1;
    const totalPages = paginationContainer ? parseInt(paginationContainer.getAttribute("data-total-pages") || "1") : 1;

    return {
        ...config,
        initialItems: itemsData,
        pagination: {
            currentPage,
            totalPages,
        },
    };
}

/**
 * Generate vanilla JS functionality for the card widget
 */
function generateCardWidgetCode(config: any) {
    return `
    // Widget State
    let state = {
        allItems: [],
        displayedItems: [],
        currentPage: 1,
        totalItems: 0,
        limit: ${config.limit || 10},
        searchQuery: '',
        loading: false,
        apiUrl: '${config.apiUrl || "https://dummyjson.com/products/search"}'
    };

    // Fetch products from API
    async function fetchProducts(searchQuery = '', page = 1) {
        state.loading = true;
        state.searchQuery = searchQuery;
        state.currentPage = page;
        renderLoadingState();

        try {
            const skip = (page - 1) * state.limit;
            
            // Build URL with query parameters
            let url = state.apiUrl;
            const params = [];
            
            // Add search query if provided
            if (searchQuery.trim()) {
                params.push('q=' + encodeURIComponent(searchQuery.trim()));
            }
            
            // Add pagination
            params.push('limit=' + state.limit);
            params.push('skip=' + skip);
            params.push('select=title,price,thumbnail');
            
            // Combine URL with params
            if (params.length > 0) {
                url += '?' + params.join('&');
            }

            const response = await fetch(url);
            const data = await response.json();

            state.allItems = data.products || [];
            state.displayedItems = state.allItems;
            state.totalItems = data.total || 0;
            state.loading = false;

            render();
        } catch (error) {
            console.error('Failed to fetch products:', error);
            state.loading = false;
            renderError();
        }
    }

    // Render item card
    function renderItem(item) {
        const showImage = ${config.styling?.showImage ?? true};
        const showButton = ${config.styling?.showButton ?? true};
        const buttonText = '${(config.styling?.buttonText || "Learn More").replace(/'/g, "\\'")}';
        const buttonLink = '${config.styling?.buttonLink || "#"}';

        return \`
            <div class="widget-card" data-item data-item-id="\${item.id}">
                \${showImage ? \`
                    <img 
                        src="\${item.thumbnail}" 
                        alt="\${item.title}"
                        class="widget-card-image"
                        data-item-image
                    />
                \` : ''}
                
                <div class="widget-card-content">
                    <h4 class="widget-card-title" data-item-title>\${item.title}</h4>
                    <p class="widget-card-price" data-item-price>$\${item.price}</p>
                    
                    \${showButton && buttonText ? \`
                        <a href="\${buttonLink}" class="widget-card-button" data-item-button>
                            \${buttonText}
                        </a>
                    \` : ''}
                </div>
            </div>
        \`;
    }

    // Render loading state
    function renderLoadingState() {
        const itemsContainer = shadow.querySelector('[data-items-container]');
        if (itemsContainer) {
            itemsContainer.innerHTML = '<div class="widget-loading">Loading...</div>';
        }
    }

    // Render error state
    function renderError() {
        const itemsContainer = shadow.querySelector('[data-items-container]');
        if (itemsContainer) {
            itemsContainer.innerHTML = '<div class="widget-error">Failed to load products. Please try again.</div>';
        }
    }

    // Render pagination
    function renderPagination() {
        const totalPages = Math.ceil(state.totalItems / state.limit);
        
        if (totalPages <= 1) return '';

        const prevDisabled = state.currentPage === 1;
        const nextDisabled = state.currentPage >= totalPages;

        return \`
            <div class="widget-pagination" data-pagination-container data-current-page="\${state.currentPage}" data-total-pages="\${totalPages}">
                <button 
                    class="widget-pagination-btn"
                    data-pagination-prev 
                    \${prevDisabled ? 'disabled' : ''}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Prev
                </button>
                <span class="widget-pagination-info" data-pagination-info>
                    Page \${state.currentPage} of \${totalPages}
                </span>
                <button 
                    class="widget-pagination-btn"
                    data-pagination-next 
                    \${nextDisabled ? 'disabled' : ''}
                >
                    Next
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        \`;
    }

    // Main render function
    function render() {
        const container = shadow.querySelector('[data-widget-container]');
        if (!container) return;

        // Render items
        const itemsContainer = container.querySelector('[data-items-container]');
        if (itemsContainer) {
            if (state.loading) {
                renderLoadingState();
            } else if (state.displayedItems.length === 0) {
                itemsContainer.innerHTML = '<div class="widget-empty">No products found.</div>';
            } else {
                itemsContainer.innerHTML = state.displayedItems
                    .map(item => renderItem(item))
                    .join('');
            }
        }

        // Render pagination
        let paginationWrapper = container.querySelector('.widget-pagination-wrapper');
        if (!paginationWrapper) {
            paginationWrapper = document.createElement('div');
            paginationWrapper.className = 'widget-pagination-wrapper';
            container.appendChild(paginationWrapper);
        }
        
        const paginationHTML = renderPagination();
        paginationWrapper.innerHTML = paginationHTML;

        // Reattach event listeners
        attachEventListeners();
    }

    // Handle search
    function handleSearch(query) {
        fetchProducts(query, 1);
    }

    // Handle pagination
    function handlePageChange(newPage) {
        const totalPages = Math.ceil(state.totalItems / state.limit);
        if (newPage < 1 || newPage > totalPages) return;
        fetchProducts(state.searchQuery, newPage);
        
        // Scroll to top of widget
        const container = shadow.querySelector('[data-widget-container]');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Attach event listeners
    function attachEventListeners() {
        // Search input with debounce
        const searchInput = shadow.querySelector('[data-search-input]');
        if (searchInput && !searchInput.dataset.listenerAttached) {
            searchInput.dataset.listenerAttached = 'true';
            
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    handleSearch(e.target.value);
                }, 500);
            });
        }

        // Pagination buttons
        const prevBtn = shadow.querySelector('[data-pagination-prev]');
        const nextBtn = shadow.querySelector('[data-pagination-next]');

        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.preventDefault();
                handlePageChange(state.currentPage - 1);
            };
        }

        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                handlePageChange(state.currentPage + 1);
            };
        }
    }

    // Initialize
    function initialize() {
        // Always fetch from API on load
        fetchProducts('', 1);
    }
    `;
}

/**
 * Generate additional CSS for clean, responsive layout
 */
function generateWidgetCSS() {
    return `
/* Reset and Base Styles */
* {
    box-sizing: border-box;
}

/* Widget Container */
[data-widget-container] {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Search Input */
[data-search-input] {
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 24px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
}

[data-search-input]:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Items Grid */
[data-items-container] {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
}

/* Card Styles */
.widget-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.widget-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.widget-card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.widget-card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.widget-card-title {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
    color: #111827;
}

.widget-card-price {
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: 700;
    color: #3b82f6;
}

.widget-card-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background: #3b82f6;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    transition: background 0.2s;
    margin-top: auto;
}

.widget-card-button:hover {
    background: #2563eb;
}

/* Loading, Error, Empty States */
.widget-loading,
.widget-error,
.widget-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 48px 20px;
    font-size: 16px;
    color: #6b7280;
}

.widget-error {
    color: #ef4444;
}

/* Pagination */
    .widget-card-title {
        font-size: 16px;
    }

    .widget-card-price {
        font-size: 18px;
    }
}
.widget-pagination-wrapper {
    margin-top: 32px;
}

.widget-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.widget-pagination-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
}

.widget-pagination-btn:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #d1d5db;
}

.widget-pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.widget-pagination-btn svg {
    width: 16px;
    height: 16px;
}

.widget-pagination-info {
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
    [data-widget-container] {
        padding: 16px;
    }

    .widget-card-title {
        font-size: 16px;
    }

    .widget-card-price {
        font-size: 18px;
    }
}
    [data-items-container] {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
    }

    .widget-card-image {
        height: 160px;
    }

    .widget-card-content {
        padding: 16px;
    }

    .widget-card-title {
        font-size: 16px;
    }

    .widget-card-price {
        font-size: 18px;
    }
}

@media (max-width: 480px) {
    [data-items-container] {
        grid-template-columns: 1fr;
    }

    .widget-pagination {
        flex-wrap: wrap;
        gap: 12px;
    }

    .widget-pagination-btn {
        padding: 6px 12px;
        font-size: 13px;
    }
}
`;
}

/**
 * Main export function - generates the complete widget script
 */
export function generateWidgetScript() {
    const html = getPreviewHTML("auto-connect-preview-root");
    const originalCSS = getWidgetCSS(html);
    const config = extractWidgetConfig();

    if (!html.trim()) {
        throw new Error("Export failed: Preview HTML is empty");
    }

    if (!config) {
        throw new Error("Export failed: Could not extract widget configuration");
    }

    const functionalityCode = generateCardWidgetCode(config);
    const additionalCSS = generateWidgetCSS();

    // Escape backticks and special characters
    const escapedHTML = html.replace(/`/g, "\\`").replace(/\$/g, "\\$");
    const escapedOriginalCSS = originalCSS.replace(/`/g, "\\`");

    return `
(function () {
  'use strict';
  
  const WIDGET_ID = "auto-connect-widget";

  // Avoid mounting twice
  if (document.getElementById(WIDGET_ID)) {
    console.warn('Widget already mounted');
    return;
  }

  // Create mount point
  const mount = document.createElement("div");
  mount.id = WIDGET_ID;
  document.body.appendChild(mount);

  // Create shadow DOM for style isolation
  const shadow = mount.attachShadow({ mode: "open" });

  // Inject styles
  const style = document.createElement("style");
  style.textContent = \`
${escapedOriginalCSS}

${additionalCSS}
  \`;

  // Inject HTML structure
  const wrapper = document.createElement("div");
  wrapper.innerHTML = \`${escapedHTML}\`;

  shadow.appendChild(style);
  shadow.appendChild(wrapper);

  // Widget functionality
  ${functionalityCode}

  // Start the widget
  initialize();
})();
`.trim();
}

/**
 * Helper function to download the script as a file
 */
export function downloadWidgetScript(filename: string = "widget.js") {
    try {
        const script = generateWidgetScript();
        const blob = new Blob([script], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return true;
    } catch (error) {
        console.error("Failed to generate widget script:", error);
        return false;
    }
}

/**
 * Helper function to copy script to clipboard
 */
export async function copyWidgetScriptToClipboard() {
    try {
        const script = generateWidgetScript();
        await navigator.clipboard.writeText(script);
        return true;
    } catch (error) {
        console.error("Failed to copy script to clipboard:", error);
        return false;
    }
}
