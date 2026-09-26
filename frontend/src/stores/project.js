import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { 
    listProjects, 
    createProject as apiCreateProject,
    updateProject as apiUpdateProject,
    archiveProject as apiArchiveProject,
    restoreProject as apiRestoreProject,
    deleteProjectPermanent as apiDeleteProjectPermanent
} from '../services/projects';

function getStorage() {
    if (typeof localStorage !== 'undefined') return localStorage;
    return {
        getItem: () => null,
        setItem: () => { },
        removeItem: () => { },
    };
}

export const useProjectStore = defineStore('project', () => {
    const storage = getStorage();
    const projects = ref([]);
    const archivedProjects = ref([]);
    const loading = ref(false);

    const savedIdStr = storage.getItem('selectedProjectId');
    const initialId = savedIdStr ? Number(savedIdStr) : null;
    const currentProjectId = ref(initialId);

    const currentProject = computed(() => {
        return projects.value.find(p => p.id === currentProjectId.value) || null;
    });

    const defaultProject = computed(() => {
        return projects.value.find(p => p.name.toLowerCase() === 'default') || null;
    });

    const setCurrentProjectId = (id) => {
        const numericId = id ? Number(id) : null;
        currentProjectId.value = numericId;
        if (numericId) {
            storage.setItem('selectedProjectId', String(numericId));
        } else {
            storage.removeItem('selectedProjectId');
        }
    };
    
    // Alias to match existing usages across the app
    const selectProject = setCurrentProjectId;

    const fetchProjects = async (includeArchived = false) => {
        loading.value = true;
        try {
            const list = await listProjects(false, true);
            projects.value = list || [];
            
            if (includeArchived) {
                const archivedList = await listProjects(true, true);
                archivedProjects.value = archivedList.filter(p => p.archived_at !== null) || [];
            }
            
            const savedIdStr = storage.getItem('selectedProjectId');
            const savedId = savedIdStr ? Number(savedIdStr) : null;
            
            const exists = projects.value.some(p => p.id === savedId);
            if (exists && savedId) {
                currentProjectId.value = savedId;
            } else {
                const defaultProj = projects.value.find(p => p.name.toLowerCase() === 'default');
                if (defaultProj) {
                    currentProjectId.value = defaultProj.id;
                    storage.setItem('selectedProjectId', String(defaultProj.id));
                } else if (projects.value.length > 0) {
                    currentProjectId.value = projects.value[0].id;
                    storage.setItem('selectedProjectId', String(projects.value[0].id));
                } else {
                    currentProjectId.value = null;
                }
            }
        } catch (error) {
            console.error('Failed to fetch projects in store:', error);
        } finally {
            loading.value = false;
        }
    };

    const fetchArchivedProjects = async () => {
        try {
            const archivedList = await listProjects(true, true);
            archivedProjects.value = archivedList.filter(p => p.archived_at !== null) || [];
        } catch (error) {
            console.error('Failed to fetch archived projects:', error);
        }
    };

    const createProject = async (payload) => {
        loading.value = true;
        try {
            // handle old string payload backwards compatibility if it exists
            const projectData = typeof payload === 'string' ? { name: payload } : payload;
            const newProj = await apiCreateProject(projectData);
            await fetchProjects();
            return newProj;
        } catch (error) {
            console.error('Failed to create project in store:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    };
    
    const createNewProject = createProject;

    const updateExistingProject = async (id, payload) => {
        loading.value = true;
        try {
            const updated = await apiUpdateProject(id, payload);
            await fetchProjects();
            return updated;
        } catch (error) {
            console.error('Failed to update project in store:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const archiveExistingProject = async (id) => {
        loading.value = true;
        try {
            await apiArchiveProject(id);
            if (currentProjectId.value === id) {
                const defaultProj = defaultProject.value;
                if (defaultProj) setCurrentProjectId(defaultProj.id);
            }
            await fetchProjects(true);
        } catch (error) {
            console.error('Failed to archive project:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const restoreExistingProject = async (id) => {
        loading.value = true;
        try {
            await apiRestoreProject(id);
            await fetchProjects(true);
        } catch (error) {
            console.error('Failed to restore project:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const deleteProjectPermanently = async (id) => {
        loading.value = true;
        try {
            await apiDeleteProjectPermanent(id);
            if (currentProjectId.value === id) {
                const defaultProj = defaultProject.value;
                if (defaultProj) setCurrentProjectId(defaultProj.id);
            }
            await fetchProjects(true);
        } catch (error) {
            console.error('Failed to permanently delete project:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    };

    return {
        projects,
        archivedProjects,
        currentProjectId,
        currentProject,
        defaultProject,
        loading,
        setCurrentProjectId,
        selectProject,
        fetchProjects,
        fetchArchivedProjects,
        createProject,
        createNewProject,
        updateExistingProject,
        archiveExistingProject,
        restoreExistingProject,
        deleteProjectPermanently,
    };
});
