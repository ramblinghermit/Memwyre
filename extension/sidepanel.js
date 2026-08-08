document.addEventListener('DOMContentLoaded', async () => {
    // Views
    const loginView = document.getElementById('login-view');
    const mainApp = document.getElementById('main-app');

    // Login Elements
    const saveTokenBtn = document.getElementById('save-token');
    const logoutBtn = document.getElementById('logout-btn');

    // Settings Elements
    const settingsBtn = document.getElementById('settings-btn');
    const backSettingsBtn = document.getElementById('back-from-settings');
    const viewSettings = document.getElementById('view-settings');
    const tabsContainer = document.getElementById('tabs-container');

    // Workspace Switcher Elements
    const workspaceDropdownBtn = document.getElementById('workspace-dropdown-btn');
    const workspaceDropdownMenu = document.getElementById('workspace-dropdown-menu');
    const currentWorkspaceName = document.getElementById('current-workspace-name');
    const workspaceList = document.getElementById('workspace-list');
    const newWorkspaceInput = document.getElementById('new-workspace-input');
    const addWorkspaceBtn = document.getElementById('add-workspace-btn');

    // Settings API Server Link Elements
    const apiServerUrlInput = document.getElementById('api-server-url-input');
    const saveApiUrlBtn = document.getElementById('save-api-url-btn');
    const resetApiUrlBtn = document.getElementById('reset-api-url-btn');

    // Tabs
    const tabs = document.querySelectorAll('.tab-segment');
    const views = document.querySelectorAll('.view');

    // Save Elements
    const saveTitle = document.getElementById('save-title');
    const saveContent = document.getElementById('save-content');
    const saveBtn = document.getElementById('save-btn');
    const saveStatus = document.getElementById('save-status');

    // Search Elements
    const searchQuery = document.getElementById('search-query');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    const searchK = document.getElementById('search-k');

    // Inbox Elements
    const inboxContainer = document.getElementById('inbox-container');
    const refreshInboxBtn = document.getElementById('refresh-inbox');

    // Timeline Elements
    const timelineContainer = document.getElementById('timeline-container');
    const refreshTimelineBtn = document.getElementById('refresh-timeline');
    const timelineSource = document.getElementById('timeline-source');

    // Check Auth
    const { token } = await chrome.storage.local.get('token');
    if (token) {
        showMain();
    } else {
        showLogin();
    }

    // Listen for token changes (Auto-update UI after login)
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.token) {
            if (changes.token.newValue) {
                showMain();
            } else {
                showLogin();
            }
        }
    });

    // --- Auth Handlers ---

    saveTokenBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: `${CONFIG[ENV].WEB_APP_URL}/login?source=extension` });
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await chrome.storage.local.remove('token');
            showLogin();
        });
    }

    // --- Settings Navigation & API Server Link ---

    async function initSettingsView() {
        if (apiServerUrlInput) {
            const currentUrl = await getApiBaseUrl();
            apiServerUrlInput.value = currentUrl;
        }
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            // Hide all views and tabs
            views.forEach(v => v.classList.remove('active'));
            tabsContainer.classList.add('hidden');

            // Show settings & load current server URL
            viewSettings.classList.add('active');
            initSettingsView();
        });
    }

    if (backSettingsBtn) {
        backSettingsBtn.addEventListener('click', () => {
            // Hide settings
            viewSettings.classList.remove('active');
            tabsContainer.classList.remove('hidden');

            // Restore active tab (default to memories if none)
            const activeTab = document.querySelector('.tab-segment.active');
            if (activeTab) {
                const targetId = activeTab.getAttribute('data-tab');
                document.getElementById(`view-${targetId}`).classList.add('active');
            } else {
                document.getElementById('view-timeline').classList.add('active');
            }
        });
    }

    if (saveApiUrlBtn && apiServerUrlInput) {
        saveApiUrlBtn.addEventListener('click', async () => {
            const newUrl = apiServerUrlInput.value.trim();
            if (!newUrl) return;
            try {
                new URL(newUrl); // Validate URL format
                await chrome.storage.local.set({ customApiBaseUrl: newUrl });
                showToast('API Server Link saved successfully!', 'success');
            } catch (e) {
                showToast('Invalid URL format. Please include http:// or https://', 'error');
            }
        });
    }

    if (resetApiUrlBtn && apiServerUrlInput) {
        resetApiUrlBtn.addEventListener('click', async () => {
            await chrome.storage.local.remove('customApiBaseUrl');
            apiServerUrlInput.value = CONFIG[ENV].API_BASE_URL;
            showToast('API Server Link reset to default.', 'info');
        });
    }

    // --- Workspace Switcher Handlers ---

    if (workspaceDropdownBtn && workspaceDropdownMenu) {
        workspaceDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = workspaceDropdownMenu.classList.contains('hidden');
            if (isHidden) {
                workspaceDropdownMenu.classList.remove('hidden');
                workspaceDropdownBtn.classList.add('active');
                loadWorkspaces();
            } else {
                workspaceDropdownMenu.classList.add('hidden');
                workspaceDropdownBtn.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!workspaceDropdownMenu.contains(e.target) && !workspaceDropdownBtn.contains(e.target)) {
                workspaceDropdownMenu.classList.add('hidden');
                workspaceDropdownBtn.classList.remove('active');
            }
        });
    }

    async function loadWorkspaces() {
        if (!workspaceList) return;
        try {
            const res = await sendMessage('listProjects');
            if (res.success && Array.isArray(res.data)) {
                renderWorkspaces(res.data);
            } else {
                if (currentWorkspaceName) currentWorkspaceName.textContent = 'Default';
                workspaceList.innerHTML = '<div class="workspace-loading">Default Workspace</div>';
            }
        } catch (err) {
            console.error("Failed to list workspaces:", err);
            if (currentWorkspaceName) currentWorkspaceName.textContent = 'Default';
        }
    }

    async function renderWorkspaces(projects) {
        if (!workspaceList) return;
        workspaceList.innerHTML = '';

        const { selectedProjectId } = await chrome.storage.local.get('selectedProjectId');
        let activeProj = projects.find(p => p.id === selectedProjectId);

        if (!activeProj) {
            activeProj = projects.find(p => p.name === 'default') || projects[0];
            if (activeProj) {
                await chrome.storage.local.set({ selectedProjectId: activeProj.id });
            }
        }

        if (activeProj && currentWorkspaceName) {
            currentWorkspaceName.textContent = activeProj.name;
        }

        projects.forEach(proj => {
            const item = document.createElement('div');
            item.className = `workspace-item ${activeProj && proj.id === activeProj.id ? 'selected' : ''}`;
            item.innerHTML = `
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${proj.name}</span>
                ${activeProj && proj.id === activeProj.id ? '<i class="fas fa-check" style="font-size: 10px;"></i>' : ''}
            `;
            item.addEventListener('click', async () => {
                await selectWorkspace(proj);
            });
            workspaceList.appendChild(item);
        });
    }

    async function selectWorkspace(proj) {
        await chrome.storage.local.set({ selectedProjectId: proj.id });
        if (currentWorkspaceName) currentWorkspaceName.textContent = proj.name;
        if (workspaceDropdownMenu) workspaceDropdownMenu.classList.add('hidden');
        if (workspaceDropdownBtn) workspaceDropdownBtn.classList.remove('active');

        showToast(`Workspace: ${proj.name}`, 'success');

        // Reload content in active tab
        const activeTab = document.querySelector('.tab-segment.active');
        if (activeTab) {
            const targetId = activeTab.getAttribute('data-tab');
            if (targetId === 'inbox') loadInbox();
            else if (targetId === 'timeline') loadTimeline();
        }
    }

    if (addWorkspaceBtn && newWorkspaceInput) {
        const handleAddWorkspace = async () => {
            const name = newWorkspaceInput.value.trim();
            if (!name) return;
            addWorkspaceBtn.disabled = true;
            addWorkspaceBtn.textContent = '...';
            try {
                const res = await sendMessage('createProject', { name });
                if (res.success && res.data) {
                    newWorkspaceInput.value = '';
                    await selectWorkspace(res.data);
                    await loadWorkspaces();
                } else {
                    showToast(res.error || 'Could not create workspace', 'error');
                }
            } catch (err) {
                showToast(err.message, 'error');
            } finally {
                addWorkspaceBtn.disabled = false;
                addWorkspaceBtn.textContent = 'Add';
            }
        };

        addWorkspaceBtn.addEventListener('click', handleAddWorkspace);
        newWorkspaceInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleAddWorkspace();
        });
    }

    function showLogin() {
        loginView.classList.remove('hidden');
        mainApp.classList.add('hidden');
    }

    function showMain() {
        loginView.classList.add('hidden');
        mainApp.classList.remove('hidden');

        // Initialize active workspace
        loadWorkspaces();

        // Ensure settings are closed and tabs are visible
        if (viewSettings) viewSettings.classList.remove('active');
        if (tabsContainer) tabsContainer.classList.remove('hidden');

        // Restore active view based on active tab
        const activeTab = document.querySelector('.tab-segment.active');
        if (activeTab) {
            const targetId = activeTab.getAttribute('data-tab');
            const targetView = document.getElementById(`view-${targetId}`);
            if (targetView) targetView.classList.add('active');

            // Load content for data tabs
            if (targetId === 'inbox') {
                setTimeout(() => loadInbox(), 100);
            } else if (targetId === 'timeline') {
                setTimeout(() => loadTimeline(), 100);
            }
        } else {
            // Default fallback — timeline is the primary view
            const defaultTab = document.querySelector('[data-tab="timeline"]');
            if (defaultTab) defaultTab.classList.add('active');

            const defaultView = document.getElementById('view-timeline');
            if (defaultView) defaultView.classList.add('active');

            setTimeout(() => loadTimeline(), 100);
        }
    }

    // --- Tab Handlers ---

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            // Add active class to clicked
            tab.classList.add('active');
            const viewId = `view-${tab.dataset.tab}`;
            document.getElementById(viewId).classList.add('active');

            // Load data for tabs
            if (tab.dataset.tab === 'inbox') {
                loadInbox();
            } else if (tab.dataset.tab === 'timeline') {
                loadTimeline();
            }
        });
    });

    // --- Feature Handlers ---

    // 1. Save Memory
    const saveTags = document.getElementById('save-tags');
    saveBtn.addEventListener('click', async () => {
        const content = saveContent.value.trim();
        const title = saveTitle.value.trim() || 'Extension Clip';
        
        // Parse comma-separated tags
        let tags = [];
        if (saveTags && saveTags.value.trim()) {
            tags = saveTags.value.split(',').map(t => t.trim()).filter(t => t);
        }

        if (!content) return;

        setLoading(saveBtn, true, 'Saving...');
        saveStatus.className = 'hidden';

        try {
            const response = await sendMessage('saveMemory', { title, content, tags });
            if (response.success) {
                saveContent.value = '';
                saveTitle.value = '';
                showToast('Memory saved successfully!');
            } else {
                showToast(response.error, 'error');
            }
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setLoading(saveBtn, false, 'Save Memory');
        }
    });

    // 2. Search Memory with custom k value and filter
    const searchIcon = document.getElementById('search-icon');
    const loadingIcon = document.getElementById('loading-icon');
    const searchFilter = document.getElementById('search-filter');

    searchBtn.addEventListener('click', async () => {
        const query = searchQuery.value.trim();
        if (!query) return;

        const topK = parseInt(searchK.value) || 5;
        const filter = searchFilter.value;

        // Show loading state
        searchBtn.disabled = true;
        searchIcon.classList.add('hidden');
        loadingIcon.classList.remove('hidden');
        searchResults.classList.add('hidden');
        searchResults.innerHTML = '';

        try {
            const response = await sendMessage('searchMemory', { query, top_k: topK });
            if (response.success) {
                renderResults(response.data, filter);
            } else {
                showToast(response.error, 'error');
            }
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            // Reset loading state
            searchBtn.disabled = false;
            searchIcon.classList.remove('hidden');
            loadingIcon.classList.add('hidden');
        }
    });

    // Allow Enter key to search
    searchQuery.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // 3. Load Inbox
    if (refreshInboxBtn) refreshInboxBtn.addEventListener('click', loadInbox);

    // --- Session Expired Helper ---
    function renderSessionExpired(container) {
        container.innerHTML = `
            <div class="session-expired-msg">
                <i class="fas fa-lock" style="font-size: 24px; color: var(--text-muted); margin-bottom: 12px;"></i>
                <div style="font-weight: 600; margin-bottom: 4px;">Session Expired</div>
                <div style="font-size: 12px; color: var(--text-subtle); margin-bottom: 12px;">Your login has expired. Please re-login to continue.</div>
                <button class="primary-btn relogin-btn" style="padding: 10px 20px; width: auto; font-size: 13px;">Re-login</button>
            </div>
        `;
        container.querySelector('.relogin-btn').addEventListener('click', () => {
            chrome.tabs.create({ url: `${CONFIG[ENV].WEB_APP_URL}/login?source=extension` });
        });
    }

    async function loadInbox() {
        inboxContainer.innerHTML = '<div class="status-msg"><i class="fas fa-spinner fa-spin"></i> Loading inbox...</div>';
        try {
            const { token: freshToken, selectedProjectId } = await chrome.storage.local.get(['token', 'selectedProjectId']);
            if (!freshToken) { renderSessionExpired(inboxContainer); return; }
            const apiBaseUrl = await getApiBaseUrl();
            const headers = { 'Authorization': `Bearer ${freshToken}` };
            if (selectedProjectId) headers['X-Project-Id'] = String(selectedProjectId);

            const response = await fetch(`${apiBaseUrl}/inbox/`, { headers });
            if (response.ok) {
                const data = await response.json();
                renderInbox(data || []);
            } else if (response.status === 401) {
                renderSessionExpired(inboxContainer);
            } else {
                inboxContainer.innerHTML = `<div class="status-msg"><i class="fas fa-exclamation-triangle" style="color: var(--primary);"></i> Could not load inbox. <button class="text-link-btn-refresh" onclick="this.closest('.view').querySelector('#refresh-inbox')?.click()">Retry</button></div>`;
            }
        } catch (err) {
            inboxContainer.innerHTML = '<div class="status-msg"><i class="fas fa-wifi" style="color: var(--text-muted);"></i> Connection error. Check your network.</div>';
        }
    }

    function renderInbox(items) {
        inboxContainer.innerHTML = '';
        if (items.length === 0) {
            inboxContainer.innerHTML = '<div class="status-msg">No pending items.</div>';
            return;
        }

        items.slice(0, 15).forEach(item => {
            const el = document.createElement('div');
            el.className = 'inbox-item';

            // Use the same icon engine as the timeline
            const iconData = window.getIconForSource({ source: item.source || '', tags: item.tags || [] });
            let iconHtml;
            if (iconData.type === 'img') {
                iconHtml = `<img src="${iconData.content}" alt="source" style="width:24px;height:24px;object-fit:contain;border-radius:4px;" onerror="this.style.display='none';" />`;
            } else {
                iconHtml = iconData.content;
            }

            // Provider label (mirrors timeline)
            const src = (item.source || '').toLowerCase();
            let providerStr = 'User';
            if (src.includes('chatgpt') || src.includes('openai')) providerStr = 'ChatGPT';
            else if (src.includes('claude')) providerStr = 'Claude';
            else if (src.includes('gemini')) providerStr = 'Gemini';
            else if (src.includes('perplexity')) providerStr = 'Perplexity';
            else if (src.includes('cursor')) providerStr = 'Cursor';
            else if (src.includes('openclaw')) providerStr = 'OpenClaw';
            else if (src.includes('codex')) providerStr = 'Codex';
            else if (src.includes('antigravity') || src === 'mcp') providerStr = 'Antigravity';
            else if (src === 'agent_drop') providerStr = 'Agent';
            else if (src === 'browser_extension') providerStr = 'Extension';
            else if (item.source) providerStr = item.source;

            const dateStr = new Date(item.created_at || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            const title = item.details || 'Inbox Item';
            const preview = (item.content || '').substring(0, 120);

            el.innerHTML = `
                <div class="inbox-icon-box">${iconHtml}</div>
                <div class="inbox-content">
                    <div class="inbox-header">
                        <div class="inbox-title">${title}</div>
                        <div class="inbox-time">${dateStr}</div>
                    </div>
                    <div class="inbox-source-info">${providerStr} | ${item.status || 'pending'}</div>
                    <div class="inbox-preview">${preview}</div>
                </div>
            `;

            el.addEventListener('click', () => {
                chrome.tabs.create({ url: `${CONFIG[ENV].WEB_APP_URL}/inbox?selected=${item.id}` });
            });

            inboxContainer.appendChild(el);
        });
    }

    // 4. Load Timeline
    if (refreshTimelineBtn) refreshTimelineBtn.addEventListener('click', loadTimeline);
    if (timelineSource) timelineSource.addEventListener('change', loadTimeline);

    async function loadTimeline() {
        timelineContainer.innerHTML = '<div class="status-msg"><i class="fas fa-spinner fa-spin"></i> Loading timeline...</div>';
        try {
            const { token: freshToken, selectedProjectId } = await chrome.storage.local.get(['token', 'selectedProjectId']);
            if (!freshToken) { renderSessionExpired(timelineContainer); return; }
            const apiBaseUrl = await getApiBaseUrl();
            let url = `${apiBaseUrl}/memory/?view=timeline&limit=50`;
            if (selectedProjectId) url += `&project_id=${selectedProjectId}`;
            const source = timelineSource.value;
            if (source) url += `&source_app=${encodeURIComponent(source)}`;

            const headers = { 'Authorization': `Bearer ${freshToken}` };
            if (selectedProjectId) headers['X-Project-Id'] = String(selectedProjectId);

            const response = await fetch(url, { headers });

            if (response.ok) {
                const data = await response.json();
                renderTimeline(data || []);
            } else if (response.status === 401) {
                renderSessionExpired(timelineContainer);
            } else {
                timelineContainer.innerHTML = `<div class="status-msg"><i class="fas fa-exclamation-triangle" style="color: var(--primary);"></i> Could not load timeline. <button class="text-link-btn-refresh" onclick="this.closest('.view').querySelector('#refresh-timeline')?.click()">Retry</button></div>`;
            }
        } catch (err) {
            timelineContainer.innerHTML = '<div class="status-msg"><i class="fas fa-wifi" style="color: var(--text-muted);"></i> Connection error. Check your network.</div>';
        }
    }


    function renderTimeline(items) {
        timelineContainer.innerHTML = '';
        const timelineItems = items.filter(x => String(x.id || '').startsWith('mem_'));

        if (timelineItems.length === 0) {
            timelineContainer.innerHTML = '<div class="status-msg">No AI interactions yet.</div>';
            return;
        }

        // Group by day
        const grouped = {};
        timelineItems.forEach(item => {
            const date = new Date(item.created_at || Date.now());
            const key = date.toISOString().slice(0, 10);
            if (!grouped[key]) grouped[key] = { date, items: [] };
            grouped[key].items.push(item);
        });

        Object.keys(grouped).sort().reverse().forEach(key => {
            const group = grouped[key];
            const groupEl = document.createElement('div');
            groupEl.className = 'timeline-day-group';

            const todayKey = new Date().toISOString().slice(0, 10);
            const yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            const yesterdayKey = yesterdayDate.toISOString().slice(0, 10);

            let label = group.date.toLocaleDateString();
            if (key === todayKey) label = 'Today';
            if (key === yesterdayKey) label = 'Yesterday';

            groupEl.innerHTML = `<div class="timeline-date-label">${label}</div>`;

        group.items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'timeline-item';

                const timeStr = new Date(item.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const src = (item.source_app || item.source || '').toLowerCase();
                const title = item.title || 'Untitled AI Interaction';
                const displayType = item.interaction_type || 'conversation';

                // Use the same icon engine as the web app
                const iconData = window.getIconForSource({ source: item.source_app || item.source || '', tags: item.tags || [] });
                let iconHtml;
                if (iconData.type === 'img') {
                    iconHtml = `<img src="${iconData.content}" alt="source" style="width:24px;height:24px;object-fit:contain;border-radius:4px;" onerror="this.style.display='none';" />`;
                } else {
                    iconHtml = iconData.content;
                }

                // Provider label (mirrors displaySource in Vue component)
                let providerStr = 'AI Tool';
                if (src.includes('chatgpt') || src.includes('openai')) providerStr = 'ChatGPT';
                else if (src.includes('claude')) providerStr = 'Claude';
                else if (src.includes('gemini')) providerStr = 'Gemini';
                else if (src.includes('perplexity')) providerStr = 'Perplexity';
                else if (src.includes('cursor')) providerStr = 'Cursor';
                else if (src.includes('openclaw')) providerStr = 'OpenClaw';
                else if (src.includes('codex')) providerStr = 'Codex';
                else if (src.includes('antigravity') || src === 'mcp') providerStr = 'Antigravity';
                else if (item.source_app) providerStr = item.source_app;

                itemEl.innerHTML = `
                    <div class="timeline-icon-box">${iconHtml}</div>
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <div class="timeline-title">${title}</div>
                            <div class="timeline-time">${timeStr}</div>
                        </div>
                        <div class="timeline-source-info">${providerStr} | ${displayType}</div>
                        <div class="timeline-preview">${item.content || ''}</div>
                    </div>
                `;

                // Click to copy context
                itemEl.addEventListener('click', () => {
                    navigator.clipboard.writeText(item.content || '').then(() => {
                        showToast('Copied to clipboard', 'success');
                    });
                });

                groupEl.appendChild(itemEl);
            });

            timelineContainer.appendChild(groupEl);
        });
    }

    function renderResults(items, filter = 'all') {
        searchResults.innerHTML = '';

        if (items.length === 0) {
            searchResults.textContent = 'No results found.';
            searchResults.classList.remove('hidden');
            return;
        }

        // Separate facts and chunks/memories
        let facts = items.filter(item => item.metadata?.type === 'fact');
        let chunks = items.filter(item => item.metadata?.type !== 'fact');

        // Apply filter
        if (filter === 'facts') {
            chunks = [];
        } else if (filter === 'memories') {
            facts = [];
        }

        // Check if anything to show
        if (facts.length === 0 && chunks.length === 0) {
            searchResults.textContent = 'No results found.';
            searchResults.classList.remove('hidden');
            return;
        }

        // Render Chunks/Memories section
        if (chunks.length > 0) {
            const chunksHeader = document.createElement('div');
            chunksHeader.className = 'section-header';
            chunksHeader.innerHTML = '<span class="section-title">Memories</span>';
            searchResults.appendChild(chunksHeader);
            renderResultItems(chunks, searchResults);
        }

        // Render Facts section
        if (facts.length > 0) {
            const factsHeader = document.createElement('div');
            factsHeader.className = 'section-header';
            factsHeader.style.marginTop = '16px';
            factsHeader.innerHTML = '<span class="section-title">Facts</span>';
            searchResults.appendChild(factsHeader);
            renderResultItems(facts, searchResults);
        }

        searchResults.classList.remove('hidden');
    }

    function renderResultItems(items, container) {
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';

            // Handle both 'text' (from search results) and 'content' (from documents)
            const itemContent = item.content || item.text || '';

            // Truncate content for display
            const MAX_LENGTH = 150;
            const displayContent = itemContent.length > MAX_LENGTH
                ? itemContent.substring(0, MAX_LENGTH) + '...'
                : itemContent;

            // Handle different metadata structures (flat vs nested)
            let title = "Unknown";
            let dateStr = "";
            let score = "";

            if (item.metadata) {
                title = item.metadata.title || item.metadata.source || "Untitled";
                if (item.metadata.created_at) {
                    dateStr = new Date(item.metadata.created_at).toLocaleDateString();
                }
            }
            if (item.score) {
                score = Math.round(item.score * 100) + '%';
            }

            div.innerHTML = `
                <div class="result-header" style="display:flex; justify-content:space-between; margin-bottom:6px;">
                    <span class="result-title">${title}</span>
                    <span class="result-meta">${score || dateStr}</span>
                </div>
                <div class="result-content" style="margin-bottom:8px;">${displayContent}</div>
                <button class="secondary-btn copy-btn" style="width:100%; margin-top:0;">Copy to Clipboard</button>
            `;

            // Add copy functionality with visual feedback
            const copyBtn = div.querySelector('.copy-btn');
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(itemContent);

                // Visual feedback - green button with "Copied" text
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');

                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
            });

            container.appendChild(div);
        });
    }

    // --- Helpers ---

    function sendMessage(action, data) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ action, data }, (response) => {
                resolve(response || { success: false, error: 'No response from background script' });
            });
        });
    }

    function setLoading(btn, isLoading, text) {
        btn.disabled = isLoading;
        btn.textContent = text;
    }

    // Toast Function
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Icon based on type using FontAwesome to prevent encoding issues
        let iconHtml = '<i class="fas fa-info-circle" style="color:#3b82f6;"></i>';
        if (type === 'success') iconHtml = '<i class="fas fa-check-circle" style="color:#10b981;"></i>';
        if (type === 'error') iconHtml = '<i class="fas fa-exclamation-circle" style="color:#ef4444;"></i>';

        toast.innerHTML = `<span>${iconHtml}</span><span>${message}</span>`;

        container.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'toastFadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
});
