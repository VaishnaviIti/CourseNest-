import api from './api';

export const paymentService = {
  // Process payment
  processPayment: async (paymentData) => {
    const response = await api.post('/payment/process', paymentData);
    return response.data;
  },

  // Verify payment
  verifyPayment: async (transactionId) => {
    const response = await api.get(`/payment/verify/${transactionId}`);
    return response.data;
  },
};
