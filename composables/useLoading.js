export const useLoading = () => {
    const isLoadingModels = ref(true);
    return {
        isLoadingModels,
    };
};
