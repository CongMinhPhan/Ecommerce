const vnPayConfig = async () => {
    try {
        // Cấu hình VNPay
        const vnp_TmnCode = process.env.VNP_TMN_CODE;
        const vnp_HashSecret = process.env.VNP_HASH_SECRET;
        const vnp_Url = process.env.VNP_URL;
        const merchantAdmin = {
            username: process.env.MERCHANT_ADMIN_USERNAME,
            password: process.env.MERCHANT_ADMIN_PASSWORD
        };

        // Log thành công khi cấu hình hoàn tất
        console.log('Initialized VNPay configuration successfully');

        return {
            vnp_TmnCode,
            vnp_HashSecret,
            vnp_Url,
            merchantAdmin
        };
    } catch (error) {
        // Xử lý lỗi nếu có vấn đề xảy ra
        console.error('Error initializing VNPay configuration:', error.message);
        throw error; // Ném lỗi để báo hiệu rằng quá trình cấu hình không thành công
    }
};

module.exports = vnPayConfig;
