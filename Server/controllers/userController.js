import userModel from "../models/user.model.js";

export const getUserData = async (req, res) => {
    try {
      const userId = req.userId;

        const user = await userModel.findById(userId)
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true,
             userData:
            {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
         });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}