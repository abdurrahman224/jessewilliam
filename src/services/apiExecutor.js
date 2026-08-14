export const apiExecutor = async (apiCall, rejectWithValue) => {
  try {
    const response = await apiCall();
    console.log('✅ API SUCCESS:', response);
    return response.data ?? response;
  } catch (error) {
    console.log('STATUS:', error.response?.status);
    console.log('BACKEND ERROR:', error.response?.data.message);
    console.log('SENT DATA:', error.config?.data);
    console.log('API ERROR:', error.message);
    return rejectWithValue(error.response?.data?.message || error.message);
  }
};
