import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create superadmin user with provided credentials
  const superAdminPassword = await bcrypt.hash('B_LR8$i3_R-8!+.>$D8U785Rajr21', 12)
  const superAdmin = await prisma.user.upsert({
    where: { email: '9664009535@troika' },
    update: {},
    create: {
      name: 'Super Admin',
      email: '9664009535@troika',
      password: superAdminPassword,
      role: 'SUPERADMIN',
    },
  })

  console.log('✅ SuperAdmin user created:', superAdmin.email)

  // Get final counts
  const userCount = await prisma.user.count()
  const leadCount = await prisma.lead.count()

  console.log(`🎉 Database seeded successfully!`)
  console.log(`👥 Users: ${userCount}`)
  console.log(`📋 Leads: ${leadCount}`)
  console.log('')
  console.log('🔑 Login credentials:')
  console.log('SuperAdmin: 9664009535@troika / B_LR8$i3_R-8!+.>$D8U785Rajr21')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
