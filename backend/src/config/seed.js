import User from '../models/User.js';

export const seedDefaultAdmin = async () => {
  const adminEmail = 'admin@campus.com';

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const adminUser = await User.create({
      name: 'Campus Admin',
      email: adminEmail,
      password: 'Admin@123',
      role: 'admin',
      studentId: 'ADMIN-001',
    });

    console.log('Default admin user created:', adminUser.email);
  }
};
